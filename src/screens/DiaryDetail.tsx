import React from 'react';
import {Text, View, Button} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Box, VStack} from '@gluestack-ui/themed';
import {RootStackParamList} from 'types/navigation';

const Profile = () => {
  const navigation = useNavigation();

  const {
    params: {id},
  } = useRoute<RouteProp<RootStackParamList, 'DiaryDetail'>>();

  return (
    <View>
      <Text>{new Date(id).toDateString()}의 일기</Text>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Box h="$80" justifyContent="center">
        <VStack space="md" reversed={false}>
          <Box w="$20" h="$20" bg="$blue300" />
          <Box w="$20" h="$20" bg="$blue400" />
          <Box w="$20" h="$20" bg="$blue500" />
        </VStack>
      </Box>
    </View>
  );
};

export default Profile;
