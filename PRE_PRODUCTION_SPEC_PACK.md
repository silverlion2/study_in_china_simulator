# 前期开发规格补充包

## 1. 文档目的

这份文档把已经确认的方向转成开发前可用的规格表。

核心目标：

- 不改代码前提下，先把剧情、数值、经济、角色和英文落地格式定清楚
- 复用现有机制：`academics`、`chinese`、`wealth`、`energy`、`digitalProficiency`、`culture`、`guanxi`、`relationships`、`flags`
- 为后续改写 `data/epoch1.js`、`data/epoch2.js`、`data/epoch3.js` 和 `data/hubData.js` 提供明确依据
- 保持中文策划文档与英文游戏内容分离

制作原则：

- 中文负责设计说明
- 英文负责游戏内最终文案
- 所有关键选择都应该影响至少一类内容：数值、关系、经济、`flags`、路线倾向或后续可见剧情

---

## 2. 当前代码机制可直接承载的内容

### 2.1 初始状态

当前 `engine/GameState.js` 的初始值：

| 字段 | 初始值 | 设计含义 |
|---|---:|---|
| `academics` | 10 | 学术准备、课程跟进、申请质量 |
| `chinese` | 10 | 汉语能力、日常沟通、中文系统理解 |
| `wealth` | 5000 | 人民币资金池 |
| `energy` | 100 | 精力、心理承受力、压力余量 |
| `digitalProficiency` | 5 | 使用中国数字生态和工具的能力 |
| `culture` | 0 | 文化适应、生活理解、城市熟悉度 |
| `guanxi.admin` | 0 | 行政、办公室、流程资源 |
| `guanxi.localStudents` | 0 | 本地学生圈层关系 |
| `guanxi.intlStudents` | 0 | 国际学生圈层关系 |
| `guanxi.professors` | 0 | 任课老师、推荐人、项目指导关系 |

### 2.2 不改代码即可使用的叙事杠杆

| 机制 | 能做什么 | 适合承载 |
|---|---|---|
| `stats` | 数值增减 | 能力成长、压力、资金、适应度 |
| `guanxi` | 圈层关系变化 | 行政便利、老师认可、同学支持 |
| `relationships` | 个人关系变化 | 角色线、友情、可选感情线、角色尾声 |
| `flags` | 记录选择 | 动机、专业、家庭、申请策略、路线关键选择 |
| `condition` | 控制选项显示 | 让早期选择在后期回流 |
| `location` | 当前城市 | 上海主舞台与旅行支线 |
| `jobs` | 周收入与压力 | 校内助理、合法实习、风险兼职 |
| `transactions` | 钱包记录 | 经济叙事、消费后果、奖学金到账 |

### 2.3 暂不改代码时的路线倾向处理

理想状态可以新增隐藏路线值，例如：

- `route_academic`
- `route_local`
- `route_intl`
- `route_career`
- `route_city`

但如果当前阶段不改代码，可以先用 `flags` 和现有数值组合模拟路线倾向。

示例：

| 设计意图 | 不改代码做法 |
|---|---|
| 玩家偏学术路线 | 设置 `flags.academic_seed = true`，同时提高 `academics` 与 `guanxi.professors` |
| 玩家偏本地融入 | 设置 `flags.local_seed = true`，同时提高 `chinese`、`culture`、`guanxi.localStudents` |
| 玩家偏国际学生视角 | 设置 `flags.intl_seed = true`，提高 `guanxi.intlStudents` 与关键角色关系 |
| 玩家偏职业路线 | 设置 `flags.career_seed = true`，提高 `digitalProficiency`、`guanxi.admin`、`wealth` 压力事件 |
| 玩家偏城市机会 | 设置 `flags.city_seed = true`，提高 `digitalProficiency`、`culture`，绑定 Xiao Chen |

---

## 3. 序章输入与数值映射表

序章不是角色创建菜单，而是出发前夜的回忆触发器。

推荐结构：

