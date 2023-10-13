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

const DiaryEdit = () => {
  const {navigate} = useNavigation();
  const [title, setTitle] = useState('');
  const [mainText, setMainText] = useState('');

  const {
    params: {text: passedText},
  } = useRoute<RouteProp<RootStackParamList, 'DiaryEdit'>>();

  useEffect(() => {
    setMainText(passedText);
  }, [passedText]);

  const handleNextButtonClick = () => {
    navigate('Home');
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
          onPress={handleNextButtonClick}>
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
