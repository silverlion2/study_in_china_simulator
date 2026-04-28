# 项目进度交接摘要

更新时间：2026-04-27

本文件用途：给后续对话压缩、恢复上下文或新一轮开发接手时快速读取。若只允许读一份文档，优先读本文件。

当前最新状态一句话：核心剧情、路线、结局、UI、视觉资产压缩与背景/CG 接入已完成并可构建；SimPad 第二阶段已新增 Calendar、Gallery / Memory Archive、DiDi City Shortcuts、Taobao Service Orders、WeChat meetup 入口；Week Summary / Start Week overlay 已实装；ending/gallery 解锁 flags 已补；已完成一轮英文口径修正、叙事游戏参考研究和 Electron smoke QA。下一步应做完整通关 QA、In-China 阶段 UI 层触发测试和发布收口。

## 0. 2026-04-27 最新推进：1-5 已启动落地

用户确认继续推进的 1-5：

- 实际 play QA
- English full copy pass
- Gallery / Memory Archive
- SimPad second-stage gameplay
- 类似剧情游戏参考研究

本轮已完成：

- `components/TabletInterface.jsx`
  - 新增 `Calendar` tab，显示申请/出发/在华阶段 deadline。
  - 新增 `Gallery` tab，`Memory Archive` 当前覆盖 18 个 CG 记忆位。
  - WeChat 联系人支持在满足关系/flag 条件后直接触发 meetup 支线。
  - DiDi 新增 `City Shortcuts`，可从 app 直接启动上海 city scenes。
  - Taobao 新增 `Service Orders`，让订单成为每周生活工具而不是纯商店。
  - SimPad tab 改为两行显示，修复横向滚动导致 Story/Calendar 不易发现的问题。
- `page.js`
  - `advance_turn` 现在会弹出 `Week Summary` overlay，而不是直接跳到下一周剧情。
  - overlay 显示 Week、phase、Energy / RMB / Academics / Chinese / Digital / Culture 的结算后数值和变化。
  - 玩家点击 `Start Week X` 后才进入下一周节点。
- `engine/GameState.js`
  - 新增 `useTaobaoServiceOrder(orderId)`，支持 dorm fix、wrong-address recovery、meal prep。
  - `advanceTurn()` 现在每周重置 `used_taobao_service_this_week`。
  - `setCurrentNode()` 进入 ending / money crisis 节点时会自动写入对应 Gallery unlock flags。
- `components/MiniGames.jsx`
  - 红包按钮从中文 `開` 改为英文 `OPEN`。
- `data/hubData.js`
  - 移除玩家可见英文中的 `百团大战` 中文括注，改成英文 club fair 描述。
- `build.js`
  - 补充 `.no-scrollbar` CSS 兜底。
- 新增 `NARRATIVE_GAME_REFERENCE_RESEARCH.md`
  - 参考 `80 Days`、`Citizen Sleeper`、`Coffee Talk`、`VA-11 HALL-A`、`Overboard!`，提炼本项目可用的日程、工具、角色记忆、轻操作和 gallery 奖励机制。
- 新增 `QA_PLAYTEST_NOTES.md`
  - 记录本轮 Electron smoke QA、通过项、发现并修复的问题、后续完整 QA 清单。

本轮已验证：

- `node validate_story.mjs` 通过。
- `node build.js` 通过。
- `npm start` 可启动 Electron。
- 实机 smoke QA 已检查主界面、View Scene、SimPad Story、Calendar、Gallery、DiDi、Taobao。
- Electron 实机已确认 Week 1 -> Week 2 时显示 Week Summary，并且点击 `Start Week 2` 后正常进入 Week 2。
- Node 层已模拟 In-China phase，确认 DiDi、Taobao Service Orders、WeChat check-in 的扣钱/加数值/weekly lock/reset 正常。
- Node 层已确认 `ending_diplomat`、`game_over_wealth` 会写入对应 Gallery flags。

仍需注意：

- `MODULE_TYPELESS_PACKAGE_JSON` 警告仍存在，暂不建议直接改 `package.json`，因为当前 `build.js` 是 CommonJS。
- 本轮 QA 还不是完整通关测试；后续仍需从 Week 1 跑到至少一个 ending，确认 Gallery unlock flags 和 ending flags 在 UI 层一致。

## 1. 当前游戏定位

项目是英文游戏、中文策划文档的“在华留学申请与体验模拟器”。

一句话体验目标：

> 原来中国读书是这样子的。

核心方向：

- 不是恋爱游戏，但可借鉴 visual novel / Galgame 式推进方式
- 不是生存游戏，而是留学申请、出发准备、在华校园生活与人生选择模拟
- 主角为完全玩家投射型
- 第一版主舞台聚焦上海
- 学校使用虚构高校：`Minghai University` / 明海大学
- 主角申请阶段为本科
- 专业方向为 `Business and Management`、`Engineering and Computing`、`Humanities and China Studies`
- 游戏内所有玩家可见文案使用英文
- 设计文档、剧情大纲、经济表、数值表可以用中文

## 1.1 当前关键口径

- 玩法气质：可借鉴 visual novel / Galgame 的阅读、选择、分支、角色关系推进，但项目不是恋爱游戏。
- 叙事主轴：留学申请、出发准备、抵达上海、校园适应、城市探索、学业与职业选择。
- 开场结构：先从 `Departure Eve` 进入，再回忆申请中国与出发准备，最后回到出发前夜并进入正式赴华。
- 关系系统：`relationships` 表示具体人物好感/信任；`guanxi` 表示玩家在校园、同学、老师、城市网络中的整体关系资本。
- 底层状态：体力/精神负担统一叫 `energy`，不要再把游戏描述成“生存”或 `sanity` 系统。
- 玩家视角：主角是完全投射型，尽量少给固定姓名、国籍和过强人设，用选择和 flags 塑造背景。
- 经济压力：中等，玩家应感到预算、奖学金、兼职、社交消费、城市机会之间的取舍，但不应变成纯惩罚游戏。
- 感情线：可以存在，但不是主轴；更重要的是留学关系网、跨文化友谊、师生/同学/本地人的连接。

## 1.2 术语提示

- `JW202`：剧情中可作为“学校录取后寄来的来华学习签证申请相关表格/材料”使用，服务于 X1 学生签证办理桥段。若写成正式材料说明，建议用更稳妥的英文表达：`Visa Application for Study in China form included in the admission package`。
- `Minghai University`：虚构上海高校，避免直接绑定现实学校政策。
- `Departure Eve`：当前序章起点，不是玩家已经在中国，而是出发前夜回望申请过程。
- `Pre-Departure`：申请成功后的准备期，包括签证、机票、住宿、手机支付、行李、告别和登机。

## 2. 已完成的设计文档

已新增/更新的核心文档：

- `COMPLETE_GAME_REPORT.md`
- `DESIGN_STORY_ECONOMY.md`
- `GAME_DESIGN_BIBLE.md`
- `PRE_PRODUCTION_REQUIREMENTS.md`
- `PRE_PRODUCTION_NEXT_NEEDS.md`
- `PRE_PRODUCTION_SPEC_PACK.md`
- `ROUTE_AND_STATS_PLAN.md`
- `WEEK_1_8_BEAT_SHEET.md`
- `WEEK_9_16_BEAT_SHEET.md`
- `WEEK_17_32_BEAT_SHEET.md`
- `HUB_ROUTE_REWORK_PLAN.md`
- `CHARACTER_ARC_AND_ENDING_PLAN.md`