1. 出发前夜，玩家整理行李
2. 手机消息、航班确认、录取材料依次出现
3. 每个物件触发一次回忆
4. 回忆里的选择生成初始数值、`flags`、关系入口和后续剧情回流

### 3.1 出发地区

当前已有机制可以保留，但文案要从“地理标签”变成“生活经验差异”。

| 选项 | English in-game choice | 建议效果 | 后续回流 |
|---|---|---|---|
| 邻近亚洲地区 | `A neighboring Asian country: close enough to feel familiar, different enough to surprise you.` | `chinese +10`、`culture +15`、`flag origin_asian` | 饮食适应快，但对“以为自己懂中国”产生反差 |
| 欧美/大洋洲背景 | `A Western country: the distance feels huge, but so does the possibility.` | `wealth +5000`、`chinese -5`、`flag origin_western` | 数字生态、课堂节奏、社交礼仪冲击更强 |
| 全球南方/发展中地区 | `The Global South: this journey carries more than your own ambition.` | `academics +15`、`energy +20`、`wealth -2000`、`flag origin_developing` | 奖学金压力、家庭期待、性价比判断更强 |

### 3.2 身份表达

当前性别选项建议继续只设置 `flags`，不要直接给能力数值。

| 选项 | English in-game choice | 建议效果 | 后续回流 |
|---|---|---|---|
| 男性 | `Male` | `flag gender_male` | 宿舍、社交场景、运动/夜宵事件细节 |
| 女性 | `Female` | `flag gender_female` | 安全感、宿舍关系、同伴支持事件 |
| 非二元/其他 | `Non-binary / another identity` | `flag gender_nonbinary` | 行政表格、宿舍安排、自我表达事件 |

写作注意：

- 不要把身份写成惩罚或刻板优势
- 主要用于生活细节、对话差异和玩家代入
- 如果后续写敏感场景，要把重点放在制度摩擦和支持网络，而不是猎奇

### 3.3 资金来源

资金来源是经济系统的第一颗种子，应当同时影响 `wealth`、压力、申请策略和结局判断。

| 选项 | English in-game choice | 建议效果 | 后续回流 |
|---|---|---|---|
| 政府/学校奖学金 | `Scholarship-funded: tuition is covered, but every grade feels watched.` | `wealth +1000`、`academics +10`、`guanxi.admin +5`、`flag finance_scholarship` | 成绩要求、续奖压力、行政邮件 |
| 家庭自费 | `Family-funded: you have a safety net, and the quiet pressure that comes with it.` | `wealth +20000`、`energy +20`、`academics -10`、`flag finance_rich` | 家庭期待、消费选择、独立性冲突 |
| 预算型/打工型 | `Budget hustler: every yuan has a job before you spend it.` | `wealth -2000`、`energy +15`、`culture +10`、`flag finance_working` | 兼职、低价生活技巧、经济焦虑 |

### 3.4 汉语基础

当前代码没有独立汉语基础选择，但建议在新版序章加入。

| 选项 | English in-game choice | 建议效果 | 后续回流 |
|---|---|---|---|
| 零基础 | `Beginner: you know ni hao, xiexie, and the terror of tones.` | `chinese -5`、`energy +5`、`flag chinese_beginner` | 初到中国更多求助、翻译软件依赖 |
| 课堂基础 | `Classroom Chinese: your textbook self is braver than your real-life mouth.` | `chinese +10`、`academics +5`、`flag chinese_classroom` | 考试强，口语弱，容易在真实场景卡壳 |
| 家庭/兴趣积累 | `Heritage or self-taught Chinese: you can follow more than people expect.` | `chinese +20`、`culture +5`、`energy -5`、`flag chinese_strong` | 被期待“应该懂”，也能解锁更多本地交流 |

### 3.5 来华动机

来华动机决定玩家的内心独白和路线倾向。

