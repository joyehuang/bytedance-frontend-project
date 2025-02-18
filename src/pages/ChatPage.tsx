import { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/Chat/shared/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Cookies from 'js-cookie';
import { Dialog } from '@/components/Chat/shared/Dialog';
import { useNavigate } from 'react-router-dom';
import ChatSessionManager from '@/components/Chat/ChatSessionManager';
import { TopBar } from '@/components/Chat/shared/TopBar';

export default function ChatPage() {
  const navigate = useNavigate();
  const cookieValue = Cookies.get('sidebar:state');
  const defaultOpen = cookieValue === 'true';
  const [isSidebarOpen, setIsSidebarOpen] = useState(defaultOpen);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    Cookies.set('sidebar:state', !isSidebarOpen ? 'true' : 'false');
  };

  const [chatPosition, setChatPosition] = useState({ top: '50%', left: '50%' });

  useEffect(() => {
    const sidebarWidth = 150;

    // 计算盒子的位置
    if (isSidebarOpen) {
      // 如果侧边栏打开，盒子位于剩余部分的中间
      setChatPosition({
        top: '50%',
        left: `calc(50% + ${sidebarWidth}px)`, // 侧边栏宽度加上剩余部分的一半
      });
    } else {
      // 如果侧边栏关闭，盒子位于整个屏幕的中间
      setChatPosition({
        top: '50%',
        left: '50%',
      });
    }
  }, [isSidebarOpen]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar className="relative">
          <ChatSessionManager />
          <div className="absolute top-4 right-4">
            <SidebarTrigger
              className={`${
                isSidebarOpen
                  ? 'text-gray-500 hover:bg-gray-200 w-8 h-8 flex items-center justify-center'
                  : 'fixed left-4 top-4 z-50 text-gray-500 hover:bg-gray-200 w-8 h-8 flex items-center justify-center'
              } transition-all duration-300 ease-in-out [&>svg]:w-5 [&>svg]:h-5`}
              onClick={toggleSidebar}
            />
          </div>
        </AppSidebar>
        <main className="w-full h-full">
          <TopBar isSidebarOpen={isSidebarOpen} />
          <div className="flex flex-col h-[calc(100vh-4rem)] w-full">
            <main className="flex-1 w-full relative bg-[url('src/assets/dialogBg.jpg')] bg-cover">
              <div
                className="flex justify-center items-center w-200 h-full"
                style={{
                  position: 'absolute',
                  top: chatPosition.top,
                  left: chatPosition.left,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="flex justify-center items-center translate-y-[35px]">
                  <Dialog
                    handleUploadClick={() => {
                      console.log('Upload clicked');
                    }}
                    onSendMessage={(message) => {
                      console.log('Message sent:', message);
                      navigate('/chat');
                    }}
                  />
                </div>
              </div>
            </main>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
