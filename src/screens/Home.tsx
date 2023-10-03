import React from 'react';
import {StyleSheet} from 'react-native';
import {VStack} from '@gluestack-ui/themed';
import DiaryCalendar from '../components/DiaryCalendar';

const Home = () => {
  return (
    <VStack style={styles.vStackStyle}>
      <DiaryCalendar
        onDateClick={({day, month, year}) => console.log(day, month, year)}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  vStackStyle: {
    width: '100%',
    maxWidth: 400,
  },
});

export default Home;
