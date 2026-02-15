import { Link } from 'react-router-dom';
import styles from '../NotFoundPage/notfoundpage.module.css';

/**
 * 404 Error page component displayed when a route is not found.
 * Provides a link to return to the home page.
 *
 * @returns {JSX.Element} The rendered 404 page.
 */

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>// ERROR: DESTINATION UNREACHABLE</p>
      <p className={styles.message}>The requested resource does not exist in this sector.</p>
      <Link to="/home" className={styles.homeLink}>RETURN TO BASE</Link>
    </div>
  );
};

export default NotFoundPage;