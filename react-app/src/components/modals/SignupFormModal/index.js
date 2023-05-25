import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { signUp } from "../../../store/session";
import "./SignupForm.css";
import { checkWordLength } from "../../../utils";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = {};
        if (username && username.length < 4)
            errors.name = "Username must be greater than 3 characters";
        if (username && username.length > 41)
            errors.name = "Username must be less than 41 characters";
        if (email && (!email.includes("@") || !email.includes(".")))
            errors.email = "Please provide a valid email";
        if (password && password.length < 6)
            errors.password = "Password must be greater than 5 characters";
        if (password && confirmPassword && password !== confirmPassword)
            errors.password =
                "Confirm Password field must be the same as the Password field";
        setErrors(errors);
    }, [
        email,
        username,
        password,
        confirmPassword,
        hasSubmitted,
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

		setHasSubmitted(true);

        if (password === confirmPassword) {
			setHasSubmitted(false);
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data);
            } else {
                closeModal();
            }
        } else {
            setErrors([
                "Confirm Password field must be the same as the Password field",
            ]);
        }
    };

    return (
        <div className="sign-up-container">
            <h1>Sign Up</h1>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <ul>
                    {Object.values(errors).map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button
                    type="submit"
                    disabled={
                        !username ||
                        !email ||
                        !password ||
                        !confirmPassword ||
                        errors.name ||
                        errors.password
                    }
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupFormModal;
