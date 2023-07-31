import React from 'react';
import styles from './menu.scss';
import { MenuIcon } from '../../../Icons';
import { Dropdown } from '../../../Dropdown';
import { MenuItemsList } from './MenuItemsList';

interface IMenuProps {
  id: number
}

export function Menu({ id }: IMenuProps) {
  return (
    <Dropdown button={
      <button className={`${styles.button} btn-reset`}>
        <MenuIcon />
      </button>
    }>
      <MenuItemsList id={id} />
    </Dropdown>
  );
}
