import { useState } from "react";
import Input from "../../common/Input/Input"; // Importing Input internally
import ContactCard from "../ContactCard/ContactCard";
import styles from "./contactlist.module.css";

/**
 * ContactList Component
 * * Renders a searchable grid of contact cards.
 * * @param {Array} contacts - Array of contact objects to display.
 * @param {Function} onToggleFavorite - Handler to toggle the favorite status of a contact.
 * @param {Function} onEdit - Handler to initiate editing of a contact.
 * @param {Function} onDelete - Handler to delete a contact.
 * @param {boolean} isAdmin - Flag to determine if admin actions (edit/delete) are visible.
 */
const ContactList = ({
  contacts,
  onToggleFavorite,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!contacts || contacts.length === 0) {
    return <div className={styles.empty}>// NO RECORDS FOUND IN DATABASE_</div>;
  }

  /**
   * Filters the contacts array based on the current search term.
   * Checks against name, phone, and email case-insensitively.
   */
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
