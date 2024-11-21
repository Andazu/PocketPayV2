import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import ReceiptScreen from './screens/ReceiptScreen';
import './global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_Regular: require('./assets/fonts/Poppins-Regular.ttf'),
    Poppins_Bold: require('./assets/fonts/Poppins-Bold.ttf'),
    Poppins_Medium: require('./assets/fonts/Poppins-Medium.ttf'),
    Poppins_Black: require('./assets/fonts/Poppins-Black.ttf'),
    Poppins_BlackItalic: require('./assets/fonts/Poppins-BlackItalic.ttf'),
    Poppins_BoldItalic: require('./assets/fonts/Poppins-BoldItalic.ttf'),
    Poppins_ExtraBold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    Poppins_ExtraBoldItalic: require('./assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    Poppins_ExtraLight: require('./assets/fonts/Poppins-ExtraLight.ttf'),
    Poppins_ExtraLightItalic: require('./assets/fonts/Poppins-ExtraLightItalic.ttf'),
    Poppins_Italic: require('./assets/fonts/Poppins-Italic.ttf'),
    Poppins_Light: require('./assets/fonts/Poppins-Light.ttf'),
    Poppins_LightItalic: require('./assets/fonts/Poppins-LightItalic.ttf'),
    Poppins_MediumItalic: require('./assets/fonts/Poppins-MediumItalic.ttf'),
    Poppins_SemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    Poppins_SemiBoldItalic: require('./assets/fonts/Poppins-SemiBoldItalic.ttf'),
    Poppins_Thin: require('./assets/fonts/Poppins-Thin.ttf'),
    Poppins_ThinItalic: require('./assets/fonts/Poppins-ThinItalic.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style='auto' />
        <Navbar />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen
            name='Receipt'
            component={ReceiptScreen}
            options={{ animation: 'fade' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
