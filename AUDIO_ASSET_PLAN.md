# Sim Panda 音频资产规划

更新时间：2026-04-28

## 1. 目标

当前游戏已经有程序化 Web Audio 占位 BGM、点击音、Week transition 音效和打字 tick，但这些只是让游戏不再完全静音。正式版本需要一套外部音频资产，让玩家在不同阶段感受到“申请中国、出发、抵达上海、融入校园、走向结局”的情绪变化。

本规划用于后续对接：

- 音频生成模型
- 素材库采购
- 外包作曲 / 音效设计
- 后续代码接入与混音

## 2. 当前能力确认

当前 Codex/GPT 工作环境：

- 可以规划音频、写提示词、设计触发逻辑、接入前端音频系统。
- 可以用 Web Audio 合成简单占位音效。
- 不能直接生成正式 `.mp3` / `.wav` BGM 文件。
- `GPT-image-2` 是图像模型，只适合 CG、角色图、封面图，不适合音乐。

因此正式 BGM 需要来自专门的音频生成工具、素材库或作曲流程。这里不强行绑定某个工具，先把需求写清楚。

## 3. 文件结构建议

建议后续音频资产放在：

```text
assets/audio/
  bgm/
  ambience/
  sfx/
  stingers/
```

命名规则：

```text
bgm_title_shanghai_evening_loop.mp3
bgm_application_late_night_loop.mp3
amb_airport_arrivals_loop.mp3
sfx_ui_confirm.wav
stinger_cg_unlock.wav
```

技术规格建议：

- BGM：`mp3`，192-256 kbps，44.1 kHz，60-120 秒无缝循环。
- Ambience：`mp3`，128-192 kbps，44.1 kHz，30-90 秒无缝循环。
- SFX / Stingers：`wav` 优先，44.1 kHz，16-bit 或 24-bit，0.1-4 秒。
- BGM loudness：约 -18 LUFS 到 -16 LUFS。
- SFX loudness：约 -14 LUFS 到 -10 LUFS，根据重要性分级。
- 所有资产需要可商用、无版权风险，不要直接引用真实流行歌曲、影视配乐、学校校歌或可识别旋律。

## 4. 音频分层

### BGM

负责情绪和阶段识别。BGM 不应该频繁切换，通常随 phase、route、ending 或重要节点切换。

### Ambience

负责场景真实感，例如机场、地铁、食堂、图书馆、办公室、夜市。Ambience 可以和 BGM 同时播放，但音量要低。

### SFX

负责操作反馈，例如点击、保存、打开 SimPad、WeChat 消息、Alipay 扫码、DiDi 叫车。

### Stingers

负责奖励和节点强调，例如 admission email、visa approved、CG unlock、ending unlock、bad ending。

## 5. BGM 清单

