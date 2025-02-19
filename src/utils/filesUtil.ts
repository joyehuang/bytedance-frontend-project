import axios from 'axios';
import { UploadedFile } from '@/types/chat';
import { useFileStore } from '@/store/uploadedFileStore';

// 文件上传函数
export const uploadFileRequest = async (file: File): Promise<string> => {
  const pathParams =
    '?s=App.CDN.UploadOffice&return_data=0&app_key=5C0369A20A527C5903F58D89CDD15C8E&sign=75B9537AC303AE09BDCE661B07399784';
  const formData = new FormData();
  let res = '';

  formData.append('file', file);

  try {
    const response = await axios.post(`http://hn.api.yesapi.net/${pathParams}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.ret === 200) {
      res = response.data.data.url;
      console.log('File uploaded successfully:', res);
    } else {
      console.log('上传失败');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }

  return res; // 返回上传结果
};

// 文件批量上传函数
export const uploadFiles = async (basicFiles: FileList): Promise<void> => {
  const { addFile, updateFileStatus } = useFileStore.getState();
  const uploadFileIdList: string[] = [];

  for (let file of basicFiles) {
    const uploadedFile = convertFileToUploadedFile(file);
    console.log('选择的文件:', uploadedFile);
    addFile(uploadedFile);
    uploadFileIdList.push(uploadedFile.id);
  }

  console.log(basicFiles);

  for (let i = 0; i < basicFiles.length; i++) {
    const url = await uploadFileRequest(basicFiles[i]);
    if (url !== '') {
      // 上传成功
      console.log(url);
      updateFileStatus(uploadFileIdList[i], 'success', url);
    } else {
      updateFileStatus(uploadFileIdList[i], 'error', url);
    }
  }
};

const formatFileSize = (size: File['size']) => {
  if (size < 1024) {
    return `${size}bytes`;
  } else if (size < 1024 * 1024) {
    const kilobytes = (size / 1024).toFixed(2); // 转换为 KB 并保留两位小数
    return `${kilobytes}KB`;
  } else {
    const megabytes = (size / (1024 * 1024)).toFixed(2); // 转换为 MB 并保留两位小数
    return `${megabytes}MB`;
  }
};

const convertFileToUploadedFile = (file: File): UploadedFile => {
  return {
    id: crypto.randomUUID(), // 生成唯一 ID
    name: file.name,
    size: formatFileSize(file.size),
    type: file.type.split('/')[1],
    uploadedAt: new Date().toLocaleString(), // 上传时间
    url: '',
    success: false,
    status: 'uploading',
  };
};

export { formatFileSize, convertFileToUploadedFile };
