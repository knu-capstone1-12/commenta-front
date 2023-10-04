import React from 'react';
import {StyleSheet} from 'react-native';
import {VStack} from '@gluestack-ui/themed';
import Calendar from '../components/Calendar';

const Home = () => {
  return (
    <VStack style={styles.vStackStyle}>
      <Calendar onDateClick={date => console.log(date)} />
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
