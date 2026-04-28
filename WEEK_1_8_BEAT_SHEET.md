# 序章与 Week 1-8 详细 Beat Sheet

## 1. 文档目的

这份文档用于指导第一阶段剧情改写。

范围：

- 序章：出发前夜
- Week 1-8：回忆申请中国

语言规则：

- 中文用于设计说明
- English in-game copy 用于实际游戏内正文与选项
- 所有玩家可见文本最终应进入英文游戏数据

实现原则：

- 不把申请期写成 checklist
- 让每个输入信息都有剧情来源和数值来源
- 保留现有数值机制
- 申请学校发生在出国前
- 玩家从出发前夜开始，再通过物件与消息进入回忆

---

## 2. 第一阶段结构总览

| 段落 | 时间 | 核心功能 |
|---|---|---|
| Prologue | 出发前夜 | 情绪入口、物件触发、玩家投射 |
| Week 1 | 决定申请中国 | 来华动机、出发地区、路线种子 |
| Week 2 | 选择学校与专业 | 明海大学、专业方向、学业期待 |
| Week 3 | 文书与学习计划 | 学术能力、中文能力、AI/手写取舍 |
| Week 4 | 推荐人与家庭压力 | Professor Lin、家庭/朋友消息、关系系统 |
| Week 5 | 奖学金与资金方案 | 经济来源、预算、压力来源 |
| Week 6 | 体检与材料 | 现实流程、经济取舍、行政关系 |
| Week 7 | 面试/补材料/提交 | 数字能力、中文表达、admin guanxi |
| Week 8 | 录取结果与出发准备入口 | 接受 offer、生成 pre-departure flags |

---

## 3. 序章：出发前夜

### PRO-00 Departure Eve

中文设计目标：

- 开场不是“创建角色”，而是一个人坐在出发前夜的房间里
- 建立临行前的真实情绪：兴奋、害怕、期待、疲惫
- 引出“整理行李、手机消息、申请材料、航班确认”四个触发物

English in-game speaker:

`Departure Eve`

English in-game text:

> The suitcase is open on the floor, half-packed and already accusing you of forgetting something. Your passport lies beside the admission letter from Minghai University, Shanghai. Tomorrow morning, you fly to China. Tonight, every object in your room seems to remember a different version of how you got here.

Choices:

1. `Check the admission folder first.`
   Effects: none
   Next: `pro_admission_folder`

2. `Read the unread messages on your phone.`
   Effects: none
   Next: `pro_phone_messages`

3. `Start with the suitcase. Practical problems first.`
   Effects: `{ stats: { energy: +5 }, flags: { coping_practical_hint: true } }`
   Next: `pro_suitcase`

### PRO-01 Admission Folder

中文设计目标：

- 用录取材料触发 Week 1-2 回忆
- 明确申请中国不是落地后才发生

English in-game speaker:

`Admission Letter`

English in-game text:

> The paper still feels unreal: Minghai University, Undergraduate Admission, School of... You pause at the major line. It looks so official now, as if the choice was always inevitable. But months ago, it was just one tab among thirty, opened at 2:00 AM while you wondered whether China was a plan, a gamble, or an escape route.

Choices:

1. `Remember why you applied to China.`
   Effects: none
   Next: `week1_motive`

### PRO-02 Phone Messages

中文设计目标：

- 用消息引出家庭、朋友、同龄人压力
- 后续根据动机和资金来源回流

English in-game speaker:

`Phone`

English in-game text:

> Three messages wait on the lock screen. One from family, checking whether you packed medicine. One from a friend, asking if you are "actually doing this." One from the Minghai international student group, already arguing about SIM cards, bedding, and whether the canteen accepts foreign cards.

Choices:

1. `Reply to family first.`
   Effects: `{ flags: { family_thread_opened: true }, stats: { energy: -5 } }`
   Next: `pro_family_reply`

2. `Open the student group chat.`
   Effects: `{ flags: { intl_group_seen: true }, guanxi: { intlStudents: +3 } }`
   Next: `pro_group_chat`

### PRO-03 Suitcase

中文设计目标：

- 用行李触发“出发准备期”伏笔，但暂不进入 Week 9-16
- 先让玩家意识到申请只是第一段，准备才是第二段

English in-game speaker:

`Suitcase`

English in-game text:

> Clothes are easy. Documents are harder. You have a folder for originals, a folder for copies, a folder for copies of copies, and one mysterious photo with a blue background because someone online insisted China loves blue-background photos.

