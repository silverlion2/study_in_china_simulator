# Hub 路线化重构方案

## 1. 文档目的

这份文档用于指导 Hub 从“活动菜单”升级为“路线化校园生活系统”。

目标：

- 保留现有 Hub、小游戏、旅行、角色事件素材
- 先重构玩家每周看到的主入口
- 让 Hub 承接前面主线生成的 `route_*`、`decision_e3_*`、`relationships` 和 `guanxi`
- 让每次周行动都更像玩家在塑造留学生活，而不是刷加点活动
- 让 Hub 成为玩家主动找角色、邀约角色、回应角色请求的主要入口

---

## 2. 新 Hub 主入口

Hub 主菜单从原来的活动分类改为六类：

1. Academic Track
2. Local Integration
3. International Student Circle
4. Career Bridge
5. Shanghai Opportunity
6. Life Admin & Recovery

旧内容保留为：

- City, Travel & Arcade Extras

这样可以避免一次性删除旧系统，同时让第一屏体验变得更像路线选择。

当前新增玩法层：

- `Life Check` 会把关键路线事件变成一次准备度检定。
- 检定不随机，来自属性、圈层关系、角色信任、路线承诺和已经解锁的准备卡。
- 准备卡不是新抽卡系统，而是现有行为的回收：Calendar pin、角色 Talk/Request、手机准备、语言道具等都会在关键场景里变成加成。
- 失败不会立刻 Game Over，而是留下 `*_strained` 或 `*_scar` flags，供后续 recovery arc 回收。

当前已完成的路线项目 UI：

- Academic Portfolio
- Internship Dossier
- Neighborhood Map
- Support Circle Guide
- Shanghai Prototype
- Budget Ledger

这些面板放在 SimPad 的 Story 页，用于把每条路线从“数值倾向”变成玩家可追踪的项目进度。

每条主路线后续都应包含一个角色互动入口：

- **Talk**：短对话，补角色近况和关系温度
- **Invite**：玩家主动约对方一起做事，占用本周行动
- **Request**：角色主动提出请求，通常带有关系、路线或价值判断
- **Follow-up**：对上一场冲突或关键选择进行回收

---

## 3. 五条路线的设计职责

### Academic Track

服务于：

- `route_academic`
- `academics`
- `guanxi.professors`
- Professor Lin / Dr. Mei

事件方向：

- office hours
- research reading
- lab meeting
- paper/project help

风险：

- energy 消耗
- 社交与文化成长较慢

### Local Integration

服务于：

- `route_local`
- `chinese`
- `culture`
- `guanxi.localStudents`
- Neighbor Li / Uncle Wang / Xiao Chen

事件方向：

- local study group
- canteen language practice
- dorm hallway help
- neighborhood errands

风险：

- 初期 energy 消耗
- 需要承认自己不懂

### International Student Circle

服务于：

- `route_intl`
- `guanxi.intlStudents`
- Sophie
- energy recovery

事件方向：

- support dinner
- newcomer guide
- shared admin advice
- homesick night

风险：

- 如果只待在国际圈，chinese/culture 增长较慢

### Career Bridge

服务于：

- `route_career`
- `digitalProficiency`
- `academics`
- `guanxi.admin`
- Manager Zhang

事件方向：

- career office
- resume localization
- legal internship process
- alumni panel

风险：

- wealth 与 energy 消耗
- 需要合规，不把职业线简化成违法打工

### Shanghai Opportunity

服务于：

- `route_city`
- `digitalProficiency`
- `wealth`
- `culture`
- Xiao Chen

事件方向：

- campus market test
- small e-commerce idea
- Lujiazui / cafe project
- city prototype

风险：

- energy 消耗
- 有小额收益，但不应夸张暴富

---

## 4. Life Admin & Recovery

该菜单承载：

- rest
- budget review
- Chinese self-study
- campus admin
- phone/payment maintenance

这是经济和 energy 的安全阀，避免玩家被路线选择一路推到 game over。

