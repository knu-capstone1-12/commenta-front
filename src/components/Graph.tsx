import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from '@gluestack-ui/themed';
import {Q} from '@nozbe/watermelondb';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import Sentiment from 'model/Sentiment';
import {formatDateToNumber} from 'util/dateUtil';
import {useSelectedDate} from 'contexts/SelectedDateContext';

const screenWidth = Dimensions.get('window').width;

const Graph = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  const {
    data: {selectedDate},
  } = useSelectedDate();

  const database = useDatabase();

  useEffect(() => {
    const fetchData = async () => {
      const dayMonthStart = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1,
        0,
        0,
        0,
      );
      const dayMonthEnd = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0,
        0,
        0,
        0,
      );
      const fetchedSentiments = await database
        .get<Sentiment>('sentiments')
        .query(
          Q.and(
            Q.where('date', Q.gte(formatDateToNumber(dayMonthStart))),
            Q.where('date', Q.lte(formatDateToNumber(dayMonthEnd))),
          ),
        );
      setLabels([]);
      setDataPoints([]);
      fetchedSentiments.map(sentiment => {
        const sentimentDate = new Date(sentiment.date);
        setLabels(prev => [
          ...prev,
          `${sentimentDate.getMonth() + 1}/${sentimentDate.getDate()}`,
        ]);
        setDataPoints(prev => [...prev, sentiment.score]);
      });
    };
    fetchData();
  }, [database, selectedDate]);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['감정 점수'],
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
    <ScrollView horizontal width={screenWidth} minHeight={220}>
      {dataPoints.length ? (
        <LineChart
          data={data}
          height={220}
          width={35 * 31}
          chartConfig={chartConfig}
        />
      ) : (
        <View style={style.textContainer}>
          <Text style={style.noDataText}>아직 감정 데이터가 없어요!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  textContainer: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Graph;
