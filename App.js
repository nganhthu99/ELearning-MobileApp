import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from "./src/Components/Start/splash-screen";

export default function App() {
  return (
      <View style={styles.container}>
        <SplashScreen/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
