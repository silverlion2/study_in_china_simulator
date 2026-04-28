# QA Playtest Notes

日期：2026-04-27
范围：Electron smoke playtest + 当前新增 SimPad 功能检查

## 1. 运行方式

已执行：

```bash
node validate_story.mjs
node build.js
npm start
```

结果：

- `validate_story.mjs` 通过，没有 hard pointer errors。
- `build.js` 通过，`index.html` 已重新生成。
- Electron 可以正常启动，窗口标题为 `Sim Panda - Study in China Simulator`。
- 仍有既有 `MODULE_TYPELESS_PACKAGE_JSON` 警告，未改 `package.json`，因为当前 `build.js` 仍是 CommonJS。

## 2. Smoke Playtest 结果

### 主界面

已确认：

- Week / phase / Energy / RMB 顶部状态正常显示。
- 开场剧情正常显示，背景图能加载。
- 选项正常显示。
- Space 在文字未完全显示时只补全文字，不会误选选项。

### View Scene

已确认：

- 点击 `View Scene` 后，剧情 UI、菜单、SimPad、QuestTracker 都会隐藏。
- 背景图变清晰，不再被深色 layer 和 blur 遮挡。
- `Back to Story` 可以返回剧情界面。

### SimPad

已确认：

- SimPad 可以打开和关闭。
- 顶部 tab 已从横向滚动改为两行显示，避免 Story / Calendar 被藏到左侧不可见。
- `Story` tab 正常显示三个 epoch 的进度。
- `Calendar` tab 正常显示 Week 1 的申请期 deadline：
  - Statement Draft Lock
  - Funding Plan Check
  - Minghai Application Deadline
- `Gallery` tab 正常显示 `Memory Archive`，当前开局为 `0/18`，所有 CG 以 locked memory 状态显示。
- `DiDi` tab 正常显示 arrival 前锁定提示，ride 和 city shortcuts 在 Application phase 正确 disabled。
- `Taobao` tab 正常显示商品与 Service Orders，Service Orders 在 Application phase 正确 disabled。

### Week Summary

已确认：

- 从 Week 1 的 `Continue to Week 2` 触发 `advance_turn` 后，不再直接切入 Week 2 剧情。
- 现在会先出现 `Calendar Updated` / `Week 2` 的 Week Summary overlay。
- overlay 会显示当前 phase、说明文字、Energy / RMB / Academics / Chinese / Digital / Culture 的结算后数值与变化。
- 点击 `Start Week 2` 后，才进入 Week 2 的 `Application Portal` 剧情。

### In-China SimPad 系统逻辑

已用 Node 层状态模拟确认：

- `DiDi` 在 `In-China` phase 可用，能扣 RMB、加 Energy / Digital，并设置 `used_didi_this_week`。
- 同一周第二次 DiDi ride 会被 blocked。
- `Taobao Service Orders` 在 `In-China` phase 可用，能扣 RMB、加对应 stats，并设置 `used_taobao_service_this_week`。
- 同一周第二个 Taobao service order 会被 blocked。
- `WeChat check-in` 对已有联系人可用，会增加 Bond、消耗 Energy，并设置 `sent_wechat_ping_this_week`。
- `advanceTurn()` 会重置 DiDi / Taobao / WeChat 的 weekly lock flags。
- 进入 `ending_diplomat` 会写入 `ending_diplomat` 与 `ending_return_offer` flags。
- 进入 `game_over_wealth` 会写入 `money_crisis_seen` 与 `ending_out_of_money` flags。

## 3. 本轮发现并修复的问题

### SimPad tab 横向滚动体验差

现象：

- 首次打开 SimPad 时，顶部 app tab 因横向滚动和容器裁切，视觉上可能从 `Map` 开始显示。
- `Story` 和 `Calendar` 虽然存在，但玩家可能误以为没有这些功能。

修复：

- `components/TabletInterface.jsx` 中 tab navigation 改为 `flex-wrap` 两行显示。
- `build.js` 中补充 `.no-scrollbar` CSS，作为其他滚动区域的兜底样式。

### Week 11-17 DiDi / family 信息重复感

现象：

- Week 11 已经讲过 WeChat / Alipay / DiDi 准备，Week 13 和入境机场又出现 DiDi，玩家会感觉被重复问。
- 序章、Week 4、Week 15 都有 family/home 相关内容，若不区分功能，会像重复询问家庭背景。

修复：

- Week 11 明确为 digital setup，不再是机场交通选择。
- Week 13 明确为 first-hour arrival transport plan；只有已准备 DiDi 时才出现 DiDi pickup confirmation。
- 入境机场 DiDi 选项改为依赖 `has_didi`，未准备时不再突然出现。
- Week 1 `Background` 改为 `Starting Point`，说明这是数值起点，不是家庭类型提问。
- Week 4 family call 改为 application-period call；Week 15 farewell 改为 final home call，二者功能区分更清楚。