| ID | 文件名 | 场景 | 情绪 | 长度 | 循环 | 优先级 |
|---|---|---|---|---:|---|---|
| `title` | `bgm_title_shanghai_evening_loop.mp3` | 主菜单 / 封面 | 上海夜景、期待、温暖、轻微都市感 | 90s | 是 | P0 |
| `application_late_night` | `bgm_application_late_night_loop.mp3` | Week 1-8 申请主流程 | 深夜电脑、专注、轻焦虑、lo-fi study | 90s | 是 | P0 |
| `application_pressure` | `bgm_application_deadline_pressure_loop.mp3` | 文书 deadline、面试、申请提交 | 紧张但不恐怖、心跳感、轻 pulse | 60s | 是 | P1 |
| `documents_admin` | `bgm_documents_admin_loop.mp3` | JW202、签证、材料、行政流程 | 行政压力、机械节奏、低频、纸张感 | 75s | 是 | P0 |
| `predeparture_home` | `bgm_predeparture_home_loop.mp3` | 出发准备、收拾行李、告别 | 温柔、离别、家庭感、微酸 | 90s | 是 | P0 |
| `flight_arrival` | `bgm_flight_arrival_loop.mp3` | 飞机、浦东机场、第一次抵达 | 空旷、陌生、慢慢展开、期待 | 90s | 是 | P0 |
| `campus_daily` | `bgm_campus_daily_loop.mp3` | Minghai 默认校园生活 | 明亮、青年感、轻快但不幼稚 | 120s | 是 | P0 |
| `study_library` | `bgm_study_library_loop.mp3` | 课堂、图书馆、Professor Lin | 安静、专注、有学术压迫感 | 90s | 是 | P1 |
| `social_warm` | `bgm_social_warm_loop.mp3` | Sophie、国际生、宿舍公共空间 | 温暖、人群、轻松、软着陆 | 90s | 是 | P1 |
| `shanghai_city` | `bgm_shanghai_city_loop.mp3` | Bund、地铁、城市探索 | 都市、夜景、电子律动、流动感 | 100s | 是 | P1 |
| `career_office` | `bgm_career_office_loop.mp3` | Manager Zhang、实习、office badge | 现代、干净、上升感、克制兴奋 | 90s | 是 | P1 |
| `startup_demo` | `bgm_startup_demo_loop.mp3` | Xiao Chen、incubator、demo day | 年轻、推进、兴奋、投资感 | 90s | 是 | P1 |
| `local_life` | `bgm_local_life_loop.mp3` | Uncle Wang、Neighbor Li、街区 | 烟火气、温暖、真实、轻幽默 | 100s | 是 | P1 |
| `crisis_money` | `bgm_crisis_money_loop.mp3` | out of money、经济危机 | 压迫、低音、呼吸变窄、现实感 | 60s | 是 | P0 |
| `good_ending` | `bgm_good_ending_loop.mp3` | 好结局 | 奖励感、开阔、温暖、未来感 | 100s | 是 | P0 |
| `quiet_ending` | `bgm_quiet_ending_loop.mp3` | bad / quiet ending | 空、冷、遗憾、不是恐怖而是失落 | 75s | 是 | P0 |

## 6. BGM 生成提示词

后续无论使用哪种音频生成工具，建议用英文 prompt。不要写“像某某作品/某某音乐人”，避免版权风格模仿风险。

### Title

```text
Loopable instrumental background music for a visual novel about studying abroad in Shanghai. Warm evening skyline atmosphere, soft piano, gentle synth pads, subtle city-pop inspired rhythm, hopeful but not childish, modern Chinese megacity feeling, no vocals, seamless loop, 90 seconds.
```

### Application Late Night

```text
Loopable lo-fi study music for a university application scene. Late-night laptop, quiet room, soft electric piano, muted percussion, gentle anxiety, focused and intimate, no vocals, seamless loop, 90 seconds.
```

### Documents Admin

```text
Loopable instrumental music for visa paperwork and university documents. Subtle ticking rhythm, low synth pulse, paper-and-printer office mood, bureaucratic tension without becoming horror, no vocals, seamless loop, 75 seconds.
```

### Pre-Departure Home

```text
Loopable emotional background music for packing before leaving home to study in China. Warm piano, soft strings, gentle acoustic texture, bittersweet but hopeful, no vocals, seamless loop, 90 seconds.
```

### Flight Arrival

```text
Loopable ambient instrumental music for an international flight landing in Shanghai and entering an airport arrival hall. Airy synth pads, slow piano notes, distant airport ambience feeling, unfamiliar but exciting, no vocals, seamless loop, 90 seconds.
```

### Campus Daily

```text
Loopable background music for everyday campus life at a modern Chinese university in Shanghai. Bright but relaxed, youthful, light percussion, marimba or plucked synth, warm chords, no vocals, seamless loop, 120 seconds.
```

### Study Library

```text
Loopable focused study background music for library nights and academic office hours. Minimal piano, soft clock-like percussion, restrained tension, intellectual and calm, no vocals, seamless loop, 90 seconds.
```

### Social Warm

```text
Loopable warm background music for international student friendships, dorm common room conversations, and WeChat meetups. Cozy chords, gentle beat, soft guitar or electric piano, friendly and human, no vocals, seamless loop, 90 seconds.
```

### Shanghai City

```text
Loopable instrumental city exploration music for Shanghai metro, the Bund, and evening streets. Modern electronic groove, neon atmosphere, clean bass, light percussion, energetic but not nightclub-heavy, no vocals, seamless loop, 100 seconds.
```

