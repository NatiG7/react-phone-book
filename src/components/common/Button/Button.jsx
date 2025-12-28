import styles from './button.module.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${styles.btn} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;