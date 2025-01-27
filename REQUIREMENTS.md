# Chat Component Requirements

## 1. Overview

A versatile React chat component that supports both inline and standalone modes, with streaming LLM responses and multimedia support.

### Key Features

- Dual mode support (inline & standalone)
- Multimedia input support (text, images, PDF)
- Streaming response display
- Markdown rendering
- Code block display with copy functionality
- Cross-platform compatibility
- Chat history management with pinned conversations

## 2. Technical Stack

### Core Technologies

- **Framework**: React 18
- **Language**: TypeScript 5.x
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **LLM Integration**: Coze API
- **UI Libraries**:
  - shadcn/ui
  - ant-design/pro-chat
  - llm-ui
  - 可以自行选择其他UI库

### Development Tools

- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Code Quality**:
  - ESLint
  - Prettier
  - TypeScript (strict mode)
- **Git Hooks**: Husky + lint-staged
- **Testing**:
  - Vitest
  - React Testing Library

## 3. Component Architecture

### 3.1 Chat States

#### 1. Collapsed State (Minimal)

- Single-line input field with placeholder
- Search icon and keyboard shortcut (⌘K)
- User avatar and settings access
- No conversation history visible
- Click or keyboard shortcut to expand

#### 2. Semi-Expanded State (Quick Chat)

- Triggered by Tab key or click
- Search bar with model selection
- Recent conversations preview
- Quick input area
- Basic file attachment options
- Compact message display
- Easy collapse/expand controls

#### 3. Fully-Expanded State (Full Chat)

- Complete sidebar with:
  - Pinned conversations
  - Chat history
  - Full search capabilities
- Full-featured message area:
  - Rich text formatting
  - File attachments
  - Code blocks
  - Message actions
- Detailed conversation controls
- Complete user settings access

### 3.2 Layout Structure

#### Sidebar (Fully-Expanded Only)

- User profile section with avatar
- Search conversations input
- Pinned conversations section
- Chat history list
- New chat button (fixed at bottom)

#### Main Chat Area

1. **Collapsed View**

   - Single-line input with search
   - Essential action buttons

2. **Semi-Expanded View**

   - Compact header
   - Recent messages preview
   - Basic input features
   - Quick action buttons

3. **Full View**
   - Complete chat header
   - Full message history
   - Rich input area
   - All action buttons and features

### 3.3 Shared Components

#### ChatHeader

- Title display
- Model selector (Coze)
- Action buttons (settings, etc.)
- Search functionality

#### ConversationList

- Pinned section with "PINNED" label
- Chat history section with "CHAT HISTORY" label
- Conversation items with truncated preview
- Active/hover states for items

#### MessageInput

- Expandable text input
- Attachment button (for files/images)
- Send message button
- Loading state handling
- Placeholder text support

#### MessageItem

- User/Assistant message display
- Markdown rendering
- Code block handling
- Media preview
- Message status indicators
- Timestamp display

#### SearchInput

- Search icon
- Keyboard shortcut hint (⌘K)
- Clear input button
- Search results highlighting

#### UserProfile

- Avatar display
- User name
- Settings/preferences access

### 3.4 State Transitions

#### Expansion Triggers

- Collapsed → Semi-Expanded:
  - Tab key press
  - Click on input field
  - Click expand button
- Semi-Expanded → Full:
  - Starting a conversation
  - Click on conversation history
  - Click maximize button
- Full → Semi-Expanded:
  - Click minimize button
- Any State → Collapsed:
  - Escape key
  - Click collapse button
  - Click outside (configurable)

#### State Persistence

- Remember last state per session
- Option to set default state
- Save state preferences per user

## 4. State Management

### Chat Store (Zustand)

```typescript
// 消息接口
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  status?: 'sending' | 'sent' | 'error';
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
    size?: number;
  }[];
}

// 会话接口
interface ChatSession {
  id: string;
  title: string;
  lastMessage?: string;
  lastTime: number;
  isPinned?: boolean;
  messages: Message[];
}

// 用户信息接口
interface UserInfo {
  id: string;
  name: string;
  avatar?: string;
}

// 搜索结果接口
interface SearchResult {
  sessionId: string;
  messageId: string;
  content: string;
  timestamp: number;
}

// Store 状态接口
interface ChatState {
  // 数据
  sessions: ChatSession[];
  currentSessionId: string | null;
  userInfo: UserInfo | null;
  searchKeyword: string;
  searchResults: SearchResult[];
  isSearching: boolean;

  // Actions
  setUserInfo: (info: UserInfo) => void;
  addSession: (session: ChatSession) => void;
  setCurrentSession: (id: string) => void;
  addMessage: (sessionId: string, message: Message) => void;
  updateMessage: (sessionId: string, messageId: string, updates: Partial<Message>) => void;
  togglePin: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  search: (keyword: string) => void;
  clearSearch: () => void;
}

// 组件 Props 接口
interface ChatItemProps {
  session: ChatSession;
  isActive?: boolean;
  onClick?: (sessionId: string) => void;
}

interface MessageItemProps {
  message: Message;
  isLast?: boolean;
}

interface ChatInputProps {
  onSend: (content: string) => void;
  onUpload?: (files: File[]) => void;
  disabled?: boolean;
}

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  onClear: () => void;
  placeholder?: string;
}
```

### UI State Management

- Active conversation tracking
- Search state
- Input state
- Loading states
- Error states

## 5. Styling Guidelines

### Theme

- Primary color: #2563EB (blue-600)
- Background: White for main area
- Sidebar: Light gray background
- Text colors:
  - Primary: #1F2937 (gray-800)
  - Secondary: #6B7280 (gray-500)
  - Accent: #2563EB (blue-600)

### Typography

- Font family: System UI
- Size scale:
  - Base: 16px
  - Small: 14px
  - XS: 12px
  - Large: 18px

### Components

- Rounded corners: 8px
- Shadow for modals and dropdowns
- Hover states with subtle background change
- Consistent padding and spacing

### Responsive Design

- Sidebar collapsible on mobile
- Full-width input on mobile
- Adaptive message bubbles
- Touch-friendly tap targets

## 6. Development Guidelines

### 6.1 Code Structure

```
src/
├── components/
│   ├── Chat/
│   │   ├── InlineChat/
│   │   │   ├── CollapsedInput.tsx
│   │   │   ├── ExpandedDialog.tsx
│   │   │   └── ConversationView.tsx
│   │   ├── StandaloneChat/
│   │   │   ├── ChatContainer.tsx
│   │   │   └── MessageList.tsx
│   │   └── shared/
│   │       ├── MessageInput.tsx
│   │       ├── MessageItem.tsx
│   │       ├── CodeBlock.tsx
│   │       ├── MarkdownRenderer.tsx
│   │       └── MediaUploader.tsx
│   └── ui/
├── store/
│   └── chatStore.ts
├── types/
│   └── chat.ts
├── lib/
│   ├── api.ts
│   └── utils.ts
└── hooks/
    ├── useChat.ts
    └── useStreamingResponse.ts
```

### 6.2 Development Process

1. Component Development

   - Start with shared components
   - Implement standalone mode
   - Develop inline mode
   - Add advanced features

2. Testing Requirements

   - Unit test coverage > 80%
   - Component testing
   - E2E testing for critical paths

3. Code Quality
   - Follow ESLint rules
   - Maintain consistent formatting
   - Write documentation
   - Review process

### 6.3 Git Workflow

1. Branch Strategy

   - main: production code
   - develop: integration branch
   - feature/\*: feature development
   - fix/\*: bug fixes

2. Commit Guidelines
   - feat: new features
   - fix: bug fixes
   - docs: documentation
   - style: formatting
   - refactor: code restructuring
   - test: testing
   - chore: maintenance

## 7. Performance Considerations

### 7.1 Optimization Techniques

- Code splitting
- Lazy loading
- Virtual scrolling for long conversations
- Image optimization
- Debounced input handling

### 7.2 Loading States

- Skeleton loading
- Progressive loading
- Optimistic updates
- Error boundaries

## 8. Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast compliance

## 9. Cross-Platform Support

### Web/H5

- Responsive design
- Touch interactions
- Mobile-first approach

### Browser Support

- Modern browsers (last 2 versions)
- iOS Safari
- Chrome for Android
