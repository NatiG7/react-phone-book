import Button from '../Button/Button';
import styles from './modal.module.css';

/**
 * A labelled input field component with error handling.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.label] - The text label for the input.
 * @param {string} [props.type='text'] - The HTML input type (e.g., 'text', 'password').
 * @param {string} [props.name] - The name attribute for the input.
 * @param {string|number} [props.value] - The current value of the input.
 * @param {Function} [props.onChange] - Handler for change events.
 * @param {string} [props.error] - Error message text to display below the input.
 * @param {[...Object]} [props.props] - Additional props passed directly to the input element.
 * @returns {JSX.Element} The rendered input group.
 */

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <Button onClick={onClose} variant="danger">X</Button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;