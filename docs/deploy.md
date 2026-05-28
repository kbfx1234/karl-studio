# 部署指南

> 你需要：GitHub 账号（你有 [@kbfx1234](https://github.com/kbfx1234)）+ Vercel 账号（用 GitHub 一键登录就行）

---

## Step 1：推到 GitHub

### 路径 A：用 GitHub 网页（最简单）

1. 打开 <https://github.com/new>
2. **Repository name**：`karl-studio`
3. 公开 / 私有：**Public**（个人网站建议公开，方便招聘看代码）
4. **不要**勾 "Initialize with README"（我们已经有了）
5. 点 Create repository
6. 复制网页上给的命令（类似下面），在 `/Users/mi/code/karl-studio` 里跑：

```bash
git remote add origin https://github.com/kbfx1234/karl-studio.git
git branch -M main
git push -u origin main
```

### 路径 B：装 GitHub CLI（更顺手）

```bash
brew install gh
gh auth login                              # GitHub.com → HTTPS → Login with browser
cd /Users/mi/code/karl-studio
gh repo create karl-studio --public --source . --remote origin --push
```

---

## Step 2：部署到 Vercel

### 路径 A：Vercel 网页一键导入（推荐）

1. 打开 <https://vercel.com/new>
2. 用 GitHub 登录
3. **Import** 选 `karl-studio` 仓库
4. 框架自动识别为 Vite，**所有默认值都对**，点 Deploy
5. 大约 60 秒后拿到 `karl-studio.vercel.app` 域名

### 路径 B：Vercel CLI

```bash
npm i -g vercel
cd /Users/mi/code/karl-studio
vercel               # 第一次：登录 + 选 scope，对所有问题按回车用默认值
vercel --prod        # 推到生产
```

---

## Step 3（可选）：自定义域名

在 Vercel 项目页 → Settings → Domains，加你的域名（如 `kbfx.dev`），按提示在域名注册商加一条 CNAME 即可。

---

## 后续日常更新

```bash
# 改代码
git add .
git commit -m "改动说明"
git push
# Vercel 收到 push 后自动重新部署，30 秒后线上更新
```

---

## 出图素材的处理

`public/images/_source/` 存的是原始大 PNG（11MB 主图、2.6MB Featured），它们：
- ✅ 保留在你本地磁盘
- ✅ 已被 `.gitignore` 排除，不会推到 GitHub
- ✅ 会被 cwebp 一次性压缩成 webp 多分辨率版本

如果你换图，只要：

```bash
# 把新 PNG 放到 public/images/_source/
cwebp -q 82 -resize 5000 0 public/images/_source/main-stage.png -o public/images/main-stage-5000w.webp
cwebp -q 82 -resize 3000 0 public/images/_source/main-stage.png -o public/images/main-stage-3000w.webp
cwebp -q 82 -resize 1920 0 public/images/_source/main-stage.png -o public/images/main-stage-1920w.webp
cwebp -q 82 -resize 1024 0 public/images/_source/main-stage.png -o public/images/main-stage-1024w.webp
```
