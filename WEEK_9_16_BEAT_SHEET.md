# Week 9-16 出发准备期 Beat Sheet

## 1. 文档目的

这份文档用于指导第二阶段剧情改写。

范围：

- Week 9-16：拿到 Minghai University 录取后，到真正登机飞往上海前
- 承接 `Departure Eve` 倒叙结构
- 让“签证、住宿、机票、支付、行李、告别”不只是清单，而是有情绪、有经济压力、有数值变化的体验

语言规则：

- 中文用于设计说明
- English in-game copy 用于实际游戏内正文与选项
- 所有玩家可见文本最终应进入英文游戏数据

实现原则：

- 不写成生存游戏，不使用 `sanity`，统一使用 `energy`
- `JW202` 不单独裸露给玩家，而是解释为 admission package 里的 study visa form
- 每周至少有一个会推进时间的关键节点
- 保留现有机制：stats、guanxi、relationships、flags、visa minigame、turn 16 自动进入 `in_china_start`
- 出发目的地统一为 Shanghai / Shanghai Pudong International Airport

---

## 2. 第二阶段结构总览

| 段落 | 时间 | 核心功能 |
|---|---|---|
| Week 9 | Admission package | 理解录取包、JW202/签证表、材料系统 |
| Week 10 | X1 visa | 签证中心、材料小游戏、行政摩擦 |
| Week 11 | Digital access | VPN/外部网络、WeChat、Alipay、手机号思维 |
| Week 12 | Housing | 单人间/双人间/等待分配，经济与社交取舍 |
| Week 13 | Flight and arrival plan | 航班费用、转机、上海浦东落地策略 |
| Week 14 | First semester setup | 专业预习、中文准备、上海地图与校园流程 |
| Week 15 | Packing and goodbye | 行李策略、家庭/朋友/自我告别 |
| Week 16 | Departure Eve returns | 回到开场房间，最终检查，登机去上海 |

---

## 3. 经济与数值目标

### 3.1 出发准备期主要消费

| 项目 | 建议范围 | 设计作用 |
|---|---:|---|
| 签证补材料/照片/打印 | 0-120 RMB | 行政摩擦，小额但消耗 energy |
| 数字工具/VPN/国际服务 | 0-180 RMB | digitalProficiency 与 has_vpn |
| 支付/电话准备 | 0-60 RMB | has_wechat / has_alipay / arrival friction |
| 宿舍押金/预订 | 300-1000 RMB | wealth 与 energy/guanxi 取舍 |
| 机票 | 1200-5200 RMB | 最大经济压力 |
| 打车/落地交通预案 | 0-60 RMB 预备成本 | 承接上海浦东落地 |
| 行李/药品/礼物 | 0-220 RMB | energy、guanxi、culture 取舍 |

### 3.2 数值风格

- `energy`：出发准备期的核心压力值；行政、排队、告别、红眼航班会消耗，准备充分和情绪支持会恢复。
- `wealth`：中等压力；玩家要感到机票、住宿、工具、礼物都是真钱，但不应频繁硬失败。
- `digitalProficiency`：负责签证预约、文件管理、VPN、支付、地图、DiDi、校园系统。
- `chinese`：负责签证沟通、落地交通、生活准备。
- `culture`：负责理解中国 app 生态、宿舍生活、家庭期待、校园节奏。
- `guanxi`：出发前主要通过 international group、admin、future roommate/buddy 累积。
- `relationships`：可以提前埋下 Sophie、Xiao Chen、Family 等关系，但不需要强绑定恋爱。

---

## 4. Week 9：Admission Package

### W9-01 Pre-Departure Start

中文设计目标：

- 承接 Week 8 的录取
- 说明申请不是终点，出发准备才开始
- 把 `JW202` 用玩家能理解的方式解释出来

English in-game speaker:

`Departure Eve`

English in-game text:

> The memory shifts from the acceptance email to the weeks after it. Minghai's admission package arrived with an official letter, a study visa form everyone in the group chat called "JW202", and instructions that somehow sounded calm while changing your entire summer.

Choice:

1. `Open the admission package again.`
   Effects: none
   Next: `e2_w9_package`

### W9-02 Admission Package

中文设计目标：

- 让玩家选择处理材料的风格
- 产生 document/admin/digital 方向差异

Choices:

1. `Build a careful document system.`
   Effects: `{ stats: { digitalProficiency: +5, energy: -5 }, flags: { decision_e2_package: "Careful document system", jw202_understood: true } }`
   Next: `e2_w9_checklist`

2. `Ask the Minghai international group what actually matters.`
   Effects: `{ stats: { digitalProficiency: +2 }, guanxi: { intlStudents: +5 }, flags: { decision_e2_package: "Student-group guidance", jw202_understood: true } }`
   Next: `e2_w9_checklist`

3. `Email the Global Education Office before guessing.`
   Effects: `{ stats: { energy: -3 }, guanxi: { admin: +6 }, flags: { decision_e2_package: "Admin-confirmed documents", jw202_understood: true } }`
   Next: `e2_w9_checklist`

---

## 5. Week 10：X1 Visa

中文设计目标：

