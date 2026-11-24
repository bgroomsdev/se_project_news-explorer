import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  function handleClose() {
    setEmail("");
    setPassword("");
    setName("");
    setEmailError("");
    setPasswordError("");
    setNameError("");
    onClose();
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEmailError(e.target.validity.valid ? "" : "Invalid email address");
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordError(
      e.target.value.length >= 6
        ? ""
        : "Password must be at least 6 characters",
    );
  }

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(
      e.target.value.trim().length >= 2
        ? ""
        : "Username must be at least 2 characters",
    );
  }

  const isFormValid =
    email.trim() !== "" &&
    password.length >= 6 &&
    name.trim().length >= 2 &&
    !emailError &&
    !passwordError &&
    !nameError;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    onRegister({ email, password, name: name.trim() });
    setEmail("");
    setPassword("");
    setName("");
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      switchText="Sign in"
      onSwitchClick={() => {
        handleClose();
        onSwitchToLogin();
      }}
    >
      <label className="modal__label" htmlFor="register-email">
        Email
      </label>
      <input
        id="register-email"
        type="email"
        className="modal__input"
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <span className="modal__error">{emailError}</span>

      <label className="modal__label" htmlFor="register-password">
        Password
      </label>
      <input
        id="register-password"
        type="password"
        className="modal__input"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
        minLength={6}
        required
      />
      <span className="modal__error">{passwordError}</span>

      <label className="modal__label" htmlFor="register-name">
        Username
      </label>
      <input
        id="register-name"
        type="text"
        className="modal__input"
        placeholder="Enter your username"
        value={name}
        onChange={handleNameChange}
        minLength={2}
        required
      />
      <span className="modal__error">{nameError}</span>
    </ModalWithForm>
  );
}

export default RegisterModal;