最重要的两份落地文档：

- `PRE_PRODUCTION_SPEC_PACK.md`：开发前规格补充包，覆盖输入数值、英文文案风格、明海大学、专业线、角色、经济和结局规格。
- `WEEK_1_8_BEAT_SHEET.md`：序章与 Week 1-8 申请期详细 beat sheet，包含中文设计目标、英文游戏正文、选项、effects、flags 和下一节点。
- `WEEK_9_16_BEAT_SHEET.md`：Week 9-16 出发准备期详细 beat sheet，包含 admission package、X1 visa、digital access、housing、flight、arrival plan、packing、farewell、经济成本和后续 flags。
- `WEEK_17_32_BEAT_SHEET.md`：Week 17-32 在华阶段详细 beat sheet，包含上海落地、注册、第一课、社交圈、生活节奏、期中、未来方向、年末评估和结局口径。
- `HUB_ROUTE_REWORK_PLAN.md`：Hub 路线化重构方案，包含五条路线入口、事件职责、Life Admin 安全阀和旧内容迁移策略。
- `CHARACTER_ARC_AND_ENDING_PLAN.md`：角色线与结局判定升级方案，包含主要角色职责、阶段结构、关系 flags 和结局优先级。

## 3. 已完成的代码/数据优化

### 3.1 Epoch 1 已重构

`data/epoch1.js` 已从旧的“教程 + 角色创建 + CSC checklist”改成：

`Departure Eve -> 回忆为什么申请中国 -> 背景/身份/汉语基础/应对方式 -> 选择 Minghai University 与专业 -> 文书 -> 推荐信 -> 家庭压力 -> 资金方案 -> 体检与材料 -> 面试与提交 -> Minghai 录取 -> 回到出发前夜 -> pre_departure_start`

保留并兼容旧 UI 需要的关键 flags：

- `decision_e1_start`
- `decision_e1_plan`
- `decision_e1_hsk`
- `decision_e1_med`
- `decision_e1_submit`
- `completed_application`

新增关键 flags：

- `motive_degree`
- `motive_curiosity`
- `motive_scholarship`
- `motive_restart`
- `origin_asian`
- `origin_western`
- `origin_developing`
- `chinese_beginner`
- `chinese_classroom`
- `chinese_strong`
- `major_business`
- `major_stem`
- `major_humanities`
- `finance_scholarship`
- `finance_rich`
- `finance_working`
- `admitted_minghai`
- `accepted_offer`

### 3.2 UI 已同步新版申请期

已更新：

- `page.js`
- `components/TabletInterface.jsx`
- `components/Dashboard.jsx`
- `components/StoryPanel.jsx`
- `components/MiniGames.jsx`
- `index.html`

UI 变化：

- 左上角 `Current Objective` 会根据新版申请流程变化：
  - `Departure Eve`
  - `Choose Your China Plan`
  - `Write the Application`
  - `Plan the Budget`
  - `Submit to Minghai`
  - `Open the Result`
  - `Prepare for Departure`
- SimPad Story 时间线第一阶段改为 `Epoch 1: Departure Eve & Application`
- Story 时间线显示新版字段：
  - Status
  - Motivation
  - Background
  - Identity
  - Chinese Foundation
  - Major Track
  - Statement
  - Funding Plan
  - Medical Form
  - Submission
- `Minghai University Offer Accepted` 会在录取后显示

### 3.3 底层数值已从 sanity 迁移到 energy

当前底层主状态已经改为：

- `stats.energy`
- `jobs.energyCost`
- `forced_recovery_week`

说明：

- Energy 归零现在不再是硬 Bad Ending。
- 主流程会进入 `forced_recovery_week`，恢复 energy，但损失 academics、wealth 与 guanxi。
- `game_over_energy` 仅作为旧存档/旧节点兼容入口，文本会引导进入 recovery week。

已迁移文件：

- `engine/GameState.js`
- `page.js`
- `components/Dashboard.jsx`
- `components/StoryPanel.jsx`
- `components/TabletInterface.jsx`
- `components/MiniGames.jsx`
- `data/epoch1.js`
- `data/epoch2.js`
- `data/epoch3.js`
- `data/hubData.js`
- 所有中文设计文档

旧存档兼容：

- `engine/GameState.js` 中保留迁移逻辑
- 老存档里的 `stats.sanity` 会读入为 `stats.energy`
- 老存档里的 `jobs.sanityCost` 会读入为 `jobs.energyCost`
- `updateStats` 临时兼容旧调用：如果传入 `sanity`，会映射到 `energy`

注意：

- 代码中仅在旧存档迁移逻辑里还会出现 `sanity` 字样，这是刻意保留的兼容层。

### 3.4 生存游戏口径已移除

已把主要玩家可见文本中的 `survive` / `Survivor` / `Sanity` 口径改成：

- `Energy`
- `adjustment`
- `handle`
- `adapt`
- `Quiet Return`

后续若继续改 `epoch2/epoch3/hubData`，仍需留意旧文本中是否有残余“生存游戏”语气。

### 3.5 Epoch 2 已重构

`data/epoch2.js` 已从旧的“签证 -> VPN -> 住宿 -> 机票 -> 微信 -> farewell -> packing -> 北京登机”改成完整 Week 9-16 出发准备线：

`Admission package -> JW202/visa form explanation -> X1 visa appointment -> digital access -> WeChat/Alipay/DiDi -> housing -> Minghai group/Sophie hook -> flight to Shanghai Pudong -> arrival plan -> first-semester setup -> packing -> farewell -> return to Departure Eve -> board for Shanghai`

新增/保留关键 flags：

- `decision_e2_package`
- `jw202_understood`
- `admission_package_ready`
- `got_visa`
- `visa_ready`
- `decision_e2_visa`
- `decision_e2_vpn`
- `has_vpn`
- `decision_e2_wechat`
- `has_wechat`
- `has_alipay`
- `has_didi`
- `decision_e2_housing`
- `housing_sorted`
- `decision_e2_flight`
- `airport_transfer_plan`
- `semester_plan`
- `decision_e2_pack`
- `decision_e2_farewell`
- `departed_for_shanghai`

经济调校：

- 第一条默认路线现在可以从申请期走到上海 hub，不会因为住宿+机票+第一周生活费过早破产。
- 最便宜航线暂定 `wealth -1200`，单人宿舍暂定 `wealth -1000`，用于适配当前初始资金和每周生活费。

### 3.6 Epoch 3 已重构

`data/epoch3.js` 已从旧的“北京落地 + KTV 期中 + 非法兼职二选一 + 数值模板结局”改成上海明海大学 Week 17-32 主线。

当前主线包含：

- official taxi queue
- DiDi from Pudong
- Metro Line 2 with luggage
- Minghai University gate
- Minghai canteen
- dorm/Taobao setup
- Week 17 registration and residence-permit reminder
- Week 18 first class and major lens
- Week 19 first social circle
- Week 20 first life rhythm
- Week 24 midterm pressure
- Week 28 future direction
- Week 32 year-end review

新增关键 flags：