- 使用现有 `visa` minigame
- 行政压力来自“材料准确性”，不是夸张惩罚
- 成功/失败都能继续，只是成本不同

Key flags:

- `got_visa`
- `decision_e2_visa`
- `visa_ready`

English in-game target copy:

> The visa center does not care that your future depends on this appointment. It cares about passports, copies, photos, the admission letter, the study visa form, and whether the person at the window can find everything before lunch.

Outcomes:

- Win: `decision_e2_visa: "Approved on first appointment"`, `got_visa: true`
- Lose: `decision_e2_visa: "Approved after document correction"`, `wealth -120`, `energy -15`, `got_visa: true`

---

## 6. Week 11：Digital Access

中文设计目标：

- 不把 VPN 写成炫技，而是写成“数字生活准备”
- 同时覆盖 WeChat、Alipay、手机、DiDi 等到达前必要准备
- 如果玩家选择不提前准备，后续抵达阶段会更有 friction

Key flags:

- `has_vpn`
- `has_wechat`
- `has_alipay`
- `decision_e2_vpn`
- `decision_e2_wechat`

Design note:

- `has_wechat` 可以继续作为 DiDi/支付便利条件。
- `has_vpn` 后续可用于随机事件 `random_vpn_down` 或学业检索事件。

---

## 7. Week 12：Housing

中文设计目标：

- 宿舍选择是经济、隐私、关系网的取舍
- 不建议一开始写复杂租房系统；第一版先用校内住宿和分配结果

Choices:

1. Single dorm:
   Effects: `wealth -1000`, `energy +12`, privacy/comfort

2. Double dorm:
   Effects: `wealth -600`, `guanxi intlStudents +6`, early social exposure

3. Wait for campus allocation:
   Effects: `wealth -300`, `energy -8`, `admin +4`, uncertainty

---

## 8. Week 13：Flight And Arrival Plan

中文设计目标：

- 机票是出发准备期最大经济决策
- 所有路线目的地必须是 Shanghai Pudong International Airport
- 同时让玩家提前决定落地交通策略

Flight choices:

- Direct to Shanghai Pudong: expensive, saves energy
- One-layover student fare: middle path
- Cheapest overnight route: saves money, costs energy but should leave enough cash to enter the first campus week

Arrival plan choices:

- DiDi after landing: needs digital setup logic, improves arrival comfort
- Official taxi queue: stable but costs more
- Ask Minghai buddy: stronger guanxi/relationship hook

---

## 9. Week 14：First Semester Setup

中文设计目标：

- 让出发准备不仅是行政，也包括“我到那边以后怎么开始学习”
- 承接专业方向，但不需要做三套完全独立剧情

Choices:

1. Review major materials:
   Effects: `academics +8`, `energy -8`

2. Practice survival Chinese for campus situations:
   Effects: `chinese +8`, `culture +5`

3. Save Shanghai maps, campus addresses, and registration screenshots:
   Effects: `digitalProficiency +8`, `admin guanxi +3`

---

## 10. Week 15：Packing And Goodbye

中文设计目标：

- 回收开场的 suitcase
- 让行李选择不仅是物品，也是价值观
- 告别节点提供 emotional energy，而不是剧情拖延

Packing choices:

- Comfort and health: `energy +12`, `wealth -120`
- Documents and study gear: `digital +5`, `academics +3`
- Gifts for future classmates/advisors: `wealth -220`, `guanxi localStudents +8`, `professors +8`, `culture +5`

Farewell choices:

- Call family properly: `energy +10`, `Family friendship +8`
- See friends one last time: `energy +5`, `wealth -100`
- Take a private walk: `energy +15`, `culture +3`

---

## 11. Week 16：Departure Eve Returns

中文设计目标：

- 结构上回到游戏开场的房间
- 玩家意识到前面所有准备都被装进了一个晚上
- 登机节点推动 `turn` 到 16，由 `page.js` 自动切到 `in_china_start`

Final choice:

`Board the flight to Shanghai.`

Effects:

```js
{
  stats: { energy: 10 },
  flags: {
    departed_for_shanghai: true,
    decision_e2_departure: "Boarded for Shanghai"
  }
}
```

Next:

`in_china_start`

---

## 12. 后续承接建议

进入 Epoch 3 后应优先读取这些 flags：

- `decision_e2_visa`
- `got_visa`
- `decision_e2_vpn`
- `has_vpn`
- `decision_e2_wechat`
- `has_wechat`
- `has_alipay`
- `decision_e2_housing`
- `housing_sorted`
- `decision_e2_flight`
- `direct_flight`
- `airport_transfer_plan`
- `has_didi`
- `decision_e2_pack`
- `decision_e2_farewell`

可以在抵达上海第一天制造差异：

- 没有 `has_wechat`：支付和 DiDi 选择受限
- 没有 `housing_sorted`：宿舍报到更累，但 admin guanxi 可帮忙
- `direct_flight`：落地 energy 更高
- `airport_transfer_plan` 为 buddy pickup：更早认识 Xiao Chen
- `decision_e2_pack` 为 gifts：更容易打开 local/professor guanxi
