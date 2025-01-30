import React from 'react';

export interface CollapsedInputProps {
  onExpand: () => void;
  placeholder?: string;
}

export const CollapsedInput: React.FC<CollapsedInputProps> = () => {
  return <div>CollapsedInput Component</div>;
};

export default CollapsedInput;
