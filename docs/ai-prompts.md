# AI 主图 Prompt 集

> 目标：为个人网站生成**一张超大尺寸（5000×3000）的主舞台背景图**，整站会以这张图为唯一画面，靠 dolly-zoom 推进 6 个章节。
>
> 你的人设：
> - 自动驾驶算法工程师 → AI / Agent 工程师 → 计划进入具身智能（机器人）
> - 两面性：**engineer / 爱孩子的爸爸**

---

## 0. 视觉策略（先看这个再选 prompt）

原作者的图妙在**一个画面里塞了 3 层焦点**：
- 远景：车窗外悬浮的人（超现实）
- 中景：暖红色房间（情绪）
- 近景：车内方向盘/座椅（视点）

dolly zoom 时镜头穿过这 3 层，每一层进入视野时刚好对应一个章节。

**你的版本**应该至少有 3 层焦点，按你的故事线对应：
- **远景**：自动驾驶相关意象（夜晚的高速公路 / 车头灯 / 城市轮廓）
- **中景**：当前的 AI 工作（书房 / 多屏代码 / 暖光台灯）
- **近景**：家庭 / 孩子（孩子的玩具、睡着的孩子、童书、积木 —— 这一层是温度的来源）

**贯穿三层的超现实物件**（替代他的"飘浮的人"）：可选
- A. 一个**机器人小孩**（embodied AI 的具象，连接你"未来"和"家庭"）
- B. 一片**飘浮的纸张/代码符号**（论文、白板公式、ROS 节点图飘在空中）
- C. **一辆漂浮的自动驾驶概念车**（小尺寸、玩具感、致敬 toy story）
- D. 一只**飘浮的玩具熊**作为"父爱"的隐喻锚点

我个人最推荐 **A（机器人小孩）+ D（玩具熊）混合** —— 既覆盖具身智能的未来感，又保留父爱的温度，这是原作者图里没有的、属于你独有的情感张力。

---

## 1. 主图 Prompt（4 个候选，按推荐度排序）

### Prompt A — 推荐 ⭐⭐⭐⭐⭐：父亲书房 + 漂浮的小机器人

**中文意图**：深夜书房，父亲（你）的工作台堆满代码和论文，房间另一角是孩子的小床，孩子睡着了，房间中央悬浮着一个小型类人机器人（像玩具但有未来感），玻璃窗外是模糊的高速公路灯流。

**Midjourney v6 prompt**：
```
A cinematic ultra-wide interior scene at midnight, deep warm shadows with cold blue window light, view from a half-open doorway looking into a study room. On the left: a heavy wooden desk covered in scattered papers with neural network diagrams, an open laptop glowing faintly with terminal text, three vertical monitors showing autonomous driving point cloud visualizations in soft cyan, a half-empty coffee mug. On the right: a small toddler bed with a sleeping child barely visible under a blanket, a soft nightlight casting amber glow, scattered plush toys on the floor. Floating in the middle of the room, suspended in air with no strings, a small humanoid robot the size of a child, white minimalist design, gentle posture as if mid-step, soft rim light from the window. Behind the room through a tall window: blurred bokeh of distant highway headlights streaking across a dark city skyline. Dust motes catching light. Painterly realism, 35mm film grain, deep cinematic darkness with selective warm pools of light, ultra-detailed, high dynamic range. Color palette: deep navy black, warm amber, soft cyan accents, muted terracotta. Mood: tender, contemplative, suspended between past and future. --ar 5:3 --style raw --quality 2 --v 6
```

**Flux Dev prompt**（如果用 ComfyUI）：
```
cinematic wide-angle interior photograph, midnight study room, warm tungsten lighting mixed with cool moonlight from a tall window, [LEFT] heavy wooden desk with scattered AI research papers and code printouts, three monitors displaying lidar point clouds and neural network graphs in soft cyan, glowing laptop screen, half-empty ceramic coffee mug, mechanical keyboard, [CENTER] a small humanoid robot child silhouette floating mid-air weightless, no visible support, white matte plastic finish with soft amber rim light, [RIGHT] toddler crib with sleeping child under blanket, plush teddy bear on the floor, amber nightlight, [BACKGROUND] tall window showing blurred bokeh highway lights streaking through dark city, [ATMOSPHERE] dust particles in light beams, deep film grain, painterly oil painting realism, color palette deep navy black warm amber muted terracotta soft cyan, ultra detailed 8k, mood tender contemplative suspended between past future
```