- `decision_e3_transport`
- `decision_e3_food`
- `decision_e3_taobao`
- `arrived_in_china`
- `decision_e3_registration`
- `student_card_ready`
- `campus_system_ready`
- `arrival_living_funds_unlocked`
- `decision_e3_first_class`
- `major_identity_confirmed`
- `decision_e3_social_circle`
- `decision_e3_rhythm`
- `decision_e3_midterm`
- `decision_e3_internship`
- `decision_e3_final`
- `route_academic`
- `route_local`
- `route_intl`
- `route_career`
- `route_city`

经济调校：

- `e3_w17_done` 会解锁 `arrival living funds`，当前为 `wealth +3000`，用于承接现有每周生活费系统。
- `data/hubData.js` 中 `Intensive Study in Shanghai` 的 energy 消耗从 `-15` 调整为 `-8`，因为每周本身已有基础 energy drain。

### 3.7 Hub 已完成五路线入口初版

`data/hubData.js` 的 Hub 主菜单已从旧活动散菜单改成：

- Academic Track
- Local Integration
- International Student Circle
- Career Bridge
- Shanghai Opportunity
- Life Admin & Recovery
- City, Travel & Arcade Extras

新增路线事件池：

- Academic：library study block、Professor Lin office hours、Dr. Mei talk、research reading group
- Local：local study group、Neighbor Li dorm routine、canteen Chinese、neighborhood errand
- International：Sophie check-in dinner、new student help、homesick night、incoming-student guide
- Career：career office、localized resume、Manager Zhang panel、legal internship package
- Shanghai Opportunity：Xiao Chen campus needs survey、micro-store test、Lujiazui observation、student-service prototype
- Life Admin：rest、budget review、Chinese self-study、campus office tasks

旧菜单暂未删除，已收进 `City, Travel & Arcade Extras`，包括 entertainment、travel、hustle、districts、minigames。旧 `submenu_social` 已改成路线导流器，不再直接暴露旧版高收益/旧口径角色事件。

旧 extras 第一轮口吻清理已完成：

- `submenu_entertainment`：从“夜生活刷奖励/恋爱软件”改成 KTV、剧本杀、语言交换、低压咖啡见面等可选校园外活动
- `submenu_travel`：旅行现在明确消耗 money + energy，不再是免费大回血
- `submenu_hustle`：强调合法与合规，未批准家教仍保留为高风险选择，并降低收益
- `submenu_districts`：上海、北京、广州、成都、西安、杭州、三亚的区块事件从“刷钱/豪华娱乐”改成城市观察、文化见闻、职业/产业理解
- 旧 legacy 角色节点也降噪，例如 Xiao Chen 不再是 Series A / foreign co-founder 爽文，Sophie 不再是默认恋爱线，Manager Zhang 不再是酒桌捷径
- 已清理源码中的旧口径关键词：`Tantan`、`Chinese Tinder`、`Luxury Yacht`、`Series A`、`foreign co-founder`、`Pocket the cash`、`Hustle:` 等

同步调整：

- `components/TabletInterface.jsx` 显示 `Route Bias` 与 `Weekly Focus`
- `HUB_ROUTE_REWORK_PLAN.md` 已新增
- `random_subway`、`random_exam`、`random_sick`、`random_vpn_down` 已改成更温和的上海/明海语境
- unapproved off-campus tutoring 会设置 `unapproved_work_risk`

### 3.8 角色线与结局判定已升级第三版

`data/hubData.js` 已在五条路线中加入阶段性角色事件：

- Professor Lin：`event_academic_lin_method`，生成 `lin_academic_method`
- Dr. Mei：`event_academic_dr_mei_project`，生成 `dr_mei_research_question`、`dr_mei_project_trust`
- Sophie：`event_intl_sophie_support_circle`，生成 `sophie_support_circle`、`sophie_guide_published`
- Neighbor Li：`event_local_neighbor_li_trust`，生成 `neighbor_li_local_trust`
- Uncle Wang：`event_local_uncle_wang_story`，生成 `uncle_wang_neighborhood_story`
- Manager Zhang：`event_career_manager_zhang_trust`，生成 `manager_zhang_career_trust`、`legal_internship_ready`
- Xiao Chen：`event_city_xiao_chen_prototype`，生成 `xiao_chen_project_trust`、`xiao_chen_city_prototype`

`engine/EventSystem.js` 已新增 `condition.turn` 判定，支持：

- `turn.min`
- `turn.max`

因此 Hub 事件现在可以按周数解锁，不再只能靠数值或关系门槛控制节奏。

已新增 Week 25/29 级别的后期角色事件：

- Professor Lin：`event_academic_lin_recommendation`，生成 `lin_recommendation_ready`
- Dr. Mei：`event_academic_dr_mei_project_commitment`，生成 `dr_mei_project_commitment`
- Sophie：`event_intl_sophie_orientation_committee`，生成 `sophie_orientation_committee`
- Neighbor Li：`event_local_neighbor_li_festival`，生成 `neighbor_li_festival_invite`
- Uncle Wang：`event_local_uncle_wang_regular`，生成 `uncle_wang_regular`
- Manager Zhang：`event_career_manager_zhang_referral`，生成 `manager_zhang_referral_ready`
- Xiao Chen：`event_city_xiao_chen_demo_day`，生成 `xiao_chen_demo_day`

已新增 Week 21-27 级别的中期关系摩擦事件：

- Professor Lin：`event_academic_lin_feedback_tension`，生成 `lin_feedback_repaired` 或 `lin_feedback_avoided`
- Dr. Mei：`event_academic_dr_mei_ethics_tension`，生成 `dr_mei_ethics_reframed` 或 `dr_mei_efficiency_choice`
- Sophie：`event_intl_sophie_bubble_tension`，生成 `sophie_bridge_plan` 或 `sophie_safe_bubble_choice`
- Neighbor Li：`event_local_neighbor_li_boundary`，生成 `neighbor_li_boundary_repaired` 或 `neighbor_li_boundary_avoided`
- Uncle Wang：`event_local_uncle_wang_question`，生成 `uncle_wang_honest_answer` 或 `uncle_wang_polite_answer`
- Manager Zhang：`event_career_manager_zhang_boundaries`，生成 `manager_zhang_boundaries_accepted` 或 `career_shortcut_temptation`
- Xiao Chen：`event_city_xiao_chen_speed_tension`，生成 `xiao_chen_responsible_pace` 或 `city_speed_over_care`

旧 `submenu_social` 中适合保留的角色内容已迁移到五条路线中，且改为路线语境与一次性门控：

- Dr. Mei：`event_academic_dr_mei_conference_abstract`，生成 `dr_mei_conference_abstract`
- Sophie：`event_intl_sophie_language_exchange`，生成 `sophie_language_exchange`，可选生成 `sophie_soft_romance_hint`
- Neighbor Li / local classmates：`event_local_ktv_night`，生成 `local_ktv_night`
- Manager Zhang：`event_career_manager_zhang_alumni_dinner`，生成 `manager_zhang_alumni_dinner`
- Xiao Chen：`event_city_xiao_chen_global_angle`，生成 `xiao_chen_global_angle`

这些迁移后的高阶段事件都使用 `flag: false` 条件防止重复刷奖励。

已新增五条路线的低收益、高记忆点事件，避免 Hub 后半段只剩刷数值：

