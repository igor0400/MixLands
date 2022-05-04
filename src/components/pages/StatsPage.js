import { useEffect, useState } from 'react';
import LineChart from '../charts/LineChart';

const StatsPage = () => {
  return (
    <div className="stats-page">
      <div className="stats-page__chart">
        <div className="stats-page__chart__info">
          <h1>Hello</h1>
        </div>
        <div style={{ width: '1001.5px' }}>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
