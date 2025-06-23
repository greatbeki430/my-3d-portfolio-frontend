import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 60px 30px;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.primary};
  transition: transform 0.3s ease;
  cursor: default;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.primary};
`;

const ServiceDesc = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
`;

const ClientReadyServices = () => {
  const services = [
    {
      title: "💻 Web Development",
      description:
        "Building modern, responsive, SEO-friendly websites using React, Next.js, and Node.js.",
    },
    {
      title: "📱 Mobile App Prototypes",
      description:
        "Creating interactive mobile prototypes with React Native and Figma.",
    },
    {
      title: "⚙️ API Integration",
      description:
        "Connecting your systems with RESTful APIs, Firebase, or GraphQL.",
    },
    {
      title: "🛠️ Freelance & Remote Support",
      description: "Available for short-term and long-term freelance projects.",
    },
  ];

  return (
    <Container id="Services">
      <Title>Client-Ready Services</Title>
      <Grid>
        {services.map((service, i) => (
          <Card key={i}>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDesc>{service.description}</ServiceDesc>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientReadyServices;