### Career Office

```text
Loopable instrumental background music for a legal internship, office badge, career fair, and Shanghai business office scenes. Clean modern synths, confident rhythm, subtle corporate polish, aspirational but grounded, no vocals, seamless loop, 90 seconds.
```

### Startup Demo

```text
Loopable instrumental music for a student startup demo day in a Shanghai incubator. Forward motion, youthful tech energy, bright synth arpeggios, light drums, optimistic investor pitch feeling, no vocals, seamless loop, 90 seconds.
```

### Local Life

```text
Loopable warm background music for Shanghai neighborhood life, BBQ stall, dorm auntie, local festival preparation. Human, cozy, slightly playful, acoustic plucks, soft percussion, street warmth without stereotypes, no vocals, seamless loop, 100 seconds.
```

### Crisis Money

```text
Loopable tense instrumental music for running out of money while studying abroad. Low bass pulse, sparse piano, restrained pressure, realistic anxiety, no horror jumpscares, no vocals, seamless loop, 60 seconds.
```

### Good Ending

```text
Loopable ending music for a hopeful study-abroad success ending. Expansive piano, warm strings, subtle electronic lift, emotional reward, future opening up, no vocals, seamless loop, 100 seconds.
```

### Quiet Ending

```text
Loopable quiet ending music for a bittersweet failed study-abroad route. Sparse piano, cold room tone, distant pad, regretful but dignified, no vocals, seamless loop, 75 seconds.
```

## 7. Ambience 清单

| ID | 文件名 | 场景 | 内容 | 优先级 |
|---|---|---|---|---|
| `airport_arrivals` | `amb_airport_arrivals_loop.mp3` | 浦东机场 | 远处广播、人流、行李轮、空间混响 | P0 |
| `campus_square` | `amb_campus_square_loop.mp3` | 校园广场 | 学生脚步、远处聊天、风、广播 | P0 |
| `dorm_room` | `amb_dorm_room_loop.mp3` | 宿舍 | 空调、远处走廊、轻微键盘声 | P1 |
| `canteen` | `amb_canteen_loop.mp3` | 食堂 | 人群、餐盘、扫码提示音氛围 | P0 |
| `library` | `amb_library_loop.mp3` | 图书馆 | 低噪、翻书、键盘、脚步 | P1 |
| `metro` | `amb_shanghai_metro_loop.mp3` | 地铁 | 轨道、提示音、人群、门开关 | P1 |
| `street_night` | `amb_shanghai_street_night_loop.mp3` | 城市夜晚 | 车流、电动车、路边人声 | P1 |
| `bbq_stall` | `amb_bbq_stall_loop.mp3` | Uncle Wang | 烤串声、人声、街边锅气 | P1 |
| `office` | `amb_office_loop.mp3` | 实习办公室 | 空调、键盘、门禁、低声讨论 | P1 |
| `incubator` | `amb_incubator_loop.mp3` | 创业 demo | 投影仪、键盘、轻人群、掌声前噪声 | P2 |

## 8. SFX 清单

