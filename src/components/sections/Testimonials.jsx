import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  width: 100%;
  padding: 80px 0;
  background: ${({ theme }) => theme.bgLight};
  position: relative;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 24px;
  text-align: center;
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;

  .slick-slide {
    padding: 0 15px;
    box-sizing: border-box;
  }

  .slick-list {
    margin: 0 -15px;
    overflow: visible;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.primary + "50"};
  color: ${({ theme }) => theme.text_primary};
  margin: 0 15px;
  height: auto;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Quote = styled.p`
  font-style: italic;
  font-size: 18px;
  margin-bottom: 20px;
  line-height: 1.6;
  position: relative;

  &::before,
  &::after {
    content: '"';
    font-size: 32px;
    color: ${({ theme }) => theme.primary};
    opacity: 0.3;
    position: absolute;
  }

  &::before {
    top: -15px;
    left: -10px;
  }

  &::after {
    bottom: -25px;
    right: -10px;
  }
`;

const Author = styled.h4`
  font-weight: 700;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.primary};
`;

const Role = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 8px;
`;

const Testimonials = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true, // Pause on hover for better UX
    arrows: true,
    centerMode: false,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <Container id="testimonials">
      <Wrapper>
        <Title>What People Say</Title>
        <SliderContainer>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <Card>
                  <Quote>{testimonial.quote}</Quote>
                  <Author>{testimonial.author}</Author>
                  <Role>{testimonial.role}</Role>
                </Card>
              </div>
            ))}
          </Slider>
        </SliderContainer>
      </Wrapper>
    </Container>
  );
};

export default Testimonials;
