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

  componentDidMount() {
    // let labels = [];
    // let totalScores = this.props.totalScores;
    // for (let i = 1; i <= totalScores.length; i++) {
    //   labels.push(`Score ${i}`);
    // }
    // this.setState({
    //   data: {
    //     labels,
    //     datasets: [
    //       {
    //         label: 'User Stats',
    //         backgroundColor: 'rgba(2, 0, 0, 0.74)',
    //         borderColor: 'rgb(13, 127, 0)',
    //         data: this.props.totalScores,
    //       },
    //     ],
    //   }
    // })
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