# 开发计划：巨构工厂 v1

依据：`PRD.md`（唯一需求来源）。本文件为可执行开发计划，按阶段推进，每阶段有明确交付物与完成标准。

---

## 一、技术选型

| 层 | 选型 | 理由 |
|---|---|---|
| 前端框架 | **React 18 + Vite + TypeScript** | SPA、响应式、生态成熟；PRD 未限定栈，React 对灯箱/滑块/拖拽组件支持最好 |
| UI/样式 | **TailwindCSS + Headless UI/Radix** | 快速实现桌面侧边栏 / 手机底部 Tab 的响应式布局，无既有框架需复用 |
| 状态管理 | **Zustand** + **TanStack Query** | Zustand 存任务实时状态；Query 管服务端数据缓存与刷新 |
| 实时通信 | **WebSocket（原生 + 后端 ws）** | 任务进度实时回显（PRD P1/B1 要求） |
| 路由 | React Router v6 | 7 页 SPA |
| 后端 | **Node.js + Fastify + TypeScript** | 环境已带 Node v24；Fastify 轻量、内置 schema 校验、静态文件服务好 |
| 数据存储 | **SQLite（better-sqlite3）** 存结构化元数据 + **本地文件系统** 存图片/txt/md | PRD 要求重启持久化、需按创意/日期/比较状态查询；SQLite 零运维、单文件、支持事务。文件类产物落磁盘，DB 只存路径与元数据 |
| LLM 接入 | **抽象层 `LLMProvider` 接口 + 元宝实现 + 通义千问实现** | PRD 明确要求可替换的云端文本 LLM 抽象层 |
| ComfyUI 对接 | HTTP REST（`/prompt`、`/history`、`/view`）+ WebSocket（`/ws` 进度） | 标准 ComfyUI API，端口 :8188 |
| 打包 | **archiver**（zip 流式打包） | 作品库多选下载 zip |
| 二维码 | **qrcode**（后端生成局域网地址二维码） | 设置页手机扫码 |
| 部署 | 本地常驻：`npm run start` 启动后端（:3000，绑定 0.0.0.0）+ 托管前端构建产物；提供 `start.bat` 一键启动 | PRD：本机 + 局域网访问，无需公网 |

### 目录结构
```
巨构工厂/
├─ PRD.md  DEV_PLAN.md
├─ package.json (workspaces)
├─ server/                      # 后端 Fastify
│  ├─ src/
│  │  ├─ index.ts               # 启动、绑定 0.0.0.0:3000、托管前端 dist
│  │  ├─ config/
│  │  │  └─ settings.ts         # 设置读写（DB settings 表）
│  │  ├─ db/
│  │  │  ├─ sqlite.ts           # better-sqlite3 连接
│  │  │  └─ schema.sql          # 建表语句 + 迁移
│  │  ├─ routes/                # REST 路由（按模块）
│  │  │  ├─ creations.ts  tasks.ts  gallery.ts
│  │  │  ├─ compare.ts    references.ts  settings.ts
│  │  ├─ services/
│  │  │  ├─ llm/
│  │  │  │  ├─ provider.ts      # LLMProvider 接口
│  │  │  │  ├─ yuanbao.ts       # 元宝深度思考实现
│  │  │  │  ├─ qwen.ts          # 通义千问实现（可替换）
│  │  │  │  └─ index.ts         # 工厂：按 settings 选择 provider
│  │  │  ├─ comfyui.ts          # ComfyUI 客户端 + 工作流模板
│  │  │  ├─ generator.ts        # 批量生成编排（串行队列）
│  │  │  ├─ archive.ts          # 归档 输出/创意名/日期/
│  │  │  ├─ compare.ts          # 比较记录 + 报告生成
│  │  │  └─ wsHub.ts            # WebSocket 广播中心
│  │  └─ data/
│  │     └─ seedCreations.ts    # ≥100 条预置创意库
│  └─ workflows/qwen_image_edit.json  # ComfyUI API 格式工作流
├─ client/                      # 前端 React
│  ├─ src/
│  │  ├─ main.tsx  App.tsx  router.tsx
│  │  ├─ layouts/DesktopSidebar.tsx  MobileTabBar.tsx
│  │  ├─ pages/ (P1..P7)
│  │  ├─ components/ (灯箱/滑块/特征卡/进度卡/创意卡…)
│  │  ├─ api/ (对应后端各模块的请求封装)
│  │  ├─ store/ (zustand)  hooks/useTaskSocket.ts
│  │  └─ types/ (与后端共享 DTO)
│  └─ vite.config.ts (dev proxy → :3000)
└─ storage/                     # 运行时数据（可配置到 D 盘）
   ├─ app.db                    # SQLite
   ├─ 输出/  参考图库/  uploads/
```

