import React from "react";
import styled from "styled-components";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
`;
const Image = styled.img`
  height: 50px;
  border-radius: 10px;
  margin-top: 4px;
  object-fit: cover;
  width: 50px;

  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const School = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
const Degree = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
// const Date = styled.div`
//   font-size: 12px;
//   font-weight: 400;
//   color: ${({ theme }) => theme.text_secondary};

//   @media only screen and (max-width: 768px) {
//     font-size: 12px;
//   }
// `;
const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 10px;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Span = styled.div`
  display: -webkit-box;
  max-width: 100%;
`;
const Thesis = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Certification = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const CertificationItem = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99}; // Fixed from +99

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const EducationCard = ({ education }) => {
  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={education?.school}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={education?.img}
        />
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "#1d1836",
        color: "#ffffff",
        boxShadow: "rgba(23,92,230,0.15) 0px 4px 24px",
        backgroundColor: "rgba(17,25,40,0.83)",
        border: "1px solid rgba(255,255,255,0.125)",
        borderRadius: "6px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(255,255,255,0.3)",
      }}
      date={education?.date}
      dateClassName="custom-date" // Custom class for date styling
    >
      <Top>
        <Image src={education?.img} alt={education?.company} />
        <Body>
          <School>{education?.school}</School>
          <Degree>{education?.degree}</Degree>
          {/* Removed Date component to avoid duplication */}
          {/* <Date>{education?.date}</Date> */}
        </Body>
      </Top>
      <Thesis>
        <b>Thesis:   </b>
        {education?.thesis}
      </Thesis>
      <Description>
        {education?.desc && <Span>{education?.desc}</Span>}
      </Description>
      <Certification>
        <b>Certifications: </b>
        <ItemWrapper>
          {education?.certifications.map((cert, index) => (
            <CertificationItem key={index}>• {cert.name}</CertificationItem>
          ))}
        </ItemWrapper>
      </Certification>
    </VerticalTimelineElement>
  );
};

export default EducationCard;