| ID | 文件名 | 用途 | 感觉 | 优先级 |
|---|---|---|---|---|
| `ui_click` | `sfx_ui_click.wav` | 普通点击 | 短、干净、不刺耳 | P0 |
| `ui_confirm` | `sfx_ui_confirm.wav` | 选择确认 | 比 click 更明确 | P0 |
| `ui_back` | `sfx_ui_back.wav` | 返回、关闭 | 低一点、柔和 | P1 |
| `menu_open` | `sfx_menu_open.wav` | 菜单展开 | 小 whoosh | P1 |
| `save` | `sfx_save.wav` | Quick Save | 稳定、安全感 | P0 |
| `load` | `sfx_load.wav` | Quick Load | 轻电子启动 | P0 |
| `type_tick` | `sfx_type_tick.wav` | 打字机 | 轻键盘，不要太密 | P0 |
| `choice_appear` | `sfx_choice_appear.wav` | 选项出现 | 轻提示 | P1 |
| `stat_up` | `sfx_stat_up.wav` | 数值上升 | 亮、短、鼓励 | P0 |
| `stat_down` | `sfx_stat_down.wav` | 数值下降 | 低、短、不惩罚过头 | P0 |
| `money_gain` | `sfx_money_gain.wav` | RMB 增加 | 电子钱包到账感 | P0 |
| `money_spend` | `sfx_money_spend.wav` | RMB 支出 | 支付完成但略肉疼 | P0 |
| `relationship_up` | `sfx_relationship_up.wav` | 关系提升 | 温暖、小光点 | P1 |
| `wechat_message` | `sfx_wechat_message.wav` | WeChat 消息 | 原创提示音，不能像真实微信 | P0 |
| `wechat_add_contact` | `sfx_wechat_add_contact.wav` | 加联系人 | 扫码/确认感 | P0 |
| `qr_scan` | `sfx_qr_scan.wav` | QR code | 扫描成功 | P0 |
| `alipay_scan` | `sfx_alipay_scan.wav` | 食堂扫码 | 原创支付成功音，不能像真实支付宝 | P0 |
| `didi_request` | `sfx_didi_request.wav` | 叫车 | app request sent | P0 |
| `didi_arrived` | `sfx_didi_arrived.wav` | 车到达 | soft notification | P0 |
| `taobao_order` | `sfx_taobao_order.wav` | 下单 | purchase confirmed | P1 |
| `taobao_delivery` | `sfx_taobao_delivery.wav` | 快递到了 | courier pickup | P1 |
| `calendar_flip` | `sfx_calendar_flip.wav` | Week transition | 翻页、轻仪式感 | P0 |
| `deadline_warning` | `sfx_deadline_warning.wav` | 关键 deadline | 不刺耳但紧迫 | P0 |
| `cg_unlock` | `stinger_cg_unlock.wav` | CG 解锁 | 奖励感、闪光 | P0 |
| `ending_unlock` | `stinger_ending_unlock.wav` | 结局 | 重要、完成感 | P0 |
| `bad_ending` | `stinger_bad_ending.wav` | 坏结局 | 冷、短、留白 | P0 |
| `office_badge` | `sfx_office_badge.wav` | office badge | 门禁 beep | P1 |
| `email_arrive` | `sfx_email_arrive.wav` | admission email | 邮件到达 | P0 |
| `visa_approved` | `stinger_visa_approved.wav` | visa approved | 盖章/通过感 | P0 |

## 9. 场景触发表

| 游戏阶段 / 节点 | BGM | Ambience | Stinger / SFX |
|---|---|---|---|
| Title Screen | `title` | 无或极低城市底噪 | `ui_click` |
| Week 1-8 默认 | `application_late_night` | `dorm_room` 的低强度版本 | `type_tick` |
| Statement / Interview / Submit | `application_pressure` | 无 | `deadline_warning`、`email_arrive` |
| Admission Email | `application_late_night` -> stinger | 无 | `email_arrive`、`cg_unlock` |
| JW202 / Visa | `documents_admin` | office hum | `visa_approved` |
| Packing / Farewell | `predeparture_home` | room tone | `save` / soft transition |
| Flight / Airport | `flight_arrival` | `airport_arrivals` | `didi_request` |
| First Canteen | `campus_daily` | `canteen` | `alipay_scan` |
| Registration | `documents_admin` | `campus_square` 或 office | `qr_scan` |
| Campus Default | `campus_daily` | `campus_square` | `stat_up/down` |
| Library / Professor Lin | `study_library` | `library` | `relationship_up` |
| Sophie / International Circle | `social_warm` | `dorm_room` / cafe | `wechat_message` |
| Xiao Chen / Startup | `startup_demo` | `incubator` | `cg_unlock` |
| Manager Zhang / Internship | `career_office` | `office` | `office_badge` |
| Uncle Wang / Local Route | `local_life` | `bbq_stall` / street | `relationship_up` |
| Shanghai City | `shanghai_city` | `metro` / `street_night` | `didi_arrived` |
| Money Crisis | `crisis_money` | very low room tone | `deadline_warning`、`bad_ending` |
| Good Ending | `good_ending` | 根据结局场景轻叠 | `ending_unlock` |
| Quiet / Out of Money Ending | `quiet_ending` | very low cold room tone | `bad_ending` |