| 动机 | English in-game choice | 建议效果 | 路线种子 |
|---|---|---|---|
| 学历与未来 | `A degree that can change the next ten years.` | `academics +10`、`flag motive_degree` | 学术、职业 |
| 对中国好奇 | `Curiosity: you want the real China, not the algorithm's version of it.` | `culture +10`、`chinese +5`、`flag motive_curiosity` | 本地融入、城市机会 |
| 奖学金现实 | `The scholarship made the impossible possible.` | `wealth +1000`、`energy -5`、`flag motive_scholarship` | 学术、国际学生视角 |
| 家庭期待 | `Your family calls it an opportunity. You sometimes hear it as a responsibility.` | `academics +5`、`energy -10`、`flag motive_family` | 学术、职业、压力结局 |
| 重新开始 | `A clean start in a place where nobody knows your old version.` | `energy +10`、`culture +5`、`flag motive_restart` | 国际学生视角、关系线 |

### 3.6 专业方向

专业选择必须回流到课程、老师、同学、实习和结局。

| 专业 | English in-game choice | 初始效果 | 主要压力 | 路线连接 |
|---|---|---|---|---|
| 商科 / 经管 | `Business and Management` | `wealth +500`、`digitalProficiency +5`、`flag major_business` | 竞争、社交、实习 | 职业、城市机会 |
| 理工 / 计算机 | `Engineering and Computing` | `academics +10`、`digitalProficiency +10`、`energy -5`、`flag major_stem` | 课程强度、小组项目 | 学术、城市机会 |
| 人文 / 中国研究 / 传播 | `Humanities and China Studies` | `chinese +10`、`culture +10`、`flag major_humanities` | 阅读量、表达、身份讨论 | 本地融入、国际学生视角 |

### 3.7 性格/应对方式

性格不应固定主角人格，而是定义玩家面对压力时的默认工具箱。

| 倾向 | English in-game choice | 建议效果 | 后续回流 |
|---|---|---|---|
| 计划型 | `Plan first. Panic later, if scheduled.` | `digitalProficiency +5`、`energy +5`、`flag coping_planner` | 文档、签证、抢课、预算更稳 |
| 社交型 | `Ask people. Someone always knows someone.` | `guanxi.localStudents +5`、`guanxi.intlStudents +5`、`flag coping_social` | 更容易打开角色线 |
| 独立型 | `Figure it out alone, even if it takes three browser tabs and one existential crisis.` | `academics +5`、`digitalProficiency +5`、`energy -5`、`flag coping_independent` | 工具流、独自解决，压力更高 |
| 体验型 | `Say yes first. Understand later.` | `culture +10`、`energy +5`、`wealth -300`、`flag coping_explorer` | 城市体验、随机事件、消费诱惑 |

---

## 4. 英文文案风格指南

### 4.1 总体语气

游戏内英文应该是：

- 第二人称叙事为主，保持玩家投射感
- 青年感强，但不要过度网络段子化
- 具体、生活化、有轻微幽默
- 情绪关键点要真诚
- 避免把留学写成末日生存

推荐语气：

> You zip the suitcase halfway, then stop. The admission letter sits on your desk like a door someone already opened for you.

不推荐语气：

> You must survive China or your life will be destroyed.

### 4.2 系统词口径

| 中文设计词 | 游戏内英文建议 | 说明 |
|---|---|---|
| 生存 | `adjustment`、`pressure`、`balance` | 不把游戏说成生存游戏 |
| 精神值 | `energy`、`stress`、`mental bandwidth` | UI 可保留 `Energy`，叙事少直接说 |
| 关系 | `relationships` | 个人关系 |
| 关系/人脉/圈层 | `guanxi` | 可保留拼音，但要解释 |
| 老师 | `professor`、`teacher`、`laoshi` | `laoshi` 首次出现要自然解释 |
| 留学 | `studying in China`、`your China year` | 避免只写 `study abroad` 导致地点感弱 |

### 4.3 中国语境词的处理

可以保留：

- `guanxi`
- `HSK`
- `WeChat`
- `Alipay`
- `DiDi`
- `Taobao`
- `laoshi`
- `xueshenghui`
- `hukou` 如果后续涉及城市制度，但本科线里不建议过早使用

首次出现写法示例：

> Professor Lin calls it guanxi, the web of relationships that decides which doors open easily and which ones stay politely closed.

