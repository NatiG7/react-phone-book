import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './homepage.module.css';

const HomePage = () => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  
  useEffect(() => {
    const fullMessage = `> SYSTEM DETECTED USER: ${user?.username || 'GUEST'}\n> ACCESS LEVEL: ${user?.role.toUpperCase()}\n> INITIATING DASHBOARD...`;
    
    const resetTimer = setTimeout(() => setText(''), 0);

    const timer = setInterval(() => {
      setText((prev) => {
        // Stop if we have typed the full message
        if (prev.length >= fullMessage.length) {
          clearInterval(timer);
          return prev;
        }
        // Append next character safely
        return fullMessage.slice(0, prev.length + 1);
      });
    }, 50);

    return () => {
      clearTimeout(resetTimer);
      clearInterval(timer);
    };
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.terminalWindow}>
        <div className={styles.terminalHeader}>
          <span>root@phonebook:~#</span>
          <span>STATUS: ONLINE</span>
        </div>
        <div className={styles.terminalBody}>
          <span className={styles.prompt}>$</span>
          <span className={styles.typewriterText}>
            {text}
            <span className={styles.cursor}></span>
          </span>
        </div>
      </div>

      <h2 className={styles.gridTitle}>Available Modules</h2>

      <div className={styles.featuresGrid}>
        <div className={styles.moduleCard}>
          <h3><span className={styles.statusIndicator}></span>Phone Directory</h3>
          <p>
            Core module for managing personnel data. Supports full CRUD operations, 
            searching, and sorting. Access restricted by user clearance level.
          </p>
        </div>

        <div className={styles.moduleCard}>
          <h3><span className={styles.statusIndicator}></span>Group Clusters</h3>
          <p>
            Segmentation tool for organizing contacts into logic-groups (Friends, Family, Work).
            Allows for filtered data visualization.
          </p>
        </div>

        <div className={styles.moduleCard}>
          <h3><span className={styles.statusIndicator}></span>Priority Targets</h3>
          <p>
            "Favorites" subsystem. Pins high-value contacts to the top of the stack 
            for immediate retrieval.
          </p>
        </div>

        {user?.role === 'admin' && (
          <div className={`${styles.moduleCard} ${styles.adminCard}`}>
            <h3>⚠️ Admin Console</h3>
            <p>
              ROOT ACCESS GRANTED. Authorization to DELETE records and MODIFY 
              existing database entries. Proceed with caution.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;