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
  const API_URL = "https://gportfolio-backend.onrender.com/api";
  // Initialize state
  const [lastSubmission, setLastSubmission] = useState(
    Number(sessionStorage.getItem("lastSubmission")) || null
  );
  // Define this once at the component level
  const updateSubmissionTime = timestamp => {
    setLastSubmission(timestamp);
    sessionStorage.setItem("lastSubmission", timestamp.toString());
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Rate limiting check (30 seconds between submissions)
    const now = Date.now();
    if (lastSubmission && now - lastSubmission < 30000) {
      const secondsLeft = Math.ceil((30000 - (now - lastSubmission)) / 1000);
      setDialogMessage(
        `Please wait ${secondsLeft} more seconds before sending another message`
      );
      setIsDialogOpen(true);
      return;
    }

    // Validate form fields
    if (
      !formValues.from_email ||
      !formValues.from_name ||
      !formValues.message
    ) {
      setDialogMessage("Please fill in all required fields");
      setIsDialogOpen(true);
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.from_email)) {
      setDialogMessage("Please enter a valid email address");
      setIsDialogOpen(true);
      return;
    }

    setIsLoading(true);
    setIsDialogOpen(true);
    setDialogMessage("Sending your message...");

    try {
      // Verify API URL is configured
      // if (!process.env.REACT_APP_CONTACT_API_URL) {
      //   throw new Error("API endpoint not configured");
      // }

      const response = await axios.post(
        `${API_URL}/contact`,
        {
          from_email: formValues.from_email.trim(),
          from_name: formValues.from_name.trim(),
          subject: formValues.subject.trim() || "No subject",
          message: formValues.message.trim(),
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000, // 10 second timeout
        }
      );

      // Handle success
      setDialogMessage(
        response.data.message ||
          "Message sent successfully! I'll get back to you soon."
      );

      // Reset form and update submission time
      setFormValues({
        from_email: "",
        from_name: "",
        subject: "",
        message: "",
      });
      updateSubmissionTime(Date.now());

      console.log("Message sent successfully:", response.data);
    } catch (error) {
      let errorMessage = "Failed to send message. Please try again later.";

      if (error.response) {
        errorMessage =
          error.response.data.error || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.message.includes("timeout")) {
        errorMessage = "Request timed out. Please try again.";
      }

      setDialogMessage(errorMessage);
      console.error("Contact form error:", error);
    } finally {
      setIsLoading(false);

      // Auto-close dialog after 5 seconds
      const timer = setTimeout(() => {
        setIsDialogOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
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
            maxLength={500}
          />
          <span className="char-counter">{formValues.message.length}/500</span>
          <ContactButton type="submit" value="Send" disabled={isLoading} />
        </ContactForm>
      </Wrapper>
      {isDialogOpen && (
        <DialogOverlay
          onClick={() => {
            if (!isLoading) setIsDialogOpen(false);
          }}
        >
          <Dialog onClick={e => e.stopPropagation()}>
            <DialogMessage>{dialogMessage}</DialogMessage>

            {/* Rate limit notice - only shows when message contains "wait" */}
            {dialogMessage.includes("wait") && (
              <div
                style={{
                  fontSize: "0.8em",
                  marginTop: "8px",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                (This prevents form spamming)
              </div>
            )}

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
    </Container>
  );
};

export default Contact;
