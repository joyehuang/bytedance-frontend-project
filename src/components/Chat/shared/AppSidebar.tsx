import * as React from 'react';
import { SearchForm } from '@/components/Chat/shared/SearchForm';
import { Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  children?: React.ReactNode;
}

export function AppSidebar({ children, ...props }: AppSidebarProps) {
  const navigate = useNavigate();
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
          <Settings className="ml-30" color="gray" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full">
        <SearchForm className="p-2" inputW="w-56" />
        {/* 在这里渲染 ChatSessionManager */}
        {children}
      </SidebarContent>

      <SidebarFooter className="flex items-center mb-5">
        <Button
          className="bg-blue-500 hover:bg-blue-600 w-55 flex items-center text-white rounded-[15px] shadow"
          onClick={() => navigate('/')}
        >
          <Plus /> Start new chat
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
