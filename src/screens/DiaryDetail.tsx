import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {VStack} from '@gluestack-ui/themed';
import {RootStackParamList} from 'types/navigation';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import Diary from 'model/Diary';
import {Q} from '@nozbe/watermelondb';
import {formatDateToYYMMDD} from 'util/dateUtil';
import EmotionScore from 'components/EmotionScore';

const Profile = () => {
  const {
    params: {id},
  } = useRoute<RouteProp<RootStackParamList, 'DiaryDetail'>>();

  const [selectedDateEntry, setSelectedDateEntry] = useState<Diary>();

  const database = useDatabase();

  useEffect(() => {
    const fetchDiary = async () => {
      const fetchedDiary = await database
        .get<Diary>('diaries')
        .query(Q.where('date', Q.eq(formatDateToYYMMDD(new Date(id)))));
      setSelectedDateEntry(fetchedDiary[0]);
    };
    fetchDiary();
  }, [database, id]);

  return selectedDateEntry ? (
    <VStack gap={20}>
      <View style={style.diaryTitleWrapper}>
        <Text style={style.diaryTitle}>{selectedDateEntry.title}</Text>
      </View>
      <View style={style.emotionResultSection}>
        <Text style={style.componentTitle}>음성일기 감정분석 결과</Text>
        <EmotionScore score={1.3} />
      </View>
      <View style={style.divider} />
      <View style={style.emotionResultSection}>
        <Text style={style.componentTitle}>음성일기 음성인식 결과 (STT)</Text>
        <ScrollView style={style.STTTextWrapper}>
          <Text>{selectedDateEntry.content}</Text>
        </ScrollView>
      </View>
    </VStack>
  ) : (
    <Text>No diary in this date</Text>
  );
};

const style = StyleSheet.create({
  diaryTitleWrapper: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaryTitle: {
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  componentTitle: {
    fontFamily: 'S-Core Dream',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
  },
  emotionResultSection: {
    gap: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#DBDBDB',
  },
  dummyBox: {
    width: 326,
    height: 230,
    backgroundColor: 'red',
  },
  STTSection: {
    flex: 1,
    gap: 30,
  },
  STTTextWrapper: {
    height: Dimensions.get('window').height - 500,
  },
});

export default Profile;
