/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        Poppins_Black: ['Poppins-Black'],
        Poppins_BlackItalic: ['Poppins-BlackItalic'],
        Poppins_Bold: ['Poppins-Bold'],
        Poppins_BoldItalic: ['Poppins-BoldItalic'],
        Poppins_ExtraBold: ['Poppins-ExtraBold'],
        Poppins_ExtraBoldItalic: ['Poppins-ExtraBoldItalic'],
        Poppins_ExtraLight: ['Poppins-ExtraLight'],
        Poppins_ExtraLightItalic: ['Poppins-ExtraLightItalic'],
        Poppins_Italic: ['Poppins-Italic'],
        Poppins_Light: ['Poppins-Light'],
        Poppins_LightItalic: ['Poppins-LightItalic'],
        Poppins_Medium: ['Poppins-Medium'],
        Poppins_MediumItalic: ['Poppins-MediumItalic'],
        Poppins_Regular: ['Poppins-Regular'],
        Poppins_SemiBold: ['Poppins-SemiBold'],
        Poppins_SemiBoldItalic: ['Poppins-SemiBoldItalic'],
        Poppins_Thin: ['Poppins-Thin'],
        Poppins_ThinItalic: ['Poppins-ThinItalic'],
      },
    },
  },
  plugins: [],
};
