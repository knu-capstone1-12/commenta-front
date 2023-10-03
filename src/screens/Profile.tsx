import React from 'react';
import {Text, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Box, VStack} from '@gluestack-ui/themed';

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Profile 화면입니다.</Text>
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
