import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: 60px auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin-bottom: 30px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PostCard = styled.div`
  padding: 20px;
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 1px solid ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
`;

const PostTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.primary};
`;

const PostExcerpt = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
`;

const BlogSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from backend API or CMS endpoint
    fetch("/api/blogposts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => {
        // fallback demo posts
        setPosts([
          {
            id: 1,
            title: "How I Built a Real-Time Ambulance Booking App",
            excerpt: "A technical deep dive into the architecture and challenges of my ambulance app project.",
          },
          {
            id: 2,
            title: "Top 5 Tips to Write Clean React Code",
            excerpt: "Best practices I follow for maintainable, scalable React applications.",
          },
        ]);
      });
  }, []);

  return (
    <Container id="Articles">
      <Title>Technical Articles & Blog</Title>
      <PostList>
        {posts.map(post => (
          <PostCard
            key={post.id}
            onClick={() => window.open(`/blog/${post.id}`, "_blank")}
          >
            <PostTitle>{post.title}</PostTitle>
            <PostExcerpt>{post.excerpt}</PostExcerpt>
          </PostCard>
        ))}
      </PostList>
    </Container>
  );
};

export default BlogSection;
