// frontend/src/components/ContactModal.jsx
import React from "react";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  color: #333;
`;

const ContactModal = ({ onClose }) => {
  const handleSubmit = e => {
    e.preventDefault();
    // Add form submission logic (e.g., send to backend or email service)
    alert("Form submitted! (Add backend logic here)");
    onClose();
  };

  return (
    <Modal>
      <ModalContent>
        <h2>Contact Gezagn</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <textarea
            placeholder="Message"
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button type="submit">Send</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            Close
          </button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ContactModal;
