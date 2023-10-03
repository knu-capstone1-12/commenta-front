import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import DiaryDetail from './src/screens/DiaryDetail';
import {config, GluestackUIProvider} from '@gluestack-ui/themed';

const Stack = createStackNavigator();

const App = () => {
  return (
    <GluestackUIProvider config={config.theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
};

export default App;
