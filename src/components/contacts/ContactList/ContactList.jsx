import { useState } from 'react';
import Input from '../../common/Input/Input'; // Importing Input internally
import ContactCard from '../ContactCard/ContactCard';
import styles from './contactlist.module.css';

const ContactList = ({ contacts, onToggleFavorite, onEdit, onDelete, isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!contacts || contacts.length === 0) {
    return <div className={styles.empty}>// NO RECORDS FOUND IN DATABASE_</div>;
  }

  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.phone.includes(term) ||
      contact.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className={styles.wrapper}>
      {/* Internal Search Bar */}
      <div className={styles.searchBar}>
        <Input
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="> Filter displayed contacts..."
        />
      </div>

      {/* Grid Results */}
      {filteredContacts.length > 0 ? (
        <div className={styles.listContainer}>
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isFavorite={contact.isFavorite}
              onToggleFavorite={onToggleFavorite}
              onEdit={onEdit}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noMatches}>
          // NO MATCHES FOR SEARCH QUERY "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default ContactList;