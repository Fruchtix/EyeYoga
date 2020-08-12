import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenManager from './src/components/container/ScreenManager'
import {firebaseConfig} from './src/components/container/Firebase'
import * as firebase from 'firebase'
import * as SplashScreen from 'expo-splash-screen';

firebase.initializeApp(firebaseConfig)
try {
  SplashScreen.preventAutoHideAsync();
} catch (e) {
  console.log(e);
}

export default function App() {
  return (
    <View style={styles.container}>
      <ScreenManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});
