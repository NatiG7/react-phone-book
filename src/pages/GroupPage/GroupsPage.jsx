import { useState } from 'react';
import Modal from '../../components/common/Modal/Modal';
import ContactForm from '../../components/contacts/ContactForm/ContactForm';
import ContactList from '../../components/contacts/ContactList/ContactList';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import styles from './grouppage.module.css';

const GROUPS = ['Friends', 'Family', 'Work', 'Other'];

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
  
  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('WARNING: Confirm deletion from database?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const handleToggleFavorite = (id) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
    ));
  };

  const handleSave = (formData) => {
    const updated = contacts.map(c => 
      c.id === editingContact.id ? { ...c, ...formData } : c
    );
    setContacts(updated);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      
      {/* Folder Tabs Navigation */}
      <div className={styles.folderNav}>
        {GROUPS.map(group => {
          // Count items in this group
          const count = contacts.filter(c => c.group === group).length;
          
          return (
            <button 
              key={group}
              className={`${styles.folderTab} ${activeGroup === group ? styles.activeTab : ''}`}
              onClick={() => setActiveGroup(group)}
            >
              📂 {group} 
              <span className={styles.countBadge}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className={styles.contentArea}>
        <div className={styles.pathBar}>
          root/home/{user?.username}/contacts/{activeGroup.toLowerCase()}/
        </div>

        <ContactList 
          contacts={filteredContacts}
          onToggleFavorite={handleToggleFavorite}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      </div>

      {/* Reused Edit Modal */}
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