> Your classmate saves you as "new laowai friend" on WeChat. You are not sure whether to laugh, correct them, or be grateful they remembered your name.

### 4.4 选项文本公式

推荐格式：

`动作 + 个性/代价 + 中等数值提示`

示例：

| 功能 | 示例 |
|---|---|
| 普通选择 | `Rewrite the study plan yourself. [Academics +, Chinese +, Energy -]` |
| 关系选择 | `Ask Professor Lin for honest feedback, not just a signature.` |
| 经济选择 | `Choose the cheaper clinic and accept a day of confusion. [Wealth +, Energy -]` |
| 路线选择 | `Pick the major that scares you for the right reasons.` |

避免：

- 选项只写情绪，不写行为
- 每个选项都像系统菜单
- 数值提示过长，把剧情气氛打断

### 4.5 叙事长度建议

| 类型 | 建议长度 |
|---|---:|
| 普通节点正文 | 60-110 英文词 |
| 情绪节点正文 | 100-160 英文词 |
| 系统教程正文 | 40-70 英文词 |
| 选项文本 | 8-22 英文词 |
| 手机消息 | 1-3 句 |
| 结局正文 | 180-350 英文词 |

---

## 5. 虚构上海高校设定

### 5.1 学校基础

中文策划名：

> 明海大学

游戏内英文名：

> Minghai University

一句话设定：

> A fictional comprehensive university in Shanghai where international ambition, local routine, and city opportunity constantly collide.

学校定位：

- 上海综合型大学
- 国际学生比例较高
- 有成熟国际学生办公室
- 学术、职业、城市机会都能承载
- 不影射具体真实高校，避免现实细节负担

### 5.2 校园结构

| 区域 | 功能 | 可承载事件 |
|---|---|---|
| International Student Dormitory | 玩家宿舍、初到生活、室友关系 | 入住、淘宝、宿舍检查、深夜聊天 |
| Student Canteen 1 | 日常食物、语言练习、低价生活 | 点餐、排队、手机支付、同桌搭话 |
| Global Education Office | 行政、签证、奖学金、注册 | JW202、居留许可、续奖、材料错误 |
| Main Library | 学业压力、考试、深夜学习 | midterm、抢座、学习小组 |
| School of Business and Management | 商科线 | 案例课、招聘会、商业竞赛 |
| School of Engineering and Computing | 理工线 | 小组项目、实验室、AI 创业 |
| School of Humanities and China Studies | 人文线 | 语言、文化、田野观察、传播项目 |
| Riverside Innovation Hub | 城市机会、创业、实习 | Xiao Chen、路演、跨境项目 |
| Metro Gate | 校园与上海连接点 | 通勤、迷路、城市探索 |

### 5.3 上海主舞台分区

| 场景 | 主题 | 角色/路线 |
|---|---|---|
| Yangpu-style campus district | 学生生活、咖啡馆、创业气氛 | Xiao Chen、学业、城市机会 |
| People Square / Nanjing Road | 初见上海的消费与人流 | 国际学生视角、经济压力 |
| Former French Concession | 语言交换、咖啡、夜生活 | Sophie、文化适应 |
| Lujiazui | 职业想象、金融与 skyline | Manager Zhang、职业线 |
| Local night market street | 本地生活、人情与食物 | Uncle Wang、本地融入 |
| Hongqiao station | 出行、节假日、全国连接 | 旅行支线 |

---

## 6. 三类专业路线细化

### 6.1 Business and Management

核心体验：

- 你来到中国，不只是学习中国，也是在学习如何和一个巨大市场打交道。

典型课程：

- Chinese Market Basics
- Cross-Border E-Commerce
- Management Communication
- Business Chinese

主要角色：

- Manager Zhang
- Xiao Chen
- Professor Lin

典型事件：

- 小组展示里本地同学默认你负责英文部分
- 招聘会要求中英文自我介绍
- 课堂案例讨论中国平台经济
- 家庭质疑“商科是不是太普通”

数值重心：

