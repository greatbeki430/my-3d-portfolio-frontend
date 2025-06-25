// frontend/src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  FiMessageSquare,
  FiX,
  FiTrash2,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Bio,
  projects,
  skills,
  experiences,
  education,
  testimonialsData,
} from "../data/constants";
import ContactModal from "./ContactModal";
const theme = {
  primary: "#6a0dad",
  card: "#1e1e2f",
  bgLight: "#2c2c3e",
  bg: "#20202f",
  text_primary: "#fff",
};

const ThemeProvider = styled.div`
  font-family: Arial, sans-serif;
  --primary: ${({ theme }) => theme.primary};
  --card: ${({ theme }) => theme.card};
  --bgLight: ${({ theme }) => theme.bgLight};
  --bg: ${({ theme }) => theme.bg};
  --text-primary: ${({ theme }) => theme.text_primary};
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 20%;
  padding: 14px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 101;
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    padding: 12px;
  }
`;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  top: 90px; /* Add offset to avoid navbar overlap (adjust based on navbar height) */
  width: 420px; /* Increased from 450px for more space */
  /* max-height: 80vh; */
  max-height: calc(90vh - 90px);
  /* Adjust max-height to account for top offset */
  min-height: 300px; /* Ensure minimum height for smaller screens */
  background-color: var(--card);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  z-index: 1001; /* Increase z-index to stay above navbar (100) */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Keep this to prevent container scrolling */
  @media (max-width: 768px) {
    width: 90vw;
    right: 5vw;
    bottom: 70px;
    max-height: 70vh;
    min-height: 200px;
  }

  @media (max-width: 480px) {
    width: 95vw;
    right: 2.5vw;
    max-height: 80vh;
  }
`;

const ChatHeader = styled.div`
  padding: 12px;
  background: var(--primary);
  color: white;
  font-weight: bold;
  text-align: center;
  /* position: relative; */
  position: sticky;
  top: 0; /* Stick to the top of the parent container */
  z-index: 10; /* Ensure header stays above chat body content */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Optional: subtle border */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optional: subtle shadow */
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

const ClearButton = styled.button`
  position: absolute;
  top: 6px;
  left: 8px;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 12px;
  background: var(--bgLight);
  overflow-y: auto;
  display: block; /* Ensure block flow */
  width: 100%; /* Ensure full width of container */
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  margin-bottom: 8px;
  /* width: 100%; */
`;

const MessageBubble = styled.div`
  background-color: ${({ isUser }) => (isUser ? "#5a4ad1" : "#333e52")};
  color: white;
  /* padding: 10px 14px; */
  padding: 8px 7px; /* Reduced from 10px 14px */
  border-radius: 16px;
  max-width: 85%;
  font-size: 14px;
  word-break: break-word; /* Changed to break-word for better wrapping */
  overflow-wrap: break-word;
  white-space: normal;
  hyphens: auto;
  hyphens: manual;
  border-bottom-right-radius: ${({ isUser }) => (isUser ? "0px" : "16px")};
  border-bottom-left-radius: ${({ isUser }) => (isUser ? "16px" : "0px")};
  a {
    color: #00d1ff; /* Bright cyan for high-contrast links */
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    max-width: 90%;
    padding: 6px 10px;
    font-size: 13px;
  }
`;

// const ProjectCard = styled.div`
//   background-color: #333e52;
//   color: white;
//   padding: 10px;
//   border-radius: 8px;
//   max-width: 70%;
//   margin-bottom: 8px;
//   white-space: pre-wrap; /* Preserve newlines */
//   .description {
//     word-spacing: 9999px; /* Force large gap to break lines */
//     word-break: break-all;
//   }
//   a {
//     color: #00d1ff; /* Bright cyan for high-contrast links */
//     text-decoration: none;
//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

