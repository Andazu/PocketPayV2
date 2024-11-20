import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
  Alert,
} from 'react-native';
import SwipeButton from '../components/SwipeButton';
import BubblesSVG from '../assets/BubblesSVG';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function HomeScreen() {
  const [currentHub, setCurrentHub] = useState('HUB1'); // State to track the current hub

  const showHubPicker = () => {
    if (Platform.OS === 'ios') {
      // iOS ActionSheet for hub selection
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'HUB1', 'HUB2'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            setCurrentHub('HUB1');
          } else if (buttonIndex === 2) {
            setCurrentHub('HUB2');
          }
        }
      );
    } else {
      // Android fallback
      Alert.alert(
        'Vælg kantine',
        '',
        [
          { text: 'HUB1', onPress: () => setCurrentHub('HUB1') },
          { text: 'HUB2', onPress: () => setCurrentHub('HUB2') },
          { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View className='flex-1 p-6 bg-white'>
      {/* Header section */}
      <View className='relative w-full h-48 justify-center items-center rounded-t-md bg-[#2ebb6e]'>
        <View className='absolute -top-0.5 -right-4 opacity-25'>
          <BubblesSVG />
        </View>
        <Text className='text-3xl text-center text-white font-poppinsBold leading-relaxed'>
          Velkommen til {currentHub} Kantinen
        </Text>
      </View>

      {/* Main content */}
      <View className='w-full h-96 justify-center items-center rounded-b-md shadow-sm shadow-gray-300 bg-white'>
        <Text className='text-2xl text-center text-gray-400 font-poppinsBold pb-10'>
          Registrér dit måltid
        </Text>
        <SwipeButton
          buttonText='Swipe og betal'
          heightOffset={60}
          widthOffset={140}
          onSwipeComplete={(isComplete) => {
            console.log('Swipe completed:', isComplete);
          }}
        />
        <View className='flex-row items-center justify-center pt-10'>
          <View className='flex'>
            <BouncyCheckbox
              fillColor='#2ebb6e'
              onPress={(isChecked) => {
                console.log(isChecked);
              }}
            />
          </View>
          <Text className='text-[#333333] text-lg font-poppinsBold'>
            Pin POCKETPAY?
          </Text>
        </View>
      </View>

      {/* Footer section */}
      <View className='flex-1 justify-center items-center pt-8 pb-10'>
        <Text className='text-center text-black font-poppinsBold text-xl'>
          Spiser du i en anden kantine?
        </Text>
        <TouchableOpacity
          className='bg-white shadow-sm shadow-gray-300 rounded-md mt-6 px-8 py-5'
          onPress={showHubPicker} // Show hub picker when pressed
        >
          <Text className='text-center text-xl font-poppinsMedium'>
            Skift kantine
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
