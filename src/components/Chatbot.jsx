import React, { useState } from "react";
import styled from "styled-components";
import { FiMessageSquare, FiX } from "react-icons/fi"; // For chat and close icons

// Floating Button to toggle chatbot visibility
const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.primary || "#6a0dad"};
  color: white;
  border: none;
  border-radius: 50%;
  padding: 14px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  max-height: 400px;
  background-color: ${({ theme }) => theme.card || "#1e1e2f"};
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 12px;
  background: ${({ theme }) => theme.primary || "#6a0dad"};
  color: white;
  font-weight: bold;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 8px;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 12px;
  background: ${({ theme }) => theme.bgLight || "#2c2c3e"};
  overflow-y: auto;
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  margin-bottom: 8px;
`;

const MessageBubble = styled.div`
  background-color: ${({ isUser }) => (isUser ? "#5a4ad1" : "#333e52")};
  color: #fff;
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 70%;
  font-size: 14px;
  word-wrap: break-word;
  border-bottom-right-radius: ${({ isUser }) => (isUser ? "0px" : "16px")};
  border-bottom-left-radius: ${({ isUser }) => (isUser ? "16px" : "0px")};
`;

const InputContainer = styled.div`
  display: flex;
  border-top: 1px solid #444;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  background: ${({ theme }) => theme.bg || "#20202f"};
  color: ${({ theme }) => theme.text_primary || "#fff"};
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.primary || "#6a0dad"};
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // toggle chatbot open/close
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulate bot reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          text: "Thanks for your message! I’ll get back to you soon.",
          sender: "bot",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMessageSquare />}
      </FloatingButton>

      {isOpen && (
        <ChatbotContainer>
          <ChatHeader>
            Assistant
            <CloseButton onClick={() => setIsOpen(false)}>
              <FiX />
            </CloseButton>
          </ChatHeader>
          <ChatBody>
            {messages.map((msg, index) => (
              <MessageWrapper key={index} isUser={msg.sender === "user"}>
                <MessageBubble isUser={msg.sender === "user"}>
                  {msg.text}
                </MessageBubble>
              </MessageWrapper>
            ))}
          </ChatBody>
          <InputContainer>
            <ChatInput
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <SendButton onClick={handleSend}>Send</SendButton>
          </InputContainer>
        </ChatbotContainer>
      )}
    </>
  );
};

export default Chatbot;