- `academics`
- `digitalProficiency`
- `wealth`
- `guanxi.admin`
- `relationships.Manager Zhang`

结局连接：

- 职业发展
- 城市机会 / 创业

### 6.2 Engineering and Computing

核心体验：

- 你以为技术是通用语言，直到小组项目、实验文档和中文平台同时开口说话。

典型课程：

- Programming Lab
- Data Structures
- AI Applications in China
- Engineering Project Workshop

主要角色：

- Dr. Mei
- Xiao Chen
- 本地项目组同学

典型事件：

- Git 群里全是中文缩写
- 小组项目没人明确分工，但大家都在凌晨提交
- 创业园活动邀请你做国际展示
- 你开始理解“卷”不是形容词，是天气系统

数值重心：

- `academics`
- `digitalProficiency`
- `energy`
- `guanxi.localStudents`
- `relationships.Dr. Mei`

结局连接：

- 学术深耕
- 城市机会 / 创业

### 6.3 Humanities and China Studies

核心体验：

- 你不是只来学习中国，而是在不断发现“理解中国”这件事本身也需要被理解。

典型课程：

- Modern Chinese Society
- Chinese Language Practicum
- Media and Everyday Life
- Intercultural Communication

主要角色：

- Professor Lin
- Sophie
- Uncle Wang
- Language Partner

典型事件：

- 课堂讨论里你发现自己的“外部视角”既有价值也有限
- 本地朋友纠正你对某个词的理解
- 国际学生之间对中国体验产生分歧
- 你第一次用中文表达一个复杂情绪

数值重心：

- `chinese`
- `culture`
- `energy`
- `guanxi.localStudents`
- `relationships.Sophie`
- `relationships.Uncle Wang`

结局连接：

- 本地融入
- 国际学生视角

---

## 7. 角色功能规格表

### 7.1 角色优先级

| 角色 | 游戏内名称 | 功能 | 主路线 | 关系类型 |
|---|---|---|---|---|
| 任课老师/推荐人 | Professor Lin | 申请期推荐信、学术规则、课程反馈 | 学术、职业 | `guanxi.professors` |
| 项目指导老师 | Dr. Mei | 本科项目、讲座、研究协助 | 学术 | `relationships.Dr. Mei` |
| 本地学生/创业者 | Xiao Chen | 上海机会、技术创业、本地同龄人 | 城市机会 | `relationships.Xiao Chen` |
| 国际学生朋友 | Sophie | 国际学生视角、情绪支持、可选感情 | 国际学生视角 | `relationships.Sophie` |
| 夜宵摊老板 | Uncle Wang | 本地生活、语言自信、人情味 | 本地融入 | `relationships.Uncle Wang` |
| 企业导师 | Manager Zhang | 招聘、职场礼仪、合规与机会 | 职业 | `relationships.Manager Zhang` |
| 宿舍邻居 | Neighbor Li | 初到校园、生活求助、本地学生入口 | 本地融入 | `guanxi.localStudents` |
| 国际学生办公室老师 | Ms. Zhou | 行政流程、奖学金、签证提醒 | 行政、现实压力 | `guanxi.admin` |

### 7.2 角色弧线模板

每个主要角色都应至少有 4 个阶段：

| 阶段 | 功能 |
|---|---|
| 初遇 | 解决一个具体问题，建立第一印象 |
| 互惠 | 玩家帮助对方或被对方帮助 |
| 冲突 | 价值观、规则、金钱、时间或身份产生摩擦 |
| 回收 | 关系影响路线、结局或角色尾声 |

### 7.3 角色写作原则

- 角色不是奖励按钮，要有自己的生活
- 感情线可以存在，但不能吞掉留学主轴
- 中国角色不能只负责“解释中国”
- 国际学生角色不能只负责吐槽中国
- 每个角色至少代表一种真实留学问题

### 7.4 角色个人冲突建议

