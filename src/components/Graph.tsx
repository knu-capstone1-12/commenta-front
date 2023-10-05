import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import {ScrollView} from '@gluestack-ui/themed';

const generateRandomData = (days: number) => {
  const labels = [];
  const dataPoints = [];

  for (let i = 1; i <= days; i++) {
    labels.push(`1/${i}`);
    dataPoints.push(Math.floor(Math.random() * 100));
  }

  return {labels, dataPoints};
};

const Graph = () => {
  const screenWidth = Dimensions.get('window').width;
  const {labels, dataPoints} = generateRandomData(30);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Rainy Days'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255,0,0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <ScrollView horizontal width={screenWidth}>
      <LineChart
        data={data}
        height={220}
        width={35 * 31}
        chartConfig={chartConfig}
      />
    </ScrollView>
  );
};

export default Graph;
