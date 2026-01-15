import { Link } from 'react-router-dom';
import styles from '../NotFoundPage/notfoundpage.module.css';

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