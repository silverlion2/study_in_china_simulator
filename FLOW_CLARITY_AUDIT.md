# Flow Clarity Audit

本文件记录“玩家是否知道自己第一次遇见了谁、第一次用了什么工具、为什么同类内容再次出现”的审查结论。策划说明用中文；游戏内文本仍保持英文。

## 核心原则

- 每个系统名词第一次出现时，必须有玩家可感知的场景，而不是只出现在 UI 或数值里。
- 每个主要角色进入 WeChat 前，必须先有初遇或明确的线上接触。
- 同类内容再次出现时，要区分功能：准备、计划、执行、复盘、深化关系。
- App 不应只是按钮，第一次使用要有教育性：玩家要知道它解决什么问题，也要知道它会制造什么摩擦。

## 已修复断层

### DiDi

原问题：

- Week 11 提到 DiDi，Week 13 计划 DiDi，入境后又出现 DiDi，玩家容易感觉重复。
- 机场到学校本应是最自然的第一次使用场景，但此前只是一句结果。

当前处理：

- Week 11 是 digital setup，不是交通选择。
- Week 13 是 first-hour arrival transport plan。
- 入境机场新增两条路径：
  - 准备过 DiDi：打开已准备好的 pickup plan。
  - 没准备 DiDi：在机场压力下临时设置，付出更多 Energy。
- 新增 `didi_pickup_lesson`：确认 pickup zone、车牌、路线分享，完成第一次 DiDi 教学。

### WeChat / 角色初遇

原问题：

- Sophie、Xiao Chen 等角色可能在系统里出现，但缺少“主角真的见到/加到对方”的场景。
- WeChat 联系人列表和角色关系之间缺少仪式感。

当前处理：

- Week 17 注册后新增 `Orientation QR Wall`。
- 玩家会扫码加入群并添加第一批 Minghai contacts：
  - Sophie：国际学生支持与 orientation 入口。
  - Xiao Chen：校园地图、捷径、城市机会入口。
  - Neighbor Li：宿舍生活、外卖/快递/通知入口。
- 新增 `e3_w17_contact_focus`，让玩家选择优先向谁求助，从而形成后续路线偏向。
- Week 18 first class 现在会让 Professor Lin 从申请期名字变成校园里的真实教师联系人。

### Taobao

原问题：

- Taobao 有商品按钮，但第一次使用不像剧情教学，玩家不知道为什么它重要。

当前处理：

- 宿舍 setup 里新增 `taobao_search_lesson`。
- 第一次 Taobao 订单会讲清楚：
  - seller rating
  - delivery date
  - dorm address
  - mattress / bedding size
  - courier friction
- SimPad Taobao tab 增加 first lesson 状态说明。

### Dr. Mei / Manager Zhang / Uncle Wang

原问题：

- 中后期角色有路线事件，但第一次出现不够像“认识了一个人”，更像系统突然给了一个可攻略/可加深对象。
- Dr. Mei、Manager Zhang、Uncle Wang 的后续信任事件需要关系值，但关系值来源缺少清晰的初遇阶梯。

当前处理：

- Dr. Mei：
  - Academic Track 先出现 `Attend Dr. Mei's first research talk`。
  - 初遇后解锁 follow-up reading，再进入 research question / ethics / project commitment。
- Manager Zhang：
  - Career Bridge 先出现 first recruiting panel。
  - 初遇后解锁 post-panel follow-up，再进入 candid feedback / boundaries / referral。
- Uncle Wang：
  - Local Integration 先出现 late-night skewer stall first contact。
  - 之后才进入 neighborhood story、why you came to China、regular table。

### Alipay

原问题：

- Wallet / Alipay 主要显示余额和交易记录，但玩家缺少“第一次扫码付款完成”的状态反馈。

当前处理：

- Canteen first meal 的 Alipay 选项会写入 `first_alipay_used` 和 `alipay_canteen_lesson`。
- SimPad Wallet 会根据是否已到中国、是否绑定、是否完成首次扫码，显示不同说明。

### Jobs / Arcade

原问题：

- Jobs 像直接赚钱按钮，容易和中国学生签证合规风险混在一起。
- Arcade 像独立小游戏列表，玩家不一定知道它是“已经历系统”的 replay archive。

当前处理：

- Jobs 改成 campus-approved microtasks 的口径，明确 risky off-campus work 属于 Money & Compliance。
- Jobs 在 In-China 之前不可用，完成第一次任务后写入 `first_student_task_used`。
- Arcade 增加说明：只有故事中遇到过的生活系统才会解锁 replay。

## 下一轮仍需审查

- Week 1-8 Application：确认 Professor Lin、family、budget、application system 是否都有清晰功能差异。
- Week 9-16 Pre-Departure：确认每周不是 checklist 堆叠，而是准备、审批、计划、告别四类体验递进。
- Week 20-32 Campus Hub：继续检查 route trust / tension / commitment 的节奏是否太快。
- SimPad Apps：继续检查 Calendar 和 Gallery 是否都有“首次使用教学”和“后续可主动使用”的循环。
- Gallery：确认每个 CG 解锁都对应真实剧情节点，而不是只对应 flags。
