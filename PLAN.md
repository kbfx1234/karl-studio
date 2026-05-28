# Ethan Wang · Studio 个人网页复刻方案

> 来源：抖音 @王十三AI 「VibeCoding大赏丨理科生 2h 手搓个人网页」
> 作者自述：**"理科生手写零行代码，大概花了两小时"** —— 即 100% 通过 AI（Vibe Coding 模式）生成。
> 本文档不写代码，只做调研、拆解、规划。代码实现见后续 phase。

---

## 0.5 密集帧分析后的关键修订（2026-05-28）

> 基于 `reference/frames/` 下 204 张密集抽帧得出的 5 条核心修正。

| # | 之前的错误判断 | 修正后的真实结论 |
|---|----|----|
| 1 | 章节切换 = 多张 AI 图 crossfade | **整个站点共用一张超大 AI 图**，所有切换是 `transform: scale + translate`（dolly zoom），不是换图 |
| 2 | ID 卡随 hero 加载自动落下 | **ID 卡是 hover 触发**：鼠标进入右上区（导航栏 / `ENTER STUDIO` 附近）→ 用绳子吊下 + 钟摆衰减；鼠标离开 → 收回 |
| 3 | Hero 文字是整句 mask reveal | **是 char-level blur reveal**（每个字符 blur 12px → 0、y 30 → 0、stagger 0.025），featured_05 帧抓到了这个证据 |
| 4 | manifesto 是独立的"过渡段" | **manifesto 是 hero 的下一段**（用同一镜头 zoom 1.05 倍），3 句新文字替换 hero 三句 |
| 5 | 网页是多 section 的常规滚动 | **是单一 pinned 100vh stage + 600vh 长 scroll trigger**，整站只有一个时间线 |

这 5 条修订使 PLAN 的可实现性大幅提升 —— 复刻难度从"6 张图协调切换"降到"做好一张大图 + 一个长 timeline"。

---

## 0. 复刻目标

做一个**像电影一样滚动的个人作品集站**。整体由一段连续的暗调影像驱动，文字作为字幕分章节出现，最终落到一个作品（Featured Work）和 CTA。

**关键体验关键词：**
- Cinematic（电影级）
- Scroll-as-narrative（滚动即叙事）
- Editorial typography（杂志/编辑型排版）
- AI-native aesthetic（AI 生成图作为主视觉）

---

## 1. 网页结构（章节地图）

视频中明确出现 `CHAPTER 01 / 05` … `05 / 05`，说明站点用**5 个章节 + Hero + Manifesto + Featured Work + CTA**的结构组织。

**重要**：整个站点是一个 **pinned 100vh stage**，所有"页面"实际上都是同一个舞台上的浮动文字层，背景是同一张大图被持续 dolly-zoom 推近。用户感知到 8 个"页"，但 DOM 里没有翻页，只有一个 600vh 高的 wrapper 触发 ScrollTrigger 时间线。

