import { FC } from 'react';
import Image from 'next/image';
import { SocialLinks } from './SocialLinks';
import { SkillsList } from './SkillsList';
import styles from './PreviewCard.module.css';

interface PreviewCardProps {
  name: string;
  description: string;
  avatar: string;
}

export const PreviewCard: FC<PreviewCardProps> = ({
  name = 'Default NPC',
  description = 'I will manage your community, and respond to questions.',
  avatar = '/default-profile.png'
}) => {
  return (
    <div className={styles.previewSection}>
      <div className={styles.previewCard}>
        <div className={styles.previewAvatar}>
          <Image 
            src={avatar}
            alt="NPC Avatar" 
            width={80} 
            height={80}
          />
        </div>
        <h2 className={styles.previewTitle}>{name}</h2>
        <p className={styles.previewDescription}>{description}</p>
        
        <SocialLinks />
        <SkillsList />
      </div>
    </div>
  );
}; 