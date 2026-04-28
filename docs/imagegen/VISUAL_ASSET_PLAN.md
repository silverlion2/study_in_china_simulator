# 视觉资产升级计划

本文件用于把“在华留学模拟器”的文字体验升级成更接近视觉小说 / galgame 操作节奏的游戏体验。游戏内文本仍为英文，策划和开发记录可为中文。

## 目标

当前问题不是单纯剧情不够，而是视觉节奏不足：

- 主线大多数节点复用默认 `hub_bg.png`
- 申请、签证、出发、抵达、注册、课堂、宿舍、食堂等关键阶段缺少画面变化
- 玩家读到一半会感觉像在读长文本，而不是在玩视觉小说式模拟器

第一阶段目标：

- 每个主要流程阶段至少有 1 张专属背景
- 每 3-5 个主线节点至少发生一次明显视觉切换
- 每个 epoch 至少有 1 张关键 CG
- 暂不做大规模 UI 改版，优先用 `bgImage` 接入，低风险提升体感

## 统一视觉风格

建议风格：

- semi-realistic visual novel background
- cinematic but grounded study-abroad slice of life
- warm Shanghai campus atmosphere
- soft evening / fluorescent interior / rainy city lighting
- no exaggerated anime romance framing
- no photorealistic documentary faces unless角色立绘体系同步升级

统一 prompt 约束：

- square 1024x1024, compatible with current asset size
- no readable text, no logos, no watermarks
- leave safe lower third space for dialogue UI
- no famous real university logos
- fictional Minghai University only
- grounded China study-abroad mood, not survival game, not tourism ad

## 第一批资产

建议保存目录：

- `images/simulator/backgrounds/`
- `images/simulator/cg/`

### 主线背景

| 文件名 | 用途 | 优先级 |
|---|---|---|
| `bg_departure_eve_room.png` | 开场出发前夜房间 | P0 |
| `bg_application_laptop.png` | 申请期网页 / 材料准备 | P0 |
| `bg_visa_center.png` | X1 签证中心 | P0 |
| `bg_predeparture_suitcase.png` | 行李与出发准备 | P0 |
| `bg_airplane_window.png` | 飞往上海 | P0 |
| `bg_pudong_arrivals.png` | 上海浦东机场抵达 | P0 |
| `bg_minghai_gate.png` | 明海大学校门 | P0 |
| `bg_dorm_room.png` | 留学生宿舍 | P0 |
| `bg_canteen_counter.png` | 食堂点餐 | P0 |
| `bg_registration_office.png` | 注册 / 居留许可材料 | P0 |
| `bg_first_classroom.png` | 第一堂课 | P0 |
| `bg_library_night.png` | 图书馆夜读 / 学术路线 | P1 |
| `bg_shanghai_metro.png` | 上海地铁 / 城市移动 | P1 |
| `bg_career_office.png` | 职业办公室 / 合法实习 | P1 |
| `bg_incubator_room.png` | 明海孵化器 demo | P1 |

### 关键 CG

| 文件名 | 用途 | 优先级 |
|---|---|---|
| `cg_admission_email.png` | 录取邮件瞬间 | P0 |
| `cg_document_stack_jw202.png` | JW202 / 签证材料堆 | P0 |
| `cg_office_badge.png` | 上海办公室 badge | P1 |
| `cg_angel_demo.png` | 孵化器 demo / 天使投资 | P1 |
| `cg_return_offer.png` | full-time return offer | P1 |

## 当前生成状态

已完成并接入：

- P0 主线背景 / CG：13 张
- P1 路线背景 / 结局 CG：15 张
- 合计：28 张，均为 `1024x1024` PNG

当前仍未完成：

- 角色表情差分。当前已新增一轮更写实、更中国校园/上海生活气质的 `characters_v2` 母版，并接入游戏。下一轮如果继续做差分，必须以 `characters_v2` 为基准，避免回到泛二次元/AI 角色卡风格。

## 角色 v2 方向

已新增：

- `images/simulator/characters_v2/professor_lin_v2.png`
- `images/simulator/characters_v2/dr_mei_v2.png`
- `images/simulator/characters_v2/manager_zhang_v2.png`
- `images/simulator/characters_v2/uncle_wang_v2.png`
- `images/simulator/characters_v2/xiao_chen_v2.png`
- `images/simulator/characters_v2/neighbor_li_v2.png`
- `images/simulator/characters_v2/sophie_v2.png`
- `images/simulator/characters_v2/language_partner_v2.png`
- `images/simulator/characters_v2/delivery_driver_v2.png`
- `images/simulator/characters_v2/local_friend_v2.png`
- `images/simulator/characters_v2/canteen_auntie_v2.png`
- `images/simulator/characters_v2/dorm_auntie_v2.png`

角色 v2 标准：

- 更接近真实中国高校、上海办公室、社区摊位、宿舍管理和学生生活
- 半写实影视感，不做二次元恋爱游戏立绘
- 服装、年龄、气质要有生活真实感，避免网红脸、AI 精修脸、过度造型
- Sophie 可保持国际学生身份，但仍然要像真实交换生/本科生，而不是时尚插画

## 接入策略

生成图片前不建议先改剧情引用，否则缺图时会出现空背景。图片生成后按下面顺序接入：

1. 将最终 PNG 放入 `images/simulator/backgrounds/` 或 `images/simulator/cg/`
2. 给 `data/epoch1.js`、`data/epoch2.js`、`data/epoch3.js` 的关键节点补 `bgImage`
3. 优先接入主线节点，不急着覆盖所有 Hub 支线
4. 运行 `node build.js`
5. 启动 `npm start` 试玩前 20-30 分钟，看是否明显减少阅读疲劳

## GPT-image-2 CLI 生成方式

当前本机 shell 中 `OPENAI_API_KEY` 是 missing，因此暂时不能直接用 CLI 调 GPT-image-2。配置好 key 后可运行：

```bash
python3 /Users/mervyntsui/.codex/skills/.system/imagegen/scripts/image_gen.py generate-batch \
  --input docs/imagegen/scene_prompts.jsonl \
  --out-dir images/simulator/generated \
  --model gpt-image-2 \
  --size 1024x1024 \
  --quality high \
  --output-format png \
  --augment \
  --concurrency 3
```

生成后再人工筛选/移动到：

- `images/simulator/backgrounds/`
- `images/simulator/cg/`

不要未经筛选直接批量接入，因为 AI 图可能出现文字乱码、标志误生成、空间构图不适合 dialogue UI 等问题。
