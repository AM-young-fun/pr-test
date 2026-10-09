# 公关传播力（全国Ⅰ卷）

面向中国大陆互联网软件大厂公关、品牌、企业传播与公共事务岗位的自测题卷。视觉参考 [Indieloop 单机游戏策划（全国Ⅰ卷）](https://indieloop.com/quiz2.html)，题目、评分、称号与分享图均为本项目原创。

## 本地运行

```bash
npm install
npm run build
npx serve .
```

打开终端输出的地址即可。`npm run build` 将 `src/app.js` 打包到 `dist/app.js`。

## 发布到 Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

按提示选择当前目录、项目名与公开部署。也可在 Vercel 控制台导入本仓库，Framework 选 **Other**，Build Command 填 `npm run build`，Output Directory 留空。

## GitHub 关注

欢迎在仓库页面点击 **Star** 与 **Follow**：

<https://github.com/AM-young-fun/pr-test>

## 功能边界

- 客户端计分，无账号、无后端、无个人数据上传。
- 结果页二维码指向当前测试地址，文案为“你也测一测”。
- 转发 PNG 只绘制姓名、分数、称号、能力条、二维码与项目署名，不绘制题目、选项、答案或解析。