### Week 17 工具首次使用与角色初遇断层

现象：

- DiDi / WeChat / Taobao 在系统中存在，但第一次使用缺少教育化场景。
- Sophie、Xiao Chen、Neighbor Li 等角色能在 UI 或后续事件里出现，但缺少“第一次见到并加 WeChat”的仪式感。

修复：

- 机场新增第一次 DiDi 教学：
  - 准备过 DiDi 时，使用已准备的 airport pickup plan。
  - 没准备 DiDi 时，可以在机场临时设置，但消耗更多 Energy。
  - 新增 pickup zone、车牌确认、路线分享的 `didi_pickup_lesson`。
- 注册后新增 `Orientation QR Wall`：
  - 玩家扫码加入群并添加 Sophie、Xiao Chen、Neighbor Li。
  - 后续 WeChat 联系人列表会真实出现这些联系人。
  - 玩家可选择优先向某个联系人求助，影响路线偏向。
- 宿舍 Taobao 新增 `taobao_search_lesson`：
  - 第一次订单讲清 seller rating、delivery date、dorm address、尺寸和 courier friction。
  - SimPad Taobao tab 增加 first lesson 状态说明。
- Week 18 first class 现在会把 Professor Lin 转化为校园内真实教师联系人。

### Week 20+ 中后期角色 first contact 断层

现象：

- Dr. Mei、Manager Zhang、Uncle Wang 的后续路线存在，但第一次正式认识不够清楚。
- 玩家可能感觉这些角色突然进入可加深关系状态。

修复：

- Academic Track 中 Dr. Mei 改为 first research talk -> follow-up reading -> research question 的阶梯。
- Career Bridge 中 Manager Zhang 改为 first recruiting panel -> post-panel follow-up -> candid feedback / referral 的阶梯。
- Local Integration 中 Uncle Wang 改为 first skewer stall visit -> neighborhood story -> regular table 的阶梯。
- WeChat / contact notes 增加这三人的首次接触说明。

### Alipay 首次扫码状态

现象：

- Alipay / Wallet 主要展示余额和交易记录，缺少首次真实使用反馈。

修复：

- Canteen first meal 的 Alipay 路径现在写入 `first_alipay_used`。
- SimPad Wallet 会根据阶段和 flags 显示“准备中 / 已绑定未使用 / 首次扫码完成 / 未准备”的提示。

### Jobs / Arcade 首次使用口径

现象：

- Jobs 容易看起来像“随便打工赚钱”按钮，和中国学生签证合规风险混淆。
- Arcade 像独立小游戏集合，不像从剧情生活系统解锁出来的 replay archive。

修复：

- Jobs 改成 campus-approved microtasks，并明确 risky off-campus work 在 Money & Compliance。
- Jobs 在 In-China 前禁用，完成第一次任务后写入 `first_student_task_used`。
- Arcade 增加说明：locked game 表示该生活系统还没有在剧情里发生过。

### 主菜单、封面与基础声音反馈

现象：

- 游戏打开后直接进入剧情，缺少正式游戏的 title screen / cover / New / Load / CG Gallery 入口。
- 游戏没有 BGM、点击反馈、打字音，视觉小说感不足。

修复：

- `page.js` 新增 title screen，包含 `New Game`、`Load Game`、`CG Gallery`、`Sound On/Off`。
- 主菜单封面使用上海夜景与出发前夜房间图，先形成正式包装；后续可再替换成专门绘制的 key art。
- `CG Gallery` 会读取本地存档 flags，展示完整 18 个 CG 的已解锁/未解锁状态。
- 新增 Web Audio 程序化 BGM、UI click、Week transition chime。
- `StoryPanel` 新增 `onTextTick`，打字机逐字显示时会触发轻量键盘 tick。
- 游戏内 Menu 新增 `Title Screen`，可回到主菜单但不清除当前内存进度。

## 4. 尚未完成的 QA

还需要后续做完整路线测试：

- 手动打开 Electron/打包后的游戏，确认 title screen、New/Load、CG Gallery、Sound On/Off 在真实窗口中表现正常。
- 从 Week 1 手动玩到 Week 8，确认申请期每个节点都能前进。
- 从 Week 9 玩到 Week 16，确认 JW202、X1 visa、WeChat/Alipay、housing、flight 节点正常。
- 从 Week 17 进入 In-China 后，做一次完整 UI 层实测，确认 DiDi city shortcuts 和 WeChat meetup 能从 SimPad 直接进入场景。
- 解锁至少一个角色 commitment 节点，确认 WeChat meetup 在真实 UI 中出现并触发对应支线。
- 打出至少一个 ending，确认 ending CG、afterword、Memory Archive 解锁状态在 UI 中一致。
