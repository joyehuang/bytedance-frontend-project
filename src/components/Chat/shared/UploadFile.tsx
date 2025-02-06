import { Button } from '@/components/ui/button';
import { File, X } from 'lucide-react';
import { useRef, useState } from 'react';
import React from 'react';
interface UploadFileProps {
  handleCloseUpload: () => void; // 关闭浮窗的回调函数
}

export function UploadFile(props: UploadFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleClick = () => {
    console.log('上传文件');
    fileInputRef.current?.click();
  };

  const onClose = () => {
    props.handleCloseUpload();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log('选择的文件:', files);
      // 在这里处理文件上传逻辑
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    // if (files && files.length > 0) {
    //     await uploadFiles(files);
    // }
    console.log(files);
  };
  return (
    <div
      className={`absolute w-180 h-60 bg-white rounded-lg shadow-lg flex flex-col items-center ${
        isDragging ? 'border-2 border-blue-500' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <button className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded" onClick={onClose}>
        <X className="w-5 h-5 text-gray-500" />
      </button>
      <div className="mt-5 bg-blue-500/5 size-18 rounded-lg flex justify-center items-center">
        <File className="w-10 h-10 text-blue-500" />
      </div>
      <p className="mt-5 text-lg text-center">Drag and drop your files here</p>
      <p className="mt-2 text-gray-500">or</p>
      <Button
        className="w-45 h-10 text-[15px] mt-2 rounded-[12px] hover:bg-blue-600 bg-blue-500 text-white cursor-pointer"
        onClick={handleClick}
      >
        <File />
        Choose your files
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        multiple // 允许选择多个文件
      />
    </div>
  );
}