## 10. 音量与混音建议

默认音量层级：

- Master：100%
- BGM：45%
- Ambience：20%
- SFX：70%
- Type tick：28%
- Stinger：75%

场景原则：

- 有角色对白时，BGM 自动 duck 到 35%-40%。
- CG unlock / ending stinger 播放时，BGM 瞬间 duck 到 25%，1.2 秒后恢复。
- Crisis BGM 不要过响，压迫感来自低频和留白，不是音量。
- Type tick 必须很轻，连续 10 分钟也不能烦。

## 11. 代码接入状态

2026-04-28 已完成第一阶段代码接入：

```text
engine/AudioManager.js
data/audioManifest.js
assets/audio/bgm/*.mp3
assets/audio/sfx/*.wav
```

当前实现：

- `data/audioManifest.js` 已列出 BGM / ambience / SFX / stinger 文件路径。
- `engine/AudioManager.js` 已支持 BGM、ambience、SFX、stinger、mute、volume setting、localStorage setting。
- 所有 manifest entry 目前都是 `ready: false`，所以不会请求不存在的 `.mp3` / `.wav`。
- 当某个正式素材放入 `assets/audio/` 后，把对应 entry 改成 `ready: true` 即可启用。
- 如果素材未 ready，`AudioManager` 会自动使用 Web Audio fallback。

`AudioManager` 已支持：

- 已有 `playBgm(id, { fadeMs })`
- 已有 `stopBgm({ fadeMs })`
- 已有 `playAmbience(id, { fadeMs })`
- 已有 `playSfx(id)`
- 已有 `playStinger(id)`
- 已有 `setVolume(channel, value)`
- 已有 `mute() / unmute()`
- 已有音量设置保存到 `localStorage`

## 12. 生产优先级

### 批量生成脚本

已新增 MiniMax 批量脚本：

```text
tools/minimax_music_jobs.json
tools/generate_minimax_music.mjs
```

第一次生成 P0 核心 BGM：

```bash
export MINIMAX_API_KEY="your_minimax_key"
node tools/generate_minimax_music.mjs
```

生成全部 16 首 BGM：

```bash
export MINIMAX_API_KEY="your_minimax_key"
node tools/generate_minimax_music.mjs --all
```

常用选项：

```bash
node tools/generate_minimax_music.mjs --dry-run
node tools/generate_minimax_music.mjs --priority=P1
node tools/generate_minimax_music.mjs --only=title,campus_daily
node tools/generate_minimax_music.mjs --force
```

脚本行为：

- 读取 `MINIMAX_API_KEY` 环境变量，不把 key 写入代码。
- 默认只生成 P0，避免一次性成本过高。
- 输出到 `assets/audio/bgm/`。
- 生成成功后自动把 `data/audioManifest.js` 对应 BGM 改成 `ready: true`。
- 最后自动运行 `node build.js`，让 Electron 使用更新后的音频 manifest。

### 第一批 P0

先做能明显改善体验的核心资产：

- `bgm_title_shanghai_evening_loop.mp3`
- `bgm_application_late_night_loop.mp3`
- `bgm_documents_admin_loop.mp3`
- `bgm_predeparture_home_loop.mp3`
- `bgm_flight_arrival_loop.mp3`
- `bgm_campus_daily_loop.mp3`
- `bgm_crisis_money_loop.mp3`
- `bgm_good_ending_loop.mp3`
- `bgm_quiet_ending_loop.mp3`
- `sfx_ui_click.wav`
- `sfx_ui_confirm.wav`
- `sfx_type_tick.wav`
- `sfx_calendar_flip.wav`
- `sfx_wechat_message.wav`
- `sfx_qr_scan.wav`
- `sfx_alipay_scan.wav`
- `sfx_didi_request.wav`
- `stinger_cg_unlock.wav`
- `stinger_ending_unlock.wav`
- `stinger_bad_ending.wav`

### 第二批 P1

增强路线差异：

