# Contributing Guide

## 分支管理

我们采用简单的分支策略：

- `main`: 主分支，包含稳定的代码
- `feature/*`: 功能分支，用于开发新功能

## 开发流程

1. 创建功能分支

```bash
# 从main分支创建新的功能分支
git checkout main
git pull
git checkout -b feature/your-feature
```

2. 开发和提交

```bash
# 提交代码
git add .
git commit -m "feat: add new feature"

# 推送到远程
git push origin feature/your-feature
```

3. 创建 Pull Request

- 从你的功能分支到 main 分支
- 需要至少一个审核人批准
- 合并后删除功能分支

## Commit 规范

提交信息格式：`type: description`

常用类型：

- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关

示例：

```bash
feat: add chat input component
fix: resolve message display issue
docs: update README
```

## 代码规范

我们使用了：

- ESLint 进行代码检查
- Prettier 进行代码格式化

开发前请确保：

1. 安装 VSCode ESLint 和 Prettier 插件
2. 开启保存时自动格式化

## 开发环境设置

1. 克隆项目

```bash
git clone [repository-url]
cd [project-name]
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发服务器

```bash
pnpm dev
```

## 项目结构

```
src/
├── components/      # 组件目录
├── hooks/          # 自定义hooks
├── store/          # 状态管理
├── types/          # TypeScript类型定义
└── utils/          # 工具函数
```
