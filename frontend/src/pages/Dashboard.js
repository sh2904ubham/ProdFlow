import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/tasks', { title, description });
      setTasks([data, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const update = async (id, status) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, { status });
      setTasks(tasks.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name}</p>
      <form onSubmit={create}>
        <div>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Add Task</button>
      </form>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={() => remove(task._id)} onUpdate={(s) => update(task._id, s)} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
