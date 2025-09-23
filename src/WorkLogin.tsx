import React, { useState } from "react";
import './assets/css/WorkLogin.css';

const WorkLogin: React.FC = () => {
  const [events, setEvents] = useState([
    { id: 1, name: "Wedding Reception", date: "2025-01-15", status: "Pending" },
    { id: 2, name: "Corporate Meeting", date: "2025-02-05", status: "Confirmed" },
    { id: 3, name: "Birthday Party", date: "2025-03-12", status: "Completed" },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, task: "Prepare event checklist", completed: false },
    { id: 2, task: "Coordinate with catering team", completed: false },
    { id: 3, task: "Send invitations", completed: true },
  ]);

  const handleTaskToggle = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="worklogin-dashboard-container">
      <div className="worklogin-sidebar">
        <h2 className="worklogin-logo">WorkLogin Dashboard</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Events</li>
            <li>Tasks</li>
            <li>Messages</li>
            <li>Profile</li>
          </ul>
        </nav>
      </div>
      <div className="worklogin-main-content">
        <div className="worklogin-events-section">
          <h3>Upcoming Events</h3>
          <div className="worklogin-events-list">
            {events.map(event => (
              <div className={`worklogin-event-card ${event.status.toLowerCase()}`} key={event.id}>
                <h4>{event.name}</h4>
                <p>Date: {event.date}</p>
                <p>Status: {event.status}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="worklogin-tasks-section">
          <h3>Pending Tasks</h3>
          <ul className="worklogin-task-list">
            {tasks.map(task => (
              <li key={task.id} className={task.completed ? "completed" : ""}>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleTaskToggle(task.id)} 
                />
                {task.task}
              </li>
            ))}
          </ul>
        </div>

        <div className="worklogin-profile-section">
          <h3>Staff Profile</h3>
          <div className="worklogin-profile-details">
            <img src="https://via.placeholder.com/100" alt="Profile" className="worklogin-profile-img" />
            <p>Name: John Doe</p>
            <p>Email: johndoe@example.com</p>
            <button className="worklogin-btn">Update Profile</button>
          </div>
        </div>

        <div className="worklogin-messages-section">
          <h3>Messages</h3>
          <div className="worklogin-message-card">
            <p><strong>John Doe:</strong> "Reminder: The meeting starts at 9 AM."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkLogin;
