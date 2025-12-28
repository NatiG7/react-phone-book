import Button from '../../common/Button/Button';
import styles from './contactCard.module.css';

const ContactCard = ({ contact, isFavorite, onToggleFavorite, onEdit, onDelete, isAdmin }) => {
  return (
    <div className={styles.card}>
      <img src={contact.picture} alt={contact.name} className={styles.image} />
      <div className={styles.info}>
        <h3>{contact.name}</h3>
        <p>{contact.phone}</p>
        <p>{contact.email}</p>

        <Button
          variant="secondary"
          className={`${styles.favBtn} ${isFavorite ? styles.active : ''}`}
          onClick={() => onToggleFavorite(contact.id)}
        >
          {isFavorite ? '★ PRIORITY' : '☆ MARK PRIORITY'}
        </Button>
      </div>

      {isAdmin && (
        <div className={styles.actions}>
          <Button onClick={() => onEdit(contact)} variant="primary">
            Edit
          </Button>
          <Button onClick={() => onDelete(contact.id)} variant="danger">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactCard;