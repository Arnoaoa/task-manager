// Ce composant est utilisé pour afficher une tâche.

import styles from './TaskItem.module.css';
import { useState } from 'react';

export const TaskItem = ({task, deleteTask, toggleTask, editTask}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveTask(task.id);
    }
    if (e.key === 'Escape') {
      cancelEdit(task.id);
    }
  };

  const handleSaveTask = () => {
    //e.stopPropagation();
    if (editedContent.trim() === '') {
      return;
    }
    editTask(task.id, editedContent);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedContent(task.content);
    setIsEditing(false);
  };

  return <li className={`${styles.container} ${task?.isDone ? styles.success : styles.default}`}
  onClick={() =>!isEditing && toggleTask(task.id)}>
    
    <div className={styles.item}>
      <span className={`${styles.id} ${task?.isDone ? styles.idSuccess : styles.idDefault}`}>{task.id}</span>
      {isEditing ? (
        <input
          type="text"
          className={styles.editInput}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className={`${styles.content} ${task?.isDone ? styles.contentSuccess : styles.contentDefault}`}>{task.content}</span>
      )}
    </div>
    {isEditing ? (
      <div className={styles.buttonGroup}>
        <button onClick={(e) => { e.stopPropagation(); handleSaveTask();}} className={styles.saveButton}>Save</button>
        <button onClick={(e) => { e.stopPropagation(); cancelEdit(); }} className={styles.cancelButton}>Cancel</button>
      </div>


    ) : (
    <div className={styles.buttonGroup}>
    <button onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing); }} className={styles.editButton}>Edit</button>
    <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className={styles.deleteButton}>X</button>
    </div>
    )}
    
  </li>;
};
