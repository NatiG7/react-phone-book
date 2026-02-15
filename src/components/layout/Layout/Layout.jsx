import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import styles from './Layout.module.css'; // CSS Module usage [cite: 14]

/**
 * The main layout wrapper for the application.
 * Composes the Header, Navbar, dynamic main content (Outlet), and Footer.
 *
 * @returns {JSX.Element} The rendered application layout.
 */

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Navbar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;