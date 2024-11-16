import { FC, ReactNode } from 'react';
import styles from './ContentContainer.module.css';

interface Props {
  children: React.ReactNode;
}

export const ContentContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={`flex-1 container mx-auto ${styles.container}`}>
      <div className="h-full w-full flex flex-col  justify-center">
        {children}
      </div>
    </div>
  );
};
