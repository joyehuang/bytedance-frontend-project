# Code Review Guide

## 1. Code Review Process

### 1.1 Pre-Review Checklist

- [ ] Run `pnpm lint` and fix all linting errors
- [ ] Run `pnpm test` and ensure all tests pass
- [ ] Ensure commit messages follow conventional commits
- [ ] Self-review your changes in GitHub's UI
- [ ] Update documentation if needed

### 1.2 Review Flow

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/[feature-name]
   ```

2. **Make Changes & Commit**

   ```bash
   git add .
   git commit -m "feat(scope): add message input component"
   ```

3. **Open Pull Request**

   - Use PR template
   - Link related issues
   - Add appropriate labels
   - Request reviews from team members

4. **Review Process**
   - At least 1 approval required
   - All comments must be resolved
   - CI checks must pass

### 1.3 Review Standards

- Maximum 400 lines per PR
- Review within 24 hours
- Use constructive language
- Focus on code, not the coder

## 2. Development Setup

### 2.1 Initial Setup

1. Clone the repository

   ```bash
   git clone [repository-url]
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

   这将自动设置：

   - Husky git hooks
   - ESLint 配置
   - Prettier 配置
   - Commitlint 配置

3. 安装 VSCode 插件
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense

### 2.2 Commit Message Format

```
type(scope): subject

[optional body]

[optional footer]
```

类型必须是以下之一：

- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关
- `revert`: 回滚提交

示例：

```bash
feat(chat): add message input component
fix(api): handle network error in file upload
docs(readme): update installation guide
```

## 3. Review Guidelines

### 3.1 Code Quality Checklist

- [ ] Follows TypeScript best practices
- [ ] Proper error handling
- [ ] No unnecessary dependencies
- [ ] Consistent naming conventions
- [ ] Component props are documented
- [ ] Proper use of React hooks
- [ ] Performance considerations
- [ ] Accessibility compliance

### 3.2 Component Review Focus

- Props interface design
- State management
- Side effects handling
- Event handlers
- Rendering optimization
- Style organization
- Test coverage

### 3.3 Common Review Comments

✅ Good:

- "Consider using useCallback here for performance"
- "This could be simplified using optional chaining"
- "Missing error handling for API call"

❌ Avoid:

- "This is wrong"
- "Why did you do this?"
- "I wouldn't do it this way"

## 4. Review Comment Templates

### 4.1 Suggestions

```
Suggestion: Consider using [...] because [reason]
```

### 4.2 Questions

```
Question: Could you explain the reasoning behind [...]?
```

### 4.3 Issues

```
Issue: [description]
Impact: [what could go wrong]
Solution: [how to fix]
```

## 5. Pull Request Template

已在仓库中配置，创建PR时会自动使用。

## 6. Automated Checks

### 6.1 Required CI Checks

- TypeScript compilation
- ESLint validation
- Unit tests
- Build verification
- Bundle size check

### 6.2 Optional Checks

- Lighthouse performance
- Coverage report
- Dependency audit
- Storybook build

## 7. Review Metrics

### 7.1 Team Goals

- Review response within 24 hours
- Resolution of PR within 48 hours
- Test coverage > 80%
- Zero known security issues

### 7.2 Quality Metrics

- Number of bugs found in review
- Time to review completion
- Number of review iterations
- Post-merge incident rate

## 8. How to Review Code

### 8.1 Review Steps

1. **概览阶段**

   - 阅读 PR 描述，理解改动目的
   - 查看变更文件列表，了解改动范围
   - 确认是否有相关的设计文档或需求文档

2. **功能性审查**

   - 代码是否实现了预期功能
   - 是否覆盖了边缘情况
   - 是否有潜在的bug
   - 错误处理是否完善

3. **代码质量审查**

   - 代码可读性
   - 命名是否清晰直观
   - 注释是否充分且必要
   - 是否遵循项目编码规范

4. **架构审查**

   - 组件设计是否合理
   - 代码结构是否清晰
   - 是否遵循 React 最佳实践
   - 是否有不必要的复杂性

