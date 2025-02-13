import { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/Chat/shared/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Cookies from 'js-cookie';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog } from '@/components/Chat/shared/Dialog';
import { useNavigate } from 'react-router-dom';
import { UploadFile } from '@/components/Chat/shared/UploadFile';
import { useChatSessionStore } from '@/store/chatSessionStore';
import { ChatSession } from '@/types/chat';
import ChatSessionManager from '@/components/Chat/ChatSessionManager';
import { TopBar } from '@/components/Chat/shared/TopBar';

export default function HomePage() {
  const navigate = useNavigate();
  const cookieValue = Cookies.get('sidebar:state');
  const defaultOpen = cookieValue === 'true';
  const [isSidebarOpen, setIsSidebarOpen] = useState(defaultOpen);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    Cookies.set('sidebar:state', !isSidebarOpen ? 'true' : 'false');
  };

  const [cardPosition, setCardPosition] = useState({ top: '50%', left: '50%' });
  useEffect(() => {
    const sidebarWidth = 150;

    // 计算 Card 的位置
    if (isSidebarOpen) {
      // 如果侧边栏打开，Card 位于剩余部分的中间
      setCardPosition({
        top: '50%',
        left: `calc(50% + ${sidebarWidth}px)`,
      });
    } else {
      // 如果侧边栏关闭，Card 位于页面中间
      setCardPosition({
        top: '50%',
        left: '50%',
      });
    }
  }, [isSidebarOpen]);

  const [isUploadVisible, setIsUploadVisible] = useState(false);

  const handleUploadClick = () => {
    setIsUploadVisible(true); // 显示浮窗
  };

  const handleCloseUpload = () => {
    setIsUploadVisible(false); // 隐藏浮窗
  };

  const addSession = useChatSessionStore((state) => state.addSession);

  const handleSendMessage = (message: string) => {
    // 创建新会话
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: message.slice(0, 20) + (message.length > 20 ? '...' : ''), // 使用消息前20个字符作为标题
      lastTime: Date.now(),
      messages: [
        {
          id: Date.now().toString(),
          content: message,
          role: 'user',
          timestamp: Date.now(),
        },
      ],
    };
    addSession(newSession);
    navigate('/chat'); // 创建会话后跳转到聊天页面
  };

  return (
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar className="relative">
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
          <ChatSessionManager />
        </AppSidebar>
        <main className="w-full h-full">
          <TopBar isSidebarOpen={isSidebarOpen} />
          <Card
            className="fixed w-180 h-80 rounded-2xl shadow-md bg-[url('src/assets/dialogBg.jpg')] bg-cover border-0"
            style={{
              top: cardPosition.top,
              left: cardPosition.left,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CardContent className="relative flex justify-center items-center">
              <h1 className="absolute top-12 text-xl">Welcome back, Name</h1>
              <Dialog handleUploadClick={handleUploadClick} onSendMessage={handleSendMessage} />
            </CardContent>
          </Card>
          {isUploadVisible && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <UploadFile handleCloseUpload={handleCloseUpload} />
            </div>
          )}
        </main>
      </SidebarProvider>
    </div>
  );
}
