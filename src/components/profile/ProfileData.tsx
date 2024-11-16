import { FC } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "./ProfileData.module.css";

export const ProfileData: FC = () => {
  const { data: session } = useSession();

 

  // Helper function to determine the user role
  const getUserRole = () => {
    if (!session?.user?.connections) return "Partner";
    if ("telegram" in session.user.connections) return "Telegram";
    if ("discord" in session.user.connections) return "Discord";
    return "Partner";
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        {session?.user?.image && (
          <div className={styles.imageContainer}>
            <Image
              src={session.user.image}
              alt="Profile"
              width={120}
            height={120}
              className={styles.profileImage}
              priority
              unoptimized
            />
          </div>
        )}
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>
            {session?.user?.name || "Anonymous"}
          </h1>
          <span className={`hidden ${styles.userRole}`}>{getUserRole()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
