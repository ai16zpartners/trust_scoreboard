import { FC } from 'react';
import styles from './AvatarUpload.module.css';

export const AvatarUpload: FC = () => {
  return (
    <div className={styles.avatarUpload}>
      <div className={styles.uploadButton}>
        <span>+</span>
      </div>
    </div>
  );
}; 