import { create } from 'zustand';
// import {immer} from 'zustand/middleware/immer'
// import { produce } from 'immer';
import { UploadedFile } from '@/types/chat';
interface FileStore {
  files: UploadedFile[];
  addFile: (file: UploadedFile) => void;
  removeFile: (id: string) => void;
  updateFileStatus: (id: string, status: 'success' | 'error', url?: string) => void;
}

export const useFileStore = create<FileStore>((set) => {
  return {
    files: [],
    addFile: (file) => set((state) => ({ files: [...state.files, file] })),
    removeFile: (id) => set((state) => ({ files: state.files.filter((f) => f.id !== id) })),
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
  };
});
