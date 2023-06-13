import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <StatusBar style='light' />
      <Image blurRadius={70} source={require('../assets/bg.png')}  
        style={{ position: 'absolute', height: '100%', width: '100%' }}
      /> 
    </View>
  )
}