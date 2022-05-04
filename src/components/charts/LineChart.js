import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState } from 'react';

const LineChart = () => {
  const data = [
    '09:00',
    '09:01',
    '09:02',
    '09:03',
    '09:04',
    '09:05',
    '09:06',
    '09:07',
    '09:08',
    '09:09',
    '09:10',
    '09:11',
    '09:12',
    '09:13',
    '09:14',
    '09:15',
    '09:16',
    '09:17',
    '09:18',
    '09:19',
    '09:20',
    '09:21',
    '09:22',
    '09:23',
    '09:24',
    '09:25',
    '09:26',
    '09:27',
  ];
  const data2 = [];
  let prev = 100;
  for (let i = 0; i < 28; i++) {
    prev += 5 - Math.random() * 10;
    data2.push({ x: i, y: prev });
  }

  console.log(data);
  console.log(data2);

  const [userData, setUserData] = useState({
    labels: data,
    datasets: [
      {
        label: '',
        data: data2,
        backgroundColor: [
          'rgba(255, 168, 0, 0.31)',
          '#F7D002',
          '#FFE156',
          '#F8F272',
        ],
        borderColor: '#FFA800',
        fill: true,
        borderWidth: 4,
        // pointBorderColor: '#fff',
        // pointBackgroundColor: '#FFA800',
        radius: 0,
        hoverRadius: 7,
        tension: 0.5,
      },
    ],
  });

  // animation
  const totalDuration = 2000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  // options

  const options = {
    animation,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: false,
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
  };

  return (
    <Line
      className="stats-page__chart__canvas"
      data={userData}
      type="line"
      options={options}
      height={60}
    />
  );
};

export default LineChart;
