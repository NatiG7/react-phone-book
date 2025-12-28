import { useState } from 'react';
import { DataContext } from './DataContextDef'; // Import the definition

export default function DataProvider({ children }) {
  const [contacts, setContacts] = useState([]);

  const initContacts = (newContacts) => {
    setContacts(newContacts);
  };

  return (
    <DataContext.Provider value={{ contacts, setContacts, initContacts }}>
      {children}
    </DataContext.Provider>
  );
}