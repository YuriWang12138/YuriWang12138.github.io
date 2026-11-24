# 视像维度 VISION DIMENSION · 社团宣传网页

纯静态网页，无需构建。双击 `index.html` 即可在浏览器打开，或把整个文件夹上传到任意静态托管（学校服务器、GitHub Pages、Vercel 等）。

## 目录

- `index.html` 页面结构与文案（关于我们等）
- `js/data.js` **成员、奖项、组织架构数据**，改这里即可更新内容
- `js/app.js` 交互逻辑：卡包（three.js）、卡牌轮播、个人档案、证书墙
- `css/style.css` 样式
- `assets/img/members/` 成员照片：`<key>-card.webp`（卡面）、`<key>-avatar.webp`（头像）、`<key>-full.webp`（档案页）
- `assets/img/sign/` 签名，`assets/img/certs/` 证书图片
- `assets/audio/bgm.mp3` 背景配乐（原创合成，循环播放；默认不自动播放，由右下角按钮开关）。换曲子直接替换这个文件

## 常见修改

- 换照片：替换 `assets/img/members/` 下同名文件（透明背景的人像抠图效果最好）。
- 改成员信息 / 分工 / 技能标签：编辑 `js/data.js` 里的 `members`。
- 加奖项：在 `js/data.js` 的 `awards` 里加一行，证书图片放到 `assets/img/certs/`（`编号.webp` 与 `编号-thumb.webp`）。没有证书图片时 `certs` 留空，可用 `no` 填公示里的证书编号。
- 社团档案、日常活动：`js/data.js` 的 `club`；导师寄语：成员的 `message`。
- 字体为按用字子集化的 Noto Serif SC / Ma Shan Zheng / Cormorant Garamond（均为 OFL 开源字体）；新增的汉字若不在子集里，会自动回退到系统字体。
