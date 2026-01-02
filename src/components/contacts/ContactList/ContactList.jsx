import ContactCard from '../ContactCard/ContactCard';
import styles from './contactlist.module.css';

const ContactList = ({ contacts, onToggleFavorite, onEdit, onDelete, isAdmin }) => {
  if (contacts.length === 0) {
    return <div className={styles.empty}>// NO RECORDS FOUND IN DATABASE_</div>;
  }

  return (
    <div className={styles.listContainer}>
      {contacts.map((contact) => (
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
  );
};

export default ContactList;