Choices:

1. `Put the documents on top. You trust paper more than luck.`
   Effects: `{ stats: { digitalProficiency: +2 }, flags: { document_careful: true } }`
   Next: `pro_flight_confirm`

2. `Pack comfort items first. Future-you can panic later.`
   Effects: `{ stats: { energy: +5 }, flags: { comfort_packer: true } }`
   Next: `pro_flight_confirm`

### PRO-04 Flight Confirmation

中文设计目标：

- 回到出发前夜
- 确认倒叙结构
- 作为序章通向 Week 1 回忆的主入口

English in-game speaker:

`Flight App`

English in-game text:

> Departure: tomorrow, 08:40. Destination: Shanghai. The app displays the route as a clean line across the map, which feels unfair. Nothing about this has been a clean line.

Choices:

1. `Think back to the first night this became real.`
   Effects: none
   Next: `week1_motive`

---

## 4. Week 1：为什么申请中国

### W1-01 Motive Seed

中文设计目标：

- 选择来华动机
- 生成路线种子与内心独白口径
- 让玩家从“我为什么走”开始，而不是从“填表”开始

English in-game speaker:

`Memory`

English in-game text:

> Months earlier, China was not yet a plane ticket. It was a search result, a scholarship page, a campus video, a conversation you did not know how to finish. Everyone asked what you wanted from it. The harder question was what you were willing to let it change.

Choices:

1. `A degree that can change the next ten years.`
   Effects: `{ stats: { academics: +10 }, flags: { motive_degree: true, academic_seed: true } }`
   Next: `w1_origin`

2. `Curiosity: the real China, not the algorithm's version.`
   Effects: `{ stats: { culture: +10, chinese: +5 }, flags: { motive_curiosity: true, local_seed: true } }`
   Next: `w1_origin`

3. `The scholarship made the impossible possible.`
   Effects: `{ stats: { wealth: +1000, energy: -5 }, flags: { motive_scholarship: true, academic_seed: true } }`
   Next: `w1_origin`

4. `A clean start somewhere nobody knows your old version.`
   Effects: `{ stats: { energy: +10, culture: +5 }, flags: { motive_restart: true, intl_seed: true } }`
   Next: `w1_origin`

### W1-02 Origin

中文设计目标：

- 保留现有出发地区机制
- 文案从标签改成“不同生活经验”
- 后续可回流到饮食、家庭、语言、签证、经济压力

English in-game speaker:

`Background`

English in-game text:

> Before China could become your destination, you had to understand what you were leaving. Home shaped your passport, your expectations, your budget, and the invisible assumptions you would carry into every classroom and canteen line.

Choices:

1. `A neighboring Asian country: close enough to feel familiar, different enough to surprise you.`
   Effects: `{ stats: { culture: +15, chinese: +10 }, flags: { origin_asian: true } }`
   Next: `w1_chinese_level`

2. `A Western country: the distance feels huge, but so does the possibility.`
   Effects: `{ stats: { wealth: +5000, chinese: -5 }, flags: { origin_western: true } }`
   Next: `w1_chinese_level`

3. `The Global South: this journey carries more than your own ambition.`
   Effects: `{ stats: { academics: +15, energy: +20, wealth: -2000 }, flags: { origin_developing: true } }`
   Next: `w1_chinese_level`

### W1-03 Chinese Foundation

中文设计目标：

- 新增汉语基础输入
- 让语言成为能力和身份压力，而不只是数值

English in-game speaker:

`Language`

English in-game text:

> Every China plan eventually becomes a language plan. You could open apps, memorize tones, watch dramas without subtitles, or pretend future-you would somehow become brave at airport counters.

Choices:

1. `Beginner: you know ni hao, xiexie, and the terror of tones.`
   Effects: `{ stats: { chinese: -5, energy: +5 }, flags: { chinese_beginner: true } }`
   Next: `end_week1`

2. `Classroom Chinese: your textbook self is braver than your real-life mouth.`
   Effects: `{ stats: { chinese: +10, academics: +5 }, flags: { chinese_classroom: true } }`
   Next: `end_week1`

3. `Heritage or self-taught Chinese: you can follow more than people expect.`
   Effects: `{ stats: { chinese: +20, culture: +5, energy: -5 }, flags: { chinese_strong: true } }`
   Next: `end_week1`

