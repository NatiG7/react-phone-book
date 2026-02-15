import styles from './footer.module.css';

/**
 * Renders the application footer with copyright information.
 *
 * @returns {JSX.Element} The rendered footer element.
 */

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© 2025 PhoneBook</p>
    </footer>
  );
}