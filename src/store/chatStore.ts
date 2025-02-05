import { create } from 'zustand';
import { ChatState, Message, ChatSession, UserInfo } from '../types/chat';

// 内联对话框的状态
interface InlineChatState extends ChatState {
  // 对话框状态
  dialogState: 'collapsed' | 'expanded' | 'minimized';

  // 额外的 Actions
  setDialogState: (state: 'collapsed' | 'expanded' | 'minimized') => void;
  expandDialog: () => void;
  collapseDialog: () => void;
  minimizeDialog: () => void;
}

export const useChatStore = create<InlineChatState>((set, get) => ({
  // 基础状态
  sessions: [],
  currentSessionId: null,
  userInfo: null,
  searchKeyword: '',
  searchResults: [],
  isSearching: false,
  dialogState: 'collapsed',

  // 对话框状态管理
  setDialogState: (state) => set({ dialogState: state }),
  expandDialog: () => set({ dialogState: 'expanded' }),
  collapseDialog: () => set({ dialogState: 'collapsed' }),
  minimizeDialog: () => set({ dialogState: 'minimized' }),

  // 用户信息管理
  setUserInfo: (info: UserInfo) => set({ userInfo: info }),

  // 会话管理
  addSession: (session: ChatSession) =>
    set((state) => ({
      sessions: [...state.sessions, session],
    })),

  setCurrentSession: (id: string) => set({ currentSessionId: id }),

  // 消息管理
  addMessage: (sessionId: string, message: Message) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              messages: [...session.messages, message],
              lastMessage: message.content,
              lastTime: message.timestamp,
            }
          : session
      ),
    })),

  updateMessage: (sessionId: string, messageId: string, updates: Partial<Message>) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              messages: session.messages.map((msg) =>
                msg.id === messageId ? { ...msg, ...updates } : msg
              ),
            }
          : session
      ),
    })),

  // 会话操作
  togglePin: (sessionId: string) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId ? { ...session, isPinned: !session.isPinned } : session
      ),
    })),

  deleteSession: (sessionId: string) =>
    set((state) => ({
      sessions: state.sessions.filter((session) => session.id !== sessionId),
      currentSessionId: state.currentSessionId === sessionId ? null : state.currentSessionId,
    })),

  // 搜索功能
  search: (keyword: string) =>
    set((state) => {
      const results = state.sessions.reduce<typeof state.searchResults>((acc, session) => {
        const matches = session.messages.filter((msg) =>
          msg.content.toLowerCase().includes(keyword.toLowerCase())
        );
        return [
          ...acc,
          ...matches.map((msg) => ({
            sessionId: session.id,
            messageId: msg.id,
            content: msg.content,
            timestamp: msg.timestamp,
          })),
        ];
      }, []);
      return {
        searchKeyword: keyword,
        searchResults: results,
        isSearching: true,
      };
    }),

  clearSearch: () =>
    set({
      searchKeyword: '',
      searchResults: [],
      isSearching: false,
    }),

  // 发送消息的辅助函数
  sendMessage: async (content: string) => {
    const { currentSessionId, addMessage } = get();
    if (!currentSessionId) return;

    // 创建用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: Date.now(),
      status: 'sent',
    };

    addMessage(currentSessionId, userMessage);

    // TODO: 接入 Coze API
    // 模拟助手回复
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '这是一个模拟的回复',
      role: 'assistant',
      timestamp: Date.now(),
      status: 'sent',
    };

    addMessage(currentSessionId, assistantMessage);
  },

  // 文件上传
  uploadFile: async (file: File) => {
    const { currentSessionId, addMessage } = get();
    if (!currentSessionId) return;

    const fileMessage: Message = {
      id: Date.now().toString(),
      content: '文件上传中...',
      role: 'user',
      timestamp: Date.now(),
      status: 'sending',
      attachments: [
        {
          type: 'file',
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
        },
      ],
    };

    addMessage(currentSessionId, fileMessage);

    // TODO: 实现实际的文件上传逻辑
    setTimeout(() => {
      get().updateMessage(currentSessionId, fileMessage.id, {
        content: '文件已上传',
        status: 'sent',
      });
    }, 1000);
  },
}));
