import { create } from 'zustand';
import { ChatState } from '../types/chat';

export const useChatStore = create<ChatState>((set) => ({
  // 初始状态
  sessions: [],
  currentSessionId: null,
  userInfo: null,
  searchKeyword: '',
  searchResults: [],
  isSearching: false,

  // Actions
  setUserInfo: (info) => set({ userInfo: info }),

  addSession: (session) => set((state) => ({ sessions: [...state.sessions, session] })),

  setCurrentSession: (id) => set({ currentSessionId: id }),

  addMessage: (sessionId, message) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? { ...session, messages: [...session.messages, message] }
          : session
      ),
    })),

  updateMessage: (sessionId, messageId, updates) =>
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

  togglePin: (sessionId) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId ? { ...session, isPinned: !session.isPinned } : session
      ),
    })),

  deleteSession: (sessionId) =>
    set((state) => ({
      sessions: state.sessions.filter((session) => session.id !== sessionId),
      currentSessionId: state.currentSessionId === sessionId ? null : state.currentSessionId,
    })),

  search: (keyword) =>
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
}));