### W1-END

中文设计目标：

- Week 1 结束，进入申请行动
- 给玩家一种“身份已经被选择塑形”的感觉

English in-game speaker:

`System`

English in-game text:

> Week 1 ends with too many browser tabs and one strangely calm decision: you are really applying. China is no longer an abstract future. It has deadlines.

Choices:

1. `Continue to Week 2.`
   Effects: `{ stats: { energy: -5 } }`
   Action: `advance_turn`
   Next: `w2_school_major`

---

## 5. Week 2：学校与专业

### W2-01 School and Major

中文设计目标：

- 确认虚构学校明海大学
- 选择三类专业方向
- 专业不只是标签，后续影响课程、角色、结局

English in-game speaker:

`Application Portal`

English in-game text:

> Minghai University rises to the top of your list for reasons that feel both rational and impossible to explain: Shanghai, a strong international office, a campus close enough to the city to be dangerous, and three undergraduate tracks that each seem to promise a different version of you.

Choices:

1. `Business and Management: learn the market from inside the machine.`
   Effects: `{ stats: { wealth: +500, digitalProficiency: +5 }, flags: { major_business: true, career_seed: true } }`
   Next: `w2_school_research`

2. `Engineering and Computing: if the workload scares you, maybe it matters.`
   Effects: `{ stats: { academics: +10, digitalProficiency: +10, energy: -5 }, flags: { major_stem: true, city_seed: true } }`
   Next: `w2_school_research`

3. `Humanities and China Studies: understand the place beyond the skyline.`
   Effects: `{ stats: { chinese: +10, culture: +10 }, flags: { major_humanities: true, local_seed: true } }`
   Next: `w2_school_research`

### W2-02 School Research

中文设计目标：

- 玩家研究学校时看到现实信息与幻想信息混合
- 引出数字能力、国际学生圈、学业压力

English in-game speaker:

`Browser Tabs`

English in-game text:

> The official website is polished. The student forum is chaotic. A vlog shows sunshine, canteen noodles, and someone crying quietly during finals week. You realize research is not about finding the perfect university. It is about choosing which uncertainties you can live with.

Choices:

1. `Read official pages and application rules carefully.`
   Effects: `{ stats: { digitalProficiency: +5, energy: -5 }, guanxi: { admin: +3 }, flags: { researched_officially: true } }`
   Next: `end_week2`

2. `Join an international student group and ask blunt questions.`
   Effects: `{ guanxi: { intlStudents: +8 }, stats: { energy: +5 }, flags: { asked_student_group: true } }`
   Next: `end_week2`

3. `Watch campus vlogs until Shanghai feels almost familiar.`
   Effects: `{ stats: { culture: +5, energy: +5, academics: -3 }, flags: { campus_vlog_dreamer: true } }`
   Next: `end_week2`

### W2-END

English in-game speaker:

`System`

English in-game text:

> Week 2 ends with Minghai University pinned to the top of your list. The choice feels exciting until you notice the next tab: Personal Statement.

Choices:

1. `Continue to Week 3.`
   Effects: none
   Action: `advance_turn`
   Next: `w3_personal_statement`

---

## 6. Week 3：文书与学习计划

### W3-01 Personal Statement

中文设计目标：

- 保留现有“AI vs 手写”选择，但写得更像价值冲突
- 体现英文游戏中可以自然出现 DeepSeek 等现实工具

English in-game speaker:

`Personal Statement`

English in-game text:

> The prompt asks why you want to study in China. You type three honest sentences, delete them, then open a new tab. A perfect answer is easy to generate. A true answer is harder to survive.

Choices:

1. `Use AI to build a clean draft, then promise yourself you will edit it later.`
   Effects: `{ stats: { digitalProficiency: +10, academics: +3, energy: +5 }, flags: { statement_ai_draft: true } }`
   Next: `w3_feedback`

2. `Write it yourself, slowly and badly, until it sounds like you.`
   Effects: `{ stats: { academics: +10, chinese: +5, energy: -15 }, flags: { statement_manual: true } }`
   Next: `w3_feedback`

3. `Ask a senior applicant to tear it apart before the university can.`
   Effects: `{ guanxi: { intlStudents: +5 }, stats: { energy: -5, academics: +5 }, flags: { statement_peer_review: true } }`
   Next: `w3_feedback`

### W3-02 Feedback

中文设计目标：

