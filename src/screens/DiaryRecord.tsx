import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import ChatBubble from 'components/ChatBubble';
import MessageInput from 'components/MessageInput';

const currentDate = new Date();

const DiaryRecord = () => {
  const [text, setText] = useState('');
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>일기 기록하기</Text>
        <Text style={styles.headerDate}>{`${currentDate.getFullYear()}.${
          currentDate.getMonth() + 1
        }.${currentDate.getDate()}`}</Text>
      </View>
      <ScrollView style={styles.chattings}>
        <ChatBubble side="service" message="test from service" />
        <ChatBubble side="client" message="test from client" />
      </ScrollView>
      <View style={styles.invisibleDivider} />
      <MessageInput text={text} setText={setText} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  headerWrapper: {
    gap: 6,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#000E08',
    fontSize: 16,
  },
  headerDate: {
    color: 'rgba(121, 124, 123, 0.5)',
    fontSize: 12,
  },
  chattings: {
    width: 350,
    gap: 30,
    height: Dimensions.get('window').height - 125 - 35,
  },
  invisibleDivider: {
    flex: 1,
  },
});

export default DiaryRecord;
