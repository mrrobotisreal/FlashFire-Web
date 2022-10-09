import React, { useContext, useEffect } from 'react';
import Chart, { Line, Bar } from 'react-chartjs-2';
import _DifficultContext from './_DifficultContext.js';

export default function _DifficultStats() {

  const { data } = useContext(_DifficultContext);

  return (
    <Line
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={data}
    />
  );
};