- Professor Lin 第一次作为推荐人/老师出现
- 不是研究生导师，而是帮玩家看材料的老师或推荐人

English in-game speaker:

`Professor Lin`

English in-game text:

> Professor Lin replies faster than you expected. "The structure is fine," the email begins, which you quickly learn is academic language for: the real criticism starts now. He marks three sentences and writes, "This sounds impressive, but not specific. Why China? Why you?"

Choices:

1. `Revise for honesty, even if it looks less polished.`
   Effects: `{ stats: { academics: +8, energy: -8 }, guanxi: { professors: +10 }, flags: { lin_values_honesty: true } }`
   Next: `end_week3`

2. `Revise for impact. Admissions committees are not therapists.`
   Effects: `{ stats: { academics: +5, digitalProficiency: +5 }, guanxi: { professors: +3 }, flags: { lin_values_strategy: true } }`
   Next: `end_week3`

### W3-END

English in-game speaker:

`System`

English in-game text:

> Week 3 ends with a statement that is not perfect, but finally belongs to you.

Choices:

1. `Continue to Week 4.`
   Effects: none
   Action: `advance_turn`
   Next: `w4_recommendation`

---

## 7. Week 4：推荐人与家庭压力

### W4-01 Recommendation

中文设计目标：

- 推荐信是申请的一部分，也是关系系统入口
- 玩家要决定如何向老师求助

English in-game speaker:

`Email Draft`

English in-game text:

> The recommendation request sits unsent. You have written "Dear Professor Lin" six times, each version somehow sounding either too desperate or too casual. Asking for help is its own kind of exam.

Choices:

1. `Send a clear, respectful request with your materials attached.`
   Effects: `{ stats: { academics: +5, energy: -5 }, guanxi: { professors: +10 }, flags: { rec_request_professional: true } }`
   Next: `w4_family_call`

2. `Send a heartfelt message explaining what this opportunity means.`
   Effects: `{ guanxi: { professors: +6 }, stats: { energy: +3 }, flags: { rec_request_personal: true } }`
   Next: `w4_family_call`

3. `Delay it one more day because asking makes it real.`
   Effects: `{ stats: { energy: +5, academics: -5 }, flags: { rec_request_delayed: true } }`
   Next: `w4_family_call`

### W4-02 Family Call

中文设计目标：

- 家庭压力不是固定背景，而是根据资金和动机产生不同情绪
- 这里不需要问玩家国籍，仍可保持投射型

English in-game speaker:

`Family Call`

English in-game text:

> Your family asks practical questions first: documents, money, safety, food. Then comes the question under all the questions: are you sure? You hear love in it. You also hear fear. You are not sure which one feels heavier.

Choices:

1. `Reassure them with your plan, even the parts you are still inventing.`
   Effects: `{ stats: { energy: +5, digitalProficiency: +3 }, flags: { family_reassured: true } }`
   Next: `end_week4`

2. `Admit you are scared too.`
   Effects: `{ stats: { energy: +10 }, flags: { family_honest: true } }`
   Next: `end_week4`

3. `Keep it light. If you joke enough, nobody has to panic.`
   Effects: `{ stats: { energy: +5 }, flags: { family_deflected: true } }`
   Next: `end_week4`

### W4-END

English in-game speaker:

`System`

English in-game text:

> Week 4 ends with one recommendation request sent, one family call survived, and the uncomfortable realization that support can still feel heavy.

Choices:

1. `Continue to Week 5.`
   Effects: none
   Action: `advance_turn`
   Next: `w5_finance_plan`

---

## 8. Week 5：奖学金与资金方案

### W5-01 Finance Plan

中文设计目标：

- 资金来源正式进入游戏
- 和现有 `finance_scholarship`、`finance_rich`、`finance_working` 机制兼容
- 不把钱写成生存，而是写成选择边界

English in-game speaker:

`Budget Spreadsheet`

English in-game text:

> The spreadsheet does not care about courage. Tuition, dorm deposit, flights, visa fees, bedding, emergency money. The numbers line up neatly, which somehow makes them more terrifying.

Choices:

1. `Scholarship-funded: tuition is covered, but every grade feels watched.`
   Effects: `{ stats: { wealth: +1000, academics: +10 }, guanxi: { admin: +5 }, flags: { finance_scholarship: true } }`
   Next: `w5_budget_choice`

