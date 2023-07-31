import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { toggleMode } from '../../store/settings/settingsSlice';
import styles from './switchMode.scss';

export function SwitchMode() {
  const { themeMode } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const [isMode, setIsMode] = useState(!!themeMode);

  const className = classNames('btn-reset', {
    [styles.button]: true,
    [styles.button_dark]: !isMode,
  });

  function handleChange() {
    dispatch(toggleMode(!isMode));
    setIsMode(!isMode);
  }

  useEffect(() => {
    if (!isMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isMode]);

  const node = document.body;

  if (!node) {
    return null;
  }

  return ReactDOM.createPortal(<div className={styles.switchMode}>
    <button className={className} onClick={handleChange}>
      {themeMode
        ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.25 12C21.25 14.4533 20.2754 16.806 18.5407 18.5407C16.806 20.2754 14.4533 21.25 12 21.25V22.75C17.937 22.75 22.75 17.937 22.75 12H21.25ZM12 21.25C9.54675 21.25 7.19397 20.2754 5.45926 18.5407C3.72455 16.806 2.75 14.4533 2.75 12H1.25C1.25 17.937 6.063 22.75 12 22.75V21.25ZM2.75 12C2.75 9.54675 3.72455 7.19397 5.45926 5.45926C7.19397 3.72455 9.54675 2.75 12 2.75V1.25C6.063 1.25 1.25 6.063 1.25 12H2.75ZM15.5 14.25C13.975 14.25 12.5125 13.6442 11.4341 12.5659C10.3558 11.4875 9.75 10.025 9.75 8.5H8.25C8.25 10.4228 9.01384 12.2669 10.3735 13.6265C11.7331 14.9862 13.5772 15.75 15.5 15.75V14.25ZM20.425 11.469C19.9136 12.3179 19.1913 13.0201 18.3284 13.5074C17.4654 13.9947 16.4911 14.2505 15.5 14.25V15.75C16.7494 15.7507 17.9778 15.4283 19.0659 14.8141C20.154 14.2 21.0648 13.315 21.71 12.245L20.425 11.469ZM9.75 8.5C9.74957 7.50897 10.0054 6.53467 10.4927 5.67171C10.98 4.80875 11.6822 4.08647 12.531 3.575L11.755 2.291C10.6851 2.93599 9.80011 3.84665 9.18597 4.93457C8.57184 6.02249 8.24941 7.25071 8.25 8.5H9.75ZM12 2.75C11.8986 2.74761 11.8022 2.70519 11.732 2.632C11.6891 2.59024 11.6604 2.536 11.65 2.477C11.646 2.446 11.648 2.356 11.755 2.291L12.531 3.575C13.034 3.271 13.196 2.714 13.137 2.276C13.075 1.821 12.717 1.25 12 1.25V2.75ZM21.71 12.245C21.644 12.352 21.554 12.354 21.523 12.35C21.464 12.3396 21.4098 12.3109 21.368 12.268C21.2948 12.1978 21.2524 12.1014 21.25 12H22.75C22.75 11.283 22.179 10.925 21.724 10.863C21.286 10.804 20.729 10.966 20.425 11.469L21.71 12.245Z"
            fill="#939393"/>
        </svg>
        : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M12 1.25C12.1989 1.25 12.3897 1.32902 12.5303 1.46967C12.671 1.61032 12.75 1.80109 12.75 2V3C12.75 3.19891 12.671 3.38968 12.5303 3.53033C12.3897 3.67098 12.1989 3.75 12 3.75C11.8011 3.75 11.6103 3.67098 11.4697 3.53033C11.329 3.38968 11.25 3.19891 11.25 3V2C11.25 1.80109 11.329 1.61032 11.4697 1.46967C11.6103 1.32902 11.8011 1.25 12 1.25ZM4.399 4.399C4.53963 4.25855 4.73025 4.17966 4.929 4.17966C5.12775 4.17966 5.31837 4.25855 5.459 4.399L5.852 4.791C5.98869 4.93239 6.06437 5.1218 6.06276 5.31845C6.06114 5.5151 5.98235 5.70325 5.84336 5.84237C5.70437 5.98149 5.5163 6.06046 5.31965 6.06226C5.123 6.06406 4.93352 5.98855 4.792 5.852L4.399 5.459C4.25855 5.31837 4.17966 5.12775 4.17966 4.929C4.17966 4.73025 4.25855 4.53963 4.399 4.399ZM19.601 4.399C19.7415 4.53963 19.8203 4.73025 19.8203 4.929C19.8203 5.12775 19.7415 5.31837 19.601 5.459L19.208 5.852C19.0658 5.98448 18.8778 6.0566 18.6835 6.05317C18.4892 6.04975 18.3038 5.97103 18.1664 5.83362C18.029 5.69621 17.9503 5.51082 17.9468 5.31652C17.9434 5.12222 18.0155 4.93417 18.148 4.792L18.541 4.399C18.6816 4.25855 18.8722 4.17966 19.071 4.17966C19.2697 4.17966 19.4604 4.25855 19.601 4.399ZM12 6.75C10.6076 6.75 9.27226 7.30312 8.28769 8.28769C7.30312 9.27226 6.75 10.6076 6.75 12C6.75 13.3924 7.30312 14.7277 8.28769 15.7123C9.27226 16.6969 10.6076 17.25 12 17.25C13.3924 17.25 14.7277 16.6969 15.7123 15.7123C16.6969 14.7277 17.25 13.3924 17.25 12C17.25 10.6076 16.6969 9.27226 15.7123 8.28769C14.7277 7.30312 13.3924 6.75 12 6.75ZM5.25 12C5.25 10.2098 5.96116 8.4929 7.22703 7.22703C8.4929 5.96116 10.2098 5.25 12 5.25C13.7902 5.25 15.5071 5.96116 16.773 7.22703C18.0388 8.4929 18.75 10.2098 18.75 12C18.75 13.7902 18.0388 15.5071 16.773 16.773C15.5071 18.0388 13.7902 18.75 12 18.75C10.2098 18.75 8.4929 18.0388 7.22703 16.773C5.96116 15.5071 5.25 13.7902 5.25 12ZM1.25 12C1.25 11.8011 1.32902 11.6103 1.46967 11.4697C1.61032 11.329 1.80109 11.25 2 11.25H3C3.19891 11.25 3.38968 11.329 3.53033 11.4697C3.67098 11.6103 3.75 11.8011 3.75 12C3.75 12.1989 3.67098 12.3897 3.53033 12.5303C3.38968 12.671 3.19891 12.75 3 12.75H2C1.80109 12.75 1.61032 12.671 1.46967 12.5303C1.32902 12.3897 1.25 12.1989 1.25 12ZM20.25 12C20.25 11.8011 20.329 11.6103 20.4697 11.4697C20.6103 11.329 20.8011 11.25 21 11.25H22C22.1989 11.25 22.3897 11.329 22.5303 11.4697C22.671 11.6103 22.75 11.8011 22.75 12C22.75 12.1989 22.671 12.3897 22.5303 12.5303C22.3897 12.671 22.1989 12.75 22 12.75H21C20.8011 12.75 20.6103 12.671 20.4697 12.5303C20.329 12.3897 20.25 12.1989 20.25 12ZM18.148 18.148C18.2886 18.0076 18.4792 17.9287 18.678 17.9287C18.8768 17.9287 19.0674 18.0076 19.208 18.148L19.601 18.541C19.6747 18.6097 19.7338 18.6925 19.7748 18.7845C19.8158 18.8765 19.8378 18.9758 19.8396 19.0765C19.8414 19.1772 19.8228 19.2772 19.7851 19.3706C19.7474 19.464 19.6913 19.5488 19.62 19.62C19.5488 19.6913 19.464 19.7474 19.3706 19.7851C19.2772 19.8228 19.1772 19.8414 19.0765 19.8396C18.9758 19.8378 18.8765 19.8158 18.7845 19.7748C18.6925 19.7338 18.6097 19.6747 18.541 19.601L18.148 19.208C18.0076 19.0674 17.9287 18.8768 17.9287 18.678C17.9287 18.4792 18.0076 18.2886 18.148 18.148ZM5.852 18.148C5.99245 18.2886 6.07134 18.4792 6.07134 18.678C6.07134 18.8768 5.99245 19.0674 5.852 19.208L5.459 19.601C5.39034 19.6747 5.30754 19.7338 5.21554 19.7748C5.12354 19.8158 5.02423 19.8378 4.92352 19.8396C4.82282 19.8414 4.72279 19.8228 4.6294 19.7851C4.53601 19.7474 4.45118 19.6913 4.37996 19.62C4.30874 19.5488 4.2526 19.464 4.21488 19.3706C4.17716 19.2772 4.15863 19.1772 4.16041 19.0765C4.16219 18.9758 4.18423 18.8765 4.22522 18.7845C4.26621 18.6925 4.32531 18.6097 4.399 18.541L4.791 18.148C4.86065 18.0783 4.94335 18.023 5.03438 17.9853C5.1254 17.9476 5.22297 17.9282 5.3215 17.9282C5.42003 17.9282 5.5176 17.9476 5.60862 17.9853C5.69965 18.023 5.78235 18.0783 5.852 18.148ZM12 20.25C12.1989 20.25 12.3897 20.329 12.5303 20.4697C12.671 20.6103 12.75 20.8011 12.75 21V22C12.75 22.1989 12.671 22.3897 12.5303 22.5303C12.3897 22.671 12.1989 22.75 12 22.75C11.8011 22.75 11.6103 22.671 11.4697 22.5303C11.329 22.3897 11.25 22.1989 11.25 22V21C11.25 20.8011 11.329 20.6103 11.4697 20.4697C11.6103 20.329 11.8011 20.25 12 20.25Z"
            fill="#939393"/>
        </svg>}
    </button>
  </div>, node);
}
