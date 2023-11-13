import React from 'react';
import {StyleSheet} from 'react-native';
import {Fab, FabIcon, VStack} from '@gluestack-ui/themed';
import Calendar from 'components/Calendar';
import Graph from 'components/Graph';
import {ScrollView} from '@gluestack-ui/themed';
import MicSmIcon from '../../asset/mic-sm.svg';
import {useNavigation} from '@react-navigation/native';
import {SelectedDateProvider} from 'contexts/SelectedDateContext';

const Home = () => {
  const {navigate} = useNavigation();
  return (
    <SelectedDateProvider>
      <ScrollView>
        <VStack style={styles.vStackStyle}>
          <Calendar
            onDateClick={date =>
              navigate('DiaryDetail', {id: date.toISOString()})
            }
          />
          <Graph />
        </VStack>
        <Fab
          size="sm"
          placement="bottom right"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          onPress={() => navigate('DiaryRecord')}>
          <FabIcon as={MicSmIcon} />
        </Fab>
      </ScrollView>
    </SelectedDateProvider>
  );
};

const styles = StyleSheet.create({
  vStackStyle: {
    width: '100%',
    maxWidth: 400,
  },
});

export default Home;
