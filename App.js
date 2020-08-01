import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import TimetableScreen from './src/screens/TimetableScreen';
import CreateTimecardScreen from './src/screens/CreateTimecardScreen';
import ViewTimecardScreen from './src/screens/ViewTimecardScreen';
import EditTimecardScreen from './src/screens/EditTimecardScreen';

const Stack = createStackNavigator();

function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = 'Login'
          component = {LoginScreen}
        />
        <Stack.Screen
          name = 'Timetable'
          component = {TimetableScreen}
        />
        <Stack.Screen
          name = 'CreateTimecard'
          component = {CreateTimecardScreen}
        />
        <Stack.Screen
          name = 'ViewTimecard'
          component = {ViewTimecardScreen}
        />
        <Stack.Screen
          name = 'EditTimecard'
          component = {EditTimecardScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
