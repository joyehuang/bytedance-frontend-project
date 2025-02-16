import React, { useState } from 'react';
import { SearchForm } from '../shared/SearchForm';
import { ExpandedDialog } from './ExpandedDialog';

export interface CollapsedInputProps {
  placeholder?: string;
}

export const CollapsedInput: React.FC<CollapsedInputProps> = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleClose = () => {
    setIsPopupVisible(false);
  };

  const handleSearchFocus = () => {
    setIsPopupVisible(true);
  };

  return (
    <div>
      <div>
        <SearchForm className="expand-input" inputW="w-56" onFocus={handleSearchFocus} />
      </div>
      <ExpandedDialog isVisible={isPopupVisible} onClose={handleClose} />
    </div>
  );
};
