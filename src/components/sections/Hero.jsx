import React, { useState } from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/HeroBg.JPG";
import HeroBgAnimation from "../HeroBgAnimation";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import StarCanvas from "../canvas/Stars";

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 75% 95%, 0 100%);
  @media (max-width: 960px) {
    padding: 66px 16px;
  }
  @media (max-width: 640px) {
    padding: 32px 16px;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;
  @media (max-width: 960px) {
    order: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  @media (max-width: 640px) {
    margin-bottom: 5px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 35px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 50px;
  margin-bottom: 10px;

  @media (max-width: 960px) {
    align-items: center;
    font-size: 25px;
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 5px;
    align-items: center;
    text-align: center;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 23px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 50px;
  @media (max-width: 960px) {
    align-items: center;
  }
  @media (max-width: 640px) {
    font-size: 15px;
    line-height: 32px;
    margin-bottom: 16px;
  }
`;

const Span = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.text_primary + 95};
  @media (max-width: 960px) {
    align-items: center;
  }
  @media (max-width: 640px) {
    font-size: 15px;
    line-height: 32px;
  }
`;

const ResumeButton = styled.button`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  width: 95%;
  max-width: 300px;
  text-align: center;
  padding: 16px 0;
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
  box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #1f2634;
  border-radius: 50px;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  border: none;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 20px 20px 60px #1f2634;
    filter: brightness(1);
  }

  @media (max-width: 640px) {
    padding: 12px 0;
    font-size: 18px;
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
  z-index: 1000;
`;

const Dialog = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  max-width: 400px;
  width: 90%;
`;

const DialogButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }

  @media (max-width: 640px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  max-width: 400px;
  max-height: 400px;
  border: 2px solid ${({ theme }) => theme.primary};
  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  justify-content: end;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

const Hero = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResumeClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogAction = action => {
    setIsLoading(true);
    const resumeUrl = Bio.resume;
    if (!resumeUrl) {
      console.error("Resume URL not found in Bio");
      setIsLoading(false);
      setIsDialogOpen(false);
      return;
    }

    // Track the click with Google Analytics
    if (window.gtag) {
      window.gtag("event", "resume_action", {
        event_category: "engagement",
        event_label:
          action === "download" ? "resume_download" : "resume_preview",
      });
    } else {
      console.log("Google Analytics not loaded");
    }

    try {
      if (action === "download") {
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.download = "Gezahegn_Bekele_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (action === "preview") {
        window.open(resumeUrl, "_blank");
      }
    } catch (error) {
      console.error("Failed to handle resume action:", error);
      // Fallback: Open in new tab if URL is valid
      if (resumeUrl) window.open(resumeUrl, "_blank");
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div id="About">
      <HeroContainer>
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>
        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Title>
                  I am <br /> {Bio.name}
                </Title>
                <TextLoop>
                  I am a
                  <Span>
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>
              <motion.div {...headContentAnimation}>
                <SubTitle>{Bio.description}</SubTitle>
              </motion.div>
              <ResumeButton onClick={handleResumeClick} disabled={isLoading}>
                {isLoading ? "Loading..." : "Check Resume"}
              </ResumeButton>
            </HeroLeftContainer>
            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <Tilt>
                  <Img src={HeroImg} alt="Gezahegn Bekele" />
                </Tilt>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>

      {isDialogOpen && (
        <DialogOverlay onClick={() => setIsDialogOpen(false)}>
          <Dialog onClick={e => e.stopPropagation()}>
            <h2>Resume Options</h2>
            <p>Would you like to download or preview the resume?</p>
            <DialogButton onClick={() => handleDialogAction("download")}>
              Download
            </DialogButton>
            <DialogButton onClick={() => handleDialogAction("preview")}>
              Preview
            </DialogButton>
            <DialogButton onClick={() => setIsDialogOpen(false)}>
              Cancel
            </DialogButton>
          </Dialog>
        </DialogOverlay>
      )}
    </div>
  );
};

export default Hero;