```
┌─────────────────────────────────────────────────────────────┐
│ HERO                                                        │
│   王十三 / ETHAN WANG · STUDIO  +  WORK STUDIO WRITING ...  │
│   "By day, I build AI agents."                              │
│   "By night, I make AI art."                                │
│   "Same machine. Different rules."                          │
│   右侧浮动 ID 卡：WANG—13 / AIGC CREATOR & AI BUILDER        │
│   右下：READ THE STORY →                                    │
│   左下：ACTIVE — STUDIO 01 / 2026 SHENZHEN / OXFORD ...     │
│   左下角：SCROLL TO ENTER          右下：05 CHAPTERS         │
├─────────────────────────────────────────────────────────────┤
│ MANIFESTO（过渡段）                                          │
│   "An engineer who builds AI agents by day."                │
│   "An artist who lets them dream by night."                 │
│   "Same machine. Different rules."                          │
│   下方两栏：Engineering. / AIGC art.                         │
├─────────────────────────────────────────────────────────────┤
│ CHAPTER 01 / 05  ── OBJECT · CHIP · 2000s                   │
│   SHENZHEN  深圳 · PEARL RIVER DELTA                         │
│   "A city that builds itself overnight."                    │
│   Cantonese and Python on the same street corner...         │
├─────────────────────────────────────────────────────────────┤
│ CHAPTER 02 / 05  ── OBJECT · GOWN · 2018—2022               │
│   OXFORD  牛津大学 · UNIVERSITY OF OXFORD                    │
│   "Where I learned to slow down."                           │
│   Books by day, port wine by night...                       │
├─────────────────────────────────────────────────────────────┤
│ CHAPTER 03 / 05  ──（推测：工作经历，类似 LONDON / BYTEDANCE）│
├─────────────────────────────────────────────────────────────┤
│ CHAPTER 04 / 05  ── OBJECT · PAINT · 2024                   │
│   AGENT  AI 智能体 · AGENTIC SYSTEMS                         │
│   "Built agents that listened. Built agents that wandered." │
│   Agents as code. Agents as colleagues...                   │
├─────────────────────────────────────────────────────────────┤
│ CHAPTER 05 / 05  ── 2026 NOW · AUDIENCE OF ONE              │
│   TRANSLATE                                                 │
│   "Stopped chasing metrics. Started chasing taste."         │
│   "Making art for, and against, the machine."               │
├─────────────────────────────────────────────────────────────┤
│ FEATURED WORK                                               │
│   01 / 01   ·  Prompt Earth  /  One line to save the Earth. │
│   AIGC · ONGOING                                            │
├─────────────────────────────────────────────────────────────┤
│ FOOTER CTA                                                  │
│   "Ready to look again?"   SCROLL BACK →                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 视觉系统

### 2.1 配色（design tokens）

来自帧像素采样：

| Token | 值 | 用途 |
|-------|----|----|
| `--bg` | `#000000` | 页面底色 |
| `--bg-stage` | `#0a0807` | 影像区底色（带极轻暖色） |
| `--fg` | `#ffffff` | 主标题、主文字 |
| `--fg-muted` | `#a8a4a0` | 副标题（"AI agent engineer."） |
| `--fg-dim` | `#6b6864` | 章节元数据（"OBJECT · CHIP"） |
| `--fg-ghost` | `#3a3633` | 巨型半透明背景文字（"TRANSLATE"） |
| `--accent-warm` | `#5b2a1e` | AI 影像中的暗红/赤陶色（不直接用作填充，靠图） |
| `--cta-bg` | `#ffffff` | "ENTER STUDIO" 按钮背景 |
| `--cta-fg` | `#000000` | "ENTER STUDIO" 按钮文字 |

整体是**纯黑 + 白 + 灰阶**，所有暖色（红、棕、橙）都来自 AI 生成的背景图本身，CSS 不直接用。

### 2.2 字体

视频中文字识别特征：
- 大号标题字体：`a` 是单层圆形（如 "AI agents"）、`g` 是单层 →  **Geometric/Humanist sans**，最像 **Neue Haas Grotesk Display Pro** 或免费替代 **Inter Display / Space Grotesk**
- 章节巨字（"SHENZHEN"、"OXFORD"、"AGENT"）：字面更宽、字重更轻 → **Söhne Mono / Migra / Editorial New** 风格
- 等宽元数据小字（"CHAPTER 02 / 05"）：**JetBrains Mono / IBM Plex Mono / Space Mono**

**复刻取舍**（全部免费可商用）：
| 用途 | 字体 | 来源 |
|------|------|----|
| 主标题 / 大号文字 | **Inter Display** + 字重 500/600 | Google Fonts |
| 章节巨字 | **Migra**（如能拿到）/ **Bodoni Moda** / **Fraunces** | Google Fonts |
| 等宽小字 | **JetBrains Mono** | Google Fonts |
| 中文 | **思源黑体 / Noto Sans SC** | Google Fonts |

### 2.3 文字层级

