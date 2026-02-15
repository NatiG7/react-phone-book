import { useState } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import styles from "./loginform.module.css";

/**
 * LoginForm Component
 * * Renders a login interface with Username, Password, and Confirm Password fields.
 * Includes password visibility toggles and client-side validation.
 * * @param {Function} onSubmit - Callback function executed with (username, password) upon successful validation.
 */
const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * Handles changes in input fields.
   * Updates the form state and clears specific errors for the modified field.
   * * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  /**
   * Validates the form inputs.
   * Checks for required fields and ensures the password matches the confirmation.
   * * @returns {Object} An object containing error messages key-value pairs.
   */
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username required";
    if (!formData.password) newErrors.password = "Password required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords mismatch";
    return newErrors;
  };

  /**
   * Handles the form submission event.
   * Prevents default behavior, executes validation, and triggers the onSubmit prop if valid.
   * * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const valErrors = validate();
    if (Object.keys(valErrors).length > 0) {
      setErrors(valErrors);
      return;
    }
    onSubmit(formData.username, formData.password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />

      <div className={styles.passwordWrapper}>
        <Input
          label="Password"
          name="password"
          type={showPass ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Button
          type="button"
          variant="icon"
          className={styles.toggleBtn}
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? "🙈" : "👁️"}
        </Button>
      </div>

      <div className={styles.passwordWrapper}>
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <Button
          type="button"
          variant="icon"
          className={styles.toggleBtn}
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? "🙈" : "👁️"}
        </Button>
      </div>

      <Button type="submit" variant="primary">
        INITIALIZE SESSION
      </Button>
    </form>
  );
};

export default LoginForm;
