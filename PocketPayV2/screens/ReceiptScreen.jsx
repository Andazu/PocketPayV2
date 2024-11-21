import React from 'react';
import { View, Text, Image, Dimensions, ScrollView } from 'react-native';
import BubblesSVG from '../assets/BubblesSVG';
import inmLogo from '../assets/inmLogo.png';

export default function ReceiptScreen({ route }) {
  // Get data passed via navigation
  const { orderData } = route.params || {};
  const {
    Hub = 'HUB1 Kantinen', // Default hub
    Items = [{ Name: 'FROKOST / lunch', Quantity: 1, Price: 29.0 }], // Default items
    TotalAmount = 29.0,
    Tax = 5.8,
    UserName = 'Anders Mazen', // Default user name
    OrderNumber = '96153', // Default order number
    OrderDate = '20-11-2024 • 17:20', // Default order date
  } = orderData || {};

  // Get screen dimensions
  const { width, height } = Dimensions.get('window');

  // Dynamically calculate the logo dimensions
  const logoHeight = height * 0.03;
  const logoWidth = width * 0.15;

  console.log('orderData', orderData);

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
            {OrderDate}
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
                  {Hub}
                </Text>
              </View>
            </View>

            {/* Product and Amount */}
            <View className='bg-[#f6f8fa] px-8 py-10 pb-14'>
              {Items.map((item, index) => (
                <View key={index} className='flex-row justify-between'>
                  <View className='flex-1 pr-2'>
                    <Text className='font-poppinsMedium text-gray-500'>
                      Vare
                    </Text>
                    <Text className='font-poppinsMedium'>
                      {item.Quantity} x {item.Name}
                    </Text>
                  </View>
                  <View className='flex-1 pl-2 items-end'>
                    <Text className='font-poppinsMedium text-gray-500'>
                      Beløb
                    </Text>
                    <Text className='font-poppinsMedium'>
                      {item.Price.toFixed(2)} DKK
                    </Text>
                  </View>
                </View>
              ))}
              <View className='flex-1 items-end pt-6'>
                <Text className='font-poppinsMedium text-gray-500'>
                  Heraf moms
                </Text>
                <Text className='font-poppinsMedium text-gray-500'>
                  {Tax.toFixed(2)} DKK
                </Text>
              </View>
            </View>
            {/* Receipt Amount */}
            <View className='flex-1 justify-center items-center bg-white py-6'>
              <Text className=' text-gray-500 pb-1'>Du har betalt</Text>
              <Text className='text-2xl font-poppinsBold'>
                {TotalAmount.toFixed(2)} DKK
              </Text>
            </View>
            {/* Receipt Customer */}
            <View className='flex-row justify-between bg-white py-6 px-8 border-t-[1px] border-[#eff3f7]'>
              <View className='flex-1'>
                <Text className='font-poppinsMedium text-gray-500'>Bruger</Text>
                <Text className='font-poppinsMedium'>{UserName}</Text>
              </View>
              <View className='flex-1 items-end'>
                <Text className='font-poppinsMedium text-gray-500'>Nummer</Text>
                <Text className='font-poppinsMedium'>{OrderNumber}</Text>
              </View>
            </View>
            {/* Receipt Bottom */}
            <View className='pt-6 border-t-[1px] border-[#eff3f7] bg-white'>
              <Text className=' text-gray-500 font-poppinsMedium text-center'>
                Tak for din ordre
              </Text>
              <Text className='text-center font-poppinsMedium text-gray-500'>
                {Hub}
              </Text>
              <Text className='text-sm font-poppinsMedium text-gray-500 text-center'>
                CVR:&nbsp;40909109
              </Text>
              <View className='items-center my-4'>
                <Image
                  source={inmLogo}
                  resizeMode='contain'
                  style={{
                    width: logoWidth,
                    height: logoHeight,
                    opacity: 0.5,
                  }}
                ></Image>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
