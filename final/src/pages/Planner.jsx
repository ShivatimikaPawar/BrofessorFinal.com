import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskForm from '../components/TaskForm';
import './Planner.css';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

function Planner() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

useEffect(() => {
  fetch(`${BACKEND_URL}/api/tasks`)
    .then(res => res.json())
    .then(data => setTasks(data));
}, []);

const addTask = async (newTask) => {
  const res = await fetch(`${BACKEND_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  const data = await res.json();
  setTasks(prev => [...prev, data]);
};

const deleteTask = async (id) => {
  await fetch(`${BACKEND_URL}/api/tasks/${id}`, {
    method: "DELETE"
  });
  setTasks(prev => prev.filter(t => t.id !== id));
};


  // 🧠 Helper: get JS Date for a given weekday
  const getDateForDay = (day) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = selectedDate.getDay();
    const targetDayIndex = days.indexOf(day);
    const diff = targetDayIndex - currentDayIndex;
    const targetDate = new Date(selectedDate);
    targetDate.setDate(selectedDate.getDate() + diff);
    return targetDate;
  };

  // 🧹 Filter tasks by selected day
  const getTasksForDate = (date) => {
    const d = date.toISOString().split('T')[0]; // format: YYYY-MM-DD
    return tasks.filter(task => task.date === d);
  };

  return (
    <div className="glow-container">
        
    <Navbar />

      <div className="app-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <div className="user-info">
              <h3><span className='wizard-emoji'>🧙‍♂️</span> Todolistopia </h3>
              <p>A More Whimsical Vibe</p>
            </div>
            <nav>
              <ul>
                <li>1. 🪄 Task Scroll 
                    <h6>Your enchanted list of quests for the day. Check them off, brave warrior!</h6></li>
                <li className="active">🐿️ Nutty Tasks
                    <h6>Collect your to-dos like tiny acorns. Check them off and squirrel away success!</h6>
                </li>
                <li>🌙  Moon Calendar
                    <h6>Track cosmic deadlines, Align your tasks with lunar vibes 🌕</h6>
                </li>
                <li><span className='wizard-emoji'>🔮</span> </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="main-section">
          <div className="header-bar"><span className='wave-emoji'>📅</span> Weekly Task Dashboard</div>

          {/* Calendar & Summary */}
          <div className="top-row">
            <div className="calendar-wrapper">
              <Calendar onChange={setSelectedDate} value={selectedDate} />
            </div>
            <div className="summary-card">
              <h2>This Week's Plan</h2>
              <p>Select a date from the calendar and start adding tasks for the week.</p>
              <img src="/study-banner.jpg" alt="Planning illustration" />
            </div>
          </div>

          {/* Weekly Task Grid */}
          <div className="weekly-grid">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => {
              const date = getDateForDay(day);
              return (
                <div key={day} className="day-column">
                  <h3>{day}</h3>
                  <TaskForm
                    selectedDate={date}
                    tasks={getTasksForDate(date)}
                    onAddTask={addTask}
                    onDeleteTask={deleteTask}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    <Footer/>
    </div>
  );
}

export default Planner;