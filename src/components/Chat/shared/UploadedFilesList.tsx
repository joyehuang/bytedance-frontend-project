import { File, X, Loader2 } from 'lucide-react';
import { useFileStore } from '@/store/uploadedFileStore';
import { UploadedFile } from '@/types/chat';
import { useMemo } from 'react';
import React from 'react';

interface UploadedFileProps {
  file: UploadedFile;
  key: string;
}

const StatusIcon = ({ status }: { status: UploadedFile['status'] }) => {
  const Icon = useMemo(() => {
    if (status === 'uploading') {
      return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    } else if (status === 'success' || status === 'error') {
      return <File className="w-5 h-5 text-blue-500" />;
    }
    return null;
  }, [status]);

  return <div>{Icon}</div>;
};

const UploadedFileItem = React.memo(({ file }: UploadedFileProps) => {
  const { id, name, type, url, status, size } = file;
  const { removeFile } = useFileStore();
  const nameColor = useMemo(() => {
    return status === 'error' ? 'text-red-800' : 'text-grey-800';
  }, [status]);

  const FileDetail = ({ type, size, status }: { type: string; size: string; status: string }) => {
    if (status === 'uploading') {
      return <span className="text-xs text-gray-500">文件上传中</span>;
    } else if (status === 'error') {
      return <span className="text-xs text-red-800">上传失败</span>;
    } else if (status === 'success') {
      return (
        <div className="flex">
          <span className="text-xs text-gray-500">{type}</span>
          <span className="text-xs text-gray-500 ml-2">{size}</span>
        </div>
      );
    } else {
      return null; // 如果状态未知，不显示任何内容
    }
  };
  const deleteHandler = () => {
    removeFile(id);
  };
  // console.log('color', nameColor)
  // console.log('UploadedFileItem组件渲染了', type);
  const handlePreview = () => {
    // console.log(url);
    window.open(url);
  };
  return (
    <div className="w-1/3 px-1">
      <div className="relative w-full max-w-2xl mx-auto my-1 px-1 border border-gray-200 rounded-lg bg-white">
        <div className="flex my-1">
          <div className="bg-blue-500/5 size-10 rounded-lg flex justify-center items-center">
            <StatusIcon status={status} />
          </div>
          <div
            className="flex flex-col justify-between p-1 border-b border-gray-100 last:border-b-0 cursor-pointer"
            onClick={handlePreview}
            title={name}
          >
            <span className={`text-xs font-medium truncate w-25 ${nameColor}`}>{name}</span>
            <FileDetail type={type} size={size} status={status} />
          </div>
          <button className="relative ml-auto hover:bg-gray-100 rounded flex items-center">
            <X className="w-5 h-5 text-gray-500" onClick={deleteHandler} />
          </button>
        </div>
      </div>
    </div>
  );
});
UploadedFileItem.displayName = 'UploadedFileItem'; // 添加 displayName

export function UploadedFileList() {
  const { files } = useFileStore();
  const memoizedFiles = useMemo(() => {
    return files;
  }, [files]);
  return (
    <div className="relative w-full max-w-2xl mx-auto p-1 border border-gray-200 rounded-lg bg-white shadow-sm overflow-y-auto max-h-56">
      <div className="flex flex-wrap">
        {memoizedFiles.map((file) => (
          <UploadedFileItem file={file} key={file.id} />
        ))}
      </div>
    </div>
  );
}
