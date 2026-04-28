# Week 17-32 在华阶段 Beat Sheet

## 1. 文档目的

这份文档用于指导第三阶段剧情改写。

范围：

- Week 17-20：抵达上海与明海大学共通线
- Week 21-23：Hub 半开放生活循环
- Week 24：期中节点与路线第一次确认
- Week 25-27：Hub 半开放生活循环
- Week 28：职业/城市机会节点与路线第二次确认
- Week 29-31：Hub 收束前生活循环
- Week 32：年度收束与结局评估

语言规则：

- 中文用于设计说明
- English in-game copy 用于实际游戏内正文与选项
- 玩家可见文本最终进入 `data/epoch3.js`

实现原则：

- 上海为第一版主舞台
- 学校统一为 `Minghai University`
- 不把在华阶段写成“生存”，而是写成真实适应、选择和成长
- 保留当前引擎机制：Week 24 / 28 / 32 由 `page.js` 强制进入主线节点
- 暂不彻底重构 Hub，但 Epoch 3 主线要为后续 Hub 路线化提供 flags

---

## 2. 第三阶段结构总览

| 时间 | 节点 | 核心功能 |
|---|---|---|
| Arrival | Pudong -> Minghai | 落地上海、交通、食堂、宿舍、淘宝 |
| Week 17 | Registration | 报到、材料、校园系统、Admin 关系 |
| Week 18 | First Class | 专业第一次落地，承接 major flags |
| Week 19 | Social Circle | Sophie / Xiao Chen / Neighbor Li 等关系入口 |
| Week 20 | Choose Rhythm | 玩家选择初期生活重心，生成路线倾向 |
| Week 24 | Midterm Pressure | 第一次检验：学业、关系、文化、经济哪个先压上来 |
| Week 28 | Future Direction | 职业、研究、本地融入、城市机会、国际生支持 |
| Week 32 | Year-End Review | 回收动机、专业、经济、关系，进入结局判定 |

---

## 3. Week 17-20 共通线目标

### Week 17 Registration

中文设计目标：

- 把“抵达中国”从观光感拉回学校系统
- 报到要承接前期准备：`has_wechat`、`has_alipay`、`housing_sorted`、`decision_e2_package`
- 行政不是敌人，而是一套新规则
- 注册结束后解锁 `arrival_living_funds_unlocked`，代表预留生活费/奖学金首月可用资金进入钱包，避免玩家刚到校就被每周生活费直接打断

关键 flags：

- `decision_e3_registration`
- `student_card_ready`
- `campus_system_ready`
- `arrival_living_funds_unlocked`

推荐选择：

- Bring every document and ask politely: admin +, digital +
- Follow a senior's checklist: intl guanxi +, Sophie relationship +
- Improvise at the office: energy -, chinese +

### Week 18 First Class

中文设计目标：

- 专业选择第一次真正影响剧情
- 不需要三套完全独立主线，但选择文本要根据 major flags 有承接

关键 flags：

- `decision_e3_first_class`
- `major_identity_confirmed`

推荐选择：

- Sit in the front and commit academically: academics +, professors +
- Focus on understanding classroom culture: culture +, chinese +
- Find classmates who can explain the unwritten rules: local/intl guanxi +

### Week 19 Social Circle

中文设计目标：

- 建立初期人物关系：Sophie、Xiao Chen、Neighbor Li
- 关系不是恋爱导向，而是留学生关系网

关键 flags：

- `decision_e3_social_circle`
- `met_neighbor_li`
- `met_xiao_chen`
- `met_sophie_on_campus`

推荐选择：

- Join Sophie's international-student dinner: intlStudents +, Sophie +
- Let Xiao Chen show you campus shortcuts: localStudents +, Xiao Chen +
- Ask Neighbor Li how dorm life really works: localStudents +, culture +

### Week 20 Choose Rhythm

中文设计目标：

- 让玩家明确自己在中国的第一种生活节奏
- 生成五条路线倾向 flags，但不硬切线

路线 flags：

- `route_academic`
- `route_local`
- `route_intl`
- `route_career`
- `route_city`

---

## 4. Week 24 Midterm Pressure

中文设计目标：

