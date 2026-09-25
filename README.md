# 巨构工厂 (Mega Factory)

本地化科幻巨构图像生成工作流自动化工具。

## 功能特性

- **创意库**: 174 个预设巨构创意 + AI 生成新创意
- **生成任务**: 批量串行生图，支持重试/取消，实时进度推送
- **作品库**: 目录树同步、Lightbox 浏览、ZIP 下载、比较状态标记
- **参考图库**: 图片上传、7 维度特征卡打分（尺度/构图/光影/细节/材质/氛围/色彩）
- **比较工作台**: A/B 同步缩放、7 维度打分对比、差异警告（≥2）、报告生成
- **工作台**: 聚合仪表盘，ComfyUI 状态、任务进度、最近作品
- **响应式**: 桌面端 7 项侧边栏 + 移动端 5 项底部导航
- **局域网访问**: 自动枚举 IP、二维码扫码连接

## 技术栈

- **前端**: React 18 + TypeScript + Vite + TailwindCSS + React Router v6 + Zustand + TanStack Query
- **后端**: Node.js + Fastify + TypeScript
- **数据库**: sql.js (SQLite via WebAssembly)
- **实时通信**: WebSocket (ws)
- **LLM**: 元宝 API / 通义千问（抽象层可切换）
- **图像生成**: ComfyUI API

## 快速开始

### 前置要求

- Node.js >= 18
- ComfyUI 运行在 `http://localhost:8188`
- LLM API Key（元宝或通义千问）

### 安装与启动

```bash
# 安装依赖
npm install

# 开发模式（前后端分离）
# 终端 1：启动后端
cd server && npm run dev

# 终端 2：启动前端
cd client && npm run dev
```

访问 `http://localhost:5173`

### 生产模式

```bash
# Windows 一键启动
start.bat

# 或手动
npm install
npm run build    # 构建前端
npm start        # 启动服务器（端口 3000）
```

访问 `http://localhost:3000`

### 配置

首次启动后，进入 **设置** 页面配置：

- **ComfyUI 地址**: 默认 `http://localhost:8188`
- **LLM 提供商**: 选择"元宝深度思考"或"通义千问"，填入 API Key
- **输出目录**: 生成图片保存位置（默认 `./storage/输出`）
- **参考图目录**: 参考图片存储位置（默认 `./storage/参考图`）

## 项目结构

```
├── client/              # 前端
│   ├── src/
│   │   ├── api/         # API 客户端
│   │   ├── components/  # 可复用组件
│   │   ├── hooks/       # 自定义 Hooks
│   │   ├── layouts/     # 布局组件
│   │   ├── pages/       # 页面组件
│   │   └── stores/      # Zustand 状态
│   └── __tests__/       # 前端测试
├── server/              # 后端
│   ├── src/
│   │   ├── config/      # 配置
│   │   ├── data/        # 预设数据（174 个创意）
│   │   ├── db/          # SQLite 数据库
│   │   ├── routes/      # API 路由
│   │   └── services/    # 业务逻辑
│   └── __tests__/       # 后端测试
└── storage/             # 运行时数据（自动生成）
    ├── app.db           # SQLite 数据库文件
    ├── 输出/            # 生成的图片归档
    └── 参考图/          # 上传的参考图
```

## 测试

```bash
# 运行所有测试
cd server && npm test
cd client && npm test

# 当前测试数量
# - 后端: 112 个测试（18 个文件）
# - 前端: 49 个测试（11 个文件）
# 总计: 161 个测试
```

## 输出归档结构

```
输出/
└── 创意名称/
    └── 2026-09-25/
        ├── image_001.png
        ├── image_002.png
        ├── 提示词.txt
        └── 文案.md
```

## 局域网访问

1. 启动服务器后，进入 **设置 → 局域网访问**
2. 查看分配的 IP 地址（如 `http://192.168.1.100:3000`）
3. 手机扫描页面上的二维码即可访问

## 开发计划

详见 `PRD.md`（需求文档）和 `DEV_PLAN.md`（开发计划）。

已完成阶段：
- P0: 项目脚手架
- P1: 后端基座、数据库与设置
- P1f: 前端骨架与导航
- P2: 创意库 + LLM 抽象
- P3: ComfyUI 对接 + 生成任务
- P4: 作品库
- P5: 参考图库
- P5b: 比较工作台
- P6: 工作台聚合
- P7: 响应式收口、手机全流程
- P8: 集成验收

## License

MIT
