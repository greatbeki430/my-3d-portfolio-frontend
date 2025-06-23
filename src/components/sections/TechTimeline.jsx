import React from "react";
import styled from "styled-components";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaGraduationCap, FaBriefcase, FaCertificate } from "react-icons/fa";

const Container = styled.div`
  padding: 60px 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin-bottom: 20px;
`;

const TechTimeline = ({ timelineData }) => {
  // timelineData is array of objects with: { type: 'education'|'work'|'certification', title, subtitle, date, description }

  return (
    <Container id="Journey">
      <Title>My Tech Journey</Title>
      <VerticalTimeline>
        {timelineData.map((item, i) => {
          let icon = <FaBriefcase />;
          let bgColor = "#6c63ff";

          if (item.type === "education") icon = <FaGraduationCap />;
          else if (item.type === "certification") icon = <FaCertificate />;

          return (
            <VerticalTimelineElement
              key={i}
              className={`vertical-timeline-element--${item.type}`}
              date={item.date}
              iconStyle={{ background: bgColor, color: "#fff" }}
              icon={icon}
            >
              <h3 className="vertical-timeline-element-title">{item.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">
                {item.subtitle}
              </h4>
              <p>{item.description}</p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </Container>
  );
};

export default TechTimeline;
