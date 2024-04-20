import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Stat = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/dashboard')
      .then(res => {
        if (res.data.ok) {
          setStatistics([
            { name: "Documents de Pese", vpese: res.data.vpese, vnettoyage: res.data.vnettoyage }
          ]);
        }
      }).catch(err => console.log(err));
  }, []);

  return (
    <div className="stat-page">
      <h2>Statistics</h2>
      {statistics.length > 0 && (
        <ResponsiveContainer width="90%" height={400}>
          <ComposedChart data={statistics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vpese" barSize={20} fill="#413ea0" />
            <Bar dataKey="vnettoyage" barSize={20} fill="#82ca9d" />
            <Line type="monotone" dataKey="vpese" stroke="#ff7300" />
            <Line type="monotone" dataKey="vnettoyage" stroke="#ffc658" />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Stat;
