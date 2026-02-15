import styles from './select.module.css';

/**
 * A modal dialog component with a header and close button.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines if the modal is visible.
 * @param {Function} props.onClose - The function to call to close the modal.
 * @param {string} [props.title] - The title text displayed in the header.
 * @param {React.ReactNode} props.children - The content to display inside the modal body.
 * @returns {JSX.Element|null} The rendered modal overlay or null if closed.
 */

const Select = ({ label, name, value, onChange, options = [] }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <select 
        name={name} 
        value={value} 
        onChange={onChange}
        className={styles.select}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;