- Academic：`event_academic_empty_lecture`，生成 `academic_empty_lecture`
- Local：`event_local_rain_gate`，生成 `local_rain_gate`
- International：`event_intl_common_room_meal`，生成 `intl_common_room_meal`
- Career：`event_career_mock_interview`，生成 `career_mock_interview`
- Shanghai Opportunity：`event_city_qr_complaint_night`，生成 `city_qr_complaint_night`

已新增风险 flags 的补救事件：

- `event_admin_compliance_cleanup`：可清理 `unapproved_work_risk` / `illegal_job`，生成 `compliance_cleanup_done`
- `event_career_shortcut_repair`：可清理 `career_shortcut_temptation`，生成 `career_shortcut_repaired`
- `event_city_reliability_repair`：可清理 `city_reliability_debt`，生成 `city_reliability_repaired`

`components/TabletInterface.jsx` 已新增 `Relationship Tension`、`Route Memory` 与 `Risk Status` 显示，玩家在 SimPad 的 Story 页可以看到中期关系拉扯、路线记忆点和风险修复状态。

`components/TabletInterface.jsx` 的 WeChat 页也已升级：

- 每个联系人显示所属路线，例如 Academic、International、Local、Career、Shanghai
- 每个联系人显示关系阶段：`Contact`、`Trust`、`Tension Resolved`、`Commitment`
- 每个联系人显示最近关键互动文案
- 每个联系人显示四段式阶段进度条
- 已补充 Professor Lin、Neighbor Li、Family 等联系人元信息

### 3.9 结局后日谈已升级

`components/StoryPanel.jsx` 已替换旧版角色后日谈逻辑。

旧版问题：

- 会遍历所有关系，结尾可能堆太多角色文本
- 部分文本偏旧设定和夸张爽文，例如创业公司 B 轮、高薪管培 offer
- 与当前“现实与理想混合”的留学模拟器口径不完全一致

新版逻辑：

- 结局节点会读取最高关系角色
- 根据角色、friendship/romance 与关键 flags 生成一段 `PERSONAL AFTERWORD`
- 追加一段基于来华动机的个人反思
- 文风允许更游戏化的高光，例如 honors shortlist、angel investment、orientation projector、full-time return offer、festival group chat、campus QR code
- 夸张方向应围绕“留学一年带来的高光结果”，不要脱离题材变成纯爽文暴富或恋爱通关

当前覆盖角色：

- Professor Lin
- Dr. Mei
- Sophie
- Neighbor Li
- Uncle Wang
- Manager Zhang
- Xiao Chen
- Family

### 3.10 Bad Ending 与恢复机制口径

当前确认：

- 不做 `Paperwork Spiral`
- `Burned Out` 不再作为硬 Bad Ending
- `Energy <= 0` 会进入 `forced_recovery_week`
- `Out of Money` 保留为硬 Bad Ending，但第一次没钱会先进 `money_crisis`，允许一次 emergency funding
- `Visa Line You Crossed` 保留为硬 Bad Ending
- 新增 `Academic Probation`，用于低 academics 且教授支持低的学业失败线

当前硬 Bad Ending：

- `ending_deportee`
- `ending_academic_probation`
- `game_over_wealth`

当前混合/警示结局：

- `ending_compliance_scare`
- `ending_career_shortcut`
- `ending_unreliable_builder`

`data/epoch3.js` 的 `ending_evaluation` 已开始读取：

- `relationships`
- `route_*`
- 角色 trust flags
- Week 25/29 后期角色 commitment flags
- `unapproved_work_risk`
- `career_shortcut_temptation`
- `city_reliability_debt`
- stats 与 guanxi

当前仍保留 broad path fallback，避免玩家没刷出某个角色高阶事件时无法进入路线结局。

### 3.11 核心能力数值封顶

`engine/GameState.js` 已统一封顶能力型 stats：

- `academics`
- `chinese`
- `energy`
- `digitalProficiency`
- `culture`

规则：

- 上述能力值限制在 `0-100`
- `wealth` 不封顶，继续作为 RMB 钱包处理
- 旧存档读取时也会自动校正超过 100 的能力值

### 3.12 Hub 经济第一轮调参

`data/hubData.js` 已做第一轮经济与 energy 平衡：

- International Student Circle 不再大量“免费回血 + 加 digital/guanxi/relationships”，支持类事件仍能缓冲压力，但需要付出时间/精力
- Shanghai Opportunity 的可重复赚钱事件下调，避免 `micro store` / `student service prototype` 变成稳定刷钱机器
- Xiao Chen 速度优先选项下调收益，并新增 `city_reliability_debt`，给后续风险回收留钩子
- Uncle Wang / local regular 这类情绪恢复事件仍保留恢复感，但降低过强 energy 奖励

当前经济目标仍是“中等压力”：玩家能通过规划撑住生活，但不能无脑刷某一路线消除预算问题。

### 3.13 英文全文 copy pass 第一轮

已完成一轮游戏内英文可见文案清理，重点是不改变机制，只统一语气、术语和反馈格式：

- 选项反馈统一从旧式 `++/--`、`Guanxi(...)`、内部 flag 展示，调整为更自然的 `+/-`、`Network(...)`、`Story Updated`
- `sanity` 相关玩家可见表述已保持为 `Energy`
- `survival guide/tips` 改为 `arrival guide/arrival notes`，避免把留学体验误导成“生存游戏”
- `Budget hustler` 改为 `Budget planner`
- `Gig Economy` / `Hustle & Side Gigs` 改为 `Student Work Board` / `Money & Compliance`
- 结局重开按钮统一为 `Start Over`
- Banquet 小游戏的玩家可见反馈从硬直译 `Guanxi Gained/Guanxi lost` 改为更自然的 `Table Trust` 和餐桌信任反馈
- 关系效果预览从底层 `friendship/romance` 改为玩家可读的 `Bond/Closeness`
- 已重新运行 `node build.js`，`index.html` 已同步 copy pass 后内容

### 3.14 视觉资产升级准备

用户试玩后反馈“玩到一小半觉得无聊”，判断主要原因之一是视觉节奏不足：大量主线节点复用默认 `hub_bg.png`，申请、签证、出发、抵达、注册、课堂、宿舍、食堂等关键阶段缺少专属画面。

已新增：

- `docs/imagegen/VISUAL_ASSET_PLAN.md`
- `docs/imagegen/scene_prompts.jsonl`
- 空目录：`images/simulator/backgrounds/`
- 空目录：`images/simulator/cg/`

第一批视觉资产清单共 20 张：

- 15 张背景：出发前夜、申请桌面、签证中心、出发行李、飞机、浦东机场、明海校门、宿舍、食堂、注册办公室、第一堂课、图书馆、上海地铁、职业办公室、孵化器 demo
- 5 张关键 CG：录取邮件、JW202/签证材料堆、office badge、天使投资 demo、return offer

已执行 dry-run 验证：

```bash
python3 /Users/mervyntsui/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch \
  --input docs/imagegen/scene_prompts.jsonl \
  --out-dir images/simulator/generated \
  --model gpt-image-2 \
  --size 1024x1024 \
  --quality high \
  --output-format png \
  --augment \
  --concurrency 3 \
  --dry-run
```

验证结果：

- `scene_prompts.jsonl` 共 20 行
- JSONL 解析通过
- CLI dry-run 可正确读取并映射输出路径
- 当前 shell 中 `OPENAI_API_KEY=missing`，因此尚未实际生成 GPT-image-2 图片

之后用户确认“先这样子做”，已使用内置 imagegen 生成并接入第一批正式 P0 资产。