---

### Prompt B — 推荐 ⭐⭐⭐⭐：自动驾驶车内回望

**中文意图**：从一辆停在山顶观景台的自动驾驶概念车的内部往后看，前挡风玻璃外是城市夜景灯流，副驾座椅上放着孩子的儿童安全座椅 + 玩具熊，仪表盘漂浮着代码和路径规划线条。这是更"原作者风格"的车内视角，但场景换成了你的世界。

**Midjourney v6 prompt**：
```
Cinematic ultra-wide first-person view from inside a futuristic autonomous vehicle parked on a mountain overlook at night, looking forward and slightly downward. Foreground: a sleek minimalist dashboard with no traditional controls, holographic projections of road path planning curves and bounding boxes floating above it in cyan. Mid-ground (passenger seat): an empty child car seat with a worn plush teddy bear strapped in, a small picture book on the seat, a tiny sneaker on the floor. Through the windshield: vast city skyline at night with amber and warm-white streaks of highway light trails extending into the distance, low fog over the valley, distant cranes silhouetted. Soft interior cabin lighting in deep amber. Floating just outside the windshield, slightly off-center, a small humanoid robot in white, looking back at the viewer with curiosity, suspended weightlessly. Painterly realism, 35mm grain, deep darks with selective warm highlights, dust particles. Color palette: deep navy, warm amber, soft cyan, terracotta. Mood: hopeful melancholy, journey, fatherhood meets technology. --ar 5:3 --style raw --quality 2 --v 6
```

---

### Prompt C — 推荐 ⭐⭐⭐：家 + 工作室的"墙的破口"

**中文意图**：一面墙把画面分成两半 —— 左边是工程师工作站（多屏、代码、机器人手臂模型），右边是孩子的房间（积木、童画、小床）。墙中央有一个不规则的破口/裂缝，光从裂缝里漏过来，一些纸张和小玩具从破口飘过。这是**最具象的"两面性"**表达。

**Midjourney v6 prompt**：
```
Cinematic ultra-wide split interior, a single wall dividing the scene with an irregular jagged opening in the middle through which warm light spills. LEFT HALF: a dark engineer's workshop, three monitors with autonomous driving simulation, scattered ROS node diagrams on the wall, a small robotic arm prototype on a steel desk, mechanical keyboard, terminal glow, cold cyan and deep blue tones. RIGHT HALF: a soft child's bedroom, wooden building blocks scattered on the rug, crayon drawings taped to the wall depicting cars and stars, a small bed with a sleeping toddler under a quilt, a plush bear, warm amber nightlight, dreamy. CENTER: through the wall opening, suspended weightlessly in the warm-cold light gradient, a small white humanoid robot mid-stride, papers and a paper airplane drifting around it. Painterly realism, oil painting texture, 35mm grain, dust particles, deep cinematic shadows. Color palette: cold cyan-blue (left), warm amber-terracotta (right), soft cream highlights from the opening. Mood: two worlds connected, tender duality, the bridge between work and love. --ar 5:3 --style raw --quality 2 --v 6
```

---

### Prompt D — 备选 ⭐⭐⭐：超现实的天空房间

**中文意图**：一个没有屋顶的房间，地板是工程师的桌子，天花板是星空和飘浮的代码，一个小机器人和一只玩具熊一起在房间中央漂浮。更梦幻，less 写实。

