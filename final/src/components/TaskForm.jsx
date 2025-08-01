import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// ✅ 1. Use .env instead of hardcoded URL
// Create a .env file at the root of your project with:
// VITE_BACKEND_URL=http://localhost:5000
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const TaskForm = ({ selectedDate }) => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // ✅ 2. Fetch tasks for the selected date from /api/tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];

      // ✅ Changed URL to /api/tasks and added query params
      const res = await axios.get(`${BACKEND_URL}/api/tasks`, {
        params: { date: dateStr }, // ?date=YYYY-MM-DD
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ✅ 3. Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = {
        title: title.trim(),
        date: selectedDate.toISOString().split('T')[0],
        completed: false,
      };

      // ✅ Changed URL to /api/tasks
      await axios.post(`${BACKEND_URL}/api/tasks`, newTask);

      setTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // ✅ 4. Delete a task using MongoDB `_id`
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to remove this task?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // ✅ 5. Toggle completion status using `_id`
  const toggleComplete = async (task) => {
    try {
      await axios.put(`${BACKEND_URL}/api/tasks/${task._id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating completion status:', error);
    }
  };

  // ✅ 6. Edit task title
  const handleEditSave = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/tasks/${id}`, {
        title: editTitle,
      });
      setEditingId(null);
      setEditTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      {/* Task Input Form */}
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="task-button">Add</button>
      </form>

      {/* Task List */}
      <div className="task-list">
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            // ✅ Changed `task.id` to `task._id` for MongoDB
            <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />

              {editingId === task._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={() => handleEditSave(task._id)}>Save</button>
                </>
              ) : (
                <>
                  <span>{task.title}</span>
                  <button onClick={() => {
                    setEditingId(task._id);
                    setEditTitle(task.title);
                  }}>Edit</button>
                  <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No tasks for this day.</p>
        )}
      </div>
    </div>
  );
};

export default TaskForm;

