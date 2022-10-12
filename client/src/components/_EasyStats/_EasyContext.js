import React, { createContext, useContext, useState, useEffect } from 'react';
import _MainMenuContext from '../_MainMenuContext/_MainMenuContext.js';

export const _EasyContext = createContext(null);

export function _EasyContextProvider({ children }) {
  const [data, setData] = useState({
    labels: ['Scores'],
    datasets: [
      {
        label: 'User Stats',
        backgroundColor: 'rgba(4, 0, 0, 0.74)',
        borderColor: 'rgb(155, 3, 3)',
        data: totalScoresEasy,
      },
    ],
  });

  const { totalScoresEasy } = useContext(_MainMenuContext);

  useEffect(() => {
    let labels = [];
    let totalScores = totalScoresEasy;
    for (let i = 1; i <= totalScores.length; i++) {
      labels.push(`Score ${i}`);
    }
    this.setState({
      data: {
        labels,
        datasets: [
          {
            label: 'User Stats',
            backgroundColor: 'rgba(2, 0, 0, 0.74)',
            borderColor: 'rgb(13, 127, 0)',
            data: totalScoresEasy,
          },
        ],
      }
    })
  }, []);

  const value = {
    data,
    setData
  };

  return (
    <_EasyContext.Provider value={value}>
      {children}
    </_EasyContext.Provider>
  );
};