```
H-display (章节巨字 SHENZHEN/OXFORD)  120-180px / weight 400 / tracking +4px
H1 (Hero 主句)                         clamp(40px, 6vw, 84px) / weight 500
H2 (Manifesto)                         clamp(32px, 4vw, 64px)
Body (描述段)                          16-18px / line-height 1.6
Meta (CHAPTER 02 / 05)                 12px mono / tracking +2px / uppercase
Eyebrow (副标题如 "AI agent engineer.")  14-16px / muted color
```

---

## 3. 核心动画拆解（按密集帧重写）

> 本节基于 `reference/frames/` 下的 204 张密集帧（按段落分组：hero_intro / hero_idle / idcard / manifesto / chapters / featured / footer）逐帧比对得出。

### 3.0 总览：全站只有一个"镜头"

最关键的发现 —— **整个网页背景就是一张巨大的 AI 静态图**，没有任何视频、没有图片切换。所有的视觉变化全部来自对这张图的**transform: scale + translate**（dolly zoom + pan）。
- 帧 `chapters_020` 完全无 UI，画面被放大到房间内部，证明就是同一张图被持续 zoom-in
- 帧 `chapters_055` 推到人物面部 + 破电视特写，仍是同一张图的更深处
- 帧 `chapters_065`（Featured Work）背景仍能看到那个戴帽人物 + 破电视

所以站点结构 = **一张超大 AI 图（约 5000×3000，焦点在房间内部）+ 上层多组叠加文字 + 一个 ScrollTrigger 长时间线驱动 image transform**。

### 3.1 Hero 进场（0 – 2s，ref: hero_intro_01–15、featured_05）

**关键观察**：
- `featured_05` 抓到了进场瞬间：`By day` 已经清晰，但 `day` 后面还带着模糊残影，说明是**逐字 blur reveal**，不是整句 mask
- 三句文字**从下到上依次出现**，间隔约 0.4s：line1 → line2 → line3
- 顶部 logo / 导航 / `ENTER STUDIO` 按钮**几乎在 hero 文字之前**先静态显示（hero_intro_01 已经全部就位）
- 右下角 `READ THE STORY →` 按钮在第三句出现之后才浮入

| 元素 | 时间 | 动画细节 |
|------|------|--------|
| Logo + 导航 + ENTER STUDIO | 0.0–0.5 | fade + 微 y(-8 → 0) |
| 右侧 eyebrow 三行 | 0.3–0.9 | stagger fade，每行间隔 0.15s |
| `By day, I build AI agents.` | 0.6–1.4 | **char-level blur reveal**，blur 12px → 0、y 30 → 0、opacity 0 → 1，stagger 0.025 |
| `By night, I make AI art.` | 1.0–1.8 | 同上，延后 0.4s |
| `Same machine. Different rules.` | 1.4–2.2 | 同上 |
| `READ THE STORY →` | 2.0–2.5 | fade + y(15 → 0) |

**实现要点**：用 GSAP `SplitText({ type: 'chars,words' })` 把每一句拆字符，然后 `gsap.from(chars, { autoAlpha: 0, y: 30, filter: 'blur(12px)', stagger: 0.025, ease: 'power3.out' })`。

### 3.2 Hero idle 状态（鼠标静止时，ref: hero_idle_01–12）

**新发现**：hero_idle 这一组里，几乎所有元素都已就位但**没有滚动**，能看到几个微妙的常驻动画：
- 背景图**有极轻微的 breath（呼吸感缩放）**：scale 在 1.00 ↔ 1.005 之间慢循环（10s 周期）
- 文字本身**静止**，没有飘动
- ID 卡此时**未显示**（idle 状态卡片是隐藏的）

实现 = `gsap.to('.bg-image', { scale: 1.005, duration: 10, yoyo: true, repeat: -1, ease: 'sine.inOut' })`。

### 3.3 ID 卡（WANG—13）入场 + 钟摆（ref: idcard_01–36, manifesto_01–14）

