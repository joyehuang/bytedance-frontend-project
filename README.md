# 聊天组件开发指南

## 技术栈

- 框架：React 18 + TypeScript
- 构建工具：Vite
- 样式：TailwindCSS
- 状态管理：Zustand
- 代码规范：ESLint + Prettier
- Git Hooks：Husky + lint-staged
- UI组件：shadcn/ui

## 开发环境搭建

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 初始设置

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

### 必需的 VSCode 插件

- ESLint
- Prettier
- Tailwind CSS IntelliSense

## 项目结构

```
src/
├── components/      # React组件
├── hooks/          # 自定义hooks
├── store/          # 状态管理
├── types/          # TypeScript类型定义
└── utils/          # 工具函数
```

## 代码审查流程

### 提交前检查清单

- [ ] 运行 `pnpm lint` 并修复所有错误
- [ ] 运行 `pnpm test` 确保所有测试通过
- [ ] 确保提交信息符合规范
- [ ] 在GitHub UI中进行自我审查
- [ ] 必要时更新文档

## 开发规范

### 组件开发

1. **结构规范**
   - 使用函数式组件
   - 使用TypeScript类型
   - 一个文件一个组件
   - 使用.tsx扩展名
   - 使用相对单位

## Git工作流

### 分支策略

- main: 生产环境代码
- develop: 集成分支
- feature/\*: 功能开发
- fix/\*: 问题修复

### 提交信息格式

```
type(scope): subject

[可选 body]

[可选 footer]
```

类型：

- feat: 新功能
- fix: 问题修复
- docs: 文档更新
- style: 代码格式化
- refactor: 代码重构
- perf: 性能优化
- test: 测试相关
- chore: 构建/工具相关
- revert: 回滚提交

示例：

```
feat(chat): 添加消息输入组件
fix(api): 处理文件上传网络错误
docs(readme): 更新安装指南
```
