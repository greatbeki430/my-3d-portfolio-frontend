import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MessageInbox from "./MessageInbox"; // Changed from named import to default
import AnalyticsPanel from "./AnalyticsPanel"; // Changed from named import to default

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
`;

const AdminNav = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AdminButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <AdminContainer>
      <h1>Admin Dashboard</h1>
      <AdminNav>
        <AdminButton onClick={() => setActiveTab("messages")}>
          Messages
        </AdminButton>
        <AdminButton onClick={() => setActiveTab("analytics")}>
          Analytics
        </AdminButton>
        <AdminButton onClick={() => setActiveTab("content")}>
          Content
        </AdminButton>
        <AdminButton onClick={handleLogout} style={{ marginLeft: "auto" }}>
          Logout
        </AdminButton>
      </AdminNav>

      {activeTab === "messages" && <MessageInbox />}
      {activeTab === "analytics" && <AnalyticsPanel />}
      {activeTab === "content" && <div>Content Management Coming Soon</div>}
    </AdminContainer>
  );
};

export default AdminDashboard;