- 不是单纯考试，而是“你这几周怎么活”的第一次账单
- 根据选择生成 `decision_e3_midterm`
- 强化路线倾向，但保留后续转向空间

推荐选择：

1. Office hours with Professor Lin
   Effects: academics +, professors +, energy -
   Route: academic

2. Study group with local classmates
   Effects: chinese +, localStudents +, culture +
   Route: local

3. International-student support circle
   Effects: energy +, intlStudents +, Sophie +
   Route: intl

4. Balance coursework with a campus opportunity
   Effects: digital +, wealth +, energy -
   Route: career/city

---

## 5. Week 28 Future Direction

中文设计目标：

- 替换旧的“非法兼职二选一”
- 保留签证/兼职风险议题，但不把职业线简化成违法诱惑
- 玩家开始回答：留学之后，我想把中国经验变成什么？

推荐选择：

1. Research assistant with Professor Lin / Dr. Mei
   Effects: academics +, professors +, wealth small -
   Route: academic

2. Legal campus internship application
   Effects: career +, admin +, digital +
   Route: career

3. Xiao Chen city project / student market idea
   Effects: digital +, wealth +, Xiao Chen +, energy -
   Route: city

4. Sophie international-student guide project
   Effects: intlStudents +, culture +, energy +
   Route: intl

5. Local community volunteer / language immersion
   Effects: chinese +, localStudents +, culture +
   Route: local

Risk flag:

- `unapproved_work_risk` 可保留为极端路径，但不要作为唯一“赚钱”选择。

---

## 6. Week 32 Year-End Review

中文设计目标：

- 年末不是“系统给你分类”，而是回看这一年如何改变玩家
- 结局评估应同时看数值、关系、路线 flags、关键选择

核心回收：

- 来华动机：`motive_*`
- 专业方向：`major_*`
- 资金路线：`finance_*`
- 出发准备：`decision_e2_*`
- 在华路线：`route_*`
- 关系：Sophie、Xiao Chen、Family、Professor Lin / Dr. Mei

---

## 7. 结局口径升级

当前仍使用单节点 `ending_evaluation` 条件分发，但文案应从职业模板升级为人生总结。

建议结局：

- `ending_scholar`：学术深耕，不一定是 Tsinghua，也可以是 Minghai research track / grad-school direction
- `ending_entrepreneur`：上海城市机会，不夸张写成 ¥1M ARR，而是可持续 student project / cross-border idea
- `ending_diplomat`：跨文化沟通，不局限北京 government relations
- `ending_influencer`：国际学生镜像与内容表达，避免只写“外国人吃麻辣烫”
- `ending_hsk_master`：语言突破，但要强调生活表达能力
- `ending_local_insider`：本地融入，强调真实关系而非“变成本地人”
- `ending_researcher`：实验室/项目路线，强调代价与收获
- `ending_quiet_return`：普通但完整的一年，不是失败
- `ending_deportee`：保留风险结局，但仅由明确违规路径触发

---

## 8. UI 同步建议

SimPad Epoch 3 时间线建议显示：

- Airport Transport
- First Meal
- Dorm Setup
- Registration
- First Class
- Social Circle
- Life Rhythm
- Midterm Focus
- Future Direction
- Year-End Reflection

QuestTracker 建议根据 flags 依次显示：

- Arrive at Minghai
- Complete Registration
- Survive? 不使用这个词，改为 `Find Your First Rhythm`
- Prepare for Midterms
- Choose a Future Direction
- Finish the Year

---

## 9. 后续 Hub 重构接口

Epoch 3 改完后，Hub 应逐步读取这些 flags：

- `route_academic`
- `route_local`
- `route_intl`
- `route_career`
- `route_city`
- `decision_e3_registration`
- `decision_e3_first_class`
- `decision_e3_social_circle`
- `decision_e3_rhythm`
- `decision_e3_midterm`
- `decision_e3_internship`

短期可先不重写 Hub，只确保主线生成这些 flags。

当前临时经济调校：

- `Intensive Study in Shanghai` 的 energy 消耗从 -15 调整为 -8，因为每周还会有基础 energy drain。
- `arrival living funds` 当前在 `e3_w17_done` 提供 `wealth +3000`，用于支撑 Week 17-32 的基础生活费。
