import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {VStack} from '@gluestack-ui/themed';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import useMicrophone from 'hooks/useMicrophone';
import MicSVG from '../../asset/mic.svg';

const audioRecorderPlayer = new AudioRecorderPlayer();
const DiaryRecord = () => {
  const [recording, setRecording] = useState(false);
  const [processedText, setProcessedText] = useState('');
  const [uri, setUri] = useState('');
  const hasMicrophonePermission = useMicrophone();

  const startRecording = async () => {
    try {
      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };
      const dirs = RNFetchBlob.fs.dirs;
      const path = Platform.select({
        ios: 'hello.mp3',
        android: `${dirs.CacheDir}/hello.mp3`,
      });

      const newuri = await audioRecorderPlayer.startRecorder(path, audioSet);
      setRecording(true);
      console.log('newuri' + newuri);
      setUri(newuri);
    } catch (err: any) {
      console.error('Error in startRecording:', err.message || err);
    }
  };

  const stopRecording = async () => {
    if (!recording) {
      return;
    }

    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setRecording(false);
      console.log(result);

      const response = await RNFetchBlob.fetch(
        'POST',
        'https://mped121b34f40f616d64.free.beeceptor.com/api/voiceToText',
        {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'files',
            filename: 'voice',
            type: 'audio/wav',
            data: RNFetchBlob.wrap(uri),
          },
        ],
      );

      if (response.info().status === 200) {
        console.log('FILES UPLOADED!');
        const jsonResponse = response.json();
        setProcessedText(jsonResponse.text);
      } else {
        console.error(response);
        console.log('SERVER ERROR');
      }
    } catch (err) {
      console.log('UPLOAD ERROR:', err);
    } finally {
      try {
        await RNFS.unlink(uri);
        console.log('FILE DELETED SUCCESSFULLY');
      } catch (err) {
        console.log('ERROR DELETING FILE:', err);
      }
    }
  };

  return (
    <VStack style={styles.wrapper}>
      {hasMicrophonePermission ? (
        <>
          <View style={styles.recordingButtonContainer}>
            <TouchableOpacity
              onPress={recording ? stopRecording : startRecording}>
              <View
                style={[
                  styles.recordingButton,
                  recording && styles.recordingOnProcess,
                ]}>
                <MicSVG />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.STTTitle}>음성 변환(STT)</Text>
            <ScrollView>
              <Text style={styles.STTText}>
                {processedText === ''
                  ? '녹음을 기다리고 있습니다'
                  : recording
                  ? '녹음중...'
                  : processedText}
              </Text>
            </ScrollView>
          </View>
        </>
      ) : (
        <Text>no mic!!</Text>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  recordingButtonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  recordingButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0077E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingOnProcess: {
    backgroundColor: 'rgba(0, 119, 230, 0.5)',
  },
  permissionText: {color: 'red', fontSize: 16},
  textContainer: {flex: 1, width: 320, flexDirection: 'column', gap: 25},
  STTTitle: {},
  STTText: {},
});

export default DiaryRecord;
