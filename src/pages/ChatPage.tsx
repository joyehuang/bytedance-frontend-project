import { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/Chat/shared/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Cookies from 'js-cookie';
import { SearchForm } from '@/components/Chat/shared/SearchForm';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/Chat/shared/Dialog';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar className="relative" />
        <SidebarTrigger
          className={`absolute ${isSidebarOpen ? 'left-[300px]' : 'left-[30px]'} hover:bg-gray-300 mt-6 scale-115 transition-all duration-300 ease-in-out`}
          onClick={toggleSidebar}
          color="gray"
        />
        <div className="flex flex-col h-screen w-full">
          <header className="h-18 flex justify-center items-center shadow ">
            <Button className="p-1 rounded-[10px] bg-[#F7F8FA] mr-3 h-8 w-13">Coze</Button>
            <SearchForm className="relative" />
            <Button
              className="absolute bg-blue-500 hover:bg-blue-600 w-30 flex justify-center items-center text-white rounded-[15px] shadow ml-340"
              onClick={() => navigate('/empty')}
            >
              <Plus /> New chat
            </Button>
          </header>
          <main className="flex-1 w-full  relative bg-[url('src/assets/dialogBg.jpg')] bg-cover">
            <div
              className=" flex justify-center items-center w-200 h-full "
              style={{
                position: 'absolute',
                top: chatPosition.top,
                left: chatPosition.left,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex justify-center items-center translate-y-[35px]">
                <Dialog />
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
