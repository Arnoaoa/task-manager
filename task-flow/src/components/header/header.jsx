// Ce composant est utilisé pour afficher l'en-tête de l'application.
import styles from './Header.module.css';
import logo_B from '../../assets/logo_figure.svg';
import logo_B_txt from '../../assets/logo_text.svg';
import { useState } from 'react';


export const Header = ({ user, addUser, logOutUser, tasks }) => {

  const [username, setUsername] = useState('');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      setUsername('');
      return; // Si le champ est vide, on ne fait rien
    }
    addUser(username);
    setUsername('');
  };


  const userLayout = (user) => {
    if (user.length > 0) {
      return <div className = {styles.containerSmallForm}>
        <div>Hello, {user[0].username}!</div>
        <button type="button" className="button-primary" onClick={() => logOutUser(tasks)}>Log out</button>
      </div>
    } else {
      return <form className={styles.containerSmallForm} onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" className={styles.input} value={username} onChange={handleChange} />
        <button type="submit" className="button-primary">Log in</button>
      </form>
    }
  };
  
  return <div className={styles.container}>
    <div className={styles.titleContainer}>
      <h1>TaskFlow</h1>
      <code className="color-gray"> Optimization task manager</code>
      {userLayout(user)}
      
    </div>
    <div className={styles.rightSection}>
      <div className={styles['App-logo-container']}>
        <img className={styles['App-logo-figure']} src={logo_B} alt="Blockedex" />
        <img className={styles['App-logo-text']} src={logo_B_txt} alt="Blockedex" />
      </div>
      
    </div>
  </div>;

};
