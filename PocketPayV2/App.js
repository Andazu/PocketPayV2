import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./global.css";

export default function App() {
  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <StatusBar style='auto' />
      <Text className='text-center mt-3 text-2xl font-light text-orange-300'>
        Login
      </Text>
      {/* Additional components goes here */}
    </View>
  );
}
