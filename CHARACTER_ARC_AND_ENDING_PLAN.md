# 角色线与结局判定升级方案

## 1. 文档目的

这份文档用于指导角色事件池和结局判定升级，并记录当前已经落地的第一、第二、第三版角色线。

目标：

- 让主要角色不只是一次性加数值的 NPC
- 让 Hub 中的五条路线自然承载角色关系成长
- 让结局开始读取 `relationships`、`route_*`、`decision_e3_*` 与关键 flags
- 让玩家能主动和角色建立关系，而不是只通过系统转述或 WeChat 数值认识角色
- 保持当前引擎结构，不引入复杂新系统

---

## 2. 角色线原则

- 角色不是恋爱路线，关系核心是留学生活中的支持、摩擦、镜像和机会。
- 每个角色至少承担一个路线功能。
- 高阶角色事件通过 `relationships.{character}.friendship` 解锁。
- 感情线可以存在，但不作为默认推进口径。
- 角色互动优先写成直接对话和共同经历；系统总结只能用于过场、压缩时间或收尾。
- 玩家必须能通过 Hub 或 SimPad 主动找角色，而不是被动等待剧情把角色推到面前。

---

## 3. 主要角色职责

| 角色 | 路线 | 功能 |
|---|---|---|
| Professor Lin | Academic | 学术方法、研究伦理、推荐与学术结局 |
| Dr. Mei | Academic / Career | 理论与现实连接、研究视野、项目机会 |
| Sophie | International | 国际学生镜像、互助网络、情绪支持 |
| Xiao Chen | City | 上海机会、小项目、城市节奏 |
| Neighbor Li | Local | 宿舍与本地日常、生活规则、校园归属 |
| Manager Zhang | Career | 职业规范、合法实习、跨文化职场 |
| Uncle Wang | Local / City | 街区关系、本地生活温度、非校园视角 |

---

## 4. 阶段结构

每条角色线先做四段：

1. **Contact**：认识或常规互动，低门槛。
2. **Trust**：需要 friendship 约 15-20，出现更具体的问题或邀请。
3. **Tension**：Week 21-27 左右出现误会、价值拉扯或现实边界。
4. **Commitment**：需要 friendship 约 30-35，角色帮助玩家明确路线方向。

第一版不需要做专属结局 CG 或长篇分支，只需要：

- 高阶事件给强 flags
- 结局条件读取这些 flags / relationships
- 文案让关系显得有阶段变化

---

## 4.1 角色互动升级规格

当前需要补强的问题：

- 角色出现次数不少，但很多互动像事件转述，不像玩家真的和对方聊天。
- WeChat 能展示关系状态，但不能替代面对面互动。
- 玩家缺少“我现在想找这个人聊聊 / 一起做点事”的主动权。

新增设计目标：

- 每个主要角色至少拥有 3 类互动入口：面对面聊天、共同活动、角色请求。
- 每条角色线至少有 4 场可感知的直接对话，对应 Contact、Trust、Tension、Commitment。
- 每个角色至少有 1 个玩家主动邀约事件，例如 coffee、office hour、late-night study、street food、career chat。
- 每个角色至少有 1 个由角色主动发来的请求或邀请，让对方像有自己的生活。
- 关系提升不只显示 `friendship +X`，还要回收成新称呼、新语气、后续帮忙或结局尾声。

建议交互形态：

| 形态 | 入口 | 作用 |
|---|---|---|
| Talk | Hub / SimPad Contacts | 轻量多轮对话，补角色性格和近况 |
| Invite | Hub 周行动 | 花时间 / 精力换一次共同经历 |
| Request | 角色主动触发 | 角色有自己的困难、边界和期待 |
| Check-in | WeChat | 低成本维持关系，但不能替代关键场景 |
| Conflict Follow-up | Story / Hub | 对上一次摩擦做修复、逃避或重新定义 |

写作规则：

- 同一场角色事件至少 60% 文案应是直接台词或动作，不要主要靠旁白总结。
- 每场关键互动至少给玩家 2 个态度选择：坦诚 / 回避、请教 / 逞强、陪伴 / 保持边界、冒险 / 稳妥。
- 角色不能只服务玩家目标；他们也要有自己的压力、误解、日程、家庭、职业或学业难题。
- 中国角色不能只负责解释中国，国际学生角色不能只负责吐槽中国。
- 可重复 Talk 事件可以轻，但 Trust、Tension、Commitment 必须是一次性强记忆点。

每个主要角色的互动补强方向：

| 角色 | 需要增加的互动感 |
|---|---|
| Professor Lin | office hour 多轮反馈、学术挫败后的面对面谈话、推荐信前的价值判断 |
| Dr. Mei | 项目讨论、研究伦理争论、让玩家参与一次真实小任务 |
| Sophie | 宿舍 / common room 夜聊、互相帮忙处理 homesick、可选亲密但不默认恋爱 |
| Xiao Chen | 城市项目共创、失败复盘、上海机会与速度感的价值冲突 |
| Neighbor Li | 宿舍走廊、食堂、快递 / 门禁等日常互助，突出本地生活边界 |
| Manager Zhang | mock interview、合法实习流程、职场礼仪和机会边界 |
| Uncle Wang | 夜宵摊常客感、街区故事、语言笨拙但被接住的温度 |

