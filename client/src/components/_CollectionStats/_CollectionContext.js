import React, { createContext, useState, useContext } from 'react';
import _MainMenuContext from '../_MainMenu/_MainMenuContext.js';

export const _CollectionContext = createContext(null);

export function _CollectionContextProvider({ children }) {
  const [data, setData] = useState({
    labels: ['Study Scores', 'Test Grades (Easy)', 'Test Grades (Difficult)'],
    datasets: [
      {
        label: 'User Stats1',
        backgroundColor: 'rgba(4, 0, 0, 0.74)',
        borderColor: 'rgb(155, 3, 3)',
        data: totalScoresStudy,
      },
      {
        label: 'User Stats2',
        backgroundColor: 'rgba(4, 0, 0, 0.74)',
        borderColor: 'rgb(0, 124, 12)',
        data: totalScoresEasy,
      },
      {
        label: 'User Stats3',
        backgroundColor: 'rgba(4, 0, 0, 0.74)',
        borderColor: 'rgb(0, 33, 178)',
        data: totalScoresDifficult,
      },
    ],
  });

  const { totalScoresStudy, totalScoresEasy, totalScoresDifficult } = useContext(_MainMenuContext);

  const value = {
    data,
    setData
  };

  return (
    <_CollectionContext.Provider value={value}>
      {children}
    </_CollectionContext.Provider>
  );
};