import React, { Component } from 'react';
import Chart, { Line } from 'react-chartjs-2';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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
        data={this.props.totalScores}
      />
    )
  }
}

export default Stats;