**重大修正**：之前误认为 ID 卡是 hero 加载时自动落下的，**实际上是用户把鼠标移到右上角触发**：
- `idcard_28` 鼠标在 `CONTACT` 上，卡片从顶部 cropped — 卡片正在**从顶向下滑入**
- `idcard_30` 鼠标移到 `CONTACT` 右下角，卡片继续下落
- `idcard_33` 卡片下落到画面中央**水平偏左、倾斜约 -25°** —— 钟摆中
- `idcard_36` 卡片回到右侧、倾斜 +15° —— 摆回去
- `manifesto_01` 卡片回到右侧偏右、倾斜约 -10° —— 还在轻微衰减
- `manifesto_07` 卡片基本静止竖直在右侧
- `manifesto_15` 鼠标离开右上区，卡片飞出画面顶部（消失）

所以**这是一个 hover-triggered 动画**：鼠标进入右上区域（导航栏附近）→ 卡片从顶端用绳子吊下 + 钟摆衰减；鼠标离开 → 卡片被绳子收回顶部。

**钟摆物理**：观察到的旋转角序列大约是 `-25° → +15° → -10° → +5° → 0°`，是**阻尼振动**。GSAP 实现：
```
const tl = gsap.timeline()
tl.fromTo(card, { y: -600, rotation: 0, opacity: 0 },
                { y: 0,    rotation: -25, opacity: 1, duration: 0.6, ease: 'power2.in' })
  .to(card, { rotation: 15,  duration: 0.5, ease: 'sine.inOut' })
  .to(card, { rotation: -10, duration: 0.5, ease: 'sine.inOut' })
  .to(card, { rotation: 5,   duration: 0.4, ease: 'sine.inOut' })
  .to(card, { rotation: 0,   duration: 0.4, ease: 'sine.out' })
```
或者用 GSAP 的物理插件 `Physics2D` / `MotionPathPlugin` 模拟单摆。

**绳子**：是一个细的黑色 div（width: 1px），从屏幕顶部 `scaleY 0 → 1` 下垂；卡片做钟摆时绳子顶端固定，绳子做对应的小角度倾斜（用 transform-origin: top）。

**鼠标悬停 tilt**：卡片静止后，鼠标移到卡上时**3D 倾斜跟随**（perspective: 800px、rotateX/rotateY 跟随光标位置）。这就是 ReactBits `TiltedCard` 的标准行为。

### 3.4 滚动一镜到底：dolly zoom 长 timeline（最难，ref: chapters_001–074）

> 这是整个站点的灵魂。一定要逐帧理解：

| 帧 | 状态 | 背景图状态 | 上层文字状态 |
|----|----|---------|----------|
| chapters_005 | hero 顶部，开始向下滚 | scale 1.0，未变 | hero 三句仍在；底部隐约出现 `An engineer who...` 的下一段 |
| chapters_010 | manifesto 段 | scale 1.05，略放大 | hero 三句已飞走，`An engineer who builds AI agents by day.` 三句替换上来；左下角 `ACTIVE — STUDIO 01 / 2026 SHENZHEN ...` 同步淡入；右侧 `Engineering. / AIGC art.` 双栏 |
| chapters_020 | 章节过渡（无 UI 文字） | scale 1.6，**裁切到房间内部** | 几乎没有文字 |
| chapters_030 | CHAPTER 02 OXFORD | scale 1.8，画面对准窗户 + 帽子 | 左上 `CHAPTER 02 / 05  OBJECT · GOWN`；右侧巨字 `2018 — 2022` 上、`OXFORD` 下；左下 `Where I learned to slow down.` + 副文 |
| chapters_045 | CHAPTER 04 TRANSLATE | scale 2.2，对准电视/桌面 | 右上 `04 / CHAPTER 04 / 05`；右中巨字 `TRANSLATE`、`AIGC 创作`；左下 `2026 NOW`；右下 `Stopped chasing metrics. Started chasing taste.` |
| chapters_055 | 末章 / 过渡 | scale 2.6，对准人物面部 + 破电视 | 几乎无 UI（章节间空白） |
| chapters_065 | FEATURED WORK | scale 2.8，背景在最深处 | 左侧 Prompt Earth 卡片浮入；上方 `FEATURED WORK`；右侧 `01 / 01  AIGC · ONGOING` |
| chapters_073 | Footer CTA | scale 3.0+ | 底部 `Ready to / look again?` + `SCROLL BACK →` |

