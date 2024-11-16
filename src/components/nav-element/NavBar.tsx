import { FC } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import styles from './NavBar.module.css';
import { useState } from 'react';
import { RiBarChart2Fill } from "react-icons/ri";

interface NavBarProps {
  // Add any props if needed
}

const NavBar: FC<NavBarProps> = () => {
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      // Add search functionality
    };

  return (
    <nav className="w-full h-16 bg-[#202120] px-6 py-2 sticky z-[100] top-0">
      <div className="h-full flex items-center justify-between">
        {/* Empty div for spacing */}
        <div className="w-[100px]"></div>

        {/* Centered Logo */}
        <Link href="/" className="flex items-center absolute left-1/2 transform -translate-x-1/2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={60}
            height={32}
            priority
          />
        </Link>

        {/* Search Bar */}
        <div className={`${styles.searchContainer} hidden`}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </form>
        </div>

 
      </div>
    </nav>
  );
};

export default NavBar;
