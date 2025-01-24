<<<<<<< HEAD
# bytedance-frontend-project
=======
# Chat Component

一个基于 React 的聊天组件，支持内联与独立两种模式，能够处理多媒体输入，展示流式 LLM 响应。

## 技术栈

- 框架：React 18 + TypeScript
- 构建工具：Vite
- 样式：TailwindCSS
- 状态管理：Zustand
- 代码规范：ESLint + Prettier
- Git Hooks：Husky + lint-staged

## 开发环境要求

- Node.js >= 16
- pnpm >= 8

## 项目结构

```
src/
├── components/      # 组件目录
├── hooks/          # 自定义hooks
├── store/          # 状态管理
├── types/          # TypeScript类型定义
└── utils/          # 工具函数
```

## 安装和运行

```bash
# 安装依赖
pnpm install

# 开发模式运行
pnpm dev

# 构建项目
pnpm build

# 预览构建结果
pnpm preview
```

## 代码规范

- 使用 ESLint 和 Prettier 进行代码规范检查和格式化
- 提交前会自动运行 lint-staged 检查代码

```bash
# 检查代码
pnpm lint

# 修复代码规范问题
pnpm lint:fix

# 格式化代码
pnpm format
```

## 目录说明

### components

组件目录，包含：

- Chat/：聊天相关组件
  - InlineChat/：内联聊天组件
  - StandaloneChat/：独立聊天组件
  - shared/：共享组件

### hooks

自定义 hooks 目录：

- useChat：聊天逻辑
- useStreamingResponse：流式响应
- useMediaUpload：媒体上传

### store

状态管理目录：

- 使用 Zustand 管理全局状态

### types

TypeScript 类型定义目录

### utils

工具函数目录

## 开发规范

1. 代码风格

   - 使用 TypeScript 编写代码
   - 遵循 ESLint 规范
   - 使用 Prettier 格式化代码

2. Git 提交

   - 提交前会自动运行代码检查
   - 建议使用规范的 commit message 格式

3. 组件开发
   - 使用函数式组件
   - 合理使用 React Hooks
   - 遵循组件设计原则
>>>>>>> 43f06f9 (chore: project initialization)
