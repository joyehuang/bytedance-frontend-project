import { create } from 'zustand';
import { ChatSession } from '@/types/chat';

interface ChatSessionStore {
  sessions: ChatSession[];
  addSession: (session: ChatSession) => void;
  currentSessionId: string | null;
  setCurrentSession: (id: string) => void;
}

export const useChatSessionStore = create<ChatSessionStore>((set) => ({
  sessions: [],
  currentSessionId: null,
  addSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session],
      currentSessionId: session.id,
    })),
  setCurrentSession: (id) => set({ currentSessionId: id }),
}));
