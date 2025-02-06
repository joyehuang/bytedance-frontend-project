import HomePage from '@/pages/HomePage.tsx';
import ChatPage from '@/pages/ChatPage.tsx';
import '@/index.css';

import { createBrowserRouter } from 'react-router-dom';

// 配置路由实例
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/empty',
    element: <ChatPage />,
  },
]);

export default router;
