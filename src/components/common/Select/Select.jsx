import styles from './select.module.css';

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