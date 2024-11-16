import { FC, useState } from "react";
import ProfileData from "../../components/profile/ProfileData";
import ProfileTotals from "../../components/profile/ProfileTotals";
import Socials from "../../components/profile/Socials";
import ProfileWallets from "../../components/profile/ProfileWallets";
import ProfileHoldings from "../../components/profile/ProfileHoldings";
import ApiSection from "../../components/profile/ApiSection";
import styles from "./index.module.css";
import { useSession, signOut } from "next-auth/react";

type View = "profile" | "holdings";

const ProfileView: FC = () => {
  const { data: session } = useSession();
  const [currentView, setCurrentView] = useState<View>("profile");

  const handleViewChange = (view: View) => {
    setCurrentView(view);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.profileDataWrapper}>
          <ProfileData />
        </div>
        <div className={styles.profileTotalsWrapper}>
          <ProfileTotals onViewChange={handleViewChange} />

        </div>
        {
          session?.user &&
          (<div className="flex items-center justify-center w-full px-[24px]">
            <button onClick={handleSignOut} className={`rounded-2xl ${styles.signOutButton}`}>
              Logout
            </button>
          </div>)
        }
        <div className={styles.contentArea}>
          {currentView === "profile" ? (
            <div className={styles.profileContent}>
              <div className={styles.rowContainer}>
                <div className={`hidden px-10 ${styles.column}`}>
                  <Socials />
                </div>
                <div className={`hidden ${styles.column}`}>
                  <ProfileWallets />
                </div>
              </div>
            </div>
          ) : (
            <ProfileHoldings />
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfileView;
