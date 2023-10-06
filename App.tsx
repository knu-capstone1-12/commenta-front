import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import DiaryDetail from './src/screens/DiaryDetail';
import DiaryRecord from './src/screens/DiaryRecord';
import DiaryEdit from './src/screens/DiaryEdit';
import {config, GluestackUIProvider} from '@gluestack-ui/themed';
import {getApiUrlPrefix} from './src/util/mockUtil';

const Stack = createStackNavigator();

const App = () => {
  fetch(getApiUrlPrefix() + '/voiceToText', {method: 'POST'})
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(e => console.log(e));
  return (
    <GluestackUIProvider config={config.theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
          <Stack.Screen name="DiaryRecord" component={DiaryRecord} />
          <Stack.Screen name="DiaryEdit" component={DiaryEdit} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;
