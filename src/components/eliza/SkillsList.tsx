import { FC } from 'react';
import styles from './SkillsList.module.css';

export const SkillsList: FC = () => {
  return (
    <div className={styles.skillsSection}>
      <h3 className={styles.sectionTitle}>Skills</h3>
      <div className={styles.skillButtons}>
        <button className={styles.skillButton}>Respond</button>
        <button className={styles.skillButton}>Generate Images</button>
        <button className={styles.skillButton}>Post</button>
        <button className={styles.skillButton}>Manage Wallet</button>
      </div>
    </div>
  );
}; 