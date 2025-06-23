import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const AnalyticsPanel = () => {
  const [stats, setStats] = useState({
    totalMessages: 0,
    lastWeekMessages: 0,
    messagesPerDay: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await axios.get("/api/analytics", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setStats(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h3>Analytics Dashboard</h3>
      <AnalyticsGrid>
        <StatCard>
          <h4>Total Messages</h4>
          <p>{stats.totalMessages}</p>
        </StatCard>
        <StatCard>
          <h4>Last Week</h4>
          <p>{stats.lastWeekMessages}</p>
        </StatCard>
        {/* Simple list instead of PieChart for now */}
        <StatCard>
          <h4>Messages Per Day</h4>
          <ul>
            {stats.messagesPerDay?.map(day => (
              <li key={day._id}>
                {day._id}: {day.count}
              </li>
            ))}
          </ul>
        </StatCard>
      </AnalyticsGrid>
    </div>
  );
};

export default AnalyticsPanel;
