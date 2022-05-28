import React, {useState, useEffect} from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
)

export default function BarChart() {

  const [charts, setCharts] = useState({});
  const [six, setSix] = useState({});
  const [four, setFour] = useState({});

  const getTotal = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/total");
      const jsonData = await response.json();

      setCharts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSix = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/total/six");
      const jsonData = await response.json();

      setSix(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getFour = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/total/four");
      const jsonData = await response.json();

      setFour(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  var data ={
    labels: [''],
    datasets: [{
      label: 'Students all',
      data: [charts],
      backgroundColor: [
        'rgba(191, 64, 191, 0.2)'
      ],
      borderColor: [
        'rgba(191, 64, 191, 1)'
      ],
      borderWidth: 1
    },
    {label: 'Students on 4 Months',
      data: [four],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    },
    {label: 'Students on 6 Months',
      data: [six],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    },
  ],
  }

  useEffect(() => {
    getTotal();
    getSix();
    getFour();
  }, []);

  var options = {
    maintainAspectRadio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    tooltip: {
      mode: 'index'
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: true
      },
      title: {
        display: true,
        text: 'Charts of students'
      }
    }
  }

  return (
    <div>
      <Bar
        data={data}
        height={100}
        options={options}
      />
    </div>
  )
}
