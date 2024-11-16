import { FC, useState } from 'react';
import { CreateSection } from '../../components/eliza/CreateSection';
import { PreviewCard } from '../../components/eliza/PreviewCard';
import styles from './index.module.css';

const ElizaView: FC = () => {
  const [characterName, setCharacterName] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('Manager');
  const [selectedSkills, setSelectedSkills] = useState(['Post']);

  return (
    <div className={styles.container}>
      <CreateSection 
        characterName={characterName}
        setCharacterName={setCharacterName}
        selectedPersonality={selectedPersonality}
        setSelectedPersonality={setSelectedPersonality}
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />
      <PreviewCard 
        name={characterName || 'Default NPC'}
        description="I will manage your community, and respond to questions."
        avatar="/default-profile.png"
      />
    </div>
  );
};

export default ElizaView; 