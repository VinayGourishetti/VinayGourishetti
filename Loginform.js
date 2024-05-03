import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";

function ErrorAlert({ message }) {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/api-v2/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.ok) {
        setLoginAttempts(0);
        alert("Login successful");
        navigate("/User");
        // Send email notification for successful login
        sendEmailNotification("login_success", email);
      } else {
        setLoginAttempts(loginAttempts + 1);
        setError("Invalid email or password");
        alert("Login failed");
        setShowValidationAlert(true);
        if (loginAttempts >= 4) {
          setError(
            "Too many failed login attempts. Your account will be blocked for 1 hour."
          );
          // Set remaining time for account unblock
          const unblockTime = new Date();
          unblockTime.setHours(unblockTime.getHours() + 1);
          const currentTime = new Date();
          const timeDifference = unblockTime.getTime() - currentTime.getTime();
          setRemainingTime(timeDifference);
        }
        // Send email notification for failed login
        sendEmailNotification("login_failure", email);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setShowValidationAlert(true);
      setError("An error occurred during login");
    }
  };

  // Function to send email notification
  const sendEmailNotification = async (type, email) => {
    try {
      const response = await axios.post(`http://localhost`, {
        type,
        email,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  };

  useEffect(() => {
    let intervalId;
    if (remainingTime !== null && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (remainingTime === 0) {
      clearInterval(intervalId);
      setRemainingTime(null);
    }
    return () => clearInterval(intervalId);
  }, [remainingTime]);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ height: "40rem", borderColor: 'lightblue' }}>
        <div className="row g-0">
          <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ marginTop: '6rem' }}>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Left side image"
              className="img-fluid"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center" style={{ marginTop: '7rem' }}>
            <form
              className="p-4 bg-light rounded"
              onSubmit={handleSubmit(onSubmit)}
              style={{ maxWidth: "80%" }}
            >
              <h3 className="text-center mb-4">LoginForm</h3>
              {errors.identifier && (
                <div className="mb-3 text-danger">{errors.identifier.message}</div>
              )}
              <div className="mb-3 input-group">
                <input
                  type="text"
                  className={`form-control form-control-md ${errors.identifier ? "is-invalid" : ""
                    }`}
                   // Update the email state
                  placeholder="Enter Email"
                  {...register("identifier", {
                    required: "Email  is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters long",
                    },
                  })}
                  style={{ maxWidth: "150%" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />


                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
              </div>
              {errors.password && (
                <div className="mb-3 text-danger">{errors.password.message}</div>
              )}
              <div className="mb-3 input-group">
                <input
                  type="password"
                  className={`form-control form-control-md ${errors.password ? "is-invalid" : ""
                    }`}
                 
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  style={{ maxWidth: "100%" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}  // Increase the width here
                />
                <span className="input-group-text">
                  <i className="bi bi-lock-fill"></i>
                </span>
              </div>
              {showValidationAlert && <ErrorAlert message={error} />}
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Login
              </button>
              {remainingTime && (
                <div className="text-center mt-3">
                  Account blocked. Try again in:{" "}
                  {new Date(remainingTime).toISOString().substr(11, 8)}
                </div>
              )}
              <div className="text-center mt-3">
                <p className="dark">
                  Don't have an account? <br />
                </p>
                <Link to="#" className="link-primary">
                  Register
                </Link>
              </div>
              <div className="text-center mt-3">
                <Link
                  to="/forgotpassword"
                  className="link-primary"
                >
                  Reset Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