| 角色 | 冲突 |
|---|---|
| Professor Lin | 欣赏努力，但不鼓励玩家只追求漂亮履历 |
| Dr. Mei | 给机会，也要求玩家承担真实学术压力 |
| Xiao Chen | 机会很诱人，但边界、风险和功利性也真实存在 |
| Sophie | 理解玩家的孤独，但她自己的逃避也会影响关系 |
| Uncle Wang | 温暖接地气，但玩家要意识到亲近不等于完全理解 |
| Manager Zhang | 能开门，也会让玩家面对职场交换和合规边界 |
| Neighbor Li | 乐于帮忙，但也会疲惫于总是被当成翻译工具 |
| Ms. Zhou | 看似冷冰冰，其实代表制度的压力和保护 |

---

## 8. 经济系统规格

### 8.1 经济设计目标

经济压力应为中等：

- 钱经常影响选择
- 钱不能频繁阻断主线
- 花钱应该换来时间、便利、社交或情绪恢复
- 省钱应该换来压力、时间成本、关系求助或风险

### 8.2 推荐金额尺度

当前系统以 RMB 为单位，初始资金为 `5000`，每周生活费为 `200`。

后续剧情建议统一成本尺度，避免出现 `wealth -2` 这种不符合 RMB 语感的事件成本。

| 类型 | 推荐范围 | 说明 |
|---|---:|---|
| 食堂一餐 | 12-30 | 可用于风味事件，不必每餐扣 |
| 咖啡/奶茶 | 20-45 | 社交小成本 |
| 打印/证件照/快递 | 20-120 | 申请期常用 |
| 体检/材料公证 | 200-900 | 申请期压力点 |
| 签证/居留相关杂费 | 300-1000 | 出发准备与落地行政 |
| 宿舍用品 | 200-800 | 初到中国必要消费 |
| KTV/聚餐 | 150-500 | 社交与经济取舍 |
| 周末旅行 | 500-1200 | 文化收益高，但不应频繁 |
| 城市职业社交 | 50-300 | 咖啡、交通、晚餐 |
| 紧急支出 | 500-2000 | 手机坏、错过车、医疗等 |

### 8.3 资金状态分层

| `wealth` 区间 | 状态 | 叙事表现 |
|---:|---|---|
| 0-999 | 危险 | 开始错过活动、焦虑、向人求助 |
| 1000-2999 | 紧张 | 每次消费都需要权衡 |
| 3000-7999 | 稳定 | 能体验大多数日常内容 |
| 8000-19999 | 宽裕 | 可以购买便利和社交机会 |
| 20000+ | 安全网 | 经济压力低，但可引入独立性和目标感问题 |

### 8.4 收入来源

| 来源 | 建议收益 | 代价 | flags |
|---|---:|---|---|
| 奖学金补贴 | +300 到 +800 / 周 | 成绩要求、行政审核 | `finance_scholarship` |
| 校内助理 | +300 到 +600 / 周 | `energy -5`，时间减少 | `campus_assistant` |
| 合规实习 | +800 到 +1500 / 周 | 需要 admin/professor 关系 | `legal_internship` |
| 风险兼职 | +1000 到 +2500 / 次 | 签证风险、压力、后果事件 | `illegal_job` |
| 家庭汇款 | +1000 到 +5000 / 次 | 家庭压力、独立性冲突 | `family_transfer` |
| 小额翻译/活动协助 | +100 到 +500 / 次 | 关系入口，收益不稳定 | `event_helper` |

### 8.5 消费选择的叙事公式

每个消费事件最好提供 2 到 3 个路径：

| 路径 | 玩家体验 |
|---|---|
| 便宜但麻烦 | 省钱，损失 `energy` 或时间，可能提高 `culture` |
| 标准方案 | 中等成本，中等结果 |
| 昂贵但省心 | 花钱，恢复 `energy` 或获得关系/效率 |

示例：

> Public clinic: `wealth -200`、`energy -15`、`culture +5`

> International clinic: `wealth -900`、`energy +5`

> Ask a senior student: `wealth -100`、`guanxi.intlStudents +5`、`energy -5`

---

## 9. 路线与结局判定表

### 9.1 五条主路线

