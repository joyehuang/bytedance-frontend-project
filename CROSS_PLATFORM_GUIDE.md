# 跨平台兼容指南

## 1. 前期准备工作

### 1.1 目录结构调整

```bash
src/
├── components/
│   ├── common/          # 跨平台通用组件
│   │   ├── Button/
│   │   │   ├── index.tsx        # 通用逻辑
│   │   │   ├── web.tsx          # Web特定实现
│   │   │   ├── h5.tsx           # H5特定实现
│   │   │   └── miniapp.tsx      # 小程序特定实现
│   │   └── ...
│   ├── web/            # Web专用组件
│   ├── h5/            # H5专用组件
│   └── miniapp/       # 小程序专用组件
├── hooks/
│   ├── common/        # 跨平台通用hooks
│   ├── web/          # Web专用hooks
│   └── platform/     # 平台特定hooks
└── utils/
    ├── platform.ts   # 平台判断工具
    └── adapter/      # 平台适配器
```

### 1.2 代码编写规范

1. **样式处理**

```typescript
// 使用条件样式
const styles = {
  container: {
    ...commonStyles.container,
    ...(isPlatform('web') ? webStyles.container : null),
    ...(isPlatform('h5') ? h5Styles.container : null),
  },
};

// 使用平台特定类名
const className = cn(
  'base-style',
  isPlatform('web') && 'web-style',
  isPlatform('h5') && 'h5-style'
);
```

2. **平台判断**

```typescript
// utils/platform.ts
export type Platform = 'web' | 'h5' | 'miniapp';

export const getPlatform = (): Platform => {
  if (process.env.TARO_ENV === 'weapp') return 'miniapp';
  if (isMobile()) return 'h5';
  return 'web';
};

export const isPlatform = (platform: Platform): boolean => {
  return getPlatform() === platform;
};
```

3. **条件渲染**

```typescript
const Component = () => {
  const platform = getPlatform()

  return (
    <div>
      {platform === 'web' && <WebSpecificFeature />}
      {platform === 'h5' && <H5SpecificFeature />}
      {platform === 'miniapp' && <MiniAppSpecificFeature />}
    </div>
  )
}
```

### 1.3 需要特别注意的API和功能

1. **文件上传**

```typescript
// hooks/useUpload.ts
export const useUpload = () => {
  const platform = getPlatform();

  const upload = async (file: File) => {
    switch (platform) {
      case 'web':
        return webUpload(file);
      case 'h5':
        return h5Upload(file);
      case 'miniapp':
        return miniappUpload(file);
    }
  };

  return { upload };
};
```

2. **存储处理**

```typescript
// utils/storage.ts
export const storage = {
  get: async (key: string) => {
    switch (getPlatform()) {
      case 'web':
        return localStorage.getItem(key);
      case 'miniapp':
        return wx.getStorageSync(key);
      // ...
    }
  },
  // ...
};
```

3. **网络请求**

```typescript
// utils/request.ts
export const request = async (options: RequestOptions) => {
  switch (getPlatform()) {
    case 'web':
      return fetch(options);
    case 'miniapp':
      return wx.request(options);
    // ...
  }
};
```

## 2. 当前阶段需要做的准备

### 2.1 基础设施

1. 设置平台判断工具
2. 创建基础适配器
3. 调整目录结构

### 2.2 组件开发规范

1. 将UI组件分为通用组件和平台特定组件
2. 使用条件样式和渲染
3. 提供平台特定的props类型

### 2.3 状态管理调整

```typescript
interface PlatformConfig {
  platform: Platform;
  capabilities: {
    upload: boolean;
    storage: boolean;
    notification: boolean;
  };
}

interface ChatState {
  // ... 其他状态
  platformConfig: PlatformConfig;
}
```

## 3. 开发规范

### 3.1 样式规范

1. **单位使用**

   ```css
   /* ✅ 推荐 */
   .container {
     font-size: 1rem;
     padding: 1em;
     margin: 0.5rem 1rem;
     width: 100%;
     max-width: 40rem;
   }

   /* ❌ 避免 */
   .container {
     font-size: 16px;
     padding: 16px;
     margin: 8px 16px;
     width: 600px;
   }
   ```

2. **响应式设计**

   ```css
   /* 使用相对单位和媒体查询 */
   .chat-container {
     width: 100%;
     max-width: 40rem;
     margin: 0 auto;
     padding: 1rem;
   }

   /* 使用CSS变量处理平台差异 */
   :root {
     --input-height: 3rem;
     --border-radius: 0.5rem;
   }

   [data-platform='miniapp'] {
     --input-height: 2.5rem;
     --border-radius: 0.25rem;
   }
   ```