已生成并保存到项目：

- `images/simulator/backgrounds/bg_departure_eve_room.png`
- `images/simulator/backgrounds/bg_application_laptop.png`
- `images/simulator/backgrounds/bg_visa_center.png`
- `images/simulator/backgrounds/bg_predeparture_suitcase.png`
- `images/simulator/backgrounds/bg_airplane_window.png`
- `images/simulator/backgrounds/bg_pudong_arrivals.png`
- `images/simulator/backgrounds/bg_minghai_gate.png`
- `images/simulator/backgrounds/bg_dorm_room.png`
- `images/simulator/backgrounds/bg_canteen_counter.png`
- `images/simulator/backgrounds/bg_registration_office.png`
- `images/simulator/backgrounds/bg_first_classroom.png`
- `images/simulator/cg/cg_admission_email.png`
- `images/simulator/cg/cg_document_stack_jw202.png`

已统一 resize 为 `1024x1024`，与现有游戏资产尺寸一致。

已新增预览：

- `docs/imagegen/previews/visual_style_contact_sheet.png`
- `docs/imagegen/previews/p0_asset_contact_sheet.png`

已接入：

- `data/epoch1.js`：出发前夜、录取邮件、申请桌面、明海校门、文件堆等关键节点补 `bgImage`
- `data/epoch2.js`：JW202 文件堆、签证中心、宿舍、航班、浦东机场、行李等关键节点补 `bgImage`
- `data/epoch3.js`：浦东机场、明海校门、食堂、宿舍、注册办公室、第一堂课等关键节点补 `bgImage`
- `page.js`：新增 `getFallbackBackground(state)`，没有 `bgImage` 的节点会按阶段兜底，不再全部掉回默认 Hub 背景

已验证：

- `node --check data/epoch1.js`
- `node --check data/epoch2.js`
- `node --check data/epoch3.js`
- `node --check page.js`
- `node validate_story.mjs`
- `node build.js`

仍待后续：

- 实机试玩确认各图是否有奇怪文字/构图问题
- 如果满意，再继续生成 P1：图书馆、上海地铁、职业办公室、孵化器、office badge、angel demo、return offer 等
- 若某张图出现 AI 文字伪影，需要重生成或替换

随后用户确认“全部都需要”，已继续生成并接入 P1 / 结局视觉包。

新增背景：

- `images/simulator/backgrounds/bg_library_night.png`
- `images/simulator/backgrounds/bg_shanghai_metro.png`
- `images/simulator/backgrounds/bg_career_office.png`
- `images/simulator/backgrounds/bg_international_common_room.png`
- `images/simulator/backgrounds/bg_uncle_wang_bbq.png`
- `images/simulator/backgrounds/bg_incubator_room.png`
- `images/simulator/backgrounds/bg_shanghai_office.png`

新增结局 / 路线 CG：

- `images/simulator/cg/cg_office_badge.png`
- `images/simulator/cg/cg_return_offer.png`
- `images/simulator/cg/cg_angel_demo.png`
- `images/simulator/cg/cg_research_poster.png`
- `images/simulator/cg/cg_orientation_guide.png`
- `images/simulator/cg/cg_local_regular.png`
- `images/simulator/cg/cg_language_breakthrough.png`
- `images/simulator/cg/cg_quiet_return.png`

当前项目内游戏视觉资产总数：

- `images/simulator/backgrounds/`：18 张
- `images/simulator/cg/`：10 张
- 合计：28 张，均为 `1024x1024` PNG

新增总预览：

- `docs/imagegen/previews/full_asset_contact_sheet.png`

接入更新：

- `page.js` 的 `getFallbackBackground(state, node)` 已升级为根据 speaker / location / text 判断支线路线背景：
  - Academic / Professor Lin / Dr. Mei / Midterm -> `bg_library_night.png`
  - Sophie / International / Common Room -> `bg_international_common_room.png`
  - Career / Manager Zhang / Internship -> `bg_career_office.png`
  - Xiao Chen / Prototype / Incubator / Opportunity -> `bg_incubator_room.png`
  - Uncle Wang / Neighborhood / BBQ -> `bg_uncle_wang_bbq.png`
  - Metro / Line 2 / subway -> `bg_shanghai_metro.png`
- `data/epoch3.js` 中期、future direction、结局节点已补关键 `bgImage`
- `ending_scholar` / `ending_researcher` -> research poster CG
- `ending_entrepreneur` -> angel demo CG
- `ending_diplomat` -> return offer CG
- `ending_influencer` -> orientation guide CG
- `ending_local_insider` -> local regular CG
- `ending_hsk_master` -> language breakthrough CG
- `ending_quiet_return` -> quiet return CG
- 风险 / bad endings 使用注册办公室、职业办公室、孵化器、地铁、图书馆等对应情绪背景

新增验证：

- `node --check data/epoch3.js`
- `node --check page.js`
- `node --check data/hubData.js`
- `node validate_story.mjs`
- `node build.js`

当前仍没有做角色表情差分。原因：现有角色图是单张 1024 方图，若不以原图做 reference/edit，直接生成 normal/happy/serious/worried 很容易脸漂。建议下一步专门做“角色立绘差分 pass”，先用现有角色图作为 reference，逐个生成 2-3 个最重要表情，并检查一致性后再改 `StoryPanel.jsx` 的 speaker image 选择逻辑。

## 4. 当前验证结果

已执行并通过：

- `node --check engine/EventSystem.js`
- `node --check engine/GameState.js`
- `node --check page.js`
- `node --check data/epoch1.js`
- `node --check data/epoch2.js`
- `node --check data/epoch3.js`
- `node --check data/hubData.js`
- `node validate_story.mjs`
- `node build.js`

自动走读结果：

- 从 `start` 出发，签证小游戏按成功处理，Hub 默认走 Academic Track 第一项，可走到 `ending_scholar`
- 最终状态：
  - `finalNode: ending_scholar`
  - `turn: 32`
  - `phase: In-China`
  - `location: Shanghai`
  - `stats.energy` 正常
  - `stats.wealth` 正常
  - `stats.digitalProficiency` 已封顶为 `100`
  - `stats.sanity` 不再存在
- 新版 `PERSONAL AFTERWORD` 可基于自动走读中的最高关系角色 Professor Lin 生成

角色事件周数门槛测试：

- Professor Lin 推荐线：第 28 周不可见，第 29 周可见
- Sophie orientation committee：第 24 周不可见，第 25 周可见
- Professor Lin tension：第 21 周符合条件时可见，设置 resolved flag 后隐藏
- Sophie bubble tension：第 21 周符合条件时可见，设置 resolved flag 后隐藏

一次性门控测试：

- 覆盖 12 个高阶段路线事件
- 完成前可见，设置对应完成 flag 后隐藏
- 覆盖 Academic、Local、International、Career、Shanghai Opportunity 五条路线

多结局矩阵测试：

- 覆盖 13 个结局/混合结局
- `ending_deportee`、`ending_compliance_scare`、`ending_academic_probation`
- `ending_career_shortcut`、`ending_unreliable_builder`
- `ending_scholar`、`ending_researcher`、`ending_entrepreneur`
- `ending_diplomat`、`ending_influencer`、`ending_local_insider`
- `ending_hsk_master`、`ending_quiet_return`

路线记忆点与风险修复门控测试：

