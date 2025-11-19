// Ce composant est utilisé pour afficher une tâche.

import styles from './TaskItem.module.css';

export const TaskItem = ({task, deleteTask, toggleTask, editTask}) => {
  return <li className={`${styles.container} ${task?.isDone ? styles.success : styles.default}`}
  onClick={() => toggleTask(task.id)}>
    
    <div className={styles.item}>
      <span className={`${styles.id} ${task?.isDone ? styles.idSuccess : styles.idDefault}`}>{task.id}</span>
      <span className={`${styles.content} ${task?.isDone ? styles.contentSuccess : styles.contentDefault}`}>{task.content}</span>
    </div>
    <button onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} className={styles.deleteButton}>X</button>
  </li>;
};
