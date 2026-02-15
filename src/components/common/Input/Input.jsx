import styles from './input.module.css';

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

const Input = ({ label, type = 'text', name, value, onChange, error, ...props }) => {
  return (
    <div className={styles.group}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;