- 覆盖 5 个路线记忆点事件
- 覆盖 3 个风险修复事件
- 完成/修复前可见，完成/修复后隐藏

旧存档迁移测试：

- `sanity: 77` 可迁移为 `energy: 77`
- `sanityCost: 6` 可迁移为 `energyCost: 6`

已知非阻断警告：

- `node validate_story.mjs` 会提示 package 未声明 ESM：
  - `MODULE_TYPELESS_PACKAGE_JSON`
- 暂未添加 `"type": "module"`，因为当前 `build.js` 使用 CommonJS，直接改 package 类型可能影响构建脚本。

## 5. 当前工作区状态提醒

当前有多处未提交改动和新增文档。

已知修改文件包括：

- `engine/GameState.js`
- `engine/EventSystem.js`
- `page.js`
- `components/Dashboard.jsx`
- `components/MiniGames.jsx`
- `components/StoryPanel.jsx`
- `components/TabletInterface.jsx`
- `data/epoch1.js`
- `data/epoch2.js`
- `data/epoch3.js`
- `data/hubData.js`
- `index.html`

新增文档包括：

- `COMPLETE_GAME_REPORT.md`
- `DESIGN_STORY_ECONOMY.md`
- `GAME_DESIGN_BIBLE.md`
- `PRE_PRODUCTION_NEXT_NEEDS.md`
- `PRE_PRODUCTION_REQUIREMENTS.md`
- `PRE_PRODUCTION_SPEC_PACK.md`
- `ROUTE_AND_STATS_PLAN.md`
- `WEEK_1_8_BEAT_SHEET.md`
- `WEEK_9_16_BEAT_SHEET.md`
- `WEEK_17_32_BEAT_SHEET.md`
- `HUB_ROUTE_REWORK_PLAN.md`
- `CHARACTER_ARC_AND_ENDING_PLAN.md`
- `HANDOFF_SUMMARY.md`

注意：

- `build.js` 和 `package.json` 在本轮工作前就已经是 modified 状态，未确认具体来源。
- `index.html` 是由 `node build.js` 生成的 standalone 文件，已同步当前源码。

## 6. 下一步建议

最高优先级：

1. 再做一轮路线结局差异 polish，让不同路线的最终文本和个人 afterword 更明显地区分
2. 做浏览器实际试玩 QA，确认 SimPad 的 `Route Memory` / `Risk Status` 显示、Hub 菜单滚动和结局展示体验正常
3. 检查存档迁移与旧存档进入新风险/记忆点系统时是否稳定
4. 下一批重点角色与系统：
   - Professor Lin
   - Dr. Mei
   - Xiao Chen
   - Sophie
   - Uncle Wang
   - Manager Zhang
   - Neighbor Li
   - Ms. Zhou

第二优先级：

1. 让结局进一步回收来华动机、专业方向、资金来源和最后阶段关键选择
2. 检查中期 tension flags 是否需要更强地影响后期 commitment 节点
3. 为每条路线补充 1-2 个低收益但高记忆点的小事件，避免 Hub 后半段只剩数值优化

## 7. 后续接手时先读

建议后续上下文优先阅读顺序：

1. `HANDOFF_SUMMARY.md`
2. `PRE_PRODUCTION_SPEC_PACK.md`
3. `WEEK_1_8_BEAT_SHEET.md`
4. `WEEK_9_16_BEAT_SHEET.md`
5. `WEEK_17_32_BEAT_SHEET.md`
6. `HUB_ROUTE_REWORK_PLAN.md`
7. `CHARACTER_ARC_AND_ENDING_PLAN.md`
8. `GAME_DESIGN_BIBLE.md`
9. `data/epoch1.js`
10. `data/epoch2.js`
11. `data/epoch3.js`
12. `data/hubData.js`
13. `engine/GameState.js`
14. `page.js`
15. `components/TabletInterface.jsx`

如果只读一份，就读本文件。

---

# 2026-04-27 最新交接进度：视觉体验、SimPad 与角色 CG

## 1. 本轮已完成

### 图片统一尺寸与压缩

- `images/simulator` 当前共有 79 张可用图片。
- 所有游戏图片尺寸已统一为 `1024x1024`。
- 当前图片格式统计：
  - `JPEG`: 78
  - `PNG`: 1
- 当前目录体积：约 `16M`。
- 之前约为 `126M` 磁盘占用，已大幅降低。
- `images/simulator/hub_bg.png` 被保留为真实 PNG，主要用于 Electron 图标/兜底。
- 游戏内运行引用已从 `.png` 改为 `.jpg`。
- 压缩报告：
  - `docs/imagegen/resize_report.json`
  - `docs/imagegen/jpeg_compression_report.json`

注意：

- 旧的 tracked PNG 角色图和背景图现在在 `git status` 中显示为 deleted，同时新增对应 `.jpg` 文件，这是预期结果。
- 不要简单恢复这些 PNG，否则会把体积又拉回去。

### 背景/CG 清晰查看模式

已在 `page.js` 增加 `View Scene / Back to Story` 按钮。

效果：

- 点击 `View Scene` 后隐藏剧情 UI、QuestTracker、SimPad、菜单、对话框。
- 移除原本的深色遮罩和 blur，让玩家可以单独看清背景/CG。
- 底部保留轻量 `Scene View` 标签和当前位置/场景名。

相关文件：

- `page.js`

### 对话框表现升级

已在 `components/StoryPanel.jsx` 修改角色对话表现：

- 有角色 speaker image 时，使用“角色头像卡 + 指向玩家的对话气泡”布局。
- 旁白节点仍保留为叙述框。
- 选择项宽度适配移动端。
- Space / Enter 仍只用于补全文字，不会误选选项。

相关文件：

- `components/StoryPanel.jsx`

### SimPad 第一版游戏性增强

已让 SimPad 从“信息面板”变成有实际数值后果的工具：

- Taobao：
  - 原有 `Electric Bike`、`Noise-Canceling Headphones` 保留。
  - 新增 `Dorm Bedding Set`、`Desk Lamp Kit`、`Mandarin Phrase Cards`、`City Data Pack`。
  - 购买后会实际影响 `energy`、`academics`、`chinese`、`culture`、`digitalProficiency`。
- DiDi：
  - 新增 `DiDi` tab。
  - 到达中国后可用。
  - 每周一次，花 RMB 换 Energy 和少量能力值。
  - 选项包括 `Campus Errand Ride`、`Cross-Town Shortcut`、`Airport Transfer Practice`。
- WeChat：
  - 联系人列表中新增 `Check in` 按钮。
  - 每周一次，主动维护一个已有关系。
  - 会增加对应角色 friendship，同时小幅消耗 energy。

相关文件：

- `components/TabletInterface.jsx`
- `engine/GameState.js`

### 构建与校验

最近一次已通过：

- `node validate_story.mjs`
- `node build.js`

仍存在非阻断警告：

- `MODULE_TYPELESS_PACKAGE_JSON`
- 暂不建议直接在 `package.json` 添加 `"type": "module"`，因为 `build.js` 当前仍是 CommonJS，贸然修改可能破坏构建。

## 2. 本轮半完成：角色事件 CG

用户明确要求：

- 不只要基础角色头像。
- 需要中期事件、结局、关键路线中的“角色真的在场”的 CG。

当前状态：

