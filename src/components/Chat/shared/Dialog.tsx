import React, { useState } from 'react';
import { Paperclip, Image, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { UploadedFileList } from '@/components/Chat/shared/UploadedFilesList';
import { useFileStore } from '@/store/uploadedFileStore';
import { useNavigate } from 'react-router-dom';

interface DialogProps {
  onSendMessage: (message: string) => void;
  handleUploadClick: () => void;
}

export function Dialog({ handleUploadClick, onSendMessage }: DialogProps) {
  const [textValue, setTextValue] = useState('');
  const navigate = useNavigate();

  const { files } = useFileStore();
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value); // 更新状态
  };

  const handleClick = () => {
    console.log(textValue);
    if (textValue.trim()) {
      onSendMessage(textValue); // Use the onSendMessage prop
      setTextValue(''); // Clear the textarea after sending
      navigate('/chat'); // Add navigation to chat page
    }
  };

  const uploadFile = () => {
    console.log(handleUploadClick);
    handleUploadClick();
  };

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div className="absolute bg-white p-4 rounded-lg shadow-lg w-145 top-25">
      <Textarea
        className="w-full h-22 resize-none border-none focus:placeholder-transparent focus:outline-none"
        placeholder="How can I help you?"
        value={textValue}
        onChange={handleChange}
      />
      {files.length > 0 && (
        <div>
          <hr className="my-3 border border-gray-200" />
          <UploadedFileList />
        </div>
      )}

      <hr className="my-3 border border-gray-200" />
      <div className="flex justify-between items-center ">
        <div className="flex space-x-3 ">
          <Paperclip className="cursor-pointer text-gray-500 scale-80" onClick={uploadFile} />
          <Image className="cursor-pointer text-gray-500 scale-80" />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-[12px] hover:bg-blue-600 flex items-center text-sm shadow scale-85"
          onClick={handleClick}
        >
          <Send className="mr-1 scale-70" />
          Send Message
        </button>
      </div>
    </div>
    // </div>
  );
}
