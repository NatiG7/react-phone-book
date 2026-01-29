import { useMemo, useState } from 'react';
import Button from '../../components/common/Button/Button'; // Fixed Path
import Modal from '../../components/common/Modal/Modal'; // Fixed Path
import Select from '../../components/common/Select/Select'; // NEW: Imported Select
import ContactForm from '../../components/contacts/ContactForm/ContactForm';
import ContactList from '../../components/contacts/ContactList/ContactList';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import styles from './phonebookpage.module.css';

const PhoneBookPage = () => {
  const { user } = useAuth();
  const { contacts, setContacts } = useData();

  // Local UI State
  const [sortBy, setSortBy] = useState('name-asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const isAdmin = user?.role === 'admin';

  // --- ACTIONS ---

  const handleAdd = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const handleEdit = contact => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleDelete = id => {
    if (window.confirm('WARNING: Deletion is permanent. Proceed?')) {
      const updated = contacts.filter(c => c.id !== id);
      setContacts(updated);
    }
  };

  const handleToggleFavorite = id => {
    const updated = contacts.map(c =>
      c.id === id ? { ...c, isFavorite: !c.isFavorite } : c,
    );
    setContacts(updated);
  };

  const handleSave = formData => {
    if (editingContact) {
      // UPDATE
      const updated = contacts.map(c =>
        c.id === editingContact.id ? { ...c, ...formData } : c,
      );
      setContacts(updated);
    } else {
      // CREATE
      const newContact = {
        ...formData,
        id: crypto.randomUUID(),
        isFavorite: false,
      };
      setContacts([...contacts, newContact]);
    }
    setIsModalOpen(false);
  };

  // --- SORTING ---

  const processedContacts = useMemo(() => {
    let result = [...contacts];

    result.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortBy === 'name-asc') return nameA.localeCompare(nameB);
      if (sortBy === 'name-desc') return nameB.localeCompare(nameA);
      return 0;
    });

    return result;
  }, [contacts, sortBy]);

  return (
    <div className={styles.container}>
      {/* Command Bar */}
      <div className={styles.headerPanel}>
        <h2 className={styles.title}>Directory Protocol</h2>

        <div className={styles.controls}>
          <div className={styles.sortWrapper}>
            <Select
              name='sort'
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              options={[
                { value: 'name-asc', label: 'Sort A-Z' },
                { value: 'name-desc', label: 'Sort Z-A' },
              ]}
            />
          </div>

          {isAdmin && (
            <Button onClick={handleAdd} variant='primary' className={styles.addBtn}>
              + Add Record
            </Button>
          )}
        </div>

        <div className={styles.stats}>
          Records Found: {processedContacts.length}
        </div>
      </div>

      {/* Results Grid */}
      <ContactList
        contacts={processedContacts}
        onToggleFavorite={handleToggleFavorite}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isAdmin={isAdmin}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingContact ? 'EDITING RECORD //' : 'NEW ENTRY //'}
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

export default PhoneBookPage;