### 数据模型（SQLite 表）
- `settings(key TEXT PK, value TEXT)` — 全局配置
- `creations(id, name, category, source[preset|ai], setting_desc, copywriting_md, prompt, style_tag, created_at)`
- `tasks(id, created_at, status[running|done|cancelled], params_json)`
- `task_images(id, task_id, creation_id, status[queued|generating|done|failed], file_path, prompt_snapshot, error, elapsed_ms)`
- `references(id, file_name, file_path, feat_scale, feat_composition, feat_light, feat_detail, feat_material, feat_mood, feat_color, highlight_note, created_at)`
- `comparisons(id, creation_id, gen_image_path, ref_id, score_a_json, score_b_json, diff_json, note, report_md_path, report_json_path, created_at)`

---

## 二、阶段拆分与依赖关系

```
P0 脚手架 ─┬─> P1 后端基座+设置 ─┬─> P2 创意库+LLM抽象 ──┐
           │                     │                       ├─> P4 作品库 ──┐
           └─> P1f 前端骨架+导航 ─┴─> P3 ComfyUI+生成+归档 ┘             │
                                                                          ├─> P6 工作台聚合+实时
                                    P5 参考图库 ──> P5b 比较工作台 ────────┘             │
                                                                                        v
                                                              P7 响应式/手机/二维码/打包收尾
                                                                                        │
                                                                                        v
                                                              P8 验收（对照 PRD 第9章）
```
关键依赖：P3 依赖 P1（设置/DB）与 P2（创意数据）；P4 依赖 P3（有归档产物）；P5b 依赖 P5（特征卡）与 P4（生成图）；P6 依赖 P3/P5b（进度与比较数据）；P7 贯穿各页但集中收口；P8 依赖全部。

---

## 阶段 P0 — 项目脚手架与基础设施
**目标**：可运行的前后端骨架，一键 dev 启动。

- 交付物：monorepo（npm workspaces）、Fastify hello、Vite React 首页、dev proxy、TS 配置、`.gitignore`、`start.bat`（占位）。
- 创建文件：根 `package.json`、`server/package.json`、`server/src/index.ts`、`client/*`（Vite 模板）、`client/vite.config.ts`。
- 函数/组件：`server.buildApp()`（注册插件/CORS/静态）、`client App.tsx`。
- 依赖：无。
- **完成标准**：`npm run dev` 后浏览器打开 :5173 显示占位页，前端请求 `/api/health` 经 proxy 返回 200；`server` 单独启动监听 :3000。

## 阶段 P1 — 后端基座、数据库与设置模块（对应 PRD P7）
**目标**：数据层就绪，设置可读写并测试外部连接。

