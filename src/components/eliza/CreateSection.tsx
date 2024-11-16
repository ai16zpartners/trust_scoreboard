import { FC } from 'react';
import Image from 'next/image';
import styles from './CreateSection.module.css';

interface CreateSectionProps {
  characterName: string;
  setCharacterName: (name: string) => void;
  selectedPersonality: string;
  setSelectedPersonality: (personality: string) => void;
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
}

export const CreateSection: FC<CreateSectionProps> = ({
  characterName,
  setCharacterName,
  selectedPersonality,
  setSelectedPersonality,
  selectedSkills,
  setSelectedSkills,
}) => {
  return (
    <div className={styles.createSection}>
      <h1 className={styles.title}>Create an NPC</h1>
      <p className={styles.subtitle}>Deploy and run your own NPC for your community</p>
      
      <div className={styles.avatarUpload}>
        <div className={styles.uploadButton}>
          <span>+</span>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Name</label>
        <input 
          type="text" 
          placeholder="Character Name"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Personality</label>
        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.button} ${selectedPersonality === 'Manager' ? styles.selected : ''}`}
            onClick={() => setSelectedPersonality('Manager')}
          >
            Manager
          </button>
          <button className={styles.button} disabled>Member</button>
          <button className={styles.button} disabled>Moderator</button>
        </div>
        <span className={styles.helperText}>Custom personalities coming soon.</span>
      </div>

      <div className={styles.formGroup}>
        <label>X/Twitter Skills</label>
        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.button} ${selectedSkills.includes('Post') ? styles.selected : ''}`}
            onClick={() => setSelectedSkills(['Post'])}
          >
            Post
          </button>
          <button className={styles.button} disabled>Generate Images</button>
          <button className={styles.button} disabled>Reply</button>
          <button className={styles.button} disabled>Direct Message</button>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.button} disabled>Follow/Unfollow</button>
          <button className={styles.button} disabled>Block</button>
        </div>
        <div className={styles.accountSection}>
          <button className={styles.disconnectButton}>Disconnect</button>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Telegram Skills</label>
        <button className={styles.connectButton}>Connect Account</button>
      </div>

      <button className={styles.publishButton}>
        Publish (1 SOL)
      </button>
    </div>
  );
}; 