import { create } from 'zustand';
import { produce } from 'immer';
import { UploadedFile } from '@/types/chat';

interface FileStore {
  files: UploadedFile[];
  addFile: (file: UploadedFile) => void;
  removeFile: (id: string) => void;
  updateFileStatus: (id: string, status: 'success' | 'error', url?: string) => void;
}

export const useFileStore = create<FileStore>(
  // 使用 Immer middleware
  (set) => ({
    files: [],
    addFile: (file) =>
      set(
        produce((state) => {
          state.files.push(file);
        })
      ),
    removeFile: (id) =>
      set(
        produce((state) => {
          state.files = state.files.filter((f) => f.id !== id);
        })
      ),
    updateFileStatus: (id, status, url) =>
      set(
        produce((state) => {
          const fileIndex = state.files.findIndex((f) => f.id === id);
          if (fileIndex !== -1) {
            state.files[fileIndex] = {
              ...state.files[fileIndex],
              status,
              url: url || state.files[fileIndex].url,
            };
          }
        })
      ),
  })
);