**Midjourney v6 prompt**：
```
Surreal cinematic interior with no ceiling, opening directly into a deep starry night sky filled with floating mathematical equations, ROS node graphs, and self-driving lidar visualizations rendered in soft cyan glow. The floor is a scattered engineer's workspace: keyboards, papers, monitor displaying a child's stick-figure drawing, a coffee mug. In the center of the room, suspended weightlessly together, a small white humanoid robot and a worn plush teddy bear, facing each other as if having a quiet conversation. Soft amber light from a single floor lamp on the left, cold starlight from above. Painterly oil-painting realism with 35mm film grain, deep contemplative darkness, ultra detailed. Color palette: deep navy black, warm amber, cyan accents, soft cream. Mood: dreaming, the engineer-father's inner world. --ar 5:3 --style raw --quality 2 --v 6
```

---

## 1.1 GPT-image / DALL·E 3 友好版 Prompt（推荐 A）

> 把下面这段直接发给 ChatGPT。对话开头先说："请帮我生成一张 1536×1024 的横向电影感图片，用下面的描述。如果第一张不满意，我会让你再生成几张。"

### A · GPT-image 版 — 父亲书房 + 漂浮小机器人 ⭐ 强推

```
A wide cinematic photograph taken at midnight, looking into a study room from a half-open doorway. The composition has three clear layers from foreground to background.

Foreground (bottom-left third): a heavy wooden desk with scattered papers showing neural network diagrams and code printouts, three vertical monitors glowing with autonomous-driving point cloud visualizations in soft cyan, an open laptop with terminal text, a half-empty ceramic coffee mug, a mechanical keyboard. Light source: a small warm desk lamp.

Midground (center of the frame): floating weightlessly in the air, a small humanoid robot the size of a child, made of soft white matte plastic, gentle posture as if mid-step, no visible support or strings, illuminated by a soft amber rim light from the window.

Background (right third): a toddler's bed with a small child sleeping under a knitted blanket, an amber nightlight casting warm glow, a worn plush teddy bear on the rug, scattered wooden building blocks. Tall window behind showing blurred bokeh of distant highway headlights streaking across a dark city skyline.

Atmosphere: dust particles caught in light beams, painterly oil-painting realism, 35mm film grain, deep cinematic darkness with selective warm pools of light. Color palette: deep navy black, warm amber, soft cyan accents on the monitors, muted terracotta on the walls. Mood: tender, contemplative, suspended between technology and family.

Aspect ratio: 3:2 horizontal, ultra wide framing.
```

### 出图技巧（GPT-image 专属）

GPT-image 有几个让结果更好的小技巧：

1. **不要一次塞满所有要求**。第一次先让它出基础构图，然后用追问微调：
   ```
   你刚才的图很好，但能不能：
   - 把机器人稍微往画面中心移一点
   - 让窗外的高速公路光流更明显
   - 桌面的代码屏幕亮度再高一点
   ```

2. **给参考图**。如果你能提供一张你喜欢风格的参考图，让它"参考这张图的氛围"，效果会大幅提升。

3. **明确反例**。GPT-image 容易把机器人画得太卡通：
   ```
   重要：机器人不要卡通化，要像 Boston Dynamics 的 Atlas 或 Figure 02 的设计感，
   极简白色磨砂塑料，工业感但有温度，不要可爱化。
   ```

4. **避免它加文字**。GPT-image 经常自作主张往画面里加文字（标题、标签）。在 prompt 末尾加：
   ```
   重要：画面中不要包含任何文字、标题、字符或字母。
   ```

5. **多出几张换构图**。每出一张你都能说："构图换一下，这次让相机角度更低，或者从房间的另一个角度看。"

### 备选 prompts（B / C / D 改 GPT-image 版）

如果 A 出图效果不好，告诉我，我把 B/C/D 也改成 GPT-image 版给你。

---



### 路径一：GPT-image / DALL·E 3（你目前在用的）⭐ 推荐

GPT-image 最大能出 **1536×1024**，不够大。流程：

**Step 1：用 GPT-image 出基础图**

把下面的 **GPT-image 友好版 prompt**（见 §1.1）丢给 ChatGPT，让它生成 4-6 张候选。每次让它出 1 张，然后说"再来一张，构图换一下"，挑最满意的。

