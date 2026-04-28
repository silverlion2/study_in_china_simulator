<div align="center">
  <img src="https://socialify.git.ci/silverlion2/study_in_china_simulator/image?description=1&font=Inter&language=1&name=1&owner=1&pattern=Formal&theme=Dark" alt="Sim Panda - Study in China Simulator" width="600" />

  # Sim Panda - Study in China Simulator 🐼

  [![Build & Release Windows](https://github.com/silverlion2/study_in_china_simulator/actions/workflows/build-release.yml/badge.svg)](https://github.com/silverlion2/study_in_china_simulator/actions/workflows/build-release.yml)
  [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
  [![Made with React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Packaged with Electron](https://img.shields.io/badge/Electron-191970?style=flat&logo=Electron&logoColor=white)](https://www.electronjs.org/)

  **A High-Fidelity, Choice-Driven RPG Life Simulator built with React and Electron.**

</div>

## 📥 Download and Play

You can download the compiled Windows `.exe` installer directly from the GitHub Cloud servers.

👉 **[Download the Latest Windows Release Here](https://github.com/silverlion2/study_in_china_simulator/releases/latest)**

---

## 🎮 Game Overview

**Sim Panda** is an immersive lifestyle simulator that puts you in the shoes of an international student navigating the exciting, challenging, and culturally rich process of studying abroad in China.

Using a precise turn-based weekly schedule, players balance `Academics`, `Chinese`, `Culture`, `Digital Proficiency`, `Energy`, relationships, and `RMB Finances` across the full study-abroad arc: applying to Minghai University, preparing documents and digital tools, arriving in Shanghai, building routes, and reaching one of several endings.

## 🆕 Latest Update

The current development build expands Sim Panda from a compact prototype into a fuller visual-novel life simulator:

- Added a complete title screen with `New Game`, `Load Game`, `CG Gallery`, and sound controls.
- Expanded the story into Application, Pre-Departure, and In-China phases with richer route events and ending logic.
- Added SimPad systems for Calendar, Gallery / Memory Archive, DiDi, Taobao service orders, housing follow-up, WeChat meetups, jobs, souvenirs, and player progress.
- Added 23 CG memories, including admission, documents, academic route scenes, local-life scenes, career milestones, Shanghai startup events, risk endings, and new daily-life character CGs.
- Added a large visual asset library: campus backgrounds, Shanghai / China travel scenes, character portraits, v2 character art, route CGs, and compressed JPG runtime assets.
- Added audio infrastructure with `AudioManager`, audio manifests, fallback Web Audio BGM/SFX, and a first batch of MP3 background tracks.
- Added design, narrative, asset, audio, QA, and handoff documentation for continuing development.
- Updated the build pipeline so the standalone `index.html` stays playable offline while supporting optional PandaOffer website export.

## ✨ Features

- **Dynamic Turn-Based Scheduling:** Manage 36 weeks of actions across distinct Epochs (Application, Pre-Departure, In-China).
- **RPG Stat System:** Track academics, language growth, culture, digital readiness, energy, money, guanxi, and character relationships.
- **Narrative Story Engine:** Multiple routes and endings shaped by weekly choices, route commitments, risk events, and relationship trust.
- **Authentic Study-Abroad Flow:** Application essays, JW202 / X1 visa prep, WeChat and Alipay setup, housing, airport arrival, registration, first classes, internships, and local-life adaptation.
- **SimPad Tablet Interface:** In-game hub for milestones, stats, Calendar, CG memories, DiDi shortcuts, Taobao service orders, jobs, WeChat contacts, souvenirs, and route progress.
- **Visual Novel Presentation:** 23 unlockable CG memories, character portraits, campus backgrounds, route scenes, and a title-screen gallery.
- **Audio Layer:** Scene-aware BGM/SFX manager with Web Audio fallback and optional MP3 asset manifest.

## 🛠️ Local Development

To run the simulator locally in its Electron container or browser:

```bash
# 1. Clone the repository
git clone https://github.com/silverlion2/study_in_china_simulator.git
cd study_in_china_simulator

# 2. Install dependencies (for Electron desktop wrapping)
npm install

# 3. Play via Desktop Client
npm start
```
*Note: If you only want to play in your browser, just double click `index.html`!*

## 🏗️ System Architecture

The project is structured to be highly pure, eschewing complicated bundle tooling (like Webpack) in favor of a raw React string-injected `build.js` pipeline. 

- `data/`: Contains the JSON node tree logic for event handling.
- `engine/`: The core `GameState.js` and `EventSystem.js` maintaining state without Redux.
- `components/`: Modular React components tracking specific UI functions (like the `TabletInterface`).
- `images/` and `assets/`: Runtime visual and audio assets used by the standalone build.
- `docs/`: Visual asset plans, prompt records, contact sheets, and production notes.

## 📜 License
ISC License