2. `Family-funded: you have a safety net, and the quiet pressure that comes with it.`
   Effects: `{ stats: { wealth: +20000, energy: +20, academics: -10 }, flags: { finance_rich: true } }`
   Next: `w5_budget_choice`

3. `Budget hustler: every yuan has a job before you spend it.`
   Effects: `{ stats: { wealth: -2000, energy: +15, culture: +10 }, flags: { finance_working: true } }`
   Next: `w5_budget_choice`

### W5-02 Budget Choice

中文设计目标：

- 让玩家第一次感到“花钱换便利、省钱换压力”
- 为后续经济系统建立认知

English in-game speaker:

`Budget Spreadsheet`

English in-game text:

> You create three versions of the budget: optimistic, realistic, and the one where nothing ever goes wrong, which you label "do not trust."

Choices:

1. `Build a strict budget and track every category.`
   Effects: `{ stats: { digitalProficiency: +5, energy: -5 }, flags: { budget_strict: true } }`
   Next: `end_week5`

2. `Leave room for mistakes. Future-you deserves oxygen.`
   Effects: `{ stats: { energy: +5, wealth: -300 }, flags: { budget_flexible: true } }`
   Next: `end_week5`

3. `Ask current students what things actually cost.`
   Effects: `{ guanxi: { intlStudents: +8 }, stats: { culture: +3 }, flags: { budget_peer_advice: true } }`
   Next: `end_week5`

### W5-END

English in-game speaker:

`System`

English in-game text:

> Week 5 ends with your future translated into numbers. It is not comforting, exactly, but it is real enough to plan around.

Choices:

1. `Continue to Week 6.`
   Effects: none
   Action: `advance_turn`
   Next: `w6_medical_form`

---

## 9. Week 6：体检与材料

### W6-01 Medical Form

中文设计目标：

- 保留体检表节点
- 修正经济尺度，用 RMB 逻辑而不是 `wealth -2`
- 让省钱、便利、求助三种路径都有代价

English in-game speaker:

`Medical Form`

English in-game text:

> The Foreigner Physical Examination Form looks simple until you bring it to a clinic. Suddenly every box needs the correct stamp, every stamp needs the correct department, and every department seems to be on a different floor of reality.

Choices:

1. `Use the public clinic and fight through the process. [Wealth -, Energy --, Culture +]`
   Effects: `{ stats: { wealth: -200, energy: -15, culture: +5 }, flags: { medical_public_clinic: true } }`
   Next: `w6_documents`

2. `Pay for an international clinic that knows the form. [Wealth --, Energy +]`
   Effects: `{ stats: { wealth: -900, energy: +5 }, flags: { medical_international_clinic: true } }`
   Next: `w6_documents`

3. `Ask a senior student how they survived it. [Guanxi +, Energy -]`
   Effects: `{ stats: { wealth: -100, energy: -5 }, guanxi: { intlStudents: +6 }, flags: { medical_peer_help: true } }`
   Next: `w6_documents`

### W6-02 Documents

中文设计目标：

- 材料准备不仅是“缺哪个”，而是玩家应对复杂系统的方式
- 连接 digitalProficiency 与 admin guanxi

English in-game speaker:

`Document Checklist`

English in-game text:

> Passport scan. Photo. Transcript. Recommendation letter. Study plan. Medical form. Each file has a different naming rule, and the portal rejects one PDF because it is somehow both too large and too small.

Choices:

1. `Rename everything carefully and build a backup folder.`
   Effects: `{ stats: { digitalProficiency: +8, energy: -5 }, flags: { documents_organized: true } }`
   Next: `end_week6`

2. `Email the international office before you make a fatal typo.`
   Effects: `{ guanxi: { admin: +8 }, stats: { energy: -3 }, flags: { asked_admin_early: true } }`
   Next: `end_week6`

3. `Submit what you have and trust the portal warnings.`
   Effects: `{ stats: { energy: +5, academics: -3 }, flags: { documents_rushed: true } }`
   Next: `end_week6`

### W6-END

English in-game speaker:

`System`

English in-game text:

> Week 6 ends with your documents assembled into something that almost looks official. Almost.

Choices:

1. `Continue to Week 7.`
   Effects: none
   Action: `advance_turn`
   Next: `w7_interview`

---

## 10. Week 7：面试、补材料与提交

### W7-01 Interview

中文设计目标：

- 面试或补材料作为申请高压点
- 根据中文基础、专业、动机可以写不同小变体

English in-game speaker:

