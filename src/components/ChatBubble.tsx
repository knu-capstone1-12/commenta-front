import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  side: 'service' | 'client';
  message: string;
}

const ChatBubble = ({side, message}: Props) => {
  return (
    <View style={styles.wrapper}>
      {side === 'service' ? (
        <View style={styles.serviceBubbleWrapper}>
          <View style={styles.serviceBubbleHeader}>
            <Text style={styles.serviceNameText}>Commenta</Text>
          </View>
          <View style={styles.serviceBubble}>
            <Text style={styles.serviceBubbleText}>{message}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.clientBubbleWrapper}>
          <View style={styles.cilentBubble}>
            <Text style={styles.clientBubbleText}>{message}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  serviceBubbleWrapper: {
    width: '100%',
    alignItems: 'flex-start',
  },
  serviceBubbleHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  serviceNameText: {
    fontSize: 14,
  },
  serviceBubble: {
    padding: 10,
    backgroundColor: '#F2F7FB',
    borderRadius: 10,
    borderTopLeftRadius: 0,
  },
  serviceBubbleText: {
    fontSize: 12,
    color: '#000E08',
  },
  clientBubbleWrapper: {
    width: '100%',
    alignItems: 'flex-end',
  },
  cilentBubble: {
    padding: 10,
    backgroundColor: '#3D4A7A',
    borderRadius: 10,
    borderTopRightRadius: 0,
  },
  clientBubbleText: {
    fontSize: 12,
    color: '#ffffff',
  },
});

export default ChatBubble;