---

## 5. 已落地的角色 flags

Academic:

- `lin_academic_method`
- `lin_feedback_repaired`
- `lin_feedback_avoided`
- `lin_recommendation_ready`
- `dr_mei_research_question`
- `dr_mei_project_trust`
- `dr_mei_ethics_reframed`
- `dr_mei_efficiency_choice`
- `dr_mei_project_commitment`

International:

- `sophie_support_circle`
- `sophie_guide_published`
- `sophie_bridge_plan`
- `sophie_safe_bubble_choice`
- `sophie_orientation_committee`

Local:

- `neighbor_li_local_trust`
- `neighbor_li_boundary_repaired`
- `neighbor_li_boundary_avoided`
- `neighbor_li_festival_invite`
- `uncle_wang_neighborhood_story`
- `uncle_wang_honest_answer`
- `uncle_wang_polite_answer`
- `uncle_wang_regular`

Career:

- `manager_zhang_career_trust`
- `legal_internship_ready`
- `manager_zhang_boundaries_accepted`
- `career_shortcut_temptation`
- `manager_zhang_referral_ready`

City:

- `xiao_chen_project_trust`
- `xiao_chen_city_prototype`
- `xiao_chen_responsible_pace`
- `city_speed_over_care`
- `xiao_chen_demo_day`

---

## 6. 结局判定升级方向

结局不再只看单一 stat threshold。

建议优先级：

1. 风险结局：`unapproved_work_risk` + official support low
2. Academic Probation：academics low + professor support low
3. Scholar：academics high + Professor Lin trust
4. Researcher：route_academic + Dr. Mei / Professor Lin high trust
5. Shanghai Builder：route_city + Xiao Chen trust + digital high
6. Career Bridge：route_career + Manager Zhang trust + legal workflow
7. Student Voice：route_intl + Sophie trust + intl guanxi
8. Local Regular：route_local + Neighbor Li / local guanxi + Chinese/culture
9. Language Breakthrough：Chinese high
10. Quiet Return：fallback, ordinary but complete

当前 Bad Ending 口径：

- 保留 `Out of Money`
- 保留 `Visa Line You Crossed`
- 新增 `Academic Probation`
- 不做 `Paperwork Spiral`
- `Burned Out` 不再是硬结局，改为 `forced_recovery_week`

---

## 7. 后续迭代

已完成第二版：

- `engine/EventSystem.js` 支持 `condition.turn.min/max`
- Hub 中加入 Week 25/29 后期角色事件
- `ending_evaluation` 读取更强的角色 commitment flags
- 保留 broad path fallback，避免玩家因错过单一角色事件而无法进入路线结局

已完成第三版：

- Hub 中加入 Week 21-27 中期关系摩擦事件
- 每个摩擦事件至少提供两种处理方式：修复/直面，或回避/效率/冒险
- SimPad Story 页新增 `Relationship Tension`，用于显示玩家处理过的中期关系拉扯
- WeChat 页新增角色阶段展示：`Contact`、`Trust`、`Tension Resolved`、`Commitment`
- WeChat 页新增最近关键互动文案，让角色线不只表现为 friendship 数值
- 新增 tension resolved flags，避免同一摩擦事件重复出现

已完成第四版：

- `StoryPanel` 结局节点会追加 `PERSONAL AFTERWORD`
- 后日谈优先读取最高关系角色，而不是遍历所有角色堆叠文本
- 后日谈读取角色关键 flags，例如推荐、项目承诺、orientation committee、festival、referral、demo day
- 后日谈会根据来华动机追加个人反思
- 结局与后日谈允许更游戏化的高光，但高光必须来自留学体验本身，例如研究名单、天使轮投资、orientation 被采用、full-time return offer、街区节日、语言舞台

已完成第五版：

- Hub 新增 `Character Contacts` 入口，让玩家主动选择本周去找谁
- 七个主要角色均新增第一批面对面直接互动：Professor Lin、Dr. Mei、Sophie、Xiao Chen、Neighbor Li、Manager Zhang、Uncle Wang
- 七个主要角色均新增第一批角色主动请求，让关系从单向邀约变成双向互动
- WeChat 联系人卡片会根据关系状态显示 Talk / Invite / Request / 后期路线按钮
- WeChat 最近互动文案会读取新 contact/request flags，避免角色关系只显示为 friendship 数值
- Story 时间线会显示新增的角色互动记忆点

后续可以继续做：

- 根据具体 ending 类型进一步微调后日谈语气
- romance 仅作为 Sophie 或其他角色的可选支线，不影响主轴判断
- 继续把当前偏系统转述的角色事件逐步改成直接台词、共同活动和玩家可选择的态度回应
- 增加每个角色的第二批 Trust / Tension follow-up，形成更完整的 Contact → Request → Tension → Commitment 链条
