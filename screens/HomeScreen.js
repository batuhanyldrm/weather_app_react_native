import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import { theme } from '../theme'
import { MagnifyingGlassIcon } from "react-native-heroicons/outline" 

export default function HomeScreen() {

  const [showSearch, setShowSearch] = useState(false)

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <StatusBar style='light' />
      <Image blurRadius={70} source={require('../assets/bg.png')}  
        style={{ position: 'absolute', height: '100%', width: '100%' }}
      /> 
      <SafeAreaView className="flex flex-1">
        <View style={{height:"7%"}} className="mx-4 relative z-50" >
          <View className="flex-row justify-end items-center rounded-full"
            style={{backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent"}}
          >
            {
              showSearch ? (
                <TextInput
                placeholder='Search city'
                placeholderTextColor={'rgb(255,255,255)'}
                className="pl-6 h-10 pb-1 flex-1 text-base text-white"
              />
              ): null
            }
            <TouchableOpacity style={{backgroundColor: theme.bgWhite(0.3)}}
              onPress={() => setShowSearch(!showSearch)}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size={"25"} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}