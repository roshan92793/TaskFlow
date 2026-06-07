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

  const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background:
      "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  circle1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(56,189,248,0.25)",
    top: "-120px",
    left: "-120px",
    filter: "blur(80px)",
  },

  circle2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(34,197,94,0.2)",
    bottom: "-120px",
    right: "-120px",
    filter: "blur(90px)",
  },

  dashboard: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "25px",
    padding: "30px",
    color: "#fff",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    position: "relative",
    zIndex: 2,
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px",
  },

  logo: {
    fontSize: "32px",
    fontWeight: "bold",
    background:
      "linear-gradient(to right, #38bdf8, #22c55e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    color: "#fff",
    fontWeight: "600",
  },

  userName: {
    color: "#22c55e",
    fontWeight: "bold",
  },

  logoutBtn: {
    background:
      "linear-gradient(135deg,#ff416c,#ff4b2b)",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    color: "#fff",
  },

  statNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  progressSection: {
    marginBottom: "30px",
    color: "#fff",
  },

  progressBar: {
    height: "20px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "20px",
    overflow: "hidden",
    marginTop: "10px",
  },

  progressFill: {
    height: "100%",
    background:
      "linear-gradient(90deg,#22c55e,#38bdf8)",
    transition: "0.4s",
  },

  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    minWidth: "250px",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    outline: "none",
    fontSize: "16px",
  },

  addButton: {
    padding: "15px 25px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    background:
      "linear-gradient(135deg,#22c55e,#38bdf8)",
    color: "#fff",
  },

  todoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  todoCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    padding: "15px",
    borderRadius: "15px",
    flexWrap: "wrap",
    gap: "10px",
    color: "#fff",
  },

  todoLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  editBtn: {
    background: "#38bdf8",
    border: "none",
    color: "#fff",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  footer: {
    marginTop: "40px",
    textAlign: "center",
    borderTop: "1px solid rgba(255,255,255,0.15)",
    paddingTop: "20px",
    color: "#fff",
  },
};

  return (
    <div style={styles.container}>
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>
      <div style={styles.dashboard}>
        <div style={styles.navbar}>
          <h1 style={styles.logo}>To-Do Dashboard</h1>

          <div style={styles.navRight}>
            <span>
              Welcome,
              {" "}
              <span style={styles.userName}>
                {loggedInUser}
              </span>
            </span>

            <button
              onClick={handleLogout}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {todos.length}
            </div>
            <p>Total Tasks</p>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {completedTasks}
            </div>
            <p>Completed</p>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {pendingTasks}
            </div>
            <p>Pending</p>
          </div>
        </div>

        <div style={styles.progressSection}>
          <h3>Completion Progress</h3>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
              }}
            />
          </div>

          <p>{progress}% Completed</p>
        </div>

        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) =>
              setTask(e.target.value)
            }
            style={styles.input}
          />

          <button
            onClick={addTodo}
            style={styles.addButton}
          >
            {editingId ? "Update" : "Add Task"}
          </button>
        </div>

        <div style={styles.todoContainer}>
          {todos.map((todo) => (
            <div
              key={todo.id}
              style={styles.todoCard}
            >
              <div style={styles.todoLeft}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    toggleComplete(todo.id)
                  }
                />

                <span
                  style={{
                    textDecoration:
                      todo.completed
                        ? "line-through"
                        : "none",
                    opacity:
                      todo.completed ? 0.6 : 1,
                  }}
                >
                  {todo.text}
                </span>
              </div>

              <div style={styles.actions}>
                <button
                  style={styles.editBtn}
                  onClick={() =>
                    editTodo(todo)
                  }
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
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

        <div style={styles.footer}>
          <h3>Task Summary</h3>

          <p>
            Total Tasks: {todos.length} | Completed:
            {" "}
            {completedTasks} | Pending:
            {" "}
            {pendingTasks}
          </p>

          <p>
            Productivity Score:
            {" "}
            <strong>{progress}%</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;