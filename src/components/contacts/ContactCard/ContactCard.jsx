import { useState } from 'react';
import Button from '../../common/Button/Button';
import styles from './contactcard.module.css';

const ContactCard = ({ contact, isFavorite, onToggleFavorite, onEdit, onDelete, isAdmin }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
      title="Click to toggle details"
    >
      <div className={styles.header}>
        <img src={contact.picture} alt={contact.name} className={styles.image} />
        <div className={styles.headerText}>
          <h3 className={styles.name}>{contact.name}</h3>
          {!isExpanded && (
            <span className={styles.miniHint}>
               {isFavorite && <span className={styles.star}>★</span>} Click to expand
            </span>
          )}
        </div>
      </div>

      {/* EXPANDED CONTENT */}
      {isExpanded && (
        <div className={styles.details}>
          <div className={styles.infoRow}>
            <span className={styles.label}>PHONE:</span> {contact.phone}
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>EMAIL:</span> {contact.email}
          </div>

          {/* Action Area - Stop propagation so clicking buttons doesn't close the card */}
          <div className={styles.actionArea} onClick={(e) => e.stopPropagation()}>
            <Button
              variant="secondary"
              className={`${styles.favBtn} ${isFavorite ? styles.active : ''}`}
              onClick={() => onToggleFavorite(contact.id)}
            >
              {isFavorite ? '★ PRIORITY ACTIVE' : '☆ MARK PRIORITY'}
            </Button>

            {isAdmin && (
              <div className={styles.adminActions}>
                <Button onClick={() => onEdit(contact)} variant="primary">
                  EDIT
                </Button>
                <Button onClick={() => onDelete(contact.id)} variant="danger">
                  DELETE
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Visual Toggle Arrow */}
      <div className={styles.toggleIndicator}>
        {isExpanded ? '▲' : '▼'}
      </div>
    </div>
  );
};

export default ContactCard;