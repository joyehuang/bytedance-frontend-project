// 单条消息的接口
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  status?: 'sending' | 'sent' | 'error';
  // 如果需要支持文件上传，可以添加
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
    size?: number;
  }[];
}

// 聊天会话的接口
export interface ChatSession {
  id: string;
  title: string;
  lastMessage?: string;
  lastTime: number;
  isPinned?: boolean;
  messages: Message[];
}

// 用户信息接口
export interface UserInfo {
  id: string;
  name: string;
  avatar?: string;
}

// 搜索相关的接口
export interface SearchResult {
  sessionId: string;
  messageId: string;
  content: string;
  timestamp: number;
}

// Store 状态接口
export interface ChatState {
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
export interface ChatItemProps {
  session: ChatSession;
  isActive?: boolean;
  onClick?: (sessionId: string) => void;
}

export interface MessageItemProps {
  message: Message;
  isLast?: boolean;
}

export interface ChatInputProps {
  onSend: (content: string) => void;
  onUpload?: (files: File[]) => void;
  disabled?: boolean;
}

export interface SearchBarProps {
  onSearch: (keyword: string) => void;
  onClear: () => void;
  placeholder?: string;
}
