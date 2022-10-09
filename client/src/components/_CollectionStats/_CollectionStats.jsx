import React, { useContext } from 'react';
import Chart, { Line, Bar } from 'react-chartjs-2';
import {_CollectionContextProvider, _CollectionContext} from './_CollectionContext.js';

export default function _CollectionStats() {
  const { data } = useContext(_CollectionContext);

  return (
    <_CollectionContextProvider>
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
    </_CollectionContextProvider>
  );
};