---

## 5. 当前落地状态

已完成：

- Hub 第一屏已改为五条主路线加 Life Admin 与 Extras
- Academic、Local、International、Career、Shanghai Opportunity 都已有基础周事件
- Week 21-27 已加入关系摩擦事件
- Week 25/29 已加入后期 commitment / future direction 事件
- 旧 `submenu_social` 已改成路线导流器，不再直接暴露旧版社交事件
- 旧社交内容中的可保留部分已迁移到路线事件，例如 Dr. Mei conference abstract、Sophie language exchange、local KTV、Manager Zhang alumni dinner、Xiao Chen global angle
- 高阶段路线事件已使用完成 flag 做一次性门控，避免玩家重复刷同一个高收益事件
- 已完成第一轮经济调参：International Student Circle 降低免费 energy 回复，Shanghai Opportunity 降低可重复赚钱收益，Local 情绪恢复事件降低过强 energy 奖励
- 已完成旧 extras 第一轮口吻清理：entertainment、travel、hustle、districts 从刷钱/豪华娱乐/恋爱软件口径改成留学生的城市观察、周末体验、合规风险和轻量社交
- 已新增五条路线记忆点事件：almost-empty lecture、rainy dorm gate、common-room meal、mock interview、broken QR complaint night
- 已新增风险修复事件：compliance cleanup、career shortcut repair、prototype reliability repair
- 已新增风险混合结局：compliance scare、shortcut tax、unstable launch

已确认进入后续计划：

- 每条路线增加更多面对面角色互动，而不是只靠 WeChat 和系统总结
- 每个主要角色增加至少 1 个主动邀约事件和 1 个角色请求事件
- 偏转述的角色事件逐步改成多轮对话，玩家选择表达态度
- Hub 中角色入口要让玩家感觉“我今天去找谁”，不是只选择“刷哪个数值”

本轮已落地：

- Hub 主菜单新增 `Character Contacts`
- `Character Contacts` 首批包含 7 个 Talk / Invite 事件和 7 个 Request 事件
- WeChat 联系人卡片可以直接进入首批角色互动或后期路线事件
- SimPad Story 时间线会记录角色互动记忆点
- WeChat 最近互动会显示角色对话 / 请求造成的关系记忆

当前保留：

- `submenu_entertainment`
- `submenu_travel`
- `submenu_hustle`
- `submenu_districts`
- minigame 入口

这些内容仍放在 `City, Travel & Arcade Extras`，后续应继续观察数值平衡，而不是直接删除。

---

## 6. 实现原则

- 新路线事件优先使用英文玩家文案
- 每个事件都必须给 stats/guanxi/relationships/flags 中至少一类反馈
- 保留 `advance_turn` 节奏
- 旧 `submenu_entertainment`、`submenu_travel`、`submenu_hustle`、`submenu_districts` 暂时不删除，放到 extras
- 旧 `submenu_social` 只作为路线导流器，不再作为独立刷关系菜单
- 随机事件逐步改为上海/明海语境
- Week 25+ 的路线高光事件要有一次性 flag，避免经济和关系奖励失控

---

## 7. 后续迭代

本轮已经完成 Hub 路线化第一版和旧社交迁移第一轮。

后续还需要：

- 根据 `route_*` 增强不同事件权重
- 继续补 Follow-up 类角色互动入口
- 为 Professor Lin、Dr. Mei、Sophie、Xiao Chen、Neighbor Li、Manager Zhang、Uncle Wang 各补 Trust / Tension / Commitment 的更多直接对话事件
- 把 romance 选项改成“可选关系支线”，不要出现在默认主轴
- 继续 polish 结局文本，让不同路线的最终回收更有区分度
- 继续观察 Week 21-29 后期事件的 wealth、energy、relationships 奖励是否过强
- 做浏览器试玩 QA，确认 SimPad、Hub 菜单和结局展示没有可见体验问题