3. **布局方案**

   ```css
   /* 使用Flex和Grid进行布局 */
   .chat-layout {
     display: flex;
     flex-direction: column;
     min-height: 100vh;
     gap: 1rem;
   }

   /* 避免使用固定定位 */
   .message-list {
     flex: 1;
     overflow-y: auto;
     padding: 1rem;
   }
   ```

### 3.2 JavaScript/TypeScript规范

1. **平台特定代码隔离**

   ```typescript
   // platform/index.ts
   export const platformSpecific = {
     web: () => import('./web'),
     h5: () => import('./h5'),
     miniapp: () => import('./miniapp'),
   }[getPlatform()]();

   // 使用示例
   const { handleUpload } = await platformSpecific();
   ```

2. **事件处理**

   ```typescript
   // 统一的事件处理接口
   interface TouchEvent {
     x: number;
     y: number;
     timestamp: number;
   }

   // 平台适配器
   const getTouchEvent = (e: any): TouchEvent => {
     switch (getPlatform()) {
       case 'web':
         return {
           x: e.clientX,
           y: e.clientY,
           timestamp: e.timeStamp,
         };
       case 'miniapp':
         return {
           x: e.touches[0].clientX,
           y: e.touches[0].clientY,
           timestamp: e.timeStamp,
         };
       // ...
     }
   };
   ```

3. **API调用封装**

   ```typescript
   // 统一的API接口
   interface StorageAPI {
     get: (key: string) => Promise<any>;
     set: (key: string, value: any) => Promise<void>;
     remove: (key: string) => Promise<void>;
   }

   // 平台特定实现
   const storage: StorageAPI = {
     get: async (key) => {
       switch (getPlatform()) {
         case 'web':
           return localStorage.getItem(key);
         case 'miniapp':
           return wx.getStorageSync(key);
       }
     },
     // ...
   };
   ```

### 3.3 组件开发规范

1. **组件结构**

   ```typescript
   // 基础组件接口
   interface BaseComponentProps {
     className?: string;
     style?: React.CSSProperties;
     platform?: Platform;
   }

   // 平台特定props
   interface PlatformProps extends BaseComponentProps {
     // web特定
     onClick?: (e: React.MouseEvent) => void;
     // 小程序特定
     onTap?: (e: any) => void;
   }

   // 组件实现
   const Button: React.FC<PlatformProps> = (props) => {
     const platform = getPlatform();
     const handleInteraction = (e: any) => {
       if (platform === 'web' && props.onClick) {
         props.onClick(e);
       } else if (platform === 'miniapp' && props.onTap) {
         props.onTap(e);
       }
     };
     // ...
   };
   ```

2. **条件渲染优化**
   ```typescript
   // 使用懒加载处理平台特定组件
   const PlatformImage = lazy(() => {
     switch (getPlatform()) {
       case 'web':
         return import('./WebImage');
       case 'miniapp':
         return import('./MiniappImage');
       default:
         return import('./FallbackImage');
     }
   });
   ```

### 3.4 性能优化规范

1. **资源加载**

   ```typescript
   // 按平台分割代码
   const loadPlatformAssets = () => {
     if (isPlatform('web')) {
       // 加载web特定资源
     } else if (isPlatform('miniapp')) {
       // 加载小程序特定资源
     }
   };
   ```

2. **渲染优化**

   ```typescript
   // 使用平台特定的虚拟列表实现
   const VirtualList = lazy(() => import(`./VirtualList/${getPlatform()}`));

   // 使用memo优化跨平台组件
   const OptimizedComponent = memo(({ data }) => {
     const platform = getPlatform();
     // 平台特定的渲染逻辑
   });
   ```

### 3.5 测试规范

1. **单元测试**

   ```typescript
   describe('跨平台组件测试', () => {
     it('在Web环境下正常渲染', () => {
       mockPlatform('web');
       // 测试web特定功能
     });

     it('在小程序环境下正常渲染', () => {
       mockPlatform('miniapp');
       // 测试小程序特定功能
     });
   });
   ```

2. **集成测试**
   ```typescript
   // 使用平台特定的测试工具
   const testPlatform = async (platform: Platform) => {
     setPlatform(platform);
     // 运行平台特定的集成测试
   };
   ```

## 4. 后期规划

1. **Web端完成后**

   - 评估组件的可复用性
   - 识别平台特定的实现
   - 准备适配器层

2. **H5适配**

   - 调整响应式布局
   - 优化触摸交互
   - 处理键盘事件

3. **小程序适配**
   - 处理组件生命周期差异
   - 适配小程序的API限制
   - 优化性能和包大小
