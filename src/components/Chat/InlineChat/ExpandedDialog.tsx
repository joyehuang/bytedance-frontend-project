import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

import { SearchFormExpand } from '../shared/SearchForm';
import { MinimizeDialog } from './MinimizeDialog';
import { ListWrapper } from '../shared/ListWrapper';

interface ExpandedDialogProps {
  // messages: Message[];
  isVisible: boolean;
  onClose: () => void;
  className?: string;
  inputW?: string;
  // onSend: (content: string) => void;
  // onUpload?: (files: File[]) => void;
}

export const ExpandedDialog: React.FC<ExpandedDialogProps> = ({
  isVisible,
  onClose,
  className,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const handleMiniDialog = () => {
    setIsMinimized(true);
    // onClose(); // 关闭 ExpandedDialog
  };
  if (!isVisible) return null;
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/5 z-50 ${className || ''}`}
    >
      <div className="w-[520px] h-[580px] bg-white rounded-lg shadow-lg relative overflow-hidden">
        <Card className="h-full flex flex-col border-none">
          {/* 头部 */}
          <CardHeader className="flex-shrink-0 pb-0 flex justify-between relative px-6 pt-2 border-none">
            <X
              className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 absolute top-2 right-2"
              onClick={onClose}
            />
            <div className=" pt-2 items-center  ">
              <h1 className="text-16px pb-4 ">What are you searching for?</h1>
              <SearchFormExpand
                className="pt-2"
                inputW="w-109"
                onMiniDialogClick={handleMiniDialog}
              />
            </div>
          </CardHeader>

          {/* 内容区域 */}
          <CardContent className="flex-1 overflow-y-auto my-3 text-gray-700 ">
            <hr className="my-3 border " style={{ color: '#F0F2F5' }} />
            <div className="Gradient-masks bg-gradient-to-t from-white to-transparent absolute bottom-0 left-0 right-0 h-30 w-full z-10"></div>
            <div className="chat-content items-center">
              <ListWrapper
                items={[
                  {
                    key: 'Lorem ipsum dolor sit amet',
                    value:
                      'Rhoncus mattis rhoncus urna neque viverra justo nein massa tempor nec feugiat nisl pretium. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat',
                  },
                  { key: '2', value: '搜索结果2' },
                  { key: '3', value: '搜索结果3' },
                  { key: '4', value: '搜索结果4' },
                  { key: '5', value: '搜索结果5' },
                  { key: '6', value: '搜索结果6' },
                  { key: '7', value: '搜索结果7' },
                ]}
              />
            </div>
          </CardContent>

          {/* 底部
        <CardFooter className="flex-shrink-0 border0-none pt-4 flex justify-end">
        </CardFooter> */}
        </Card>
      </div>

      <MinimizeDialog isVisible={isMinimized} onClose={() => setIsMinimized(false)} />
    </div>
  );
};
