import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#AF19FF'];

const MatchChart = ({ data }) => {
  return (
    <div>
      <h4>Role Match %</h4>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="matchPercentage"
          nameKey="role"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default MatchChart;