**算法设计**：

```
ScrollTrigger.create({
  trigger: '#stage-wrapper',
  start: 'top top',
  end: '+=600%',         // 6 个屏幕高度的滚动距离
  pin: '#stage',         // pin 住 100vh 的舞台
  scrub: 1.2,            // 平滑跟随
  animation: gsap.timeline()
    .to('#bg-image', { scale: 3.0, transformOrigin: '60% 55%', duration: 1, ease: 'none' })
})
```

文字层是**多个独立的 ScrollTrigger 段**，每段在长滚动的某个百分比区间显隐：

```
[0%, 12%]     hero 三句   visible
[12%, 18%]    hero 淡出 + manifesto 淡入
[18%, 30%]    manifesto + Engineering/AIGC art 双栏
[30%, 35%]    全部淡出（chapters_020 状态）
[35%, 50%]    CHAPTER 02 OXFORD
[50%, 55%]    淡出
[55%, 70%]    CHAPTER 04 TRANSLATE
[70%, 75%]    淡出
[75%, 88%]    FEATURED WORK
[88%, 100%]   Footer CTA
```

**配合 Lenis 的关键代码**：
```
const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### 3.5 章节标题进入动画（ref: chapters_028–032 OXFORD 章节进入）

每个章节标题（OXFORD / TRANSLATE 等）出现时：
1. 巨型主标题（`OXFORD`）：scale 1.1 → 1，opacity 0 → 1，blur 20px → 0（duration ≈ 0.6s）
2. 上方年份（`2018 — 2022`）：从右滑入（x: 30 → 0），fade
3. 章节元数据 `CHAPTER 02 / 05 OBJECT · GOWN`：从左淡入
4. 副文 `Where I learned to slow down.`：char-stagger blur reveal（同 hero 风格）
5. 描述段：fade + y(20 → 0)

这些都是 `ScrollTrigger.create({ trigger, start: 'top 80%', toggleActions: 'play none none reverse' })` 触发，**不和长 timeline 共享**，独立。

### 3.6 巨型 ghost text 与年份装饰

`chapters_045` 显示左下角有一个低对比度的 `2026` 和 `NOW`，是次级装饰文字：
```css
font-size: clamp(80px, 12vw, 200px)
color: rgba(255,255,255,0.06)
font-family: 'Inter Display'
font-weight: 200
```
不参与滚动，只在章节激活时 fade-in。

### 3.7 Featured Work（ref: chapters_065–070）

- 一个左侧的卡片图（Prompt Earth 北极熊插画，纵向 3:4）
- 卡片**有轻微 tilt 跟随光标**（同 ID 卡的 TiltedCard）
- 右侧文字 `Prompt Earth` + 描述 + 标签 stagger 入场
- 上方 `FEATURED WORK` 字号较小
- 右上 `01 / 01`、`2026`

### 3.8 Footer CTA（ref: chapters_073, footer_01–18）

- 大字 `Ready to look again?` 两行，从下浮入 + blur reveal
- `SCROLL BACK →` 按钮：白底黑字，hover 时箭头右移
- 点击后通过 Lenis 的 `lenis.scrollTo(0, { duration: 2, easing })` 平滑滚回顶部
- 顶部 footer_05 看到滚回顶部时 ID 卡**重新出现并钟摆**（说明卡片入场不是一次性，而是绑定 hero 区域可见性）

### 3.9 微交互清单

| 元素 | 交互 | 实现 |
|------|------|----|
| 顶部导航文字 hover | 字下短横 underline 从左展开 | CSS `::after` width 0→100% transform |
| `ENTER STUDIO` 按钮 hover | 箭头右移 / 背景反色 | CSS transition |
| `READ THE STORY →` hover | 箭头位移 + 整体亮度提升 | GSAP `gsap.to` 或 CSS |
| ID 卡 hover | 3D tilt 跟随光标 | mousemove 计算 rotateX/Y |
| Featured 卡片 hover | 3D tilt + 轻微 scale | 同上 |
| 光标 | 视频中是默认箭头，**没有自定义光标** | 不做改 |

### 3.5 章节元数据（OBJECT · CHIP / 2000s 等）

每个章节左上角的小字：
```
01
CHAPTER · 01 / 05

