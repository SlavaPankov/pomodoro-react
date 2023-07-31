import React, { ReactNode, useEffect, useState } from 'react';
import styles from './select.scss';
import { SelectItem } from '../SelectList/SelectItem';
import { ArrowIcon } from '../Icons';

interface ISelectProps {
  children: ReactNode,
  selected?: string
  isOpen?: boolean,
}

export function Select({ children, selected, isOpen }: ISelectProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(isOpen);
  useEffect(() => setIsSelectOpen(isOpen), [isOpen]);

  function handleClick() {
    if (isOpen === undefined) {
      setIsSelectOpen(!isSelectOpen);
    }
  }

  return (
    <div className={styles.select}>
      <div className={styles.selected} onClick={handleClick}>
        <SelectItem label={selected || 'Выберите'} />
        <div className={!isSelectOpen ? `${styles.arrow}` : `${styles.arrow} ${styles.arrowRotate}`}>
          <ArrowIcon />
        </div>
      </div>
      {
        isSelectOpen && (
          <div className={styles.listContainer}>
            <div className={styles.list} onClick={() => setIsSelectOpen(false)}>
              { children }
            </div>
          </div>
        )
      }
    </div>
  );
}