const ProjectCard = styled.div`
  background-color: #333e52;
  color: white;
  border: 1px solid #00ff00;
  /* Temporary green border for debugging */
  /* border: 1px solid var(--primary); */
  padding: 10px;
  width: 500px; /* Increased from 450px for more space */
  border-radius: 8px;
  max-width: 85%;
  margin-bottom: 8px;
  word-break: break-word; /* Changed to break-word */
  overflow-wrap: break-word; /* Allow words to break if needed */
  white-space: normal; /* Prevent pre-formatted newlines */
  hyphens: auto;
  text-align: left;
  width: 100%;
  a {
    color: #00d1ff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    max-width: 90%;
    padding: 8px;
    font-size: 13px;
  }
`;

// const ExperienceCard = styled.div`
//   background-color: #333e52;
//   color: white;
//   padding: 10px;
//   border-radius: 8px;
//   max-width: 70%;
//   margin-bottom: 8px;
//   word-break: normal;
//   overflow-wrap: anywhere; /* Better handling of long words */
//   hyphens: auto; /* Allow hyphenation when needed */
//   text-align: left; /* Ensure consistent alignment */
//   a {
//     color: #00d1ff; /* Bright cyan for high-contrast links */
//     text-decoration: none;
//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

const ExperienceCard = styled.div`
  background-color: #333e52;
  color: white;
  border: 1px solid #00ff00; 
  /* Temporary green border for debugging */
  /* border: 1px solid var(--primary); */
  padding: 10px;
  border-radius: 8px;
  max-width: 85%;
  margin-bottom: 8px;
  word-break: break-word; /* Changed to break-word */
  overflow-wrap: break-word;
  white-space: normal;
  hyphens: auto;
  text-align: left;
  a {
    color: #00d1ff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }


`;

const SuggestionButton = styled.button`
  background: #5a4ad1;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 6px 12px;
  margin: 4px;
  cursor: pointer;
  font-size: 12px;

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 11px;
    margin: 3px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  // border-top: 1px solid #444;
  border-top: 1px solid #5a4ad1;

  @media (max-width: 480px) {
    padding: 4px;
  }
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  /* border: none; */
  border: 1px solid var(--primary); /* Add subtle border */
  border-radius: 0 0 0 14px; /* Optional: slight rounding for better look */
  outline: none;
  background: var(--bg);
  color: var(--text-primary);
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const SendButton = styled.button`
  background: var(--primary);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

const SuggestionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  background: var(--bg);

  @media (max-width: 480px) {
    padding: 4px;
  }
`;

const LanguageSelect = styled.select`
  margin: 4px;
  min-width: 120px;
  width: auto;
  background: var(--bg);
  color: var(--text-primary);
  border: 1px solid var(--primary);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
`;
const ScrollButton = styled.button`
  position: absolute;
  right: 8px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1; /* Below header buttons */
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const ScrollUpButton = styled(ScrollButton)`
  top: 48px; /* Below header */
`;

