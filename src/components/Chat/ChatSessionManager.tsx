import React from 'react';
import { useChatSessionStore } from '@/store/chatSessionStore';

export const ChatSessionManager: React.FC = () => {
  const { sessions, currentSessionId, setCurrentSession } = useChatSessionStore();

  return (
    <div className="chat-session-manager px-2">
      <div className="sessions-list mt-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`session-item p-3 hover:bg-gray-100 cursor-pointer rounded-lg
              ${session.id === currentSessionId ? 'bg-gray-100' : ''}`}
            onClick={() => setCurrentSession(session.id)}
          >
            <div className="font-medium">{session.title}</div>
            <div className="text-sm text-gray-500">
              {new Date(session.lastTime).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSessionManager;
