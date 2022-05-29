import React, { Component } from 'react';
import Chart, { Line } from 'react-chartjs-2';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalScores: this.props.totalScores,
    }
  }

  render() {
    return (
      <Line/>
    )
  }
}

export default Stats;