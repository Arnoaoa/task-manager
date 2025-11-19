// Ce composant est utilisé pour afficher la liste des tâches.

import styles from './TaskList.module.css';
import { TaskItem } from '../taskItem/taskItem';

export const TaskList = ({ tasks, deleteTask, toggleTask, editTask, incompleteTasks, clearTasks }) => {
  
    if (tasks.length && TaskList.length > 0) {
      return <div className={`box ${styles.listWrapper}`}>
      <div className={styles.container1}>
        <h2>{incompleteTasks > 0 ? `You have ${incompleteTasks} task${incompleteTasks > 1 ? 's' : ''} left to do` : `You have completed all your tasks! Congratulations!`}</h2>
        <button className="button-primary" onClick={(e) => { e.stopPropagation(); clearTasks(); }}>Clear All</button>
      </div>
      <ul className={styles.container}>
      {tasks.map(task => (
        <TaskItem
          key={task.id} 
          task={task} 
          deleteTask={deleteTask} 
          toggleTask={toggleTask} 
          editTask={editTask} 
        />
      ))}
      </ul>
      </div>;}
    else {
      return <div className={`box ${styles.listWrapper}`}>
      <h2 className={styles.title}>Congratulations! You don&apos;t have any tasks to do</h2>
      </div>;
    }
};
