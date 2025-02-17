import { EllipsisVertical, PenLine } from 'lucide-react';
import { useState, useEffect } from 'react';

// interface UserMessageProps {
//     content: string;
// }
const UserMessage = () => {
  // const { content } = prop;
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`chat-guest ${fadeIn ? 'fade-in' : ''}`}>
      <div className="flex justify-end text-Global pb-2 mt-6" style={{ color: '#666F8D' }}>
        <PenLine className="w-4 h-4 mr-3 " />
        <EllipsisVertical className="w-4 h-4 mr-2 " />
      </div>
      <div className="chat-guest-text text-sm " style={{ color: '#666F8D' }}>
        {/* {content} */}
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        ipsum dolor sit amet consectetur adipiscing mert solermoer
      </div>
    </div>
  );
};
export default UserMessage;