| 路线 | 核心问题 | 核心数值 | 核心关系 |
|---|---|---|---|
| 学术深耕 | 我能不能真正跟上并产出成果 | `academics`、`chinese` | Professor Lin、Dr. Mei |
| 本地融入 | 我能不能在中国建立日常归属 | `chinese`、`culture` | Uncle Wang、Neighbor Li、本地学生 |
| 国际学生视角 | 我如何理解自己和其他外来者 | `energy`、`culture` | Sophie、国际学生圈 |
| 职业发展 | 我能不能把留学转成职业机会 | `academics`、`digitalProficiency`、`wealth` | Manager Zhang、admin |
| 城市机会 / 创业 | 我能不能抓住上海的流动性 | `digitalProficiency`、`culture`、`wealth` | Xiao Chen、本地学生 |

### 9.2 推荐结局结构

| 结局 | 推荐条件 | 情绪基调 |
|---|---|---|
| Academic Foundation | `academics >= 80`，`guanxi.professors >= 35`，Dr. Mei/Professor Lin 至少一条完成 | 理想中带压力，打开继续深造或研究项目 |
| Local Bridge | `chinese >= 70`，`culture >= 70`，`guanxi.localStudents >= 35`，本地角色线完成 | 温暖，但承认归属不是一劳永逸 |
| International Anchor | `guanxi.intlStudents >= 40`，Sophie 或国际学生线完成，`energy >= 40` | 自我接纳，不一定留在中国但真正被改变 |
| Career Launch | `academics >= 60`，`digitalProficiency >= 50`，Manager Zhang 线完成，未触发严重违规 | 现实主义成功，有职场代价 |
| Shanghai Opportunity | `digitalProficiency >= 65`，Xiao Chen 线完成，`wealth >= 3000` 或有投资/项目 flag | 兴奋、风险、开放结尾 |
| Quiet Return | 主路线条件不足，但 `energy >= 30` 且完成核心学业 | 不失败，像真实人生的一段结束 |
| Burnout Ending | `energy <= 0` 或长期压力 flag 叠加 | 遗憾，但要给玩家理解而不是羞辱 |
| Financial Emergency | `wealth <= 0` 且无奖学金/工作/关系补救 | 现实阻断，可引导重开或不同策略 |
| Compliance Trouble | `illegal_job` 等风险 flag 与 admin 关系低 | 现实后果，不写成爽文投机 |

### 9.3 结局文本必须回收的内容

结局至少回收 5 类信息：

- 来华动机
- 专业方向
- 资金来源
- 至少一条主要角色关系
- 最后阶段的关键选择

结局不应只写：

- 你达到了某个数值
- 你成功或失败
- 你获得某个工作/offer

结局应该回答：

> 这一年之后，玩家如何重新理解自己、上海、中国和未来？

---

## 10. 后续剧情节点交付格式

每个可落地剧情节点建议使用以下模板。

```md
### Node ID

中文设计目标：

- 这一节点解决什么剧情功能
- 这一节点推动什么路线
- 这一节点回收哪些前置 flags

English in-game speaker:

English in-game text:

Choices:

1. English choice text
   Effects:
   Next:

2. English choice text
   Effects:
   Next:

Notes:

- 数值是否符合中等反馈
- 是否需要条件显示
- 是否影响后续结局
```

---

## 11. 立即落地优先级

建议下一步顺序：

1. 先按 `WEEK_1_8_BEAT_SHEET.md` 改写 `epoch1`
2. 把序章从教程式角色创建改成出发前夜倒叙
3. 增加汉语基础、来华动机、专业方向、应对方式四类输入
4. 统一申请期经济数值为 RMB 尺度
5. 把 Week 1-8 的 `flags` 命名稳定下来
6. 再继续写 Week 9-16 出发准备

---

## 12. 一句话结论

前期开发现在最需要的不是继续扩大世界，而是把每个选择变成可追踪的因果：玩家为什么来中国，如何申请，带着什么资源与压力出发，又如何在上海把这些选择变成一段具体的人生。
