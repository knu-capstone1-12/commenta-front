import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import DiaryDetail from './src/screens/DiaryDetail';
import DiaryRecord from './src/screens/DiaryRecord';
import DiaryEdit from './src/screens/DiaryEdit';
import {config, GluestackUIProvider} from '@gluestack-ui/themed';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {DatabaseProvider} from '@nozbe/watermelondb/DatabaseProvider';
import schema from './src/model/schema';
import Diary from './src/model/Diary';
import Emotion from './src/model/Emotion';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'commenta',
  jsi: true,
  onSetUpError(error) {
    console.error(error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Diary, Emotion],
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <GluestackUIProvider config={config.theme}>
      <DatabaseProvider database={database}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
            <Stack.Screen name="DiaryRecord" component={DiaryRecord} />
            <Stack.Screen name="DiaryEdit" component={DiaryEdit} />
          </Stack.Navigator>
        </NavigationContainer>
      </DatabaseProvider>
    </GluestackUIProvider>
  );
};

export default App;
