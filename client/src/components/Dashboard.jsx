import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  ComposedChart,
  Line,
  BarChart, // Import BarChart from recharts
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [statistics2, setStatistics2] = useState(null);
  const [employes, setEmployes] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [fiches1, setFiches1] = useState(0);
  const [validators, setValidators] = useState(0);
  const [vnettoyage, setVnettoyage] = useState(0);
  const [vpese, setVpese] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard")
      .then((res) => {
        if (res.data.ok) {
          setEmployes(res.data.employe);
          setAdmin(res.data.admin);
          setFiches1(res.data.fiche1);
          setValidators(res.data.validator);
          setVnettoyage(res.data.vnettoyage);
          setVpese(res.data.vpese); // Set vpese state
          setStatistics([
            { name: "Admins", value: res.data.admin },
            { name: "Employees", value: res.data.employe },
            { name: "Validators", value: res.data.validator },
          ]);
          setStatistics2([
            { name: "Documents de Pese", vpese: res.data.vpese }, // Set vpese data
            { name: "Documents de Nettoyage", vnettoyage: res.data.vnettoyage }, // Set vnettoyage data
          ]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    const total = statistics.reduce((acc, entry) => acc + entry.value, 0);
    const percentage = `${((statistics[index].value / total) * 100).toFixed(
      0
    )}%`;

    const xOffset = 50;
    const yOffset = 25;

    const labelX =
      cx + (outerRadius + xOffset) * Math.cos(-midAngle * (Math.PI / 180));
    const labelY =
      cy + (outerRadius + yOffset) * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <>
        <text
          x={labelX}
          y={labelY}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={16}
        >
          {statistics[index].name}
        </text>
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={16}
        >
          {percentage}
        </text>
      </>
    );
  };

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <div className="dash-container">
            <div className="dash-left">
              <div className="dashboard">
                <div className="dashboard-box">
                  <h2>Total Fiches</h2>
                  <h2>{fiches1}</h2>
                </div>
                <div className="dashboard-box">
                  <h2>Total Employes</h2>
                  <h2>{employes}</h2>
                </div>
                <div className="dashboard-box">
                  <h2>Total Validators</h2>
                  <h2>{validators}</h2>
                </div>
                <div className="dashboard-box">
                  <h2>Total vnettoyage</h2>
                  <h2>{vnettoyage}</h2>
                </div>
                <div className="dashboard-box">
                  <h2>Total vnettoyage</h2>
                  <h2>{vpese}</h2>
                </div>
                <div className="dashboard-box">
                  <h2>Total Admins</h2>
                  <h2>{admin}</h2>
                </div>
              </div>
            </div>
            <div className="dash-center">
              <div className="stat-page">
                <h2>Statistique :</h2>
                <div className="com-chart">
                  <h3>Documents de Pese, Documents de Nettoyage</h3>
                  {statistics2 && (
                    <ResponsiveContainer width="100%" height={540}>
                      <ComposedChart data={statistics2}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="vpese" barSize={20} fill="#413ea0" />
                        <Bar dataKey="vnettoyage" barSize={20} fill="#82ca9d" />
                        <Line
                          type="monotone"
                          dataKey="vpese"
                          stroke="#ff7300"
                        />
                        <Line
                          type="monotone"
                          dataKey="vnettoyage"
                          stroke="#ffc658"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
            <div className="dash-right">
              <div className="stat-page">
                <h2>Statistique :</h2>
                {statistics && (
                  <div>
                    <h3>Admins, Employees, et Validateurs</h3>
                    <div className="pie-chart">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={statistics}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label={renderCustomizedLabel}
                          >
                            {statistics.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  index === 0
                                    ? "#82ca9d"
                                    : index === 1
                                    ? "#ffc658"
                                    : "#ff7300"
                                }
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bar-chart">
                      <ResponsiveContainer width="90%" height={320}>
                        <BarChart data={statistics}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
