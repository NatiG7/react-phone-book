import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextDef';

/**
 * Custom hook to access the Authentication Context.
 * Must be used within an AuthProvider to ensure context availability.
 *
 * @returns {Object} The authentication context value containing user state and auth methods.
 * @throws {Error} Throws an error if used outside of an AuthProvider.
 */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};