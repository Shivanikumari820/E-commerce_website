import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/User", user);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2 style={styles.title}>Create Your Account 📝</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            style={styles.input}
          />
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
          <button type="submit" style={styles.buttonPrimary}>Sign Up</button>
          <button type="button" onClick={handleLoginRedirect} style={styles.buttonSecondary}>
            Already have an account? Log in
          </button>
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
    animation: "fadeIn 1s ease-in-out",
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
    animation: "slideUp 0.8s ease-out",
  },
  title: {
    marginBottom: "25px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#2c3e50",
    letterSpacing: "0.5px",
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
  buttonPrimary: {
    padding: "12px",
    backgroundColor: "#4A90E2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s ease",
    marginTop: "16px",
  },
  buttonSecondary: {
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    marginTop: "12px",
  },
};

export default SignUp;
