import styles from './header.module.css';

/**
 * Renders the application header.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.title="Phone Book App"] - The title text to display in the header.
 * @returns {JSX.Element} The rendered header element.
 */

export default function Header({title = "Phone Book App"}) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}