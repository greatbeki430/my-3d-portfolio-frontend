import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import StyledStarsCanvas from "./components/canvas/Stars"; // Fix import name
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import ClientReadyServices from "./components/sections/ClientReadyServices";
import TechTimeline from "./components/sections/TechTimeline";
import BlogSection from "./components/sections/BlogSection";
import Testimonials from "./components/sections/Testimonials";
import { timelineData, testimonialsData } from "./data/constants";
import Chatbot from "./components/Chatbot";
import AdminLogin from "./components/sections/AdminLogin";
import AdminDashboard from "./components/sections/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
  z-index: 1; /* Ensure above canvas */
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  function ScrollToAnchor() {
    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        setTimeout(() => {
          const element = document.getElementById(location.hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    }, [location]);

    return null;
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Navbar />
        <Body>
          <StyledStarsCanvas />
          <ScrollToAnchor /> {/* Add this here */}
          {/* Added Routes component to define application routes */}
          <Routes>
            {/* Route for the default portfolio page */}
            <Route
              path="/"
              element={
                <div>
                  <Hero />
                  <Wrapper>
                    <Skills />
                    <Experience />
                  </Wrapper>
                  <ClientReadyServices />
                  <TechTimeline timelineData={timelineData} />
                  <Projects />
                  <Wrapper>
                    <Education />
                    <Contact />
                  </Wrapper>
                  <BlogSection />
                  <Testimonials testimonials={testimonialsData} />
                  <Footer />
                  <Chatbot />
                </div>
              }
            />
            {/* Route for the admin login page */}
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* Route for the protected admin dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
