import React, { Component } from 'react';
import Chart, { Line, Bar } from 'react-chartjs-2';

class CollectionStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ['Study Scores', 'Test Grades (Easy)', 'Test Grades (Difficult)'],
        datasets: [
          {
            label: 'User Stats1',
            backgroundColor: 'rgba(4, 0, 0, 0.74)',
            borderColor: 'rgb(155, 3, 3)',
            data: this.props.totalScoresStudy,
          },
          {
            label: 'User Stats2',
            backgroundColor: 'rgba(4, 0, 0, 0.74)',
            borderColor: 'rgb(0, 124, 12)',
            data: this.props.totalScoresEasy,
          },
          {
            label: 'User Stats3',
            backgroundColor: 'rgba(4, 0, 0, 0.74)',
            borderColor: 'rgb(0, 33, 178)',
            data: this.props.totalScoresDifficult,
          },
        ],
      }
    }
  }

  render() {
    return (
      <Line
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={this.state.data}
      />
    )
  }
}

export default CollectionStats;