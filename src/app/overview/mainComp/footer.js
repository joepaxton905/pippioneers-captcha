"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './footer.module.css';

// Custom SVG icons component
const Icon = ({ name }) => {
  switch (name) {
    case 'home':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      );
    case 'chart':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      );
    case 'trade':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 3l5 5-5 5"></path>
          <path d="M8 21l-5-5 5-5"></path>
          <path d="M21 8h-8"></path>
          <path d="M3 16h8"></path>
        </svg>
      );
    case 'history':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      );
    case 'profile':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      );
    default:
      return null;
  }
};

const Footer = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Home',
      icon: 'home',
      path: '/overview'
    },
    {
      name: 'Markets',
      icon: 'chart',
      path: '/chart'
    },
    {
      name: 'Trade',
      icon: 'trade',
      path: '/trade'
    },
    {
      name: 'History',
      icon: 'history',
      path: '/history'
    },
    {
      name: 'Profile',
      icon: 'profile',
      path: '/profile'
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlass}>
        <nav className={styles.footerNav}>
          {navItems.map((item) => (
            <Link
              href={item.path}
              key={item.name}
              className={`${styles.navLink} ${pathname === item.path ? styles.activeLink : ''}`}
            >
              <div className={styles.navIcon}>
                <Icon name={item.icon} />
              </div>
              <span className={styles.navText}>{item.name}</span>
              {pathname === item.path && <div className={styles.activeIndicator}></div>}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
