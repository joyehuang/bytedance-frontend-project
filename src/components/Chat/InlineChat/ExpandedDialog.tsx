import React from 'react';
import { Message } from '../../../types/chat';

export interface ExpandedDialogProps {
  messages: Message[];
  onClose: () => void;
  onSend: (content: string) => void;
  onUpload?: (files: File[]) => void;
}

export const ExpandedDialog: React.FC<ExpandedDialogProps> = () => {
  return <div>ExpandedDialog Component</div>;
};

export default ExpandedDialog;
