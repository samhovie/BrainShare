import React, { useState, useEffect } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  useEffect(() => {
      const errors = [];
      if (email && (!email.includes("@") || !email.includes(".")))
          errors.push("Please provide a valid email");
      if (password && password.length < 6)
          errors.push("Password must be greater than 5 characters");
      setErrors(errors);
  }, [
      email,
      password
  ]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
  }

  return (
    <div className="flex flex-col max-width ">
      <h1 style={{fontSize: '25px', paddingBottom: '10px'}}>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="flex flex-col">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
        </label>
        <label  className="flex flex-col">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />
        </label>
        <div className="flex"><button type="submit">Log In</button><button onClick={handleDemoLogin}>Demo User</button></div>
      </form>
    </div>
  );
}

export default LoginFormModal;
