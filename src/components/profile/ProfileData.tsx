import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './ProfileData.module.css';

export const ProfileData: FC = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <h1 className={styles.userName}>
          {session?.user?.name || 'Anonymous'}
        </h1>
        <span className={styles.userRole}>Partner</span>
      </div>
      {session?.user?.image && (
        <div className={styles.imageContainer}>
          <Image
            src={session.user.image}
            alt="Profile"
            width={48}
            height={48}
            className={styles.profileImage}
            priority
          />
        </div>
      )}
    </div>
  );
};

export default ProfileData; 