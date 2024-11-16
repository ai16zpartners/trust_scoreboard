import { FC } from 'react';
import styles from './PersonalitySelector.module.css';

interface PersonalitySelectorProps {
  selected: string;
  onSelect: (personality: string) => void;
}

export const PersonalitySelector: FC<PersonalitySelectorProps> = ({
  selected,
  onSelect
}) => {
  return (
    <div className={styles.formGroup}>
      <label>Personality</label>
      <div className={styles.buttonGroup}>
        <button 
          className={`${styles.button} ${selected === 'Manager' ? styles.selected : ''}`}
          onClick={() => onSelect('Manager')}
        >
          Manager
        </button>
        <button className={styles.button} disabled>Member</button>
        <button className={styles.button} disabled>Moderator</button>
      </div>
      <span className={styles.helperText}>Custom personalities coming soon.</span>
    </div>
  );
}; 