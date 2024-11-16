import { FC } from 'react';
import { useRouter } from 'next/router';
import styles from './ApiSection.module.css';

export const ApiSection: FC = () => {
  const router = useRouter();

  const handleNavigateToSaas = () => {
    router.push('/saas');
  };
  
  const handleNavigateToEliza = () => {
    router.push('/eliza');
  };

  const handleNavigateToCheckout = () => {
    router.push('/eliza');  // Points to eliza/index
  };

  return (
    <div>
      <h2 className={styles.title}></h2>
      <div className={styles.buttonParent}>
        <div 
          className={styles.button}
          onClick={handleNavigateToSaas}
        >
          <div className={styles.text}>
            Get API Access
          </div>
        </div>
        

        <div 
          className={`${styles.button} ${styles.checkoutButton}`}
          onClick={handleNavigateToCheckout}
        >
          <div className={styles.text}>
            Get an Eliza
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiSection;
