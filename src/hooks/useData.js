import { useContext } from 'react';
import { DataContext } from '../context/DataContextDef';

/**
 * Custom hook to access the Data Context.
 * Provides access to shared application data (contacts, groups, etc.).
 *
 * @returns {Object} The data context value.
 * @throws {Error} Throws an error if used outside of a DataProvider.
 */

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};