2000s

SHENZHEN
深圳 · PEARL RIVER DELTA
```
是 stagger fade-in，从 章节进入 timeline 的 0–0.3 进度区间触发。

### 3.6 Featured Work（35s 帧）

- 卡片图（Prompt Earth 北极熊）从左侧滑入
- 标题 `Prompt Earth` 从下方滑入
- 副标 `One line to save the Earth.` stagger
- 整个 section 是**正常文档流**（不再 pin），ScrollTrigger 只触发进入动画

### 3.7 Footer CTA（"Ready to look again?"）

- 巨型问句从下浮入
- "SCROLL BACK →" 按钮悬停时箭头平移

### 3.8 微交互

| 元素 | 交互 |
|------|------|
| 顶部导航字 | hover：磁吸位移 + 字下短横线 underline 从左展开（典型 ReactBits MagneticButton） |
| `ENTER STUDIO` 按钮 | hover：背景反色（白底黑字 ↔ 黑底白字）通过 mask 滑动 |
| 光标 | 自定义 `cursor: crosshair` 或保留系统箭头（视频中是默认箭头） |
| ID 卡 | 鼠标悬停 3D tilt |
| `READ THE STORY →` | hover：箭头向右平移 12px |

---

## 4. 技术栈选型

### 4.1 框架

| 选项 | 优 | 劣 | 选择 |
|------|----|----|----|
| **Vite + React 18** | 快、原作者底部端口 `5174` 是 Vite 默认、社区资源多 | SEO 一般 | ✅ **采用** |
| Next.js 14 App Router | SSR/SEO 更好 | 配置 GSAP/Lenis 复杂一点 | 备选 |
| Astro | 极致性能 | 动画交互重的站不是它的强项 | 不选 |

视频底部出现 `127.0.0.1:5174/#`，**确认原作者就是 Vite + React**。

### 4.2 动画库

| 库 | 角色 | 必要性 |
|----|----|----|
| **GSAP** + `@gsap/react` | 核心时间线引擎 | ⭐⭐⭐⭐⭐ 必装 |
| **GSAP ScrollTrigger** | 滚动驱动 + pin | ⭐⭐⭐⭐⭐ 必装 |
| **GSAP SplitText** | 字符级动画（GSAP 3.13 起开源免费） | ⭐⭐⭐⭐⭐ 必装 |
| **Lenis** (`@studio-freight/lenis`) | 惯性平滑滚动 | ⭐⭐⭐⭐ 强烈建议 |
| **Framer Motion** | 微交互（如 hover） | ⭐⭐ 可选，能用 GSAP 替代 |

### 4.3 样式

- **Tailwind CSS v3** + 自定义 design tokens
- 关键尺寸用 `clamp()` 做响应式

### 4.4 ReactBits 可直接借用的组件

