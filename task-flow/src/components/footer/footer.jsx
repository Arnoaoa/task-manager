/* eslint-disable react/no-unescaped-entities */
// Ce composant est utilisé pour afficher le champ de saisie de tâche.
import styles from './Footer.module.css';
export const Footer = ({ incompleteTasks, completedTasks }) => {
  if (completedTasks > 0) {
  return <footer>
    <div className={styles.footer}>
    You have completed {completedTasks} task{completedTasks > 1 ? 's' : ''} with TaskFlow
    </div>
  </footer>;}
  else { return <></>}
};