5. **性能审查**
   - 渲染优化
   - 资源使用
   - 网络请求处理
   - 状态管理效率

### 8.2 重点关注领域

#### React 组件审查要点

1. **Props 设计**

   ```typescript
   // ✅ Good
   interface ButtonProps {
     variant: 'primary' | 'secondary';
     size?: 'small' | 'medium' | 'large';
     onClick: () => void;
   }

   // ❌ Bad
   interface ButtonProps {
     type: string; // 类型不明确
     customSize: number; // 单位不明确
     handler: any; // 类型过于宽松
   }
   ```

2. **Hooks 使用**

   ```typescript
   // ✅ Good
   const memoizedCallback = useCallback(() => {
     doSomething(prop);
   }, [prop]);

   // ❌ Bad
   // 依赖项缺失或过多
   useEffect(() => {
     fetchData();
   }, []); // 缺少依赖项
   ```

3. **状态管理**

   ```typescript
   // ✅ Good
   const [isLoading, setIsLoading] = useState(false);
   const { data, error } = useSWR('/api/data');

   // ❌ Bad
   // 状态过于复杂或冗余
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   ```

#### 性能优化检查

1. **渲染优化**

   - 是否使用了适当的缓存策略（useMemo, useCallback）
   - 是否避免了不必要的重渲染
   - 大列表是否使用了虚拟滚动

2. **资源使用**
   - 图片是否进行了优化
   - 是否有不必要的依赖
   - 是否有内存泄漏风险

#### 安全性检查

1. **数据处理**

   - 用户输入是否经过验证
   - 敏感信息是否安全处理
   - API 调用是否有适当的错误处理

2. **权限控制**
   - 是否有适当的访问控制
   - 是否有潜在的安全漏洞

### 8.3 Review Checklist

#### 功能性

- [ ] 实现是否符合需求文档
- [ ] 是否处理了所有边缘情况
- [ ] 错误处理是否完善
- [ ] 是否有适当的日志记录

#### 可维护性

- [ ] 代码结构是否清晰
- [ ] 变量/函数命名是否恰当
- [ ] 是否有必要的注释
- [ ] 是否遵循 DRY 原则

#### 测试

- [ ] 单元测试是否充分
- [ ] 测试是否覆盖关键路径
- [ ] 测试是否容易理解和维护

#### 性能

- [ ] 是否有明显的性能问题
- [ ] 是否有不必要的计算或渲染
- [ ] 是否有资源泄漏风险

### 8.4 常见问题示例

#### 状态管理

```typescript
// ❌ 问题：状态更新可能不同步
setState(count + 1);
setState(count + 1);

// ✅ 建议：使用函数式更新
setState((prev) => prev + 1);
setState((prev) => prev + 1);
```

#### 副作用处理

```typescript
// ❌ 问题：缺少清理函数
useEffect(() => {
  const subscription = data.subscribe();
}, [data]);

// ✅ 建议：添加清理函数
useEffect(() => {
  const subscription = data.subscribe();
  return () => subscription.unsubscribe();
}, [data]);
```

#### 性能优化

```typescript
// ❌ 问题：不必要的对象创建
<Component style={{ margin: 10 }} />

// ✅ 建议：使用常量或useMemo
const style = useMemo(() => ({ margin: 10 }), []);
<Component style={style} />
```

### 8.5 建设性反馈

#### 如何提供反馈

1. 先肯定积极方面
2. 指出问题时提供具体的改进建议
3. 解释为什么需要改变
4. 提供代码示例

#### 反馈示例

````
👍 好的方面：
- 组件结构清晰
- 错误处理完善
- 测试覆盖充分

💭 建议改进：
1. 考虑使用 useCallback 优化性能：
   ```tsx
   const handleSubmit = useCallback(() => {
     // ...
   }, [dependencies]);
````

2. 建议添加加载状态处理：
   - 防止重复提交
   - 提供更好的用户体验

```

```
