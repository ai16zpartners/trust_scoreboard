import { FC } from 'react';
import styles from './NameInput.module.css';

interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const NameInput: FC<NameInputProps> = ({ value, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label>Name</label>
      <input 
        type="text" 
        placeholder="Character Name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}; 