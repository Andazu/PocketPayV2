import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import BubblesSVG from '../assets/BubblesSVG';
import inmLogo from '../assets/inmLogo.png';

export default function RecieptScreen() {
  // Get screen dimensions
  const { width, height } = Dimensions.get('window');

  // Dynamically calculate the logo dimensions
  const logoHeight = height * 0.03;
  const logoWidth = width * 0.15;

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='p-6'>
        {/* Header section */}
        <View className='relative w-full h-48 justify-between items-center rounded-t-md bg-[#2ebb6e]'>
          <View className='absolute -top-0.5 -right-4 opacity-25'>
            <BubblesSVG />
          </View>
          <Text className='text-2xl text-center text-white font-poppinsMedium pt-12'>
            Kvittering
          </Text>
          <Text className='text-md text-center text-white font-poppinsMedium'>
            20-11-2024 • 17:20
          </Text>
          <View className='bg-gray-600 opacity-50 w-[87%] h-6 rounded-full mb-6'></View>
        </View>

        {/* Receipt content */}
        <View className='w-full h-96 justify-center items-center rounded-b-md bg-white shadow-sm shadow-gray-300'>
          <View className='absolute -top-10 w-4/5 bg-[#eff3f7] shadow-sm shadow-gray-300'>
            {/* Receipt Top */}
            <View className='relatve h-12 items-center'>
              <View className='absolute -bottom-6 z-50 items-center justify-center h-12 w-44 bg-white shadow-sm shadow-gray-100 rounded-full'>
                <Text className='text-md font-poppinsMedium text-center'>
                  HUB1 Kantinen
                </Text>
              </View>
            </View>

            {/* Product and Amount */}
            <View className='bg-[#f6f8fa] px-8 py-10 pb-14'>
              <View className='flex-row justify-between'>
                <View className='flex-1 pr-2'>
                  <Text className='font-poppinsMedium text-gray-500'>Vare</Text>
                  <Text className='font-poppinsMedium'>
                    1 x FROKOST / lunch
                  </Text>
                </View>
                <View className='flex-1 pl-2 items-end'>
                  <Text className='font-poppinsMedium text-gray-500'>
                    Beløb
                  </Text>
                  <Text className='font-poppinsMedium'>29,00</Text>
                </View>
              </View>
              <View className='flex-1 items-end pt-6'>
                <Text className='font-poppinsMedium text-gray-500'>
                  Heraf moms
                </Text>
                <Text className='font-poppinsMedium text-gray-500'>5,80</Text>
              </View>
            </View>
            {/* Receipt Amount */}
            <View className='flex-1 justify-center items-center bg-white py-6'>
              <Text className=' text-gray-500 pb-1'>Du har betalt</Text>
              <Text className='text-2xl font-poppinsBold'>29,00 DKK</Text>
            </View>
            {/* Receipt Customer */}
            <View className='flex-row justify-between bg-white py-6 px-8 border-t-[1px] border-[#eff3f7]'>
              <View className='flex-1'>
                <Text className='font-poppinsMedium text-gray-500'>Bruger</Text>
                <Text className='font-poppinsMedium'>Anders Mazen</Text>
              </View>
              <View className='flex-1 items-end'>
                <Text className='font-poppinsMedium text-gray-500'>Nummer</Text>
                <Text className='font-poppinsMedium'>96153</Text>
              </View>
            </View>
            {/* Receipt Bottom */}
            <View className='pt-6 border-t-[1px] border-[#eff3f7] bg-white'>
              <Text className=' text-gray-500 font-poppinsMedium text-center'>
                Tak for din ordre
              </Text>
              <Text className='text-center font-poppinsMedium text-gray-500'>
                HUB1 Kantinen
              </Text>
              <Text className='text-sm font-poppinsMedium text-gray-500 text-center'>
                CVR:&nbsp;40909109
              </Text>
              <View className='items-center my-4'>
                <Image
                  source={inmLogo}
                  resizeMode='contain'
                  style={{ width: logoWidth, height: logoHeight, opacity: 0.5 }}
                ></Image>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
