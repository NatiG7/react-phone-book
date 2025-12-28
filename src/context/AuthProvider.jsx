import { useState } from 'react';
import { useData } from '../hooks/useData';
import { fetchRandomContacts } from '../services/api';
import { AuthContext } from './AuthContextDef';

const MOCK_USERS = [
  { username: 'admin', password: '123', role: 'admin' },
  { username: 'user', password: '123', role: 'user' }
];

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { initContacts } = useData();

  const login = async (username, password) => {
    const foundUser = MOCK_USERS.find((u) => u.username === username && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      // Fetch data on login
      const contacts = await fetchRandomContacts();
      initContacts(contacts);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid Credentials' };
    }
  };

  const logout = () => {
    setUser(null);
    initContacts([]); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}