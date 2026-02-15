import styles from './button.module.css';

/**
 * A reusable button component with variant support.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @param {Function} [props.onClick] - The function to call when the button is clicked.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The HTML button type attribute.
 * @param {string} [props.variant='primary'] - The visual style variant (maps to CSS class).
 * @param {string} [props.className=''] - Additional CSS classes to append.
 * @returns {JSX.Element} The rendered button element.
 */

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