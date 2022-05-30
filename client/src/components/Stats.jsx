import React, { Component } from 'react';
import Chart, { Line, Bar } from 'react-chartjs-2';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ['Scores'],
        datasets: [
          {
            label: 'User Stats',
            backgroundColor: 'rgba(255, 255, 255, 0.74)',
            borderColor: 'rgb(155, 3, 3)',
            data: this.props.totalScores,
          },
        ],
      }
    }
  }

  componentDidMount() {
    let labels = [];
    let totalScores = this.props.totalScores;
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
            borderColor: 'rgb(255, 0, 0)',
            data: this.props.totalScores,
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

export default Stats;