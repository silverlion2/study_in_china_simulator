export class AudioManager {
  constructor(manifest = {}) {
    this.manifest = manifest;
    this.context = null;
    this.masterGain = null;
    this.bgmGain = null;
    this.ambienceGain = null;
    this.sfxGain = null;
    this.stingerGain = null;
    this.bgmTimer = null;
    this.bgmBarIndex = 0;
    this.currentBgmId = null;
    this.currentBgmElement = null;
    this.currentAmbienceElement = null;
    this.lastTypeTickAt = 0;
    this.muted = false;
    this.volumes = {
      master: 0.72,
      bgm: 0.42,
      ambience: 0.2,
      sfx: 0.7,
      type: 0.28,
      stinger: 0.75,
      ...(manifest.defaults?.volumes || {})
    };
    this.loadSettings();
  }

  loadSettings() {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      const stored = window.localStorage.getItem("sim_panda_audio_settings");
      if (!stored) return;
      const parsed = JSON.parse(stored);
      this.muted = Boolean(parsed.muted);
      this.volumes = { ...this.volumes, ...(parsed.volumes || {}) };
    } catch (error) {
      console.warn("Audio settings could not be loaded", error);
    }
  }

  saveSettings() {
    try {
      if (typeof window === "undefined" || !window.localStorage) return;
      window.localStorage.setItem("sim_panda_audio_settings", JSON.stringify({
        muted: this.muted,
        volumes: this.volumes
      }));
    } catch (error) {
      console.warn("Audio settings could not be saved", error);
    }
  }

  ensureContext() {
    if (typeof window === "undefined") return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!this.context) {
      this.context = new AudioContextClass();
      this.masterGain = this.context.createGain();
      this.bgmGain = this.context.createGain();
      this.ambienceGain = this.context.createGain();
      this.sfxGain = this.context.createGain();
      this.stingerGain = this.context.createGain();

      this.masterGain.connect(this.context.destination);
      this.bgmGain.connect(this.masterGain);
      this.ambienceGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.stingerGain.connect(this.masterGain);

      this.applyVolumes();
    }

    return this.context;
  }

  async unlock() {
    const ctx = this.ensureContext();
    if (!ctx) return false;
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    return ctx.state === "running";
  }

  applyVolumes() {
    if (!this.masterGain) return;
    const masterVolume = this.muted ? 0 : this.volumes.master;
    this.masterGain.gain.value = masterVolume;
    this.bgmGain.gain.value = this.volumes.bgm;
    this.ambienceGain.gain.value = this.volumes.ambience;
    this.sfxGain.gain.value = this.volumes.sfx;
    this.stingerGain.gain.value = this.volumes.stinger;
  }

  setVolume(channel, value) {
    const safeValue = Math.max(0, Math.min(1, Number(value) || 0));
    this.volumes[channel] = safeValue;
    this.applyVolumes();
    this.saveSettings();
  }

  mute() {
    this.muted = true;
    this.applyVolumes();
    this.saveSettings();
  }

  unmute() {
    this.muted = false;
    this.applyVolumes();
    this.saveSettings();
  }

  isMuted() {
    return this.muted;
  }

  async start(bgmId = "title") {
    this.unmute();
    const unlocked = await this.unlock();
    if (!unlocked) return false;
    await this.playBgm(bgmId);
    return true;
  }

  stop() {
    this.stopBgm({ fadeMs: 350 });
    this.stopAmbience({ fadeMs: 250 });
  }

  async playBgm(id = "title", options = {}) {
    const unlocked = await this.unlock();
    if (!unlocked || this.muted) return unlocked;
    if (this.currentBgmId === id && (this.bgmTimer || this.currentBgmElement)) return true;

    const entry = this.manifest.bgm?.[id];
    if (entry?.ready && entry.src) {
      this.stopProceduralBgm(options);
      this.currentBgmId = id;
      this.currentBgmElement = await this.playLoopingElement(this.currentBgmElement, entry.src, this.volumes.bgm, options.fadeMs ?? 900);
      return true;
    }

    this.stopElement(this.currentBgmElement, options.fadeMs ?? 500);
    this.currentBgmElement = null;
    this.playProceduralBgm(entry?.fallback || id, options);
    return true;
  }

  stopBgm(options = {}) {
    this.stopProceduralBgm(options);
    this.stopElement(this.currentBgmElement, options.fadeMs ?? 350);
    this.currentBgmElement = null;
    this.currentBgmId = null;
  }

  async playAmbience(id, options = {}) {
    const entry = this.manifest.ambience?.[id];
    if (!entry?.ready || !entry.src || this.muted) return false;
    const unlocked = await this.unlock();
    if (!unlocked) return false;
    this.currentAmbienceElement = await this.playLoopingElement(this.currentAmbienceElement, entry.src, this.volumes.ambience, options.fadeMs ?? 700);
    return true;
  }

  stopAmbience(options = {}) {
    this.stopElement(this.currentAmbienceElement, options.fadeMs ?? 250);
    this.currentAmbienceElement = null;
  }

  playSfx(id = "uiClick") {
    if (this.muted) return;
    const entry = this.manifest.sfx?.[id];
    if (entry?.ready && entry.src) {
      this.playOneShotElement(entry.src, this.volumes.sfx);
      return;
    }
    this.playFallbackSfx(entry?.fallback || id);
  }

  playStinger(id = "cgUnlock") {
    if (this.muted) return;
    const entry = this.manifest.stingers?.[id];
    if (entry?.ready && entry.src) {
      this.playOneShotElement(entry.src, this.volumes.stinger);
      return;
    }
    this.playFallbackSfx(entry?.fallback || id, true);
  }

  ui() {
    this.playSfx("uiClick");
  }

  week() {
    this.playSfx("calendarFlip");
  }

  typeTick() {
    this.playSfx("typeTick");
  }

  async playLoopingElement(currentElement, src, volume, fadeMs) {
    this.stopElement(currentElement, fadeMs);
    const element = new Audio(src);
    element.loop = true;
    element.volume = 0;
    try {
      await element.play();
      this.fadeElement(element, volume, fadeMs);
      return element;
    } catch (error) {
      console.warn("Audio asset could not be played; using fallback if available", src, error);
      return null;
    }
  }

  playOneShotElement(src, volume) {
    const element = new Audio(src);
    element.volume = volume;
    element.play().catch((error) => {
      console.warn("SFX asset could not be played", src, error);
    });
  }

  fadeElement(element, targetVolume, fadeMs = 500) {
    if (!element) return;
    const startVolume = element.volume || 0;
    const duration = Math.max(1, fadeMs);
    const startedAt = performance.now();
    const tick = () => {
      const progress = Math.min(1, (performance.now() - startedAt) / duration);
      element.volume = startVolume + (targetVolume - startVolume) * progress;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  stopElement(element, fadeMs = 350) {
    if (!element) return;
    const startVolume = element.volume || 0;
    const duration = Math.max(1, fadeMs);
    const startedAt = performance.now();
    const tick = () => {
      const progress = Math.min(1, (performance.now() - startedAt) / duration);
      element.volume = startVolume * (1 - progress);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.pause();
        element.currentTime = 0;
      }
    };
    requestAnimationFrame(tick);
  }

  playProceduralBgm(id, options = {}) {
    const ctx = this.ensureContext();
    if (!ctx || !this.bgmGain) return;
    const fadeMs = options.fadeMs ?? 900;
    const preset = this.getBgmPreset(id);

    this.stopProceduralBgm({ fadeMs: 120 });
    this.currentBgmId = id;
    this.bgmBarIndex = 0;
    this.bgmGain.gain.cancelScheduledValues(ctx.currentTime);
    this.bgmGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.bgmGain.gain.linearRampToValueAtTime(this.volumes.bgm, ctx.currentTime + fadeMs / 1000);

    const playBar = () => {
      this.playProceduralBar(preset);
      this.bgmBarIndex += 1;
    };

    playBar();
    this.bgmTimer = window.setInterval(playBar, preset.intervalMs);
  }

  stopProceduralBgm(options = {}) {
    if (this.bgmTimer) {
      window.clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.context && this.bgmGain) {
      const fadeSeconds = (options.fadeMs ?? 250) / 1000;
      this.bgmGain.gain.cancelScheduledValues(this.context.currentTime);
      this.bgmGain.gain.linearRampToValueAtTime(0.0001, this.context.currentTime + fadeSeconds);
    }
  }

  playProceduralBar(preset) {
    const chord = preset.progression[this.bgmBarIndex % preset.progression.length];
    chord.forEach((frequency, index) => {
      this.playTone({
        frequency,
        duration: preset.padDuration,
        type: index === 0 ? preset.bassType : preset.padType,
        gain: index === 0 ? preset.bassGain : preset.padGain,
        destination: this.bgmGain,
        delay: index * 0.035
      });
    });

    for (const accent of preset.accents) {
      const base = chord[accent.noteIndex] || chord[1] || chord[0];
      this.playTone({
        frequency: base * accent.multiplier,
        duration: accent.duration,
        type: accent.type,
        gain: accent.gain,
        destination: this.bgmGain,
        delay: accent.delay
      });
    }

    if (preset.pulse) {
      this.playTone({
        frequency: chord[0] / 2,
        duration: 0.12,
        type: "sawtooth",
        gain: preset.pulseGain,
        destination: this.bgmGain,
        delay: 0.05
      });
      this.playTone({
        frequency: chord[0] / 2,
        duration: 0.1,
        type: "sawtooth",
        gain: preset.pulseGain * 0.7,
        destination: this.bgmGain,
        delay: preset.intervalMs / 2000
      });
    }
  }

  playFallbackSfx(id, important = false) {
    if (id === "typeTick") {
      this.playTypeTick();
      return;
    }

    const patterns = {
      uiClick: [[740, 0.055, "triangle", 0.035], [980, 0.075, "sine", 0.02, 0.045]],
      uiConfirm: [[660, 0.06, "triangle", 0.04], [880, 0.1, "sine", 0.03, 0.05]],
      uiBack: [[520, 0.08, "triangle", 0.03], [390, 0.08, "sine", 0.02, 0.04]],
      menuOpen: [[440, 0.08, "triangle", 0.03], [660, 0.08, "triangle", 0.025, 0.06]],
      save: [[523.25, 0.1, "triangle", 0.04], [783.99, 0.14, "sine", 0.035, 0.08]],
      load: [[392, 0.08, "triangle", 0.035], [587.33, 0.13, "sine", 0.03, 0.07]],
      calendarFlip: [[392, 0.16, "triangle", 0.04], [523.25, 0.16, "triangle", 0.034, 0.12], [659.25, 0.22, "sine", 0.03, 0.24]],
      deadlineWarning: [[220, 0.12, "sawtooth", 0.035], [196, 0.16, "triangle", 0.03, 0.14]],
      cgUnlock: [[523.25, 0.14, "triangle", 0.04], [659.25, 0.16, "triangle", 0.04, 0.11], [880, 0.22, "sine", 0.035, 0.24]],
      endingUnlock: [[392, 0.2, "triangle", 0.04], [587.33, 0.24, "triangle", 0.04, 0.18], [783.99, 0.36, "sine", 0.035, 0.38]],
      badEnding: [[196, 0.28, "triangle", 0.035], [146.83, 0.38, "sine", 0.028, 0.22]],
      qrScan: [[1200, 0.04, "square", 0.018], [1550, 0.06, "sine", 0.024, 0.04]],
      alipayScan: [[880, 0.05, "triangle", 0.03], [1320, 0.08, "sine", 0.026, 0.05]],
      didiRequest: [[620, 0.06, "triangle", 0.03], [760, 0.1, "sine", 0.025, 0.12]],
      didiArrived: [[760, 0.08, "triangle", 0.03], [1020, 0.14, "sine", 0.026, 0.1]],
      wechatMessage: [[980, 0.04, "triangle", 0.022], [1320, 0.06, "sine", 0.018, 0.05]],
      moneyGain: [[660, 0.05, "triangle", 0.033], [990, 0.09, "sine", 0.025, 0.06]],
      moneySpend: [[520, 0.05, "triangle", 0.025], [330, 0.09, "sine", 0.02, 0.05]],
      relationshipUp: [[587.33, 0.08, "triangle", 0.028], [783.99, 0.14, "sine", 0.025, 0.1]]
    };

    const pattern = patterns[id] || patterns[important ? "cgUnlock" : "uiClick"];
    pattern.forEach(([frequency, duration, type, gain, delay = 0]) => {
      this.playTone({ frequency, duration, type, gain, destination: important ? this.stingerGain : this.sfxGain, delay });
    });
  }

  playTypeTick() {
    const ctx = this.ensureContext();
    if (!ctx || !this.sfxGain) return;
    const nowMs = Date.now();
    if (nowMs - this.lastTypeTickAt < 34) return;
    this.lastTypeTickAt = nowMs;

    const sampleCount = Math.floor(ctx.sampleRate * 0.018);
    const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < sampleCount; i += 1) {
      const fade = 1 - i / sampleCount;
      data[i] = (Math.random() * 2 - 1) * fade;
    }

    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = 1700 + Math.random() * 700;
    gain.gain.value = this.volumes.type * 0.065;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    source.start();
  }

  playTone({ frequency, duration = 0.12, type = "sine", gain = 0.04, destination = this.sfxGain, delay = 0 }) {
    const ctx = this.ensureContext();
    if (!ctx || !destination) return;
    const now = ctx.currentTime + delay;
    const oscillator = ctx.createOscillator();
    const envelope = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), now + 0.018);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(envelope);
    envelope.connect(destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.04);
  }

  getBgmPreset(id) {
    const presets = {
      title: {
        intervalMs: 3600,
        padDuration: 3.4,
        progression: [[293.66, 369.99, 440], [261.63, 329.63, 392], [246.94, 293.66, 369.99], [220, 277.18, 329.63]],
        bassType: "triangle",
        padType: "sine",
        bassGain: 0.018,
        padGain: 0.012,
        accents: [{ noteIndex: 1, multiplier: 2, duration: 0.18, type: "triangle", gain: 0.015, delay: 1.12 }, { noteIndex: 2, multiplier: 2, duration: 0.22, type: "triangle", gain: 0.012, delay: 2.42 }]
      },
      applicationLateNight: {
        intervalMs: 3900,
        padDuration: 3.6,
        progression: [[261.63, 329.63, 392], [246.94, 311.13, 369.99], [220, 277.18, 329.63], [246.94, 293.66, 369.99]],
        bassType: "triangle",
        padType: "sine",
        bassGain: 0.014,
        padGain: 0.01,
        accents: [{ noteIndex: 2, multiplier: 2, duration: 0.12, type: "sine", gain: 0.009, delay: 1.7 }]
      },
      applicationPressure: {
        intervalMs: 2600,
        padDuration: 2.35,
        progression: [[220, 261.63, 329.63], [207.65, 246.94, 311.13], [196, 233.08, 293.66]],
        bassType: "sawtooth",
        padType: "triangle",
        bassGain: 0.012,
        padGain: 0.008,
        pulse: true,
        pulseGain: 0.009,
        accents: []
      },
      documentsAdmin: {
        intervalMs: 3200,
        padDuration: 2.8,
        progression: [[196, 246.94, 293.66], [220, 261.63, 329.63], [185, 233.08, 277.18]],
        bassType: "triangle",
        padType: "triangle",
        bassGain: 0.014,
        padGain: 0.009,
        pulse: true,
        pulseGain: 0.006,
        accents: [{ noteIndex: 1, multiplier: 2, duration: 0.08, type: "square", gain: 0.006, delay: 1.2 }]
      },
      predepartureHome: {
        intervalMs: 4200,
        padDuration: 3.9,
        progression: [[261.63, 329.63, 392], [293.66, 349.23, 440], [246.94, 311.13, 392], [220, 277.18, 329.63]],
        bassType: "sine",
        padType: "sine",
        bassGain: 0.012,
        padGain: 0.01,
        accents: [{ noteIndex: 2, multiplier: 2, duration: 0.24, type: "triangle", gain: 0.011, delay: 2.1 }]
      },
      flightArrival: {
        intervalMs: 4600,
        padDuration: 4.3,
        progression: [[220, 293.66, 369.99], [246.94, 329.63, 415.3], [261.63, 349.23, 440]],
        bassType: "sine",
        padType: "sine",
        bassGain: 0.011,
        padGain: 0.009,
        accents: [{ noteIndex: 1, multiplier: 2, duration: 0.3, type: "sine", gain: 0.009, delay: 2.4 }]
      },
      campusDaily: {
        intervalMs: 3400,
        padDuration: 3.1,
        progression: [[293.66, 369.99, 440], [329.63, 392, 493.88], [261.63, 329.63, 392], [349.23, 440, 523.25]],
        bassType: "triangle",
        padType: "sine",
        bassGain: 0.015,
        padGain: 0.011,
        accents: [{ noteIndex: 2, multiplier: 2, duration: 0.12, type: "triangle", gain: 0.012, delay: 1.05 }, { noteIndex: 1, multiplier: 2, duration: 0.12, type: "triangle", gain: 0.011, delay: 2.05 }]
      },
      studyLibrary: {
        intervalMs: 4100,
        padDuration: 3.8,
        progression: [[220, 293.66, 349.23], [246.94, 329.63, 392], [196, 261.63, 329.63]],
        bassType: "triangle",
        padType: "sine",
        bassGain: 0.011,
        padGain: 0.008,
        accents: [{ noteIndex: 1, multiplier: 2, duration: 0.09, type: "triangle", gain: 0.007, delay: 1.8 }]
      },
      socialWarm: {
        intervalMs: 3600,
        padDuration: 3.3,
        progression: [[261.63, 329.63, 392], [293.66, 369.99, 440], [329.63, 392, 493.88]],
        bassType: "triangle",
        padType: "sine",
        bassGain: 0.014,
        padGain: 0.012,
        accents: [{ noteIndex: 2, multiplier: 2, duration: 0.16, type: "triangle", gain: 0.012, delay: 1.4 }]
      },
      shanghaiCity: {
        intervalMs: 2800,
        padDuration: 2.55,
        progression: [[246.94, 329.63, 415.3], [293.66, 369.99, 493.88], [220, 293.66, 369.99]],
        bassType: "sawtooth",
        padType: "triangle",
        bassGain: 0.012,
        padGain: 0.009,
        pulse: true,
        pulseGain: 0.006,
        accents: [{ noteIndex: 2, multiplier: 2, duration: 0.1, type: "square", gain: 0.006, delay: 0.72 }, { noteIndex: 1, multiplier: 2, duration: 0.1, type: "square", gain: 0.005, delay: 1.82 }]
      },
      careerOffice: {
        intervalMs: 3300,
        padDuration: 3.0,
        progression: [[261.63, 329.63, 440], [293.66, 369.99, 493.88], [246.94, 329.63, 415.3]],
        bassType: "triangle",
        padType: "sine",
        bassGain: 0.013,
        padGain: 0.01,
        accents: [{ noteIndex: 2, multiplier: 2, duration: 0.13, type: "triangle", gain: 0.011, delay: 1.35 }]
      },
      startupDemo: {
        intervalMs: 2600,
        padDuration: 2.35,
        progression: [[293.66, 369.99, 493.88], [329.63, 415.3, 523.25], [246.94, 329.63, 440]],
        bassType: "triangle",
        padType: "triangle",
        bassGain: 0.013,
        padGain: 0.01,
        pulse: true,
        pulseGain: 0.005,
        accents: [{ noteIndex: 2, multiplier: 2, duration: 0.08, type: "square", gain: 0.007, delay: 0.6 }, { noteIndex: 1, multiplier: 2, duration: 0.1, type: "triangle", gain: 0.009, delay: 1.65 }]
      },
      localLife: {
        intervalMs: 3800,
        padDuration: 3.5,
        progression: [[220, 277.18, 349.23], [246.94, 311.13, 392], [261.63, 329.63, 392], [196, 246.94, 329.63]],
        bassType: "triangle",
        padType: "sine",
        bassGain: 0.014,
        padGain: 0.01,
        accents: [{ noteIndex: 1, multiplier: 2, duration: 0.12, type: "triangle", gain: 0.009, delay: 1.1 }, { noteIndex: 2, multiplier: 2, duration: 0.14, type: "triangle", gain: 0.009, delay: 2.3 }]
      },
      crisisMoney: {
        intervalMs: 3000,
        padDuration: 2.75,
        progression: [[146.83, 196, 233.08], [164.81, 207.65, 246.94], [138.59, 185, 220]],
        bassType: "sawtooth",
        padType: "triangle",
        bassGain: 0.014,
        padGain: 0.006,
        pulse: true,
        pulseGain: 0.008,
        accents: []
      },
      goodEnding: {
        intervalMs: 4300,
        padDuration: 4.0,
        progression: [[261.63, 329.63, 392], [293.66, 369.99, 440], [349.23, 440, 523.25], [329.63, 415.3, 493.88]],
        bassType: "sine",
        padType: "sine",
        bassGain: 0.014,
        padGain: 0.012,
        accents: [{ noteIndex: 2, multiplier: 2, duration: 0.28, type: "triangle", gain: 0.013, delay: 2.0 }, { noteIndex: 1, multiplier: 2, duration: 0.25, type: "triangle", gain: 0.012, delay: 3.1 }]
      },
      quietEnding: {
        intervalMs: 5000,
        padDuration: 4.6,
        progression: [[196, 246.94, 293.66], [174.61, 220, 261.63], [164.81, 207.65, 246.94]],
        bassType: "sine",
        padType: "sine",
        bassGain: 0.009,
        padGain: 0.007,
        accents: [{ noteIndex: 2, multiplier: 2, duration: 0.35, type: "sine", gain: 0.006, delay: 2.8 }]
      }
    };

    return presets[id] || presets.campusDaily;
  }
}
