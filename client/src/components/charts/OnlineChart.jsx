import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // не удалять
import { useState, useEffect } from 'react';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';

import { dbLink } from '../../config';

const OnlineChart = ({ server }) => {
   const [labels, setLabel] = useState([]);
   const [data, setData] = useState([]);
   const isMedia = useMediaQuery('(max-width: 425px)');

   useEffect(() => {
      axios.get(`${dbLink}/online/${server}.json`).then((res) => {
         const date = [];
         const online = [];
         for (let key in res.data) {
            date.push(res.data[key].date);
            online.push(res.data[key].onlinePlayers);
         }
         setLabel(date);
         setData(online);
      });
   }, []);

   const userData = {
      labels: labels,
      datasets: [
         {
            label: 'Онлайн',
            data: data,
            backgroundColor: 'rgba(255, 122, 0, 0.23)',
            borderColor: '#FF8A00',
            pointBorderColor: '#FF8A00',
            pointBackgroundColor: '#fff',
            fill: true,
            borderWidth: 4,
            hoverBorderWidth: 4,
            radius: 0,
            hoverRadius: 7,
            tension: 0.5,
         },
      ],
   };

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
   };

   return (
      <>
         <Line
            className="graphic__chart__canvas"
            data={userData}
            type="line"
            options={options}
            height={isMedia ? 43 : 101}
            style={{ borderRadius: '0 0 20px 30px' }}
         />
      </>
   );
};

export default OnlineChart;
