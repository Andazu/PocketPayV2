import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View className='flex-1 p-6 bg-white'>
      <View className='w-full h-48 justify-center items-center rounded-t-md bg-[#2ebb6e]'>
        <Text className='text-3xl text-center text-white font-Poppins_Regular'>
          Velkommen til HUB1 Kantinen
        </Text>
      </View>
      <View className='w-full h-96 justify-center items-center rounded-b-md shadow-sm shadow-gray-300 bg-white'>
        <Text className='text-2xl text-center font-bold text-[#333333]'>
          Kantinen er lukket
        </Text>
      </View>
      <View className='flex-1 justify-center items-center pt-4'>
        <Text className='text-center text-black '>
          Spiser du i en anden kantine?
        </Text>
        <TouchableOpacity className='text-center bg-white shadow-sm shadow-gray-300 rounded-md mt-4 px-8 py-5'>
          <Text>Skift kantine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