- 交付物：SQLite 初始化与建表、settings 服务、设置 REST、ComfyUI/元宝 连接测试端点、LLM 抽象层接口与工厂。
- 创建文件：`db/sqlite.ts`、`db/schema.sql`、`config/settings.ts`、`routes/settings.ts`、`services/llm/provider.ts`、`services/llm/index.ts`、`services/comfyui.ts`(仅 ping 部分)。
- 函数：`initDb()`、`getSetting/putSetting()`、`SettingsRoutes()`、`testComfyConnection()`、`testLLMConnection()`、`LLMProvider` 接口（`generateCreations()`、`refinePrompt()` 等契约）。
- 依赖：P0。
- **完成标准**：启动自动建库建表；`GET/PUT /api/settings` 持久化成功且重启保留；`POST /api/settings/test-comfy` 在 :8188 开/关时分别返回成功/失败；`test-llm` 同理（PRD F4/F5）。

## 阶段 P1f — 前端骨架、导航与设置页
**目标**：桌面侧边栏 + 手机底部 Tab 的响应式框架，设置页可用。

- 交付物：`router.tsx`（7 路由）、`DesktopSidebar`、`MobileTabBar`、`api/settings.ts`、设置页 UI（含二维码占位、连接测试按钮）。
- 组件：`SettingsPage`、`ConnTestButton`、`PathInput`、`QRCodeBox`。
- 依赖：P0、P1。
- **完成标准**：桌面显示左侧 7 项、手机（≤768px）显示底部 5 Tab 且"我的"内含比较/参考/设置入口（PRD F1）；设置页保存后刷新值仍在，两个测试按钮反馈正确。

## 阶段 P2 — 创意库 + LLM 抽象实现（对应 PRD P2）
**目标**：预置库入库、AI 生成创意、文案/提示词编辑持久化。

- 交付物：≥100 条预置创意 seed 与首启导入；元宝 + 通义千问 provider 实现；创意 CRUD REST；创意库前端页与详情抽屉。
- 创建文件：`data/seedCreations.ts`、`services/llm/yuanbao.ts`、`services/llm/qwen.ts`、`services/creations.ts`、`routes/creations.ts`、`client/pages/CreationsPage.tsx`、`components/CreationCard.tsx`、`CreationDrawer.tsx`、`api/creations.ts`。
- 函数：`seedIfEmpty()`、`LLMProvider.generateCreations(n)`、`buildPromptWithStyle(idea, styleTemplate)`（内置"强调巨构、压倒性史诗尺度"）、`CreationsRoutes()`、前端 `useCreations()`、`handleAIGenerate(n)`。
- 依赖：P1、P1f。
- **完成标准**：首启创意库 ≥100 条（A1）；点 AI 生成 10 条成功入库带 NEW 角标，Key 错误时明确报错不崩溃（A2）；编辑文案保存后重启仍在、md 同步（A3）；AI 创意提示词含巨构/史诗尺度描述（A4）。

## 阶段 P3 — ComfyUI 对接 + 生成任务 + 归档（对应 PRD P3）
**目标**：批量串行生图、实时进度、失败重试、取消、自动归档。

- 交付物：ComfyUI 工作流模板（qwen_image_edit，API 格式）；生成编排服务（串行队列）；任务 REST + WebSocket 广播；归档服务；生成任务前端页（发起 + 监控）。
- 创建文件：`server/workflows/qwen_image_edit.json`、`services/comfyui.ts`(queuePrompt/读 history/取图)、`services/generator.ts`、`services/archive.ts`、`services/wsHub.ts`、`routes/tasks.ts`、`client/pages/TaskPage.tsx`、`components/TaskMonitor.tsx`、`ImageCell.tsx`、`hooks/useTaskSocket.ts`、`api/tasks.ts`。
- 函数：`submitWorkflow(prompt, size)`、`pollHistory(id)`、`GeneratorQueue.enqueue(task)`/`cancel()`/`retryImage(id)`、`archiveBatch(creation, date, files)`→写 图片+提示词.txt+文案.md、`wsHub.broadcast(event)`；前端 `TaskForm`（多选/随机抽 N/张数/分辨率/提示词微调）、`startTask()`。
- 依赖：P1、P2。
- **完成标准**：选 2 创意×3 张，显示预计耗时并逐张实时回显、全部完成（B1）；生成中关闭 ComfyUI → 未完成图标失败并可 [重试单张] 成功（B2）；取消后排队图不执行、已完成保留（B3）；磁盘出现 `输出/<创意名>/<日期>/` 含图+txt+md（B4）。

