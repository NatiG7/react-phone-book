import { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
} from "../../../utils/validators";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import styles from "./contactform.module.css";

const DEFAULT_STATE = {
  name: "",
  phone: "",
  email: "",
  picture: "https://randomuser.me/api/portraits/lego/1.jpg",
  group: "Friends",
};

/**
 * ContactForm Component
 * * A form used to create a new contact or edit an existing one.
 * Handles local validation for Name, Phone, and Email.
 * * @param {Object} initialData - The contact data to populate if editing (null if creating).
 * @param {Function} onSave - Callback function when the form is successfully submitted.
 * @param {Function} onCancel - Callback function when the cancel button is clicked.
 */
const ContactForm = ({ initialData, onSave, onCancel }) => {
  // Initialize state once
  const [formData, setFormData] = useState(initialData || DEFAULT_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData(DEFAULT_STATE);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [initialData]);

  /**
   * Handles input changes for form fields.
   * Updates the specific field in state and clears any existing error for that field.
   * * @param {Event} e - The change event from the input field.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  /**
   * Validates the form data before submission.
   * Checks for existence and format validity of name, phone, and email.
   * * @returns {Object} An object containing error messages, if any.
   */
  const validate = () => {
    const newErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!isValidName(formData.name)) {
      newErrors.name = "Name too short";
    }

    // Phone Validation
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Invalid format (e.g. 050-1234567 or +1-555-0199)";
    }

    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    return newErrors;
  };

  /**
   * Handles the form submission.
   * Prevents default behavior, runs validation, and calls onSave if valid.
   * * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Input
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <Input
        label="Email Address"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        label="Image URL"
        name="picture"
        value={formData.picture}
        onChange={handleChange}
      />

      <div>
        <label className={styles.selectLabel}>Group Assignment</label>
        <Select
          label="Group Assignment"
          name="group"
          value={formData.group}
          onChange={handleChange}
          options={[
            { value: "Friends", label: "Friends" },
            { value: "Family", label: "Family" },
            { value: "Work", label: "Work" },
            { value: "Other", label: "Other" },
          ]}
        />
      </div>
      <div className={styles.actions}>
        <Button onClick={onCancel} variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Record
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
