import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { X, ArrowLeft } from 'lucide-react';
import { SearchFormLong } from '../shared/SearchForm';
import { SeparatorWithTime } from '@/components/ui/separator';
import UserMessage from '../shared/UserMessage';
import AiMessage from '../shared/AiMessage';

interface MinimizeDialogProps {
  isVisible: boolean;
  onClose: () => void;
}
export interface Content {
  content: string;
  type?: string;
}

export const MinimizeDialog: React.FC<MinimizeDialogProps> = ({ isVisible, onClose }) => {
  // const [guestContents, setGuestContents] = useState<Content[]>([]);
  const [searchValue, setSearchValue] = useState('');
  if (!isVisible) return null;
  // const onSearch = (value: string) => {
  //     setGuestContents(prevContents => [...prevContents, { content: value }]);
  //     setSearchValue('');
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="w-[520px] h-[580px] bg-white rounded-lg shadow-lg relative overflow-hidden">
        <Card className="h-full flex flex-col border-none">
          {/* 头部 */}
          <CardHeader className="flex-shrink-0 pb-1 flex justify-between relative px-6 pt-2 border-none">
            <X
              className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 absolute top-2 right-2 z-10"
              onClick={onClose}
            />
            <div className="relative  pt-2 flex items-center  ">
              <ArrowLeft className="w-5 h-5 mr-3 bg-gray-100 rounded-sm" onClick={onClose} />
              <h1 className="text-16px">Lorem ipsum dolor sit amet conectur</h1>
              {/* 其他元素 */}
            </div>
          </CardHeader>

          {/* 内容区域 */}
          <CardContent className="flex-1 overflow-y-auto my-3 text-gray-700 ">
            <hr className="border-black/8 pb-3" />
            <SeparatorWithTime />
            <div className="chat-content items-center">
              {/* {guestContents.map((content, index) => (
                                <Guest key={index} content={content.content} />
                            ))
                            }*/}
              <UserMessage />
              <AiMessage />
            </div>
          </CardContent>

          {/* 底部 */}
          <CardFooter className="flex-shrink-0 border0-none pt-4 flex justify-end">
            <SearchFormLong
              // onSearch={onSearch}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
