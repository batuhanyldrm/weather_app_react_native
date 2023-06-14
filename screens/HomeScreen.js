import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import { theme } from '../theme'
import { MagnifyingGlassIcon } from "react-native-heroicons/outline" 
import { MapIcon, MapPinIcon } from "react-native-heroicons/solid" 

export default function HomeScreen() {

  const [showSearch, setShowSearch] = useState(false)
  const [location, setLocation] = useState([1,2,3])

  const handleLocation = (loc) => {
    console.log("Location: ", loc)
  }

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
          {
            location.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl" >
                {
                  location.map((loc, index) => {
                    let showBorder = index + 1 != location.length
                    let borderClass = showBorder ? " border-b-2 border-b-gray-400 " : ""
                    return(
                      <TouchableOpacity
                        onPress={() => handleLocation(loc)}
                        key={index}
                        className={"flex-row items-center border-0 p-3 px-4 mb-1" + borderClass}
                      >
                        <MapPinIcon size={"20"} color={"gray"} />
                        <Text className=" text-black text-lg ml-2 ">London, United Kingdom</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            ) : null
          }
        </View>
        {/* forecast section */}
        <View className="mx-4 flex justify-around flex-1 mb-2" >
          {/* location */}
          <Text className="text-white text-center text-2xl font-bold">
            London,
            <Text className="text-lg font-semibold text-gray-300">
              United Kingdom
            </Text>
          </Text>
          {/* weather image */}
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/partlycloudy.png")}
              className="w-52 h-52"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}