const ScrollDownButton = styled(ScrollButton)`
  bottom: 80px; /* Above input area */
`;
const TypingIndicator = styled.div`
  display: flex;
  padding: 8px 12px;

  span {
    height: 8px;
    width: 8px;
    background: var(--text-primary);
    border-radius: 50%;
    display: inline-block;
    margin: 0 2px;
    animation: bounce 1.5s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
  }
`;
const MessageContent = ({ message, setIsOpen, navigate }) => {
  if (message.type === "project") {
    return (
      <ProjectCard>
        <strong>{message.content.title}</strong>
        <p>{message.content.description}</p>
        {/* <p>
          {message.content.description.length < 50
            ? message.content.description.split(" ").join("\n")
            : message.content.description}
        </p> */}
        <p>
          <em>Tech:</em> {message.content.tags.join(", ")}
        </p>
        <a
          href={message.content.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
        {message.content.image && (
          <img
            src={message.content.image}
            alt={message.content.title}
            style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "8px" }}
          />
        )}
        <button
          onClick={e => {
            e.preventDefault();
            setIsOpen(false);
            navigate("/#projects");
            setTimeout(() => {
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          style={{
            marginTop: "8px",
            background: "var(--primary)",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          See All Projects
        </button>
      </ProjectCard>
    );
  } else if (message.type === "projects") {
    return (
      <div>
        <p>{message.content.message}</p>
        {message.content.projects.map(project => (
          <ProjectCard key={project.id}>
            <strong>{project.title}</strong>
            <p>{project.description}</p>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </ProjectCard>
        ))}
        <button
          onClick={e => {
            e.preventDefault();
            setIsOpen(false);
            navigate("/#Projects");
          }}
          style={{
            marginTop: "8px",
            background: "var(--primary)",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to Projects Page
        </button>
      </div>
    );
  } else if (message.type === "experience") {
    return (
      <ExperienceCard>
        <strong>{message.content.role}</strong>
        <p>
          {message.content.company} ({message.content.date})
        </p>
        <p>{message.content.desc}</p>
        <p>
          <em>Skills:</em> {message.content.skills.join(", ")}
        </p>
        {/* {message.content.doc && (
          <a
            href={message.content.doc}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Document
          </a>
        )} */}
      </ExperienceCard>
    );
  } else if (message.type === "experiences") {
    return (
      <div>
        <p>{message.content.message}</p>
        {message.content.experiences.map(exp => (
          <ExperienceCard key={exp.id}>
            <strong>{exp.role}</strong>
            <p>
              {exp.company} ({exp.date})
            </p>
            <p>{exp.desc}</p>
            {/* <a href={exp.doc} target="_blank" rel="noopener noreferrer">
              View Document
            </a> */}
          </ExperienceCard>
        ))}
      </div>
    );
  } else if (message.type === "list") {
    return (
      <div>
        <p>{message.content.message}</p>
        <ul>
          {message.content.items.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>
    );
  } else if (message.type === "contact") {
    return (
      <div>
        <p>{message.content.message}</p>
        {message.content.email && (
          <p>
            Email:{" "}
            <a href={`mailto:${message.content.email}`}>
              {message.content.email}
            </a>
          </p>
        )}
        {message.content.linkedin && (
          <p>
            LinkedIn:{" "}
            <a
              href={message.content.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile
            </a>
          </p>
        )}
        {message.content.github && (
          <p>
            GitHub:{" "}
            <a
              href={message.content.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile
            </a>
          </p>
        )}
        {message.content.twitter && (
          <p>
            Twitter:{" "}
            <a
              href={message.content.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile
            </a>
          </p>
        )}
        {message.content.insta && (
          <p>
            Instagram:{" "}
            <a
              href={message.content.insta}
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile
            </a>
          </p>
        )}
        {message.content.facebook && (
          <p>
            Facebook:{" "}
            <a
              href={message.content.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile
            </a>
          </p>
        )}
        <button
          onClick={e => {
            e.preventDefault();
            setIsOpen(false);
            navigate("/#Contact"); // Adjust based on your route structure
            setTimeout(() => {
              const element = document.getElementById("Contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          style={{
            marginTop: "8px",
            background: "var(--primary)",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Open Contact Form
        </button>
      </div>
    );
  } else if (message.type === "link") {
    return (
      <div>
        <p>{message.content.message}</p>
        <a href={message.content.url} target="_blank" rel="noopener noreferrer">
          {message.content.text}
        </a>
      </div>
    );
  }
  return <span>{message.text}</span>;
};

const Chatbot = () => {
  const chatBodyRef = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            text: "Welcome! I'm Gezahegn's assistant. Ask about my projects, skills, experience, or more!",
            sender: "bot",
            type: "text",
          },
        ];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState("en");
  const [showContactModal, setShowContactModal] = useState(false);
  const userId = "user_" + Math.random().toString(36).substring(2, 9);

  useEffect(() => {
    // Save messages to localStorage
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    // Auto-scroll to bottom when messages change
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
    if (window.location.hash === "#Projects") {
      const element = document.getElementById("Projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  const handleQueryResponse = query => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("project") || lowerQuery.includes("portfolio")) {
      return {
        type: "projects",
        content: {
          message: "Here are my projects:",
          projects,
        },
        sender: "bot",
      };
    } else if (projects.some(p => lowerQuery.includes(p.title.toLowerCase()))) {
      const project = projects.find(p =>
        lowerQuery.includes(p.title.toLowerCase())
      );
      return {
        type: "project",
        content: project,
        sender: "bot",
      };
    } else if (
      lowerQuery.includes("skills") ||
      lowerQuery.includes("technologies")
    ) {
      return {
        type: "list",
        content: {
          message: "My technical skills include:",
          items: skills.flatMap(category =>
            category.skills.map(skill => `${skill.name} (${category.title})`)
          ),
        },
        sender: "bot",
      };
    } else if (lowerQuery.includes("contact") || lowerQuery.includes("email")) {
      return {
        type: "contact",
        content: {
          message: "Contact me at:",
          email: Bio.email,
          linkedin: Bio.linkedin,
          github: Bio.github,
          twitter: Bio.twitter,
          insta: Bio.insta,
          facebook: Bio.facebook,
        },
        sender: "bot",
      };
    } else if (lowerQuery.includes("cv") || lowerQuery.includes("resume")) {
      return {
        type: "link",
        content: {
          message: "Download my resume:",
          url: Bio.resume,
          text: "Gezahegn's Resume",
        },
        sender: "bot",
      };
    } else if (
      lowerQuery.includes("education") ||
      lowerQuery.includes("degree")
    ) {
      return {
        type: "list",
        content: {
          message: "My education:",
          items: education.map(
            edu => `${edu.degree} from ${edu.school} (${edu.date})`
          ),
        },
        sender: "bot",
      };
    } else if (
      lowerQuery.includes("certifications") ||
      lowerQuery.includes("certificate")
    ) {
      return {
        type: "list",
        content: {
          message: "My certifications:",
          items: education[0].certifications.map(cert => cert.name),
        },
        sender: "bot",
      };
    } else if (
      lowerQuery.includes("experience") ||
      lowerQuery.includes("work")
    ) {
      return {
        type: "experiences",
        content: {
          message: "My work experience:",
          experiences,
        },
        sender: "bot",
      };
    } else if (
      experiences.some(
        exp =>
          lowerQuery.includes(exp.role.toLowerCase()) ||
          lowerQuery.includes(exp.company.toLowerCase())
      )
    ) {
      const experience = experiences.find(
        exp =>
          lowerQuery.includes(exp.role.toLowerCase()) ||
          lowerQuery.includes(exp.company.toLowerCase())
      );
      return {
        type: "experience",
        content: experience,
        sender: "bot",
      };
    } else if (
      lowerQuery.includes("testimonials") ||
      lowerQuery.includes("reviews")
    ) {
      return {
        type: "list",
        content: {
          message: "What others say about my work:",
          items: testimonialsData.map(
            test => `"${test.quote}" - ${test.author} (${test.role})`
          ),
        },
        sender: "bot",
      };
    } else if (
      lowerQuery.includes("about") ||
      lowerQuery.includes("who are you")
    ) {
      return {
        type: "text",
        text: `${Bio.description} I specialize in: ${Bio.roles.join(", ")}.`,
        sender: "bot",
      };
    } else if (lowerQuery.includes("github")) {
      return {
        type: "link",
        content: {
          message: "Check my GitHub:",
          url: Bio.github,
          text: "Gezahegn's GitHub",
        },
        sender: "bot",
      };
    } else if (lowerQuery.includes("linkedin")) {
      return {
        type: "link",
        content: {
          message: "Connect on LinkedIn:",
          url: Bio.linkedin,
          text: "Gezahegn's LinkedIn",
        },
        sender: "bot",
      };
    } else if (lowerQuery.includes("twitter")) {
      return {
        type: "link",
        content: {
          message: "Follow me on Twitter:",
          url: Bio.twitter,
          text: "Gezahegn's Twitter",
        },
        sender: "bot",
      };
    } else if (
      lowerQuery.includes("instagram") ||
      lowerQuery.includes("insta")
    ) {
      return {
        type: "link",
        content: {
          message: "Follow me on Instagram:",
          url: Bio.insta,
          text: "Gezahegn's Instagram",
        },
        sender: "bot",
      };
    } else if (lowerQuery.includes("facebook")) {
      return {
        type: "link",
        content: {
          message: "Connect on Facebook:",
          url: Bio.facebook,
          text: "Gezahegn's Facebook",
        },
        sender: "bot",
      };
    } else if (
      lowerQuery.includes("hire") ||
      lowerQuery.includes("freelance")
    ) {
      return {
        type: "contact",
        content: {
          message: "Interested in hiring? Let's connect!",
          email: Bio.email,
          linkedin: Bio.linkedin,
          github: Bio.github,
          twitter: Bio.twitter,
          insta: Bio.insta,
          facebook: Bio.facebook,
        },
        sender: "bot",
      };
    }
    return null;
  };

  const handleSend = async customInput => {
    const messageToSend = customInput || input;
    if (!messageToSend.trim()) return;

    const newMessages = [
      ...messages,
      { text: messageToSend, sender: "user", type: "text" },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const localResponse = handleQueryResponse(messageToSend);
    if (localResponse) {
      setMessages(prev => [...prev, localResponse]);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend, lang, userId }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { ...data, sender: "bot" }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { text: "Sorry, something went wrong!", sender: "bot", type: "text" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        text: "Welcome! I'm Gezahegn's assistant. Ask about my projects, skills, experience, or more!",
        sender: "bot",
        type: "text",
      },
    ]);
  };

  const suggestions = [
    "Projects",
    "Skills",
    "Experience",
    "Contact",
    "Resume",
    "Certifications",
  ];

  return (
    <ThemeProvider theme={theme}>
      <FloatingButton
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? <FiX /> : <FiMessageSquare />}
      </FloatingButton>
      {isOpen && (
        <ChatbotContainer role="dialog" aria-label="Chatbot">
          <ChatHeader>
            Gezahegn's Assistant
            <ClearButton onClick={handleClearChat} aria-label="Clear chat">
              <FiTrash2 />
            </ClearButton>
            <CloseButton onClick={() => setIsOpen(false)} aria-label="Close">
              <FiX />
            </CloseButton>
          </ChatHeader>
          <ChatBody ref={chatBodyRef}>
            {/* 1. Scroll Buttons (kept) */}
            <ScrollUpButton
              onClick={() =>
                chatBodyRef.current?.scrollTo({ top: 0, behavior: "smooth" })
              }
              aria-label="Scroll to top"
            >
              <FiArrowUp size={14} />
            </ScrollUpButton>

            <ScrollDownButton
              onClick={() =>
                chatBodyRef.current?.scrollTo({
                  top: chatBodyRef.current.scrollHeight,
                  behavior: "smooth",
                })
              }
              aria-label="Scroll to bottom"
            >
              <FiArrowDown size={14} />
            </ScrollDownButton>

            {/* 2. Messages (kept with isUser prop) */}
            {messages.map((msg, index) => (
              <MessageWrapper key={index} isUser={msg.sender === "user"}>
                <MessageBubble isUser={msg.sender === "user"}>
                  <MessageContent
                    message={msg}
                    setIsOpen={setIsOpen}
                    navigate={navigate}
                  />
                </MessageBubble>
              </MessageWrapper>
            ))}

            {/* 3. Loading Indicator (new addition) */}
            {isLoading && (
              <MessageWrapper>
                <MessageBubble>
                  <TypingIndicator>
                    <span></span>
                    <span></span>
                    <span></span>
                  </TypingIndicator>
                </MessageBubble>
              </MessageWrapper>
            )}
          </ChatBody>
          <InputContainer>
            <SuggestionsContainer>
              {suggestions.map(s => (
                <SuggestionButton key={s} onClick={() => handleSend(s)}>
                  {s}
                </SuggestionButton>
              ))}
              <LanguageSelect
                value={lang}
                onChange={e => setLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="am">Amharic</option>
                <option value="om">Afan Oromo</option>
              </LanguageSelect>
            </SuggestionsContainer>
            <div style={{ display: "flex" }}>
              <ChatInput
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                aria-label="Chat input"
              />
              <SendButton onClick={handleSend} aria-label="Send message">
                Send
              </SendButton>
            </div>
          </InputContainer>
        </ChatbotContainer>
      )}
      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}
    </ThemeProvider>
  );
};

export default Chatbot;
