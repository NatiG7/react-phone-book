import { useState } from "react";
import { DataContext } from "./DataContextDef"; // Import the definition

/**
 * DataProvider Component
 * * Manages the global data state (contacts list) for the application.
 * Provides contacts and state modifiers to the context.
 * * @param {ReactNode} children - The child components that require access to the data context.
 */
export default function DataProvider({ children }) {
  const [contacts, setContacts] = useState([]);

  /**
   * initContacts Function
   * * Replaces the current contacts list with a new set of data.
   * * @param {Array} newContacts - The new array of contact objects.
   */
  const initContacts = (newContacts) => {
    setContacts(newContacts);
  };

  return (
    <DataContext.Provider value={{ contacts, setContacts, initContacts }}>
      {children}
    </DataContext.Provider>
  );
}
