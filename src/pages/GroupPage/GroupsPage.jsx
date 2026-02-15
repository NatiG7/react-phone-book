import { useState } from 'react';
import Modal from '../../components/common/Modal/Modal';
import ContactForm from '../../components/contacts/ContactForm/ContactForm';
import ContactList from '../../components/contacts/ContactList/ContactList';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import styles from './grouppage.module.css';

const GROUPS = ['Friends', 'Family', 'Work', 'Other'];

/**
 * Page component for displaying contacts filtered by group categories.
 * Allows switching between defined groups and managing contacts within them.
 *
 * @returns {JSX.Element} The rendered groups page.
 */

const GroupsPage = () => {
  const { user } = useAuth();
  const { contacts, setContacts } = useData();
  const [activeGroup, setActiveGroup] = useState('Friends');

  // Edit logic reuse
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const isAdmin = user?.role === 'admin';

  // Filter contacts based on active tab
  const filteredContacts = contacts.filter(c => c.group === activeGroup);

  // --- REUSED HANDLERS ---

  const handleEdit = contact => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleDelete = id => {
    if (window.confirm('WARNING: Confirm deletion from database?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const handleToggleFavorite = id => {
    setContacts(
      contacts.map(c =>
        c.id === id ? { ...c, isFavorite: !c.isFavorite } : c,
      ),
    );
  };

  const handleSave = formData => {
    const updated = contacts.map(c =>
      c.id === editingContact.id ? { ...c, ...formData } : c,
    );
    setContacts(updated);
    setIsModalOpen(false);
  };

return (
    <div className={styles.container}>
      
      {/* --- NEW HEADER PANEL (Matches PhoneBookPage) --- */}
      <div className={styles.headerPanel}>
        <h2 className={styles.title}>GROUP PROTOCOLS</h2>

        {/* Tabs are now the "Controls" inside the header */}
        <div className={styles.folderNav}>
          {GROUPS.map(group => {
            const count = contacts.filter(c => c.group === group).length;
            return (
              <button
                key={group}
                className={`${styles.folderTab} ${activeGroup === group ? styles.activeTab : ''}`}
                onClick={() => setActiveGroup(group)}
              >
                <span>{group}</span>
                <span className={styles.countBadge}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* The Path Bar sits at the bottom of the header now */}
        <div className={styles.pathBar}>
          |{user.role}| root/home/{user?.username}/groups/{activeGroup.toLowerCase()}/$ _
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className={styles.contentArea}>
        <ContactList
          contacts={filteredContacts}
          onToggleFavorite={handleToggleFavorite}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`EDITING // ${editingContact?.name.toUpperCase()}`}
      >
        <ContactForm
          initialData={editingContact}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default GroupsPage;
