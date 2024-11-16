import { FC } from 'react';
import styles from './TelegramSection.module.css';

export const TelegramSection: FC = () => {
  return (
    <div className={styles.formGroup}>
      <label>Telegram Skills</label>
      <button className={styles.connectButton}>
        Connect Account
      </button>
    </div>
  );
}; 