## 阶段 P4 — 作品库（对应 PRD P4）
**目标**：归档镜像浏览、灯箱、提示词/文案查看、zip 打包、比较状态标记。

- 交付物：目录树 + 日期分组网格 REST（扫描 storage/输出 与 DB 关联）；灯箱组件；zip 打包端点；比较状态标记（读 comparisons 表，字段 P5b 回填）。
- 创建文件：`services/gallery.ts`、`routes/gallery.ts`、`client/pages/GalleryPage.tsx`、`components/FolderTree.tsx`、`ImageGrid.tsx`、`Lightbox.tsx`、`api/gallery.ts`。
- 函数：`scanArchiveTree()`、`listBatch(creation,date)`、`zipImages(paths[])`（archiver 流）、前端 `Lightbox`（翻页/缩放/复制）、`toggleMultiSelect()`。
- 依赖：P3。
- **完成标准**：目录树与磁盘一致、新批次刷新可见（C1）；灯箱翻页/看/复制提示词文案成功（C2）；多选 4 张下载 zip 解压完整（C3）；比较状态标记随 P5b 数据正确显示（C4，先以"未比较"占位通过，P5b 后回归）。

## 阶段 P5 — 参考图库（对应 PRD P6）
**目标**：上传管理参考图、7 维度特征卡持久化、预留 v2 按钮位。

- 交付物：上传（multipart/拖拽）+ 文件名规范化；references CRUD + 特征卡；前端图库页与特征卡表单。
- 创建文件：`services/references.ts`、`routes/references.ts`、`client/pages/ReferencePage.tsx`、`components/FeatureCardForm.tsx`、`RefGrid.tsx`、`api/references.ts`。
- 函数：`saveUpload(file)`（存 参考图库/、规范化名）、`normalizeFileName()`、`upsertFeatureCard(refId, dims, note)`、前端 `FeatureCardForm`（7 维星级滑块）、灰色 `AIExtractButton(v2)`。
- 依赖：P1f。
- **完成标准**：上传 2 张计数 +2、文件入库且名规范化（D1）；填特征卡保存重启仍在（D2 前半）；v2 按钮点击提示"v2 提供"不报错（D3）。

## 阶段 P5b — 比较工作台（对应 PRD P5）
**目标**：A/B 并排同步缩放、7 维打分差值高亮、笔记、报告生成、状态回流。

- 交付物：comparisons CRUD；报告生成（md+json 写入 `输出/<创意名>/<日期>/`）；比较工作台前端页；参考图特征卡自动带入 B 侧；回填作品库/首页比较状态。
- 创建文件：`services/compare.ts`、`routes/compare.ts`、`client/pages/ComparePage.tsx`、`components/SyncZoomPair.tsx`、`ScoreSliders.tsx`、`DiffNoteEditor.tsx`、`CompareHistory.tsx`、`api/compare.ts`。
- 函数：`pickRefRandom()`/`pickRefById()`、`prefillBFromFeatureCard(refId)`、`computeDiff(scoreA,scoreB)`（≥2 标 warning）、`saveComparison()`→`writeReport(md,json)`、`listHistory(creationId?)`；前端同步缩放（共享 transform state）、`ScoreSliders`（1-5，实时差值+⚠+笔记模板）。
- 依赖：P4、P5。
- **完成标准**：A/B 并排、桌面缩放平移同步（E1）；打分差值实时、≥2 高亮 + 笔记模板（E2）；保存后生成 md+json、P5 历史出现、P4 图变"已比较+总分"、P1 出现记录（E3）；手机可完成全流程（E4，P7 回归）。

