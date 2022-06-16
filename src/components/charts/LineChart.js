import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; // не удалять
import { useState, useEffect } from 'react';
import axios from 'axios';
import { dbLink } from '../../firebase/firebase';
import useMediaQuery from '@mui/material/useMediaQuery';

const LineChart = () => {
   const [labels, setLabel] = useState([]);
   const [data, setData] = useState([]);
   const isMedia = useMediaQuery('(max-width: 425px)');

   useEffect(() => {
      axios.get(`${dbLink}/online.json`).then((res) => {
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
            backgroundColor: '#36265A',
            borderColor: '#9D50FF',
            fill: true,
            borderWidth: 4,
            hoverBorderWidth: 4,
            pointBorderColor: '#9D50FF',
            pointBackgroundColor: '#fff',
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
      lableTextColor: {
         color: 'green',
      },
   };

   console.log(isMedia)

   return (
      <>
         <Line
            className="stats-page__chart__canvas"
            data={userData}
            type="line"
            options={options}
            height={isMedia ? 100 : 43}
         />
      </>
   );
};

export default LineChart;
