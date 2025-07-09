import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/User?email=${user.email}&password=${user.password}`
      );
      const users = response.data;

      if (users.length > 0) {
        alert("Login Successful!");
        localStorage.setItem("user", JSON.stringify(users[0]));
        navigate("/home");
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  background: {
    minHeight: "100vh",
   background: "linear-gradient(135deg,rgb(212, 199, 235),rgb(212, 220, 226))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "fadeIn 0.8s ease-in-out",
  },
  container: {
    width: "100%",
    maxWidth: "420px",
    padding: "40px 30px",
    background: "rgba(255, 255, 255, 0.85)",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    animation: "slideUp 0.7s ease-out",
  },
  title: {
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#2c3e50",
    letterSpacing: "1px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px 15px",
    margin: "12px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#fdfdfd",
  },
  button: {
    padding: "12px",
    background: "#4A90E2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s ease",
    marginTop: "18px",
  },
};

// 💡 Put these in your global CSS file (e.g., index.css)
/*
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
*/

export default Login;
