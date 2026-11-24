import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.svg"; // Update with your close icon filename

function ModalWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled,
  switchText,
  onSwitchClick,
  children,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-button"
          aria-label="Close modal"
          onClick={onClose}
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <h2 className="modal__title">{title}</h2>

        {buttonText ? (
          <>
            <form
              className="modal__form"
              name={name}
              onSubmit={onSubmit}
              noValidate
            >
              {children}
              <button
                type="submit"
                className={`modal__submit-button ${
                  isSubmitDisabled ? "modal__submit-button_disabled" : ""
                }`}
                disabled={isSubmitDisabled}
              >
                {buttonText}
              </button>
            </form>

            {switchText && (
              <p className="modal__switch">
                or{" "}
                <button
                  type="button"
                  className="modal__switch-button"
                  onClick={onSwitchClick}
                >
                  {switchText}
                </button>
              </p>
            )}
          </>
        ) : (
          <button
            type="button"
            className="modal__switch-button modal__switch-button_standalone"
            onClick={onSwitchClick}
          >
            {switchText}
          </button>
        )}
      </div>
    </div>
  );
}

export default ModalWithForm;
