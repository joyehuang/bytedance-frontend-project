import { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/Chat/shared/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Cookies from 'js-cookie';
import { SearchForm } from '@/components/Chat/shared/SearchForm';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog } from '@/components/Chat/shared/Dialog';
import { useNavigate } from 'react-router-dom';


// { children }: { children: React.ReactNode }
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

  return (
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar className="relative" />
        <main className=" w-full  h-full">
          <SidebarTrigger
            className={`absolute ${isSidebarOpen ? 'left-[300px]' : 'left-[30px]'} hover:bg-gray-300 mt-6 scale-115 transition-all duration-300 ease-in-out`}
            onClick={toggleSidebar}
            color="gray"
          />
          <header className="h-18 flex justify-center items-center shadow">
            <Button className="p-1 rounded-[10px] bg-[#F7F8FA] mr-3 h-8 w-13">Coze</Button>
            <SearchForm className="relative" />
            <Button 
            className="absolute bg-blue-500 hover:bg-blue-600 w-30 flex justify-center items-center text-white rounded-[15px] shadow ml-340"
            onClick={() => navigate('/empty')}>
              <Plus /> New chat
            </Button>
          </header>
        
          <Card
            className="fixed w-180 h-80 rounded-2xl shadow-md bg-[url('src/assets/dialogBg.jpg')] bg-cover border-0"
            style={{
              top: cardPosition.top,
              left: cardPosition.left,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CardContent className="relative flex justify-center items-center">
              <h1 className="absolute top-12 text-xl">Welcome back,name</h1>
              <Dialog></Dialog>
            </CardContent>
          </Card>
        </main>
      </SidebarProvider>
    </div>
  );
}
