const { fontFamily } = require('tailwindcss/defaultTheme');

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
        sans: ['Poppins_Regular', ...fontFamily.sans], // Default fallback
        poppinsRegular: ['Poppins_Regular'],
        poppinsBold: ['Poppins_Bold'],
        poppinsMedium: ['Poppins_Medium'],
        poppinsBlack: ['Poppins_Black'],
        poppinsBlackItalic: ['Poppins_BlackItalic'],
        poppinsBoldItalic: ['Poppins_BoldItalic'],
        poppinsExtraBold: ['Poppins_ExtraBold'],
        poppinsExtraBoldItalic: ['Poppins_ExtraBoldItalic'],
        poppinsExtraLight: ['Poppins_ExtraLight'],
        poppinsExtraLightItalic: ['Poppins_ExtraLightItalic'],
        poppinsItalic: ['Poppins_Italic'],
        poppinsLight: ['Poppins_Light'],
        poppinsLightItalic: ['Poppins_LightItalic'],
        poppinsMediumItalic: ['Poppins_MediumItalic'],
        poppinsSemiBold: ['Poppins_SemiBold'],
        poppinsSemiBoldItalic: ['Poppins_SemiBoldItalic'],
        poppinsThin: ['Poppins_Thin'],
        poppinsThinItalic: ['Poppins_ThinItalic'],
      },
    },
  },
  plugins: [],
};
