import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "../styles/admindash.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInteractions: 0,
    userActivity: [],
  });

  useEffect(() => {
    // Simulated API call (Replace with actual API later)
    const fetchData = async () => {
      const mockData = {
        totalUsers: 1000,
        totalInteractions: 450,
        userActivity: [
          { date: "Mon", interactions: 0 },
          { date: "Tue", interactions: 45 },
          { date: "Wed", interactions: 120 },
          { date: "Thu", interactions: 45 },
          { date: "Fri", interactions: 0 },
        ],
      };
      setStats(mockData);
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats-container">
        <div className="stat-box">
          <h2>Total Users</h2>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-box">
          <h2>Total Interactions</h2>
          <p>{stats.totalInteractions}</p>
        </div>
      </div>

      <div className="chart-container">
        <h2>User Engagement</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.userActivity}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="interactions" stroke="#ff7300" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