GPT-image 对 prompt 有几个特点要注意：
- **不认识 `--ar 5:3 --style raw --v 6` 这种 MJ 参数**，要用自然语言代替
- **会把长 prompt 浓缩理解**，不要堆词
- **生成尺寸要在对话里指定**："请生成 1536×1024 横向图片"
- **写实细节比 MJ 弱一点**，但**叙事一致性好**

**Step 2：放大到 5000×3000**

GPT-image 出来的 1536×1024 直接拿来网页用会糊（zoom 3 倍后会有马赛克）。需要 AI 放大：

| 工具 | 价格 | 质量 | 推荐 |
|---|---|---|---|
| **Magnific.ai** | 付费（$10/月起） | ⭐⭐⭐⭐⭐ 最强，能补细节 | 强推 |
| **Topaz Gigapixel** | 一次性 $99 | ⭐⭐⭐⭐ 很好，无月费 | 推荐 |
| **Upscayl**（开源免费） | 0 | ⭐⭐⭐ 够用 | 没钱选这个 |
| **ChatGPT 内的 "放大" 功能** | 包含在 Plus | ⭐⭐⭐ 一般 | 出图后直接说"放大 4 倍" |
| **Krea.ai 的 enhance** | 免费额度有 | ⭐⭐⭐⭐ 不错 | 备选 |

