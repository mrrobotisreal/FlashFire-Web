import React, { Component } from 'react';
import Chart, { Line, Bar } from 'react-chartjs-2';

class StudyStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ['Scores'],
        datasets: [
          {
            label: 'User Stats',
            backgroundColor: 'rgba(4, 0, 0, 0.74)',
            borderColor: 'rgb(155, 3, 3)',
            data: this.props.totalScoresStudy,
          },
        ],
      }
    }
  }

  componentDidMount() {
    let labels = [];
    let totalScores = this.props.totalScoresStudy;
    for (let i = 1; i <= totalScores.length; i++) {
      labels.push(`Score ${i}`);
    }
    this.setState({
      data: {
        labels,
        datasets: [
          {
            label: 'User Study Stats',
            backgroundColor: 'rgba(2, 0, 0, 0.74)',
            borderColor: 'rgb(13, 127, 0)',
            data: this.props.totalScoresStudy,
          },
        ],
      }
    })
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

export default StudyStats;