- 已用 `imagegen` 生成 7 张角色事件 CG。
- 7 张均已复制进项目、压缩为 `.jpg` 并接入剧情。
- 截至 2026-04-27 检查，Codex 默认生成目录下共有 60 张 PNG，说明“生成不到”不是素材完全缺失，而是生成后未完成筛选/接入。

Codex 生成目录：

- `/Users/mervyntsui/.codex/generated_images/019dbd62-2cb9-79e3-af4b-2bc6f0b554d3`

用户提供的相关 ID：

- `54f7ab03-128e-47b7-8bed-5c77b248e977`

该 ID 的诊断结果：

- 来源：上一轮 Codex 会话日志。
- 错误内容：`stream disconnected before completion`。
- 发生时间：2026-04-27 11:05:36 左右（Asia/Shanghai）。
- 结论：这是 Codex 平台请求流中断，不是项目代码异常、不是 `node build.js` 失败，也不是图片生成目录为空。
- 中断点：当时已生成并查看了 recent contact sheet，尚未进入“复制图片到项目、压缩为 JPG、写入剧情 `bgImage`”阶段。

最近生成图预览 contact sheet：

- `docs/imagegen/previews/recent_generated_contact_sheet.jpg`

已接入项目的角色 CG：

- `images/simulator/cg/cg_professor_lin_office_hours.jpg`
- `images/simulator/cg/cg_dr_mei_project_meeting.jpg`
- `images/simulator/cg/cg_sophie_support_circle.jpg`
- `images/simulator/cg/cg_xiao_chen_demo_day.jpg`
- `images/simulator/cg/cg_manager_zhang_office_badge.jpg`
- `images/simulator/cg/cg_uncle_wang_regular_table.jpg`
- `images/simulator/cg/cg_neighbor_li_festival_prep.jpg`

已生成项目内预览：

- `docs/imagegen/previews/character_event_cg_contact_sheet.jpg`

最近 contact sheet 中可见的原始候选图：

- 4 / 5：Professor Lin office-hours CG，可二选一。
- 6：Sophie dorm support-circle CG。
- 7：Xiao Chen incubator demo CG。
- 8：Manager Zhang office badge / internship milestone CG。

这些图已经进入项目并接入：

- `data/hubData.js`
  - `event_academic_lin_recommendation` -> `cg_professor_lin_office_hours.jpg`
  - `event_academic_dr_mei_project_commitment` -> `cg_dr_mei_project_meeting.jpg`
  - `event_intl_sophie_support_circle` -> `cg_sophie_support_circle.jpg`
  - `event_career_manager_zhang_referral` -> `cg_manager_zhang_office_badge.jpg`
  - `event_city_xiao_chen_demo_day` -> `cg_xiao_chen_demo_day.jpg`
  - `event_local_uncle_wang_regular` -> `cg_uncle_wang_regular_table.jpg`
  - `event_local_neighbor_li_festival` -> `cg_neighbor_li_festival_prep.jpg`
- `data/epoch3.js`
  - `ending_scholar` -> `cg_professor_lin_office_hours.jpg`
  - `ending_researcher` -> `cg_dr_mei_project_meeting.jpg`
  - `ending_influencer` -> `cg_sophie_support_circle.jpg`
  - `ending_diplomat` -> `cg_manager_zhang_office_badge.jpg`
  - `ending_entrepreneur` -> `cg_xiao_chen_demo_day.jpg`
  - `ending_local_insider` -> `cg_uncle_wang_regular_table.jpg`

2026-04-27 复核结果：

- `node validate_story.mjs` 通过。
- `node build.js` 通过，并成功重新生成 `index.html`。
- 当前项目没有硬 pointer 错误；可以从角色 CG 筛选/接入继续，不需要回滚已有改动。
- `images/simulator/generated/` 当前为空是正常的，因为本轮使用的是 Codex 内置 imagegen，输出在 `.codex/generated_images/...`，不是项目内 `generated` 目录。

## 3. 角色 CG 还缺什么

建议最低补齐 7 张角色事件 CG：

- `cg_professor_lin_office_hours.jpg`
- `cg_dr_mei_project_meeting.jpg`
- `cg_sophie_support_circle.jpg`
- `cg_xiao_chen_demo_day.jpg`
- `cg_manager_zhang_office_badge.jpg`
- `cg_uncle_wang_regular_table.jpg`
- `cg_neighbor_li_festival_prep.jpg`

当前已生成并接入：

- Professor Lin
- Dr. Mei
- Sophie
- Xiao Chen
- Manager Zhang
- Uncle Wang
- Neighbor Li

可选后续再补：

- Canteen Auntie
- Dorm Auntie
- Language Partner
- Local Friend / Study Group
- Family farewell

## 4. 建议下一步接入点

优先接入 route commitment / ending 节点，因为玩家最容易感到“这是大事件”：

### Academic Route

- `data/hubData.js`
  - `event_academic_lin_recommendation`
  - `event_academic_dr_mei_project_commitment`
- `data/epoch3.js`
  - `ending_scholar`
  - `ending_researcher`

建议：

- `event_academic_lin_recommendation` 用 `cg_professor_lin_office_hours.jpg`
- `event_academic_dr_mei_project_commitment` 用 `cg_dr_mei_project_meeting.jpg`
- `ending_scholar` 可继续用 `cg_research_poster.jpg`，也可以改成 Professor Lin 更强角色版。
- `ending_researcher` 建议改成 Dr. Mei project CG 或新增研究论坛 CG。

### Local Route

- `data/hubData.js`
  - `event_local_neighbor_li_festival`
  - `event_local_uncle_wang_regular`
- `data/epoch3.js`
  - `ending_local_insider`

建议：

- `event_local_neighbor_li_festival` 用 `cg_neighbor_li_festival_prep.jpg`
- `event_local_uncle_wang_regular` 用 `cg_uncle_wang_regular_table.jpg`
- `ending_local_insider` 可根据触发角色二选一，但当前数据结构单节点较难动态切换。简单做法是使用更综合的 local regular CG。

### International Route

- `data/hubData.js`
  - `event_intl_sophie_support_circle`
  - `event_intl_sophie_language_exchange`
- `data/epoch3.js`
  - `ending_influencer`

建议：

- `event_intl_sophie_support_circle` 用 `cg_sophie_support_circle.jpg`
- `ending_influencer` 当前 `cg_orientation_guide.jpg` 仍可保留，后续可补 Sophie/Orientation committee 角色 CG。

### Career Route

- `data/hubData.js`
  - `event_career_manager_zhang_referral`
  - `event_career_manager_zhang_alumni_dinner`
- `data/epoch3.js`
  - `ending_diplomat`

建议：

- `event_career_manager_zhang_referral` 用 `cg_manager_zhang_office_badge.jpg`
- `ending_diplomat` 当前用 `cg_return_offer.jpg`，后续可改成角色版 office badge + return offer，更有奖励感。

### Shanghai Opportunity Route

- `data/hubData.js`
  - `event_city_xiao_chen_demo_day`
- `data/epoch3.js`
  - `ending_entrepreneur`

建议：

- `event_city_xiao_chen_demo_day` 用 `cg_xiao_chen_demo_day.jpg`
- `ending_entrepreneur` 当前用 `cg_angel_demo.jpg`，后续可改成角色版 angel demo，更符合用户说的“天使轮投资更美好”。

## 5. 还没做的内容

