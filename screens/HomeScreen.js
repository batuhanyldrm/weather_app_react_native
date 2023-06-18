import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import { theme } from '../theme'
import { MagnifyingGlassIcon } from "react-native-heroicons/outline" 
import { CalendarDaysIcon, MapIcon, MapPinIcon } from "react-native-heroicons/solid"
import {debounce} from 'lodash'
import { fetchLocations, fetchWeatherForecast } from '../api/weather'
import { weatherImages } from '../constants'

export default function HomeScreen() {

  const [showSearch, setShowSearch] = useState(false)
  const [locations, setLocations] = useState([])
  const [weather, setWeather] = useState({})

  const handleLocation = (loc) => {
    console.log("Location: ", loc)
    setLocations([])
    setShowSearch(false)
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7"
    }).then((data) => {
      setWeather(data)
      console.log("got forecast", data)
    })
  }

  const handleSearch = (value) => {
    //fetch location
    if (value.length > 2) {
      fetchLocations({cityName: value}).then((data) => {
        setLocations(data)
      })
    }
  }
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []) //girilen value nun tekde girilmesini sağlar
  const {current, location} = weather;

  useEffect(() => {
    fetchMyWeatherData()
  }, [])
  
  const fetchMyWeatherData = () => {
    fetchWeatherForecast({
      cityName: "Istanbul",
      days: "7"
    }).then((data) => {
      setWeather(data)
    })
  } 

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <StatusBar style='light' />
      <Image blurRadius={70} source={require('../assets/images/bg.png')}  
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
                onChangeText={handleTextDebounce}
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
            locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl" >
                {
                  locations.map((loc, index) => {
                    let showBorder = index + 1 != locations.length
                    let borderClass = showBorder ? " border-b-2 border-b-gray-400 " : ""
                    return(
                      <TouchableOpacity
                        onPress={() => handleLocation(loc)}
                        key={index}
                        className={"flex-row items-center border-0 p-3 px-4 mb-1" + borderClass}
                      >
                        <MapPinIcon size={"20"} color={"gray"} />
                        <Text className=" text-black text-lg ml-2 ">{loc?.name}{/* loc?.name */}, {loc?.country}</Text>
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
            {location?.name},
            <Text className="text-lg font-semibold text-gray-300">
              {" " + location?.country}
            </Text>
          </Text>
          {/* weather image */}
          <View className="flex-row justify-center">
            <Image
              //source={{uri: 'https:'+current?.condition?.icon}}
              source={weatherImages[current?.condition?.text]}
              className="w-52 h-52"
            />
          </View>
          {/* degree celcius */}
          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              {current?.temp_c}&#176;
            </Text>
            <Text className="text-center text-white text-xl tracking-widest">
              {current?.condition?.text}
            </Text>
            {/* other stats */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image source={require("../assets/icons/wind.png")} className="h-6 w-6"/>
                <Text className="text-white font-semibold text-base">
                  {current?.wind_kph}km
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image source={require("../assets/icons/drop.png")} className="h-6 w-6"/>
                <Text className="text-white font-semibold text-base">
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image source={require("../assets/icons/sun.png")} className="h-6 w-6"/>
                <Text className="text-white font-semibold text-base">
                  6:05 AM
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* forecast for next days */}
        <View className="mb-2 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2">
            <CalendarDaysIcon size={22} color={"white"}/>
            <Text className="text-white text-base">Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal: 15}}
            showsHorizontalScrollIndicator={false}
          >
            {
              weather?.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date)
                let options = {weekday: "long"}
                let dayName = date.toLocaleDateString('en-Us', options)
                dayName = dayName.split(",")[0]

                return (
                  <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{backgroundColor: theme.bgWhite(0.15)}}
                    key={index}
                  >
                    <Image source={weatherImages[item?.day?.condition?.text]} 
                      className="h-11 w-11"
                    />
                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  )
}