`Online Interview`

English in-game text:

> The interview window opens. A professor, an administrator, and someone whose camera is permanently off appear on screen. They ask why Minghai, why China, why this major. For a second, all your prepared answers sound like they belong to someone calmer.

Choices:

1. `Answer with your academic plan.`
   Effects: `{ stats: { academics: +10, energy: -8 }, guanxi: { professors: +5 }, flags: { interview_academic: true } }`
   Next: `w7_submission`

2. `Answer with your curiosity about living and learning in China.`
   Effects: `{ stats: { culture: +8, chinese: +5 }, guanxi: { localStudents: +3 }, flags: { interview_culture: true } }`
   Next: `w7_submission`

3. `Answer honestly: you are nervous because this matters.`
   Effects: `{ stats: { energy: -3 }, guanxi: { professors: +3, admin: +3 }, flags: { interview_honest: true } }`
   Next: `w7_submission`

### W7-02 Submission

中文设计目标：

- 提交不是任务完成，而是心理悬空
- 设置申请策略 flag

English in-game speaker:

`Application Portal`

English in-game text:

> The submit button is blue, ordinary, and completely unreasonable. You hover over it long enough for the screen to dim. Months of wanting, explaining, scanning, translating, and pretending to be organized have become one click.

Choices:

1. `Submit after one final check.`
   Effects: `{ stats: { digitalProficiency: +5, energy: -5 }, flags: { submitted_carefully: true } }`
   Next: `end_week7`

2. `Submit now before fear invents another problem.`
   Effects: `{ stats: { energy: +5 }, flags: { submitted_impulsively: true } }`
   Next: `end_week7`

3. `Ask the international office to confirm one last detail.`
   Effects: `{ guanxi: { admin: +5 }, stats: { energy: -5 }, flags: { submitted_with_admin_help: true } }`
   Next: `end_week7`

### W7-END

English in-game speaker:

`System`

English in-game text:

> Week 7 ends with your application submitted. For the first time in weeks, there is nothing obvious to fix. This is somehow worse.

Choices:

1. `Continue to Week 8.`
   Effects: none
   Action: `advance_turn`
   Next: `w8_result`

---

## 11. Week 8：录取结果与出发准备入口

### W8-01 Result

中文设计目标：

- 第一阶段情绪收束
- 不做失败分支阻断主线，但可根据前面选择改变录取文本和奖学金状态
- 明确进入 Minghai University

English in-game speaker:

`Email Notification`

English in-game text:

> The email arrives while you are doing something completely ordinary. For a second, you only see the subject line: Minghai University Undergraduate Admission Result. Your hand goes cold before your brain catches up.

Choices:

1. `Open it immediately.`
   Effects: `{ stats: { energy: -5 }, flags: { result_opened_immediately: true } }`
   Next: `w8_acceptance`

2. `Wait five minutes because your life deserves dramatic timing.`
   Effects: `{ stats: { energy: +3 }, flags: { result_delayed_opening: true } }`
   Next: `w8_acceptance`

### W8-02 Acceptance

中文设计目标：

- 确认录取
- 回收专业、动机和资金
- 进入出发准备期

English in-game speaker:

`Minghai University`

English in-game text:

> Accepted. The word is smaller than it should be. No fireworks, no music, just a line of text that rearranges your year. Shanghai is no longer a possibility. It is a date, a campus, a dormitory room, and a version of yourself waiting somewhere ahead.

Choices:

1. `Accept the offer and start the pre-departure checklist.`
   Effects: `{ flags: { admitted_minghai: true, accepted_offer: true }, guanxi: { admin: +5 }, stats: { energy: +10 } }`
   Next: `w8_return_departure_eve`

### W8-03 Return to Departure Eve

中文设计目标：

- 从回忆回到出发前夜
- 玩家理解：申请期结束，出发准备期还会继续回忆
- 作为 Week 9-16 的入口

English in-game speaker:

`Departure Eve`

English in-game text:

> Back in your room, the admission letter is no longer just paper. It is proof that one part of the story already happened. Your suitcase is still open. Your phone buzzes again. The next memory waits in the pile of visa papers.

Choices:

1. `Continue to pre-departure memories.`
   Effects: none
   Action: `advance_turn`
   Next: `week9_predeparture_start`

---

## 12. Week 1-8 核心 flags 清单

