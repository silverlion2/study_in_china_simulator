# Hub 路线化重构方案

## 1. 文档目的

这份文档用于指导 Hub 从“活动菜单”升级为“路线化校园生活系统”。

目标：

- 保留现有 Hub、小游戏、旅行、角色事件素材
- 先重构玩家每周看到的主入口
- 让 Hub 承接前面主线生成的 `route_*`、`decision_e3_*`、`relationships` 和 `guanxi`
- 让每次周行动都更像玩家在塑造留学生活，而不是刷加点活动

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
- 把 romance 选项改成“可选关系支线”，不要出现在默认主轴
- 继续 polish 结局文本，让不同路线的最终回收更有区分度
- 继续观察 Week 21-29 后期事件的 wealth、energy、relationships 奖励是否过强
- 做浏览器试玩 QA，确认 SimPad、Hub 菜单和结局展示没有可见体验问题