仍未完成：

- 英文全文 copy pass，尤其是新增 UI、SimPad、风险事件、route commitment 节点。
- 类 Galgame / 叙事游戏的正式参考研究文档。
- SimPad 第二阶段系统化玩法：
  - Calendar deadline preview
  - Taobao 订单/延迟/踩坑事件
  - DiDi 风险规避或城市事件入口
  - WeChat 主动触发角色支线
  - Gallery / Memory Archive 解锁 CG
- 实际试玩 QA。

## 5.1 2026-04-27 第一轮口径统一

已新增口径表：

- `COPY_TERMINOLOGY_GUIDE.md`

已完成玩家可见层修改：

- `Guanxi Network` -> `Relationship Network`
- `Deep Connections` -> `Character Bonds`
- `Frnd` / `Friendship` UI 标签 -> `Bond`
- `Romance` UI 标签 -> `Closeness`
- Banquet minigame 的 `Guanxi/G` 显示 -> `Table Trust/Trust`
- StoryPanel 角色说话标签 `Direct Line` -> `Speaking To You`
- 剧情文本中的生存化表达：
  - `survive the applause` -> `laugh through the applause`
  - `Useful things survive boring repair` -> `Useful things last because someone does the boring repair`
  - `Survive with dignity...` -> `Handle the heat with dignity...`
- Tutorial 中对 `guanxi` 的解释改成先说 `relationship network`，再补充“中国语境下可叫 guanxi”。

保留但需注意：

- 代码底层字段仍有 `guanxi`、`friendship`、`romance`，这是机制字段，不是玩家口径。
- 旧存档兼容层仍有 `sanity`，只用于迁移旧存档到 `energy`。
- 如果后续做底层重命名，需要单独排期，不能顺手改。

## 5.2 2026-04-28 主菜单与基础音频

已完成：

- `page.js` 新增正式 title screen，包含 `New Game`、`Load Game`、`CG Gallery`、`Sound On/Off`。
- 主菜单封面先复用现有上海夜景和 departure-eve room 资产，形成可玩的封面包装。
- Title CG Gallery 会读取 `sim_panda_save` 的 flags，展示完整 18 个 CG 的解锁状态。
- 新增 Web Audio 程序化 BGM、UI click、Week transition chime。
- `components/StoryPanel.jsx` 新增 `onTextTick` 回调，让打字机文本可以播放轻量键盘 tick。
- 游戏内 Menu 新增 `Title Screen` 入口。

注意：

- 这次没有引入外部 mp3/wav 素材；目前音乐是浏览器 Web Audio 合成的占位级 BGM。
- 浏览器/Electron 会限制自动播放，所以音乐必须在玩家点击 `New Game`、`Load Game` 或 `Sound On` 后启动。
- `GPT-image-2` 只能用于图片，不适合生成 BGM。若要正式音乐，需要后续接专门音频素材或音频生成工具。

## 5.3 2026-04-28 音频资产规划

已新增：

- `AUDIO_ASSET_PLAN.md`
- `data/audioManifest.js`
- `engine/AudioManager.js`
- `assets/audio/README.md`
- `tools/minimax_music_jobs.json`
- `tools/generate_minimax_music.mjs`

内容包括：

- BGM / ambience / SFX / stinger 四层音频结构。
- 16 首 BGM 的场景、情绪、长度、循环要求和优先级。
- 10 个 ambience 场景底噪。
- 28 个 UI、系统、SimPad、支付、DiDi、结局相关音效。
- 可直接交给音频生成工具的英文 prompt。
- `AudioManager` 与 `audioManifest` 的后续代码接入建议。
- P0 / P1 / P2 三批生产优先级。

已接入代码：

- `AudioManager` 支持 `playBgm`、`stopBgm`、`playAmbience`、`playSfx`、`playStinger`、`setVolume`、`mute/unmute`。
- `audioManifest` 已列出正式音频文件路径，但全部 `ready: false`，所以现在不会请求不存在的音频文件。
- `page.js` 已根据 title / phase / route / ending 自动切换 BGM id。
- 正式素材加入 `assets/audio/` 后，只需要把对应 manifest entry 改成 `ready: true`。
- 没有正式素材时，仍使用 Web Audio fallback，因此当前游戏可正常出声。
- MiniMax 批量脚本默认生成 P0 9 首 BGM；使用 `--all` 可生成全部 16 首。
- 脚本读取 `MINIMAX_API_KEY` 环境变量，生成后会自动更新 manifest 并运行 `node build.js`。

重要口径：

- 当前游戏已有 Web Audio 占位音，但正式版本仍需要外部 `.mp3` / `.wav` 素材。
- 正式音频要避免直接模仿微信、支付宝、滴滴真实提示音，避免版权和商标识别风险。

## 5.4 2026-04-28 可选角色 / 生活 CG 补齐

已完成：

- 新增并接入 5 张可选增强 CG，使 Memory Archive 从 18 张扩展到 23 张。
- 新增项目内资产：
  - `images/simulator/cg/cg_canteen_auntie_kind_portion.jpg`
  - `images/simulator/cg/cg_dorm_auntie_parcel_help.jpg`
  - `images/simulator/cg/cg_language_partner_cafe.jpg`
  - `images/simulator/cg/cg_local_study_group_night.jpg`
  - `images/simulator/cg/cg_family_farewell_keepsake.jpg`
- 已接入剧情节点：
  - `data/epoch2.js`
    - `e2_w15_farewell` -> family farewell CG
  - `data/hubData.js`
    - `event_local_study_group` -> local study group CG
    - `event_local_canteen_practice` -> canteen auntie CG
    - `event_local_neighborhood_errand` -> dorm auntie parcel CG
    - `event_admin_chinese_selfstudy` -> language partner CG
- 已接入 Gallery：
  - `page.js` Title CG Gallery
  - `components/TabletInterface.jsx` SimPad Memory Archive

复核结果：

- CG 引用数：23。
- 缺失图片引用：0。
- `node validate_story.mjs` 通过。
- `node build.js` 通过。

## 6. 后续继续开发时的建议顺序

建议下一个接手者按这个顺序做：

1. 做浏览器/Electron 实际试玩 QA，先检查 title screen、New/Load、CG Gallery、Sound On/Off、打字音是否在真实窗口正常。
2. 继续检查路线事件和结局 CG 是否在游戏中显示正常。
3. 做英文全文 copy pass，把角色节点从叙述腔进一步改成更直接的角色对白。
4. 根据 `AUDIO_ASSET_PLAN.md` 生产第一批 P0 音频资产，并把 manifest entry 改为 `ready: true`。
5. 做 SimPad 第二阶段玩法：
   - Calendar deadline preview
   - Taobao 订单/延迟/踩坑事件
   - DiDi 风险规避或城市事件入口
   - WeChat 主动触发角色支线
6. 最后做正式封面 key art、发布包和试玩反馈修复。

## 7. 当前风险提醒

- `git status` 中有很多未提交改动，且包含早前文件如 `build.js`、`package.json` 的 modified 状态。不要随意 revert。
- 当前图片格式迁移会让 git 显示大量 PNG deleted / JPG added，这是预期，不是丢图。
- 如果继续用 `imagegen`，生成图默认不会自动进项目，必须手动复制/转换/接入。
- 不要把项目引用指向 `.codex/generated_images`，游戏运行资产必须在项目目录内。