| flag | 来源 | 用途 |
|---|---|---|
| `motive_degree` | Week 1 动机 | 学术/职业结局回收 |
| `motive_curiosity` | Week 1 动机 | 本地融入、文化事件回收 |
| `motive_scholarship` | Week 1 动机 | 奖学金压力、成绩要求 |
| `motive_restart` | Week 1 动机 | 国际学生视角、情绪线 |
| `origin_asian` | Week 1 出发地区 | 文化熟悉与反差 |
| `origin_western` | Week 1 出发地区 | 数字生态/语言冲击 |
| `origin_developing` | Week 1 出发地区 | 家庭期待、资金压力 |
| `chinese_beginner` | Week 1 汉语基础 | 初到中国求助与翻译依赖 |
| `chinese_classroom` | Week 1 汉语基础 | 课堂强、口语弱 |
| `chinese_strong` | Week 1 汉语基础 | 更强交流，也有被期待压力 |
| `major_business` | Week 2 专业 | 商科课程、职业线 |
| `major_stem` | Week 2 专业 | 理工课程、项目/创业线 |
| `major_humanities` | Week 2 专业 | 语言文化、本地融入线 |
| `statement_ai_draft` | Week 3 文书 | AI 工具、真实性冲突 |
| `statement_manual` | Week 3 文书 | 学术努力、压力 |
| `rec_request_professional` | Week 4 推荐信 | Professor Lin 认可 |
| `finance_scholarship` | Week 5 资金 | 奖学金压力 |
| `finance_rich` | Week 5 资金 | 家庭支持与独立冲突 |
| `finance_working` | Week 5 资金 | 兼职与经济压力 |
| `medical_public_clinic` | Week 6 体检 | 省钱但压力 |
| `documents_organized` | Week 6 材料 | 后续行政便利 |
| `interview_academic` | Week 7 面试 | 学术路线 |
| `interview_culture` | Week 7 面试 | 本地融入 |
| `interview_honest` | Week 7 面试 | 情绪真实与老师认可 |
| `submitted_carefully` | Week 7 提交 | 数字能力 |
| `admitted_minghai` | Week 8 录取 | 主线进入明海大学 |
| `accepted_offer` | Week 8 接受 | 出发准备入口 |

---

## 13. 数值节奏检查

Week 1-8 的数值目标：

| 数值 | 目标范围 | 说明 |
|---|---:|---|
| `academics` | 20-50 | 玩家能明显感到申请努力影响能力 |
| `chinese` | 5-45 | 根据语言基础有明显差异 |
| `wealth` | 3000-26000 | 资金来源差异明显，但不立即阻断 |
| `energy` | 55-100 | 申请期有压力，但不应过早崩盘 |
| `digitalProficiency` | 5-30 | 申请流程和工具使用带来成长 |
| `culture` | 0-35 | 主要来自动机、背景、学校研究 |
| `guanxi.admin` | 0-20 | 早期行政求助形成 |
| `guanxi.professors` | 0-25 | Professor Lin 线形成 |
| `guanxi.intlStudents` | 0-20 | 群聊和学长学姐建议形成 |

注意：

- 申请期不建议给太多 `culture`，因为真正文化适应应在抵达中国后发生
- `wealth` 的扣减必须使用 RMB 尺度
- `energy` 叙事上写成 stress、energy、mental bandwidth，不建议频繁在正文里直说 Energy

---

## 14. 下一阶段 Week 9-16 预留接口

Week 8 结束后应进入出发准备期。

建议 Week 9-16 覆盖：

| Week | 主题 |
|---|---|
| Week 9 | 签证、JW202、录取包裹 |
| Week 10 | 机票与到达城市确认 |
| Week 11 | 支付、手机号、VPN、常用 app 准备 |
| Week 12 | 宿舍申请、室友、行李策略 |
| Week 13 | 家庭与朋友告别 |
| Week 14 | 国际学生群、学长学姐、第一批人际预期 |
| Week 15 | 最后检查与突发问题 |
| Week 16 | 回到出发前夜，正式登机 |

Week 9-16 要回收 Week 1-8 的：

- 资金来源
- 语言基础
- 专业方向
- 文档组织方式
- 家庭沟通方式
- admin guanxi
- intlStudents guanxi

---

## 15. 一句话结论

序章和申请期应该让玩家感觉：自己不是在填写角色表，而是在一步步把“去中国读本科”这件事变成现实，并且每一次现实选择都开始改变未来的校园生活。
