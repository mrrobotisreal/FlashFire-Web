import React, { useContext } from 'react';
import Chart, { Line, Bar } from 'react-chartjs-2';
import { _EasyContext, _EasyContextProvider } from './_EasyContext.js';

export default function _EasyStats() {
  const { data } = useContext(_EasyContext);
  return (
    <_EasyContextProvider>
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
    </_EasyContextProvider>
  );
};
