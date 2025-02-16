import { create } from 'zustand';
// import {immer} from 'zustand/middleware/immer'
// import { produce } from 'immer';
import { UploadedFile } from '@/types/chat';
import axios from 'axios';
interface FileStore {
  files: UploadedFile[];
  addFile: (file: UploadedFile) => void;
  removeFile: (id: string) => void;
  convertFileToUploadedFile: (file: File) => UploadedFile;
  uploadFileRequest: (file: File) => Promise<string>;
  uploadFiles: (basicFiles: FileList) => void;
  updateFileStatus: (id: string, status: 'success' | 'error', url?: string) => void;
}

export const useFileStore = create<FileStore>((set) => {
  return {
    files: [],
    addFile: (file) => set((state) => ({ files: [...state.files, file] })),
    removeFile: (id) => set((state) => ({ files: state.files.filter((f) => f.id !== id) })),
    convertFileToUploadedFile: (file) => {
      return {
        id: crypto.randomUUID(), // 生成唯一 ID
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toLocaleString(), // 上传时间
        url: '',
        success: false,
        status: 'uploading',
      };
    },
    uploadFileRequest: async (file) => {
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
    },
    updateFileStatus: (id, status, url) =>
      set((state) => ({
        files: state.files.map((file) =>
          file.id === id
            ? {
                ...file,
                status,
                url,
                success: url === '' ? false : true,
              }
            : file
        ),
      })),

    uploadFiles: async (basicFiles) => {
      const { convertFileToUploadedFile, addFile, uploadFileRequest, updateFileStatus } =
        useFileStore.getState();
      const uploadFileIdList = [];
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
          //上传成功
          console.log(url);
          updateFileStatus(uploadFileIdList[i], 'success', url);
        } else {
          updateFileStatus(uploadFileIdList[i], 'error', url);
        }
      }
    },
  };
});
