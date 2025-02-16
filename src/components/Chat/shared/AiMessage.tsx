import { RotateCw, Copy, EllipsisVertical, Bookmark, Share2 } from 'lucide-react';

// interface AiMessageProps {
//     content: string;
// }
const AiMessage = () => {
  // const { content } = props;
  return (
    <div className="chat-ai  flex mt-6 rounded-lg shadow-lg">
      <div className="chat-ai-avator relative flex-shrink-0">
        <img
          src="./src/assets/Element.jpg"
          alt="Avatar"
          className="rounded-full w-6 h-6 mt-4 ml-4 mr-2"
        />
      </div>
      <div
        className="chat-ai-answer items-center  max-w-[700px]  text-sm mt-4 mr-4"
        style={{ color: '#666F8D' }}
      >
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
        {/* <ReactMarkdown>{content}</ReactMarkdown> */}
        <div className="chat-ai-action flex  space-x-2 mt-3 mb-4">
          <RotateCw className="h-4 w-4 mr-4" />
          <Copy className="h-4 w-4 mr-4" />
          <Bookmark className="h-4 w-4 mr-4" />
          <Share2 className="h-4 w-4 mr-4" />
          <EllipsisVertical className="h-4 w-4 " />
        </div>
      </div>
    </div>
  );
};
export default AiMessage;
