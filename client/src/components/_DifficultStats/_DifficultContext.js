import React, { createContext, useContext, useState, useEffect } from 'react';
import _MainMenuContext from '../_MainMenu/_MainMenuContext.js';

export const _DifficultContext = createContext(null);

export function _DifficultContextProvider({ children }) {
  const [data, setData] = useState({
    labels: ['Scores'],
    datasets: [
      {
        label: 'User Stats',
        backgroundColor: 'rgba(4, 0, 0, 0.74)',
        borderColor: 'rgb(155, 3, 3)',
        data: this.props.totalScoresDifficult,
      },
    ],
  });

  const { totalScoresDifficult } = useContext(_MainMenuContext);

  const value = {
    data
  };

  useEffect(() => {
    let labels = [];
    let totalScores = totalScoresDifficult;
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
            data: totalScoresDifficult,
          },
        ],
      }
    })
  }, []);

  return (
    <_DifficultContext.Provider value={value}>
      {children}
    </_DifficultContext.Provider>
  );
};