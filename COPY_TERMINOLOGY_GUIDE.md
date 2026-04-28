# Copy & Terminology Guide

本文件用于统一游戏英文文本和 UI 的口径。策划文档可以继续中文，但游戏内文本应遵守这里的英文表达。

## Core Positioning

- 一句话定位：`So this is what studying in China is really like.`
- 游戏类型口径：`study-abroad life sim`、`visual-novel-style simulator`、`application and campus-life simulator`
- 不使用：`survival game`、`galgame`、`dating sim`
- 可以说借鉴视觉小说节奏，但不要把项目命名或玩家口径写成 galgame。

## Player-Facing Terms

| Concept | Use In UI / Copy | Avoid In UI / Copy | Notes |
| --- | --- | --- | --- |
| 体力/精神负担 | `Energy` | `Sanity`, `Survival` | 底层旧存档迁移可以保留 `sanity` 兼容代码。 |
| 群体关系 | `Relationship Network` | standalone `Guanxi` | 第一次解释时可以写 `called guanxi in China`。 |
| 具体角色关系 | `Bond` | `Friendship` as UI shorthand | 代码字段仍可叫 `friendship`。 |
| 感情亲近 | `Closeness` | `Romance` as main UI label | 可以有感情线，但不是主轴。 |
| 钱 | `RMB`, `Wealth`, `Balance` | abstract money score | 钱是经济系统，不是 0-100 能力值。 |
| 手机系统 | `SimPad` | decorative tablet only | SimPad 应是玩家主动管理生活的工具。 |
| 失败 | `Out of Money`, `Visa-Risk Path`, `Academic Probation` | generic death/fail wording | Energy 归零是恢复周，不是 Bad Ending。 |

## Tone Rules

- 英文文本要青年感、具体、有生活细节。
- 角色对话应像对玩家说话，不像旁白替角色总结。
- 选择反馈要清楚但不要像开发者调试信息。
- 中国语境词可以保留，但需要上下文解释，例如 `WeChat`, `Alipay`, `DiDi`, `HSK`, `guanxi`。
- 不要把中国写成旅游明信片，也不要写成苦难生存挑战。

## Current UI Alignment

- Dashboard: `Relationship Network`, `Character Bonds`, `Bond`, `Closeness`
- WeChat: `Bond`, `Closeness`
- Choice preview: `Network(...)`, `Bond`, `Closeness`, `Story Updated`
- Banquet minigame: `Table Trust`
- StoryPanel character tag: `Speaking To You`

## Future Copy Pass Checklist

- Search for `survive`, `survival`, `sanity`, `Romance`, `Guanxi`.
- If a term is player-facing, rewrite to the approved wording above.
- If a term is internal compatibility or code field, leave it unless there is a safe migration plan.
- Keep `guanxi` in code until a deliberate refactor is scheduled.
