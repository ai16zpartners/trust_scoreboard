import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styles from './ProfileWallets.module.css';

interface WalletDisplayProps {
  truncateLength?: number;
}

const truncateAddress = (address: string, length: number = 4): string => {
  if (!address) return '';
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

const ProfileWallets: FC<WalletDisplayProps> = ({ truncateLength = 4 }) => {
  const { publicKey, disconnect, connect, wallet } = useWallet();

  const handleWalletClick = async () => {
    if (publicKey) {
      try {
        await disconnect();
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
      }
    } else if (wallet) {
      try {
        await connect();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  return (
    <div>
      <h2 className={styles.title}></h2>
      <div className={styles.buttonParent}>
        {wallet ? (
          <div 
            className={`${styles.button} ${publicKey ? styles.active : ''}`}
            onClick={handleWalletClick}
            role="button"
            tabIndex={0}
          >
            <div className={styles.text}>
              {publicKey 
                ? truncateAddress(publicKey.toString(), truncateLength)
                : 'Connect Wallet'}
            </div>
          </div>
        ) : (
          <WalletMultiButton className={styles.button}>
            <div className={styles.text}>Select Wallet</div>
          </WalletMultiButton>
        )}
      </div>
    </div>
  );
};

export default ProfileWallets;