**最简单的免费方案**：用 [Upscayl](https://github.com/upscayl/upscayl)（macOS 直接下载 .dmg）→ 选 `realesrgan-x4plus` 模型 → 一键 4 倍放大 → 出来约 6144×4096，再用 Preview / Photoshop 裁到 5000×3000。

**Step 3：转 webp 压缩**

放大完是 PNG，体积可能 10MB+，必须压成 webp。macOS 一行命令：

```bash
# 安装 cwebp（一次性）
brew install webp

# 转换 + 压缩到 quality 82
cwebp -q 82 -resize 5000 0 input.png -o public/images/main-stage.webp

# 看看体积
ls -lh public/images/main-stage.webp
# 目标 < 800KB，超了就把 q 降到 75
```

如果你不想装命令行，可以用 [squoosh.app](https://squoosh.app)（Google 出的网页工具，拖图进去选 webp 导出，可视化看体积）。

---

### 路径二：MJ（如果你后面有 MJ 账号）

参考 §1 上面的 MJ prompt，每个出 4 张 → Magnific 放大 → 同样转 webp。

---

## 3. ID 卡设计（不用 AI）

ID 卡（你的 WANG—13 等价物）建议在 **Figma** 里手做，因为细节要锐利。

**建议字段**：
```
[你的名字 / nickname]
ENGINEER & FATHER

ID  ████-2026-████
Status  ACTIVE / Studio of one

Building cars that drive themselves.
Building agents that think.
Raising a kid that questions both.

[barcode]                            2026
```

**视觉**：黑底、像素化人像（用 ImageMagick `-posterize 8` 把你的照片处理成像素点画风）、模拟条形码、edge bracket 装饰。

---

## 4. Featured Work 海报（占位版）

> 真正的代表作待定。当前用一张**通用的"自动驾驶 + 父爱"主题复古海报**作占位，气质要和主图一致（暗调、电影感、painterly），但**画幅是纵向 3:4**（卡片样式）。

### 占位海报名：`AUTO / KIN`

副标：`A car that learns the way home.` 或 `Driving you, watching them grow.`

**Midjourney v6 prompt**：
```
Vintage retro cinematic poster, vertical 3:4 aspect ratio, painterly oil-painting style, deep cinematic darkness with selective warm amber light. Composition: low-angle view of a sleek minimalist autonomous vehicle from behind, parked on a quiet suburban street at dusk, its taillights glowing soft red, a faint cyan lidar scan visualization radiating from the roof in concentric rings revealing the silhouettes of two pedestrians far ahead — an adult holding a small child's hand walking away into warm distant streetlight bokeh. Above the vehicle in the dark sky: faint constellations of waypoint dots connected by thin path-planning curves in cyan, like a star map. Foreground bottom: blurred suggestion of a child's toy car forgotten on the curb. Texture: weathered paper poster, subtle film grain, dust marks, vintage halftone in the darkest areas. Title text "AUTO / KIN" in bold geometric sans-serif at top, small tagline "A car that learns the way home" near bottom. Color palette: deep navy black, warm amber streetlight, soft cyan path lines, muted terracotta. Mood: tender, hopeful, the intersection of self-driving technology and family. --ar 3:4 --style raw --quality 2 --v 6
```

**Flux Dev prompt**：
```
vintage retro cinematic movie poster, vertical 3:4, painterly oil painting, deep cinematic darkness with warm amber selective light, low angle view from behind a sleek autonomous electric vehicle parked on a suburban street at dusk, glowing red taillights, soft cyan lidar concentric rings emanating from roof revealing silhouettes of an adult and small child walking hand in hand into warm distant streetlight bokeh, faint cyan waypoint dots and path planning curves in dark sky like a star map, blurred child's toy car on curb foreground, weathered paper poster texture subtle film grain halftone, bold sans-serif title "AUTO / KIN" top, tagline "A car that learns the way home" bottom, palette deep navy warm amber soft cyan terracotta, mood tender hopeful tech meets family, ultra detailed
```

**GPT-image 版**（推荐你用这个，请生成 1024×1536 纵向）：
```
A vertical 3:4 cinematic vintage poster painted in oil-painting realism style, deep cinematic darkness with warm amber selective lighting.

Composition: a low-angle view from behind a sleek minimalist autonomous electric vehicle, parked on a quiet suburban street at dusk. The car's taillights glow soft red. From the roof of the car, concentric rings of soft cyan light radiate outward like a lidar scan, revealing in the distance the silhouettes of an adult holding a small child's hand, walking away into warm bokeh streetlights. Above the car in the dark sky, faint cyan waypoint dots are connected by thin path-planning curves, resembling a star map. In the bottom foreground, a child's small toy car lies forgotten on the curb, partially blurred.

Texture: weathered paper poster, subtle 35mm film grain, halftone dots in the darkest areas. Color palette: deep navy black, warm amber streetlight, soft cyan path lines, muted terracotta. Mood: tender, hopeful, the intersection of self-driving technology and fatherhood.

Important: do not include any text, letters, or titles in the image. I will add typography myself in post.
```

> 关键：让 GPT-image **不要画文字**，因为它的文字渲染基本都是歪的、错的。文字（`AUTO / KIN`、副标）由你后期在 Figma / Photoshop 叠上去。

### 出图建议
- 出 4 张，挑**字体清晰 + 构图不歪**的那张
- 如果 MJ 把文字渲歪了（常见），用 Photoshop / Figma **手动叠真字体**：
  - 标题：`Inter Display Bold` 或 `Space Grotesk Bold`，字重 700
  - 副标：`JetBrains Mono` 或 `Inter` Regular
- 最终尺寸 **800×1100 webp**，放在 `public/images/featured-placeholder.webp`

### 之后想换真作品
告诉我你的代表项目（标题 / 一句话描述 / 视觉关键词），我重写一版替换。

---

## 5. 选哪一个？

我的强推：**Prompt A（父亲书房 + 漂浮小机器人）**
- 它把"engineer / father / robot future"三件事一次塞进一个画面
- 焦点分层最清晰：桌子（前）→ 房间（中）→ 窗外高速（后）
- Featured Work 章节时镜头推到桌面/书本，温暖自然
- 不需要解释，看一眼就懂你是谁

如果想要更"原作者致敬感"，选 **Prompt B（车内回望）**。
如果想要**最强表达性、不怕冒险**，选 **Prompt C（墙的破口）** —— 但这张图风险大，构图复杂，AI 容易出歪。

---

## 6. 出完图发给我之后

把图放在 `public/images/main-stage.webp`，我会：
1. 在 PLAN.md 的"动画时间线"里把 `transformOrigin` 和每章节的 `scale` 终值校准到这张图的具体焦点像素坐标
2. 起 Vite 基建
3. 第一版可以跑 P1+P2+P3，你能看到能动的雏形
