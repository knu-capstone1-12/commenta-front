import {StyleSheet, View} from 'react-native';
import {
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabelText,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from 'types/navigation';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import Diary from 'model/Diary';
import {Q} from '@nozbe/watermelondb';
import {formatDateToNumber} from 'util/dateUtil';
import {REACT_APP_API_URL} from '@env';
import Sentiment from 'model/Sentiment';

const DiaryEdit = () => {
  const {navigate} = useNavigation();
  const [title, setTitle] = useState('');
  const [mainText, setMainText] = useState('');
  const database = useDatabase();

  const {
    params: {text: passedText},
  } = useRoute<RouteProp<RootStackParamList, 'DiaryEdit'>>();

  useEffect(() => {
    setMainText(passedText);
  }, [passedText]);

  const handleNextButtonClick = async () => {
    try {
      // 현재 날짜에 해당하는 diaries 삭제
      const diariesToday = await database
        .get<Diary>('diaries')
        .query(Q.where('date', Q.eq(formatDateToNumber(new Date()))))
        .fetch();

      await database.write(async () => {
        await Promise.all(
          diariesToday.map(diary => diary.destroyPermanently()),
        );
      });

      // 새 Diary 레코드 생성
      await database.write(async () => {
        await database.get<Diary>('diaries').create(diary => {
          diary.title = title;
          diary.content = mainText;
          diary.date = formatDateToNumber(new Date());
        });
      });

      const sentimentToday = await database
        .get<Sentiment>('sentiments')
        .query(Q.where('date', Q.eq(formatDateToNumber(new Date()))))
        .fetch();

      await database.write(async () => {
        await Promise.all(
          sentimentToday.map(diary => diary.destroyPermanently()),
        );
      });

      // 감정 점수 계산 및 Sentiment 레코드 생성
      const {emotionScore: score} = await fetch(
        `${REACT_APP_API_URL}/senceemotion`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            content: mainText,
          }),
        },
      )
        .then(res => res.json() as Promise<{emotionScore: number}>)
        .catch(() => ({emotionScore: -9999}));

      await database.write(async () => {
        await database.get<Sentiment>('sentiments').create(sentiment => {
          sentiment.score = parseFloat(score.toFixed(2));
          sentiment.date = formatDateToNumber(new Date());
        });
      });
      navigate('Home');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <VStack gap={40} style={styles.wrapper}>
      <FormControl size="md" isRequired={true} isInvalid={title.length === 0}>
        <FormControlLabelText>일기 제목</FormControlLabelText>
        <Input>
          <InputField
            type="text"
            placeholder="일기 제목을 입력하세요"
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </Input>
        <FormControlError>
          <FormControlErrorText>일기 제목은 필수입니다</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <FormControl isRequired={true} isInvalid={mainText.length === 0}>
        <FormControlLabelText>일기 내용</FormControlLabelText>
        <Textarea style={styles.mainTextArea}>
          <TextareaInput
            type="text"
            placeholder="일기 내용을 입력하세요"
            value={mainText}
            onChangeText={text => setMainText(text)}
          />
        </Textarea>
        <FormControlError>
          <FormControlErrorText>일기 내용은 필수입니다</FormControlErrorText>
        </FormControlError>
      </FormControl>
      <View style={styles.bottomButtonContainer}>
        <Button
          size="md"
          variant="solid"
          action="positive"
          isDisabled={title.length === 0 || mainText.length === 0}
          onPress={() => handleNextButtonClick()}>
          <ButtonText>다음</ButtonText>
        </Button>
      </View>
    </VStack>
  );
};

export default DiaryEdit;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 40,
    position: 'relative',
  },
  mainTextArea: {
    height: 350,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
});
