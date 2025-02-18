import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useChatSessionStore } from '@/store/chatSessionStore';
import { CollapsedInput } from '@/components/Chat/InlineChat/CollapsedInput'; // 导入 CollapsedInput 组件替换 SearchForm

interface TopBarProps {
  isSidebarOpen: boolean;
}

export function TopBar({ isSidebarOpen }: TopBarProps) {
  const { sessions, currentSessionId } = useChatSessionStore();
  const currentSession = sessions.find((session) => session.id === currentSessionId);

  return (
    <header
      className={`h-[72px] flex items-center shadow-sm transition-all duration-300 ease-in-out border-b border-gray-200 ${
        isSidebarOpen ? 'pl-[300px]' : 'pl-16'
      }`}
    >
      <div className="flex items-center gap-3 ml-4">
        {currentSession && <div className="text-gray-700">{currentSession.title}</div>}
        <Button className="px-4 h-8 rounded-[10px] bg-[#F7F8FA] text-sm font-medium">Claude</Button>
        <CollapsedInput />
      </div>
      <Button
        className="ml-auto mr-4 bg-blue-500 hover:bg-blue-600 w-30 flex justify-center items-center text-white rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #2B7AFB 0%, #2174FD 100%, #213BFD 100%)',
          boxShadow:
            '0px 2px 5px rgba(20, 88, 201, 0.17), inset 0px -2px 0.3px rgba(14, 56, 125, 0.18), inset 0px 2px 1px rgba(255, 255, 255, 0.22)',
          boxSizing: 'border-box',
        }}
      >
        <Plus className="mr-1" /> New chat
      </Button>
    </header>
  );
}
