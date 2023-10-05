import React from 'react';
import {StyleSheet} from 'react-native';
import {VStack} from '@gluestack-ui/themed';
import Calendar from '../components/Calendar';
import Graph from '../components/Graph';
import {ScrollView} from '@gluestack-ui/themed';

const Home = () => {
  return (
    <ScrollView>
      <VStack style={styles.vStackStyle}>
        <Calendar onDateClick={date => console.log(date)} />
        <Graph />
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vStackStyle: {
    width: '100%',
    maxWidth: 400,
  },
});

export default Home;
