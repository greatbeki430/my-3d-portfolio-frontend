import React, { useState } from "react";
import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Bio } from "../data/constants";
import { MenuRounded } from "@mui/icons-material";

const Nav = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  font-size: 1rem;
  position: sticky;
  top: 0;
  color: white;

  @media screen and (max-width: 768px) {
    justify-content: flex-start;
    padding: 0 10px;
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const NavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
  font-size: 1.2rem;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
  padding: 0 6px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  list-style: none;
`;

const StyledLink = styled(ScrollLink)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + "10"};
    padding-left: 6px;
    border-radius: 4px;
  }
`;

// const DropdownContainer = styled.div`
//   position: relative;
// `;

const DropdownButton = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const DropdownList = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  background-color: ${({ theme }) => theme.card_light};
  min-width: 200px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 99;
  border-radius: 6px;
  top: 100%;
  right: 0;
  padding: 10px;
`;

const DropdownItem = styled(ScrollLink)`
  display: block;
  padding: 10px 14px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 14px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.primary + "22"};
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: none;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  list-style: none;
  padding: 12px 40px 24px 40px;
  /* background-color: ${({ theme }) => theme.card_light}; */
  background-color: ${({ theme }) => theme.bg}; // <-- change this line
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  border: 1px solid ${({ theme }) => theme.border || "#333"};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "100%" : "-100%")};
`;

const DropdownToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // const theme = useTheme();

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">Gezagn Bekele</NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        {/* Desktop Nav */}
        <NavItems>
          <NavItem>
            <StyledLink to="About" spy smooth offset={-70} duration={500}>
              About
            </StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="Skills" spy smooth offset={-70} duration={500}>
              Skills
            </StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="Experience" spy smooth offset={-70} duration={500}>
              Experience
            </StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="Projects" spy smooth offset={-70} duration={500}>
              Projects
            </StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="Education" spy smooth offset={-70} duration={500}>
              Education
            </StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="Contact" spy smooth offset={-70} duration={500}>
              Contact
            </StyledLink>
          </NavItem>

          {/* Dropdown */}
          <NavItem
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            style={{ position: "relative" }}
          >
            <DropdownButton>
              <span style={{ display: "inline", fontWeight: "500" }}>More</span>
              <span style={{ display: "inline" }}>▾</span>
            </DropdownButton>
            <DropdownList isOpen={dropdownOpen}>
              <DropdownItem
                to="Services"
                spy
                smooth
                offset={-70}
                duration={500}
                onClick={() => setDropdownOpen(false)}
              >
                Client-Ready Services
              </DropdownItem>
              <DropdownItem
                to="Journey"
                spy
                smooth
                offset={-70}
                duration={500}
                onClick={() => setDropdownOpen(false)}
              >
                My Tech Journey
              </DropdownItem>
              <DropdownItem
                to="Articles"
                spy
                smooth
                offset={-70}
                duration={500}
                onClick={() => setDropdownOpen(false)}
              >
                Technical Articles & Blog
              </DropdownItem>
              <DropdownItem
                to="Testimonials"
                spy
                smooth
                offset={-70}
                duration={500}
                onClick={() => setDropdownOpen(false)}
              >
                What People Say
              </DropdownItem>
            </DropdownList>
          </NavItem>
        </NavItems>

        {/* Mobile Menu */}
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <StyledLink
              to="About"
              spy
              smooth
              offset={-70}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              About
            </StyledLink>
            <StyledLink
              to="Skills"
              spy
              smooth
              offset={-70}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              Skills
            </StyledLink>
            <StyledLink
              to="Experience"
              spy
              smooth
              offset={-70}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              Experience
            </StyledLink>
            <StyledLink
              to="Projects"
              spy
              smooth
              offset={-70}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </StyledLink>
            <StyledLink
              to="Education"
              spy
              smooth
              offset={-70}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              Education
            </StyledLink>
            <StyledLink
              to="Contact"
              spy
              smooth
              offset={-70}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </StyledLink>

            {/* Single Mobile Dropdown Toggle */}
            <DropdownToggle
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            >
              More {isMobileDropdownOpen ? "▲" : "▼"}
            </DropdownToggle>

            {isMobileDropdownOpen && (
              <div
                style={{
                  paddingLeft: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  width: "100%",
                }}
              >
                <StyledLink
                  to="Services"
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                >
                  Client-Ready Services
                </StyledLink>
                <StyledLink
                  to="Journey"
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                >
                  My Tech Journey
                </StyledLink>
                <StyledLink
                  to="Articles"
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                >
                  Technical Articles & Blog
                </StyledLink>
                <StyledLink
                  to="Testimonials"
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                >
                  What People Say
                </StyledLink>
              </div>
            )}

            {/* Github button at bottom */}
            <GithubButton
              href={Bio.github}
              target="_blank"
              style={{ marginTop: "12px" }}
            >
              Github Profile
            </GithubButton>
          </MobileMenu>
        )}

        <ButtonContainer>
          <GithubButton href={Bio.github} target="_blank">
            Github Profile
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
