import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import * as FileSystem from 'expo-file-system'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native';
import Home from './pages/Home'
import ViewCookie from './pages/ViewCookie';
import AddCookie from './pages/AddCookie';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList  } from './data/type';
import fortuneList from './data/fortunes.json'

const HomeStack = createStackNavigator<HomeStackParamList>();

async function checkFile() {
  const fileUri = FileSystem.documentDirectory + 'fortunes.json'
  const {exists} = await FileSystem.getInfoAsync(fileUri)
  if (!exists) {
    console.warn('File doesnt exist, creating a new file')
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(fortuneList.fortunes))
  }
}

export default function App() {
  const [ isReady, setIsReady ] = useState(false)
  if(!isReady) {
    return (
      <AppLoading
        startAsync={checkFile}
        onFinish={() => {console.log('App is ready'); setIsReady(true)}}
        onError={console.warn}
      />
    )
  } else {
    return (
      <NavigationContainer>
        <HomeStack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <HomeStack.Screen
            name="Home"
            component={Home}
          />
          <HomeStack.Screen 
            name="ViewCookie"
            component={ViewCookie}
          />
          <HomeStack.Screen
            name="AddCookie"
            component={AddCookie}
          />
        </HomeStack.Navigator>
      </NavigationContainer>
    );
  }
}