## 阶段 P6 — 工作台聚合 + 实时（对应 PRD P1）
**目标**：首页状态卡片、任务实时进度、最近生成/比较、发起入口。

- 交付物：聚合 REST（状态统计 + 最近数据）；ComfyUI 心跳；首页组件；复用 P3 WebSocket 显示进度。
- 创建文件：`routes/dashboard.ts`、`services/dashboard.ts`、`client/pages/DashboardPage.tsx`、`components/StatusCards.tsx`、`RunningTaskCard.tsx`、`RecentStrips.tsx`、`api/dashboard.ts`。
- 函数：`getDashboard()`（comfy 状态/创意数/待比较数/最近10图/最近10比较）、`heartbeatComfy()`、前端订阅 `useTaskSocket` 更新进度条。
- 依赖：P3、P5b。
- **完成标准**：状态卡片数值正确、ComfyUI 红绿灯随开关变化并可点击重试；进行中任务进度条实时刷新（免手动刷新）；最近生成/比较可点击跳转；[发起新任务] 直达 P3。

## 阶段 P7 — 响应式收口、手机全流程、二维码、打包收尾
**目标**：手机可完成"选创意→生成→查看→比较"全流程；二维码扫码直达；桌面/手机布局打磨。

- 交付物：全页面移动端适配审查；设置页局域网地址 + 二维码（后端 qrcode 生成，绑定 0.0.0.0）；`start.bat` 生产启动脚本（构建前端 + 启动后端托管 dist）。
- 组件/函数：`useMediaQuery`、`getLanAddress()`（枚举网卡 IPv4）、`QRCodeBox` 接真实二维码、`buildAndStart` 脚本。
- 依赖：P6（各页功能齐备）。
- **完成标准**：手机经 `http://<局域网IP>:3000` 打开并完成全流程（F2）；设置页显示地址+二维码、扫码直达（F3）；桌面 7 项 / 手机 5 Tab 齐全（F1 回归）；`start.bat` 一键启动生产模式。

## 阶段 P8 — 集成验收（对照 PRD 第 9 章）
**目标**：逐条勾验 A1–F5，修复缺陷。

- 交付物：验收清单执行记录、缺陷修复、README（启动/配置元宝 Key/ComfyUI 路径说明）。
- 依赖：P0–P7 全部。
- **完成标准**：PRD 第 9 章 A/B/C/D/E/F 共 24 条全部勾选通过；F4 重启持久化（创意/作品/比较/特征卡/设置）验证通过；无阻塞性缺陷。

---

## 三、里程碑与推进顺序（串行建议）
1. **M1 基础设施**：P0 → P1 → P1f（能启动、能配置、导航成型）
2. **M2 生产能力**：P2 → P3 → P4（创意→生图→归档→浏览闭环打通）
3. **M3 质检能力**：P5 → P5b（参考图 + 比较打分报告）
4. **M4 聚合与交付**：P6 → P7 → P8（首页实时、手机全流程、验收）

每个里程碑结束做一次可运行演示，再进入下一里程碑。

## 四、风险与对策
| 风险 | 对策 |
|---|---|
| 元宝 API 无可用 Key | LLM 抽象层已解耦，先用通义千问或 mock provider 打通 P2/P3，Key 到位再切实现 |
| ComfyUI qwen_image_edit 工作流 API 格式节点名不确定 | P3 首步先导出一次可用 workflow 的 API JSON 作为模板，参数化 prompt/size/输出节点 |
| 24GB 显存串行约束 | 生成队列强制串行，禁止并发；文案/提示词生成（LLM，走云端）与生图分离，不抢显存 |
| 手机同步缩放体验 | P5b 提供 A/B 全屏切换作为降级方案（PRD 已认可） |
| SQLite 与文件双写一致性 | 归档先写文件再写 DB，DB 存相对路径；启动时可做一次磁盘对账（scan 修正 DB） |
