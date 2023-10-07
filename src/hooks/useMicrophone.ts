import {useEffect, useState} from 'react';
import {Platform, Alert} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const useMicrophone = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMicrophonePermission = () => {
      if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
        return;
      }
      const platformPermissions =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS?.ANDROID?.RECORD_AUDIO;

      const requestMicrophonePermission = async () => {
        try {
          const result = await request(platformPermissions);
          if (result === RESULTS.GRANTED) {
            setHasPermission(true);
          } else {
            Alert.alert('마이크 권한을 허용해주세요');
            setHasPermission(false);
          }
        } catch (err) {
          Alert.alert('Microphone permission error');
          console.warn(err);
          setHasPermission(false);
        }
      };

      requestMicrophonePermission();
    };

    checkMicrophonePermission();
  }, []);

  return hasPermission;
};

export default useMicrophone;