> [reactbits.dev](https://www.reactbits.dev) 是 copy-paste 模式（不是 npm 包），把组件源代码 fork 进项目即可。

| 视频中的效果 | ReactBits 对应组件 | 路径 |
|----|----|----|
| Hero 文字 blur reveal | `BlurText` | TextAnimations / BlurText |
| 章节巨字打字/拆字进入 | `SplitText` 或 `RotatingText` | TextAnimations / SplitText |
| ID 卡 3D 倾斜跟随光标 | `TiltedCard` | Components / TiltedCard |
| 导航 hover 磁吸 | `MagneticButton`（如有），否则手写 | Components / MagnetButton |
| "READ THE STORY →" 按钮 | `ShinyText` 或 `GooeyButton` | Components |
| 章节滚动进入 | `ScrollReveal` / `FadeContent` | Animations |
| Featured Work 图卡 | `TiltedCard`（同 ID 卡） | Components |

### 4.5 字体加载

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Fraunces:wght@300;400&family=Noto+Sans+SC:wght@400;500&display=swap" rel="stylesheet">
```

### 4.6 AI 视觉素材生成

视频中所有"车窗外飘浮的人 + 学士帽 + 老电视 + 暖色油画"风格的图像，**必须由 AI 生成**（Midjourney v6 / Flux / Kling）。

**素材清单（修正后）**：所有"章节"共享**同一张超大主图**，不是 6 张分图！这是密集帧分析得出的关键结论。

| # | 用途 | 尺寸建议 | Prompt 草案 |
|---|----|------|----|
| **1** | **主舞台大图（核心）** | **5000×3000**（webp 压缩到 < 800KB） | `cinematic dark interior, view from inside a vintage car looking outward, surreal floating man with bucket hat suspended in dim red room, scattered academic graduation cap, broken old CRT TV with cracked screen, oil painting on wall, dust motes in window light, low light photography, 35mm film grain, melancholic warm darkness, ultra-detailed background extending into multiple focal layers (car interior foreground, window mid, room with floating figure deep), painted realism, --ar 5:3 --style raw` |
| 2 | Featured: Prompt Earth | 800×1100 | `vintage retro poster, polar bear and cub on melting iceberg in dark ocean, "PROMPT EARTH" pixel-art text, 8-bit aesthetic, navy blue and warm orange palette, weathered paper texture` |
| 3 | ID 卡 WANG—13（前面） | 600×900 | Figma 拼合 — 黑底、像素化人像、AIGC CREATOR & AI BUILDER 标签、模拟条形码、ID 编号 |

**核心要点**：
- **第 1 张图是这个网站 90% 的视觉**，必须一次性出图，因为它要被 zoom 到 3 倍仍清晰，所以原图必须很大、细节必须密
- 图的"焦点构成"要满足 dolly zoom：远景（车窗外人物悬浮）→ 中景（房间）→ 近景（破电视/桌面），这样 scale 时新的细节才会进入视野
- 用 **Midjourney v6 `--ar 5:3 --quality 2`** 出基础图 → **Magnific / Topaz Gigapixel** 放大到 5000×3000
- 也可以 **Flux Dev + ControlNet（构图引导）**

**ID 卡推荐用 Figma 设计**而不是 AI，因为细节（条形码、字符、像素肖像）需要锐利。

---

## 5. 项目目录结构（待实现）

```
ethan-studio-clone/
├── PLAN.md                       ← 本文档
├── reference/                    ← 视频抽帧参考图（已就绪）
├── docs/
│   ├── animation-timeline.md     ← 动画时间线详表（phase 1）
│   ├── ai-prompts.md             ← AI 素材 prompt 清单（phase 1）
│   └── component-map.md          ← ReactBits 组件 fork 记录
├── public/
│   ├── images/                   ← AI 生成的章节大图
│   ├── id-card/                  ← ID 卡 PNG（透明背景）
│   └── fonts/                    ← 自托管字体（如使用 Migra）
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── styles/
│   │   ├── globals.css           ← tokens + reset
│   │   └── tailwind.css
│   ├── lib/
│   │   ├── gsap.ts               ← GSAP 注册插件
│   │   ├── lenis.ts              ← Lenis 实例 + ScrollTrigger 桥接
│   │   └── useScrollChapter.ts   ← 章节滚动 hook
│   ├── components/
│   │   ├── reactbits/            ← fork 自 reactbits 的组件
│   │   │   ├── BlurText.tsx
│   │   │   ├── SplitText.tsx
│   │   │   ├── TiltedCard.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   └── ScrollReveal.tsx
│   │   ├── nav/Navbar.tsx
│   │   ├── hero/Hero.tsx
│   │   ├── hero/IdCard.tsx
│   │   ├── manifesto/Manifesto.tsx
│   │   ├── chapter/Chapter.tsx        ← 通用章节模板（接收 props）
│   │   ├── chapter/GhostTitle.tsx     ← 巨型半透明文字
│   │   ├── chapter/ChapterMeta.tsx    ← "01 / 05 OBJECT · CHIP"
│   │   ├── work/FeaturedWork.tsx
│   │   └── footer/CtaFooter.tsx
│   ├── data/
│   │   └── chapters.ts                ← 5 个章节的内容 JSON
│   └── App.tsx
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .gitignore
```

---

## 6. 实现路线图（phase 化）

| Phase | 目标 | 验收标准 |
|------|------|--------|
| **P0 调研** ✅ | 拆解视频 + 写本 PLAN.md | PLAN.md + reference/ 抽帧齐全 |
| **P1 基建** | Vite+React+TS+Tailwind 起步 / GSAP+Lenis 接入 / 字体加载 | `npm run dev` 起得来，黑色空白页 |
| **P2 静态布局** | 把 5 章节的文案、排版、配色全做完，**不带任何动画** | 滚动能看到每个章节像静态海报 |
| **P3 Hero 动画** | Hero 文字 BlurText + ID 卡吊落 + 微交互 | Hero 看起来已经"对了" |
| **P4 滚动叙事** | ScrollTrigger pin + scrub + 章节切换 | 滚动时背景平移、章节字进入 |
| **P5 微交互** | 导航磁吸、按钮 hover、ID 卡 tilt | 全部 hover/click 反馈到位 |
| **P6 素材替换** | 用真实 AI 生成图替换占位灰图 | 视觉与原视频接近 90% |
| **P7 性能 & 兼容** | Lighthouse 90+ / mobile 退化方案 / `prefers-reduced-motion` | LH ≥ 90，移动端可看 |

每个 phase 结束都做一次截图对比，对照 `reference/` 内的 10 张参考图。

---

## 7. 风险与取舍

| 风险 | 缓解 |
|----|----|
| ScrollTrigger pin + Lenis 经常冲突 | 用官方 `lenis.on('scroll', ScrollTrigger.update)` 接法（必须） |
| `SplitText` 之前是付费的 | GSAP 3.13（2024 中）起完全免费，确认依赖版本 ≥ 3.13 |
| AI 生成图风格不一致 | 用同一个 sref 参考图 / 同一个 seed |
| 长 timeline 在低端设备掉帧 | 必做 `matchMedia` 降级：移动端去掉 pin，改纯 fade |
| `prefers-reduced-motion` 用户 | 提供 motion-off 版本（直接跳到每章末态） |
| ReactBits 组件版权 | MIT 协议，要保留头部注释 |
| 字体版权 | 全选 Google Fonts 免费可商用字体 |

---

## 8. 不复刻的部分（明确边界）

- ❌ 后台 / CMS（原站是纯静态）
- ❌ 多语言切换（保留英文 + 少量中文混排）
- ❌ 真实的 5 个项目详情页（只做 Featured Work 一个 placeholder）
- ❌ 联系表单、邮件订阅
- ❌ 主题切换（强制暗色）
- ❌ SEO / OG 图（先聚焦动画体验）

---

## 9. 参考资料

- [GSAP ScrollTrigger 官方文档](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP + React Quick Start](https://gsap.com/resources/React/)
- [Lenis 官方仓库](https://github.com/darkroomengineering/lenis)
- [ReactBits 组件库](https://www.reactbits.dev)
- [Awwwards：Editorial 滚动叙事案例集](https://www.awwwards.com/websites/scrolling/)
- 抖音原视频：`https://v.douyin.com/2kB1H0Ur7Uo/`（@王十三AI · VibeCoding 大赏）
- 本地视频：`/Users/mi/Downloads/Screenrecorder-2026-05-28-10-14-52-459.mp4`
- 抽帧参考图：`./reference/`

---

## 10. 下一步

收到本 PLAN.md 的反馈/确认后，开始 **P1 基建**：
1. 初始化 `package.json` / Vite / React / Tailwind / GSAP / Lenis
2. 写 `globals.css` 落 design tokens
3. 写 `lib/gsap.ts` 和 `lib/lenis.ts`
4. 起 `App.tsx` 占位空黑屏

**等你确认调研覆盖度，再动代码。**
