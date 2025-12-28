import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import styles from './loginpage.module.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [globalError, setGlobalError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when typing
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    setGlobalError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/home');
    } else {
      setGlobalError(result.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Welcome</h2>
        
        {globalError && <div className={styles.errorBox}>{globalError}</div>}

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
            <button 
              type="button" 
              className={styles.toggleBtn}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? '🙈' : '👁️'}
            </button>
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
            <button 
              type="button" 
              className={styles.toggleBtn}
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? '🙈' : '👁️'}
            </button>
          </div>

          <button type="submit" className={styles.submitBtn}>Login</button>
        </form>

        {/* Mandatory Requirement: Show User Data  */}
        <div className={styles.infoBox}>
          <h4>Available Users:</h4>
          <ul>
            <li><strong>Admin:</strong> admin / 123</li>
            <li><strong>User:</strong> user / 123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;