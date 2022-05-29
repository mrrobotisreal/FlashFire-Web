// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// // eslint-disable-next-line
// import Chart, { Bar } from 'react-chartjs-2';

// export default function Stats(props) {
//   const { totalScores } = props;
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     const labels = ['Current Streak', 'Problems Authored', 'Problems Submitted'];
//     const data = {
//       labels,
//       datasets: [
//         {
//           label: 'User Stats',
//           backgroundColor: 'rgba(39, 245, 63, 0.74)',
//           borderColor: 'rgb(218, 165, 32)',
//           data: [7, 3, 12],
//         },
//       ],
//     };
//     setUserData(data);
//   }, [props]);

//   return (
//     <Bar
//       options={{
//         plugins: {
//           legend: {
//             display: false,
//           },
//         },
//       }}
//       data={userData}
//     />
//   );
// }







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
            borderColor: 'rgb(255, 255, 0)',
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