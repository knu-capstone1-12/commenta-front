import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import MICSVG from '../../asset/microphone.svg';
import SENDSVG from '../../asset/send.svg';

interface Props {
  style?: ViewStyle;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const MessageInput = ({style: externalStyle, text, setText}: Props) => {
  return (
    <View style={[styles.wrapper, externalStyle]}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="rgba(121, 124, 123, 0.5)"
          value={text}
          onChangeText={setText}
        />
        <View style={styles.icons}>
          <TouchableOpacity>
            <MICSVG />
          </TouchableOpacity>
          <TouchableOpacity>
            <SENDSVG />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  inputRow: {
    width: 345,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    width: 245,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F6F6',
    color: '#000E08',
  },
  icons: {
    flexDirection: 'row',
    gap: 12,
  },
});

export default MessageInput;
