import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState } from 'react';

const LineChart = () => {
  const data = [];

  for (let i = 0; i < 60; i++) {
    const date = i < 10 ? `09:0${i}` : `09:${i}`;
    data.push(date);
  }

  const data2 = [];
  let prev = 100;
  for (let i = 0; i < data.length; i++) {
    prev += 5 - Math.floor(Math.random() * 10);
    data2.push(prev);
  }

  const [userData, setUserData] = useState({
    labels: data,
    datasets: [
      {
        label: 'Онлайн',
        data: data2,
        backgroundColor: '#103867',
        borderColor: '#2562FF',
        fill: true,
        borderWidth: 4,
        hoverBorderWidth: 4,
        pointBorderColor: '#2562FF',
        pointBackgroundColor: '#fff',
        radius: 0,
        hoverRadius: 7,
        tension: 0.5,
      },
    ],
  });

  // options

  const options = {
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: false,
      tooltip: {
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },

      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    lableTextColor: {
      color: 'green',
    },
  };

  return (
    <>
      <Line
        className="stats-page__chart__canvas"
        data={userData}
        type="line"
        options={options}
        height={43}
      />
    </>
  );
};

export default LineChart;
