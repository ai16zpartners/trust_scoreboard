import { FC } from 'react';
import styles from './PublishButton.module.css';

export const PublishButton: FC = () => {
  return (
    <button className={styles.publishButton}>
      Publish (1 SOL)
    </button>
  );
}; 