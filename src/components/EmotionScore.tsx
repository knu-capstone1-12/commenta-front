import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  score: number;
}
const EmotionScore = ({score}: Props) => {
  const scoreToPercent = (scoreToConvert: number) => {
    return (scoreToConvert + 3) * (1 / 6);
  };
  const formatPositiveNumber = (scoreToConvert: number) => {
    if (scoreToConvert > 0) {
      return `+${scoreToConvert}`;
    } else {
      return `${scoreToConvert}`;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.title}>오늘의 감정점수</Text>
        <Text style={styles.score}>{formatPositiveNumber(score)}</Text>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.barScoreContainer}>
          <Text>-3</Text>
          <Text>0</Text>
          <Text>+3</Text>
        </View>
        <View style={styles.barBody}>
          <View
            style={[styles.barIndicator, {width: 220 * scoreToPercent(score)}]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    width: 220,
    alignItems: 'center',
    alignSelf: 'center',
  },
  scoreContainer: {
    gap: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  barContainer: {
    gap: 5,
  },
  barScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barBody: {
    position: 'relative',
    borderRadius: 2.5,
    backgroundColor: '#E4EAF0',
    width: 220,
    height: 5,
  },
  barIndicator: {
    position: 'relative',
    borderRadius: 2.5,
    backgroundColor: '#04E762',
    height: 5,
  },
});

export default EmotionScore;
