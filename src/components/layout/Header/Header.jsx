import styles from './header.module.css';

export default function Header({title = "Phone Book App"}) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}