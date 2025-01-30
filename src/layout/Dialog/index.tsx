import React, { useState } from 'react';
import '@/layout/inlineDialog/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons'; // 实心图标
import { Textarea } from '@/components/ui/textarea';
function Dialog() {
  //   const [isOpen, setIsOpen] = useState(false);
  // const testareaRef = useRef(null)
  // const [height, setHeight] = useState('auto')

  const [textValue, setTextValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value); // 更新状态
  };

  const handleClick = () => {
    console.log(textValue);
  };

  return (
    <div className="dialog-container">
      <div className="dialog-input">
        <Textarea
          className="dialog-textarea"
          placeholder="How can I help you?"
          value={textValue}
          onChange={handleChange}
        />
      </div>
      <div className="dialog-hr">
        <hr className="custom-hr" />
      </div>

      <div className="dialog-interact">
        <div className="dialog-file">
          <div className="dialog-icon">
            <FontAwesomeIcon icon={faPaperclip} />
          </div>
          <div className="dialog-icon">
            <FontAwesomeIcon icon={faImage} />
          </div>
        </div>
        <div className="dialog-button" onClick={handleClick}>
          <div className="dialog-icon">
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
          <span>Send Message</span>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
