import React from 'react'
import {Line} from 'react-chartjs-2';





export default ({data}) => {

  const options = {
  
      scales: {
          yAxes: [{
              ticks: {
                  suggestedMin: 0,
                  suggestedMax: 12
              }
          }],
          xAxes: [{
            ticks: {
                suggestedMin: 0,
                suggestedMax: 12
            }
        }]
      }
  
  }
  const gData = (data) => (
    {
      labels: Array(data.length).fill().map((x,i)=>i),
      datasets: [
        {
          label: 'My Streaks',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data
        }
      ]
    }
  )
  console.log(`Plotting`, data)
  return (
    <Line 
    
    width="100px"
    height="100px"
    data={gData(data)} options={ options}/>
  )
}
