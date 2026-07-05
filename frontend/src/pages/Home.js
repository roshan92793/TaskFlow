import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handelSuccess } from "../utils";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("token");

    if (!token || !user) {
      navigate("/login");
    } else {
      setLoggedInUser(user);
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedInUser) {
      const savedTodos = localStorage.getItem(
        `todos_${loggedInUser}`
      );
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem(
        `todos_${loggedInUser}`,
        JSON.stringify(todos)
      );
    }
  }, 
  [todos, loggedInUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    handelSuccess("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const addTodo = () => {
    if (!task.trim()) return;

    if (editingId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId
            ? { ...todo, text: task }
            : todo
        )
      );
      setEditingId(null);
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: task,
          completed: false,
        },
      ]);
    }

    setTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (todo) => {
    setTask(todo.text);
    setEditingId(todo.id);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const completedTasks = todos.filter(
    (todo) => todo.completed
  ).length;

  const pendingTasks = todos.length - completedTasks;

  const progress =
    todos.length === 0
      ? 0
      : Math.round(
          (completedTasks / todos.length) * 100
        );

  return (
    <div className="dashboard-container">
      <div className="bg-decor-container">
        <div className="auth-circle1"></div>
        <div className="auth-circle2"></div>
      </div>
      <div className="dashboard-card">
        <div className="dashboard-navbar">
          <h1 className="dashboard-logo">To-Do Dashboard</h1>

          <div className="dashboard-nav-right">
            <span>
              Welcome,{" "}
              <span className="dashboard-username">
                {loggedInUser}
              </span>
            </span>

            <button
              onClick={handleLogout}
              className="dashboard-logout-btn"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">
              {todos.length}
            </div>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <div className="stat-number">
              {completedTasks}
            </div>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <div className="stat-number">
              {pendingTasks}
            </div>
            <p>Pending</p>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <h3>Completion Progress</h3>
            <span className="progress-percentage">{progress}% Completed</span>
          </div>

          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="todo-input-container">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
            className="todo-input"
          />

          <button
            onClick={addTodo}
            className="todo-add-btn"
          >
            {editingId ? "Update" : "Add Task"}
          </button>
        </div>

        <div className="todo-list-wrapper">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="todo-card"
            >
              <div className="todo-card-left">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    toggleComplete(todo.id)
                  }
                  className="todo-checkbox"
                />

                <span
                  className={`todo-text ${todo.completed ? "completed" : ""}`}
                >
                  {todo.text}
                </span>
              </div>

              <div className="todo-actions">
                <button
                  className="todo-edit-btn"
                  onClick={() =>
                    editTodo(todo)
                  }
                >
                  Edit
                </button>

                <button
                  className="todo-delete-btn"
                  onClick={() =>
                    deleteTodo(todo.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-footer">
          <h3>Task Summary</h3>

          <p>
            Total Tasks: {todos.length} | Completed:{" "}
            {completedTasks} | Pending:{" "}
            {pendingTasks}
          </p>

          <p>
            Productivity Score:{" "}
            <strong>{progress}%</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;