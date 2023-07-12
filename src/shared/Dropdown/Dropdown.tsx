import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './dropdown.scss';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {
};

export function Dropdown({
  button,
  children,
  isOpen,
  onOpen = NOOP,
  onClose = NOOP,
}: IDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const node = document.getElementById('dropdown-root');

  if (!node) {
    return null;
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
  const [divStyles, setDivStyles] = useState({
    top: '',
    left: '',
  });
  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  useEffect(() => (isDropdownOpen ? onOpen() : onClose()), [isDropdownOpen]);

  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleClick = () => {
    document.querySelectorAll(`.${styles.container}`).forEach((item) => {
      if (item === ref.current) {
        setDivStyles({
          top: `${item.getBoundingClientRect().top + item.getBoundingClientRect().height + 10}px`,
          left: `${item.getBoundingClientRect().left - item.getBoundingClientRect().width * 2.65}px`,
        });
      }
    });
  };

  return (
    <div className={styles.container} ref={ref} onClick={handleClick}>
      <div onClick={handleOpen}>
        {button}
      </div>
      {
        isDropdownOpen
        && ReactDOM.createPortal((<div className={styles.listContainer} style={divStyles}>
          <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>), node)
      }
    </div>
  );
}
