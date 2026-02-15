import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../common/Button/Button';
import styles from './navbar.module.css';

/**
 * The main navigation bar component.
 * Handles application routing links and user session termination.
 * Displays the current user's name and role.
 *
 * @returns {JSX.Element} The rendered navigation bar.
 */

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li><NavLink to="/home" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
        <li><NavLink to="/contacts" className={({ isActive }) => isActive ? styles.active : ''}>All Contacts</NavLink></li>
        <li><NavLink to="/groups" className={({ isActive }) => isActive ? styles.active : ''}>Groups</NavLink></li>
      </ul>
      <div className={styles.userSection}>
        <span>Hello, {user?.username} ({user?.role})</span>
        <Button onClick={handleLogout} variant="danger">TERMINATE SESSION</Button>
      </div>
    </nav>
  );
};

export default Navbar;