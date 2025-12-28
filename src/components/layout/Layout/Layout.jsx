import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import styles from './Layout.module.css'; // CSS Module usage [cite: 14]

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