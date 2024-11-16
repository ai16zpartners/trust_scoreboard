import { FC } from 'react';
import Image from 'next/image';
import styles from './SocialLinks.module.css';

export const SocialLinks: FC = () => {
  return (
    <div className={styles.socialSection}>
      <h3 className={styles.sectionTitle}>Socials</h3>
      <div className={styles.socialButtons}>
        <button className={styles.socialButton}>
          <Image src="/twitter.svg" alt="Twitter" width={16} height={16} />
          @npc
        </button>
        <button className={styles.socialButton}>
          <Image src="/twitter.svg" alt="Twitter" width={16} height={16} />
          @npc
        </button>
        <button className={styles.socialButton}>
          <Image src="/twitter.svg" alt="Twitter" width={16} height={16} />
          @npc
        </button>
      </div>
    </div>
  );
}; 