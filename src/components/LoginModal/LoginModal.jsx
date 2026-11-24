import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleClose() {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
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

  const isFormValid =
    email.trim() !== "" &&
    password.length >= 6 &&
    !emailError &&
    !passwordError;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    onLogin({ email, password });
    setEmail("");
    setPassword("");
  }

  return (
    <ModalWithForm
      title="Sign in"
      name="login"
      buttonText="Sign in"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      switchText="Sign up"
      onSwitchClick={() => {
        handleClose();
        onSwitchToRegister();
      }}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
      </label>
      <input
        id="login-email"
        type="email"
        className="modal__input"
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <span className="modal__error">{emailError}</span>

      <label className="modal__label" htmlFor="login-password">
        Password
      </label>
      <input
        id="login-password"
        type="password"
        className="modal__input"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
        minLength={6}
        required
      />
      <span className="modal__error">{passwordError}</span>
    </ModalWithForm>
  );
}

export default LoginModal;
