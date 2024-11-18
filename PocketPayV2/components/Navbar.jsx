import "../global.css";
import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "react-native-vector-icons";
import logo from "../assets/inm-simple-white-green.png";

export default function Navbar() {
  const navigation = useNavigation();

  // Get screen dimensions
  const { width, height } = Dimensions.get("window");

  // Dynamically calculate the logo dimensions
  const logoHeight = height * 0.038;
  const logoWidth = width * 0.15;

  return (
    <View className='bg-[#333333] pt-14 px-6'>
      <View className='flex-row justify-between items-center pb-4'>
        <Image
          source={logo}
          resizeMode='contain' // Ensures the image maintains its aspect ratio
          style={{ width: logoWidth, height: logoHeight }} // Dynamic dimensions
        />
        <TouchableOpacity onPress={() => handleOnPress()}>
          <FontAwesome6 name='bars-staggered' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
}
