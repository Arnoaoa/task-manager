// Ce composant est utilisé pour afficher le champ de saisie de tâche.
import { useState } from 'react';
import styles from './TaskInput.module.css';

export const TaskInput = ({ addTask }) => {

  const [task, setTask] = useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') {setTask(''); return;} {/*si le champ est vide, on ne fait rien*/}
    addTask(task);
    setTask('');
  };

  return <div className={`box ${styles.element}`}>
    <h2 className={styles.title}>Add a new task</h2>
    <form className={styles.container} onSubmit={handleSubmit}> {/*onSubmit car button of type submit dans le form*/}
      <input type="text"
      placeholder="Enter a new task" className={styles.input} value={task} onChange={handleChange} />
      <button type="submit" className="button-primary">
        Add
      </button>
    </form>
  </div>;
};
/*place holder doit avoir value = task pour se remettre à zéro après la soumission*/
