import { Button } from '@/components/ui/button';
import { SearchForm } from './SearchForm';
import { Plus } from 'lucide-react';
import { useChatSessionStore } from '@/store/chatSessionStore';

interface TopBarProps {
  isSidebarOpen: boolean;
}

export function TopBar({ isSidebarOpen }: TopBarProps) {
  const { sessions, currentSessionId } = useChatSessionStore();
  const currentSession = sessions.find((session) => session.id === currentSessionId);

  return (
    <header
      className={`h-18 flex items-center shadow-s m transition-all duration-300 ease-in-out border-b border-gray-200 bg-white ${
        isSidebarOpen ? 'pl-[300px]' : 'pl-16' // sidebar 展开时左边距 300px，折叠时 64px
      }`}
    >
      {/* 左侧内容组：标题、Claude按钮和搜索框 */}
      <div className="flex items-center gap-3 ml-4">
        {currentSession && <div className="text-gray-700">{currentSession.title}</div>}
        <Button className="px-3 rounded-[10px] bg-[#F7F8FA] h-8">Claude</Button>
        <SearchForm className="relative" />
      </div>
      {/* 右侧 New Chat 按钮 */}
      <Button
        className="ml-auto mr-4 bg-blue-500 hover:bg-blue-600 w-30 flex justify-center items-center text-white rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #2B7AFB 0%, #2174FD 100%, #213BFD 100%)',
          boxShadow:
            '0px 2px 5px rgba(20, 88, 201, 0.17), inset 0px -2px 0.3px rgba(14, 56, 125, 0.18), inset 0px 2px 1px rgba(255, 255, 255, 0.22)',
          boxSizing: 'border-box',
        }}
      >
        <Plus /> New chat
      </Button>
    </header>
  );
}