- `bgm_study_library_loop.mp3`
- `bgm_social_warm_loop.mp3`
- `bgm_shanghai_city_loop.mp3`
- `bgm_career_office_loop.mp3`
- `bgm_startup_demo_loop.mp3`
- `bgm_local_life_loop.mp3`
- `amb_airport_arrivals_loop.mp3`
- `amb_canteen_loop.mp3`
- `amb_campus_square_loop.mp3`
- `amb_library_loop.mp3`
- `amb_shanghai_metro_loop.mp3`
- `sfx_money_gain.wav`
- `sfx_money_spend.wav`
- `sfx_relationship_up.wav`
- `sfx_office_badge.wav`
- `stinger_visa_approved.wav`

### 第三批 P2

最后补丰富度：

- 旅游城市 ambience
- 角色专属 leitmotif 变体
- 迷你游戏专属短循环
- 更多 UI hover / disabled / error 音

## 12.1 2.0 人物配音规划

人物配音建议放到 2.0，而不是 1.x 立刻做。

原因：

- 角色对话量还在扩充，过早生成语音会导致后续改文案成本很高。
- 主要角色的语气、节奏、称呼和关系阶段需要先稳定。
- 当前更重要的是把 Talk / Invite / Request / Follow-up 做成可玩的互动系统。

2.0 进入配音前置条件：

- 每个主要角色至少完成 Contact、Trust、Tension、Commitment 四段核心直接对话。
- 每个角色已经有稳定 voice brief：年龄感、语速、口音边界、情绪范围、禁忌风格。
- 剧情文本完成一次英文 copy polish，避免同一句台词反复重录。
- 前端支持 voice channel 音量、跳过语音、自动播放开关和无声 fallback。

建议目录：

```text
assets/audio/voice/
  professor_lin/
  dr_mei/
  sophie/
  xiao_chen/
  neighbor_li/
  manager_zhang/
  uncle_wang/
```

命名规则：

```text
voice_sophie_contact_001.mp3
voice_xiao_chen_tension_003.mp3
voice_professor_lin_commitment_002.mp3
```

Minimax 使用建议：

- 第一批只生成关键台词，不给所有旁白配音。
- 角色台词优先，系统旁白默认不配音。
- 同一角色先做 5-8 条 voice sample，让玩家确认气质后再批量生成。
- 所有 voice prompt 禁止指定真实演员、名人、影视角色或可识别声音。
- 中英混杂台词要人工确认发音，尤其是 Minghai、WeChat、RMB、office hour、guanxi 等词。

角色 voice brief 初稿：

| 角色 | 声音方向 |
|---|---|
| Professor Lin | 克制、清晰、略严厉但不冷酷，语速中慢 |
| Dr. Mei | 理性、敏锐、温和但有锋利问题，语速中等 |
| Sophie | 亲近、疲惫时仍幽默，国际学生同龄人感 |
| Xiao Chen | 快、亮、有创业兴奋感，但 tension 时会急 |
| Neighbor Li | 自然、本地同学感，直接但不刻薄 |
| Manager Zhang | 职业、稳、边界清楚，像认真给机会的人 |
| Uncle Wang | 温暖、街区生活感，语速稍慢，轻松但不 caricature |

## 13. 风格边界

应该避免：

- 太恋爱游戏化的甜腻音乐，因为本作不是恋爱游戏。
- 太恐怖游戏化的 crisis 音乐，因为经济风险应现实压迫，不是惊吓。
- 过度“中国风”刻板印象，例如满篇古筝、锣鼓、宫廷感。
- 直接模仿微信、支付宝、滴滴真实提示音。
- 直接模仿知名游戏、动画、电影或歌手。

应该追求：

- 现代上海、国际学生、青年成长、真实生活。
- 电子、钢琴、lo-fi、轻 city pop、校园 indie、都市 ambience 的混合。
- 不同路线有记忆点，但不要打断阅读。
- 音乐服务剧情，不抢台词。

## 14. 下一步建议

1. 先拿第一批 P0 资产做占位替换。
2. 把对应 manifest entry 从 `ready: false` 改为 `ready: true`。
3. 扩展 SimPad、WeChat、DiDi、Alipay、CG unlock 的更细 SFX 触发点。
4. 增加玩家可调音量 UI：Master / BGM / SFX / Type。
5. 做一次完整试玩，记录哪些音效过密、过响、过吵。
