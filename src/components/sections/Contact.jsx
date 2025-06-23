import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 20px 20px 60px #1f2634;
    filter: brightness(1);
  }

  @media (max-width: 640px) {
    padding: 12px 0;
    font-size: 16px;
  }
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const Dialog = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  max-width: 400px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DialogMessage = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

const DialogButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
`;

const Contact = () => {
  // const form = useRef();
  const [formValues, setFormValues] = useState({
    from_email: "",
    from_name: "",
    subject: "",
    message: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Form submission triggered");
    console.log("Form submitted");
    setIsDialogOpen(true);
    setIsLoading(true);
    setDialogMessage("Sending message...");

    try {
      const response = await axios.post(
        "https://my-3d-portfolio-backend.onrender.com",
        formValues,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", response.data);
      setDialogMessage(response.data.message || "Message sent successfully!");
      // Optional: clear form after submit
      setFormValues({
        from_email: "",
        from_name: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log("Error:", error.response?.data?.error || error.message);
      setDialogMessage(error.response?.data?.error || "Error sending message, An email already exists!");
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsDialogOpen(false), 3000);
    }
  };
  
  

  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc style={{ marginBottom: "40px" }}>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput
            placeholder="Your Email"
            name="from_email"
            value={formValues.from_email}
            onChange={e =>
              setFormValues({ ...formValues, from_email: e.target.value })
            }
          />
          <ContactInput
            placeholder="Your Name"
            name="from_name"
            value={formValues.from_name}
            onChange={e =>
              setFormValues({ ...formValues, from_name: e.target.value })
            }
          />
          <ContactInput
            placeholder="Subject"
            name="subject"
            value={formValues.subject}
            onChange={e =>
              setFormValues({ ...formValues, subject: e.target.value })
            }
          />
          <ContactInputMessage
            placeholder="Message"
            name="message"
            rows={4}
            value={formValues.message}
            onChange={e =>
              setFormValues({ ...formValues, message: e.target.value })
            }
          />
          <ContactButton type="submit" value="Send" disabled={isLoading} />
        </ContactForm>
      </Wrapper>
      {isDialogOpen && (
        <DialogOverlay onClick={() => {if (!isLoading) setIsDialogOpen(false)}}>
          <Dialog onClick={e => e.stopPropagation()}>
            <DialogMessage>{dialogMessage}</DialogMessage>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <DialogButton onClick={() => setIsDialogOpen(false)}>
                Close
              </DialogButton>
            )}
          </Dialog>
        </DialogOverlay>
      )}
      {/* console.log("Dialog Open:", isDialogOpen, "Message:", dialogMessage); */}
    </Container>
  );
};

export default Contact;
