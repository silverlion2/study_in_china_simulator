# Autonomous Development Queue

This file is the working queue for continuing Sim Panda without requiring the player/director to specify every next feature, scene, or CG.

## Priority Rule

Voice acting stays last. Until the playable build feels complete, development priority is:

1. Core gameplay loop and balance
2. Character-event depth
3. Phone/WeChat/Calendar as second gameplay layer
4. Endings and relationship payoff
5. CG and gallery coverage
6. Visual QA and mobile polish
7. Voice acting / MiniMax pass

## Current Completed Baseline

- Cover screen and Start flow.
- Opening objective chain.
- Weekly action economy.
- Route commitment system.
- Crisis branches and delayed consequences.
- Core character dialogue bubbles.
- Core character reply choices on 66/66 core-character nodes.
- Handwritten or node-specific scripted reply choices for all core-character nodes, including Academic / Research, Sophie international-student, Xiao Chen city/prototype, Manager Zhang career, Neighbor Li / Uncle Wang local life, and Epoch 3 milestone scenes.
- WeChat priority messages for relationship progression.
- WeChat check-ins and missed-message drift in the weekly loop.
- Character Arc progress UI.
- Multi-character ending afterwords.
- Calendar focus payoff, DiDi pickup-zone friction, Taobao address/service consequences, and phone-layer Gallery memories.
- Life Check / Prep Card system: key admin, academic, career, and local scenes now evaluate preparation through stats, relationship trust, route commitment, guanxi, and active prep cards.
- Route project panels in SimPad Story: Academic Portfolio, Internship Dossier, Neighborhood Map, Support Circle Guide, Shanghai Prototype, and Budget Ledger.
- Crisis recovery Life Checks for forced recovery, academic warning, retake grind, family transfer, hardship bursary, and mutual-aid recovery.
- Second-run memory: completed endings preserve a light meta-memory bonus on restart and become a small prep card for future checks.
- Ending afterword now includes route report and Life Check report in addition to relationship/system memories.
- Housing rent/commute effects in weekly loop.
- Story validation for node pointers, core-character replies, and image/magnet assets.

## Next Development Sprints

### Sprint A: Handwrite Remaining Character Branches

Goal: replace default reply templates with node-specific `dialogueChoices`.

Order:

1. Academic route events: Professor Lin and Dr. Mei - completed
2. Sophie international-student route - completed
3. Xiao Chen city/prototype route - completed
4. Manager Zhang career route - completed
5. Neighbor Li and Uncle Wang local route - completed
6. Epoch 3 milestone scenes - completed

Completion target met: core-character nodes remain reply-enabled, with remaining default templates replaced by node-specific scripted replies where they were still generic.

### Sprint B: Phone As Gameplay

Goal: make SimPad feel like the second board of the game, not only a menu.

Features:

- WeChat: per-contact unread messages, reply history, and missed-message consequences. Basic check-ins and silence drift are implemented; deeper per-contact history is next.
- Calendar: pinning a deadline should influence weekly focus and surface reminders. Basic focus payoff is implemented.
- Taobao: wrong address, review traps, cheap-item regret, and emergency service orders. Service orders and wrong-address consequence are implemented; review traps and cheap-item regret can be expanded.
- DiDi: time/energy shortcuts with pickup-zone mistakes and surge pricing. Shortcuts and pickup-zone friction are implemented; surge pricing can be expanded.
- Gallery: key memories grouped by route and character arc. Phone-layer memories were added to Gallery.

### Sprint C: Ending Payoff

Goal: endings should feel like the judgment of this particular life, not only a route label.

Features:

- Strongest route summary.
- Top three relationship afterwords.
- Crisis scars remembered.
- Housing/funding/background remembered.
- WeChat final messages from relevant characters.

### Sprint D: Balance And Playtest

Goal: tune the game until choices hurt in interesting ways.

Checks:

- Can the player recover from money crisis without feeling random?
- Does weekly action economy create meaningful tradeoffs?
- Are route endings reachable without grinding one stat blindly?
- Does energy pressure punish overextension without making the game brittle?
- Are relationship gates visible enough through WeChat and Story tabs?

### Sprint E: Life Checks And Route Play

Goal: make key scenes feel like playable tests of the life the player has been building.

Implemented first pass:

- Deterministic Life Check engine in `engine/GameState.js`.
- Prep cards derived from existing play: pinned calendar, admin prep, Professor notes, Dr. Mei field-note care, Sophie arrival guide, Manager Zhang feedback, Neighbor Li rules, Uncle Wang order bridge, phrase cards, city data pack, and WeChat repair habit.
- Choice preview now marks choices that trigger a Life Check.
- Dashboard now shows the latest Life Check score, DC, outcome message, and active prep cards.
- First integrated scenes: X1 visa document stack, Minghai registration, Professor Lin explanation, Dr. Mei field notes, Manager Zhang interview answer, Neighbor Li parcel crisis, and Uncle Wang order bridge.
- Route project panels added to SimPad Story.
- Crisis recovery choices now run Life Checks and leave stabilizing or scar flags.
- Second-run memory now gives a small start bonus and prep card after a completed ending.
- Ending afterword now reports strongest route and key Life Check performance.

Next expansion:

- Add more dedicated route actions that advance each project panel directly.
- Expand crisis recovery into 2-3 week arcs when a scar flag is present.
- Add optional second-run dialogue lines for scenes the player has already survived.

## CG Shot List

Generate or source CGs only when they pay off a specific memory, route, or emotional beat.

### Highest Priority CGs

1. `cg_sophie_arrival_rescue.png` - completed  
   Sophie and the player helping a lost new student through a phone call at the dorm elevators.

2. `cg_xiao_chen_onboarding_test.png` - completed  
   Xiao Chen and the player silently watching two students struggle with a prototype screen.

3. `cg_neighbor_li_parcel_crisis.png` - completed  
   Dorm hallway parcel mix-up with Neighbor Li, delivery driver, and students negotiating.

4. `cg_manager_zhang_mock_interview.png` - completed  
   Manager Zhang marking up the player's answer with a blunt, professional expression.

5. `cg_dr_mei_field_notes.png` - completed  
   Dr. Mei's messy field-note review at a cafe or research table.

6. `cg_professor_lin_plain_explanation.png` - completed  
   Professor Lin making the player explain a concept in plain language.

7. `cg_uncle_wang_order_bridge.png` - completed  
   Uncle Wang watching as the player helps a nervous student order without embarrassment.

### Medium Priority CGs

8. `cg_housing_shared_flat_first_night.png` - completed and wired to housing follow-up / Gallery.
9. `cg_studio_rent_pressure.png` - completed and wired to housing repair / Gallery.
10. `cg_calendar_midterm_warning.png` - completed and wired to delayed Calendar payoff / Gallery.
11. `cg_taobao_wrong_address.png` - completed and wired to Taobao address repair / Gallery.
12. `cg_didi_pickup_zone_confusion.png` - completed and wired to DiDi pickup-zone consequence / Gallery.

## Definition Of Done For Future Sprints

Every sprint should end with:

- `node build.js`
- `node validate_story.mjs`
- A short count of affected nodes/features
- Screenshot verification if UI changed
- No voice acting unless the playable foundation is already stable
