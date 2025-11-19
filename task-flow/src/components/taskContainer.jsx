// Ce composant est utilisé pour afficher l'intégralité de la fonctionalité de Tache.
import { useState } from 'react';
import { useEffect } from 'react';
import { Header } from './header/header';
import { TaskInput } from './taskInput/taskInput';
import { TaskList } from './taskList/taskList';
import { Footer } from './footer/footer';
export const TaskContainer = () => {

  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedUser = localStorage.getItem('user');
  
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      const username = userData[0].username;
      const userTasks = localStorage.getItem(username);
      if (userTasks) {
        const prevTasks = JSON.parse(userTasks);
        setTasks(prevTasks);
        return;
      }
      if (savedTasks){
        setTasks(JSON.parse(savedTasks));
        return;
      }
    }

  }, []);

  const addUser = (username) => {
    const newUser = {
      id: 0,
      username: username,
};
    const updatedUser = [newUser];
    
    setUser(updatedUser);
    
    saveUserToLocalStorage(updatedUser);

    
    const nameKey = localStorage.getItem(username)
    console.log(username,'username');
    console.log(nameKey,'nameKey');
    if (nameKey) {
      const prevTasks = JSON.parse(nameKey);
      setTasks(prevTasks);}
  };


  const logOutUser = (TasksLogOut) => {
    saveTasksPerUser(TasksLogOut);
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
    setUser([]);
    localStorage.removeItem('tasks');
    setTasks([]);
    
  };

  
  const saveTasksPerUser = (updatedTasks) => {
    const name = user[0].username;
    console.log(localStorage.getItem(name),'name');
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name);
      localStorage.setItem(name, JSON.stringify(updatedTasks));
      console.log(localStorage.getItem(name),'updatedTasks');
      
    }
    else {
      localStorage.setItem(name, JSON.stringify(updatedTasks));
      
    }
  };

  const saveUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };


  const addTask = (task) => {
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      content: task,
      isDone: false,//a
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    saveTasksPerUser(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    saveTasksPerUser(updatedTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, isDone: !task.isDone } : task);
    setTasks(updatedTasks);
    console.log(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    saveTasksPerUser(updatedTasks);
    
  };

  const editTask = (id, content) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, content: content } : task));
  };

  const clearTasks = () => {
    setTasks([]);
    saveTasksToLocalStorage([]);
    saveTasksPerUser([]);
  };

  const incompleteTasks = tasks.filter(task => !task.isDone).length;

  const completedTasks = tasks.length - incompleteTasks;

  return <main>
    <Header user={user} addUser={addUser} logOutUser={logOutUser} tasks={tasks}/>
    <TaskInput addTask={addTask} />
    <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} editTask={editTask} incompleteTasks={incompleteTasks} completedTasks={completedTasks} clearTasks={clearTasks} />
    <Footer incompleteTasks={incompleteTasks} completedTasks={completedTasks} />
  </main>;

};

//pas de export default donc il doit etre importé dynamiquement dans le App.jsx