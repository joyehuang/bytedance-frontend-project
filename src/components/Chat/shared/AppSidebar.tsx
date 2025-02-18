import * as React from 'react';
import { SearchForm } from '@/components/Chat/shared/SearchForm';
import { Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { useChatSessionStore } from '@/store/chatSessionStore';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  children?: React.ReactNode;
}

export function AppSidebar({ children, ...props }: AppSidebarProps) {
  const navigate = useNavigate();
  const { clearCurrentSession } = useChatSessionStore();

  const handleStartNewChat = () => {
    clearCurrentSession(); // 清空当前会话
    navigate('/');
  };

  return (
    <Sidebar {...props} className="bg-[#F7F8FA] shadow-sm border-transparent">
      <SidebarHeader>
        <div className="h-12 flex items-center">
          <img
            src="./src/assets/user.jpg"
            alt="avatar"
            className="absolute rounded-full w-8 h-8 ml-3"
          />
          <span className="ml-12">Name</span>
          {/* 调整 settings icon 的位置，向左移动 */}
          <div className="absolute top-4 right-12">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:bg-gray-200 w-8 h-8 flex items-center justify-center"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full">
        <SearchForm className="p-2" inputW="w-56" />
        {/* 在这里渲染 ChatSessionManager */}
        {children}
      </SidebarContent>

      <SidebarFooter className="flex items-center mb-5">
        <Button
          className="bg-blue-500 hover:bg-blue-600 w-55 flex items-center text-white rounded-lg"
          style={{
            background: 'linear-gradient(180deg, #2B7AFB 0%, #2174FD 100%, #213BFD 100%)',
            boxShadow:
              '0px 2px 5px rgba(20, 88, 201, 0.17), inset 0px -2px 0.3px rgba(14, 56, 125, 0.18), inset 0px 2px 1px rgba(255, 255, 255, 0.22)',
            boxSizing: 'border-box',
          }}
          onClick={handleStartNewChat}
        >
          <Plus /> Start new chat
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
