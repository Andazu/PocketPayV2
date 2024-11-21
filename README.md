
# PocketPayV2

PocketPayV2 is a React Native project created with **Expo** and styled using **NativeWind** (a Tailwind CSS solution for React Native), with type safety ensured by TypeScript. The purpose of this project is to recreate the functionality of an existing `.asp` and Bootstrap-based site within a modern React Native framework.

## Features

- Modern mobile application built with React Native and Expo.
- Tailwind-like styling using NativeWind for streamlined and efficient UI development.
- Modularized component structure for scalability and maintainability.
- Type-safe development with TypeScript for improved maintainability and reduced runtime errors.

## Project Structure

Key files and folders:
- `App.js`: Entry point of the application.
- `components/`: Contains reusable React Native components.
- `screens/`: Holds screen-level components for different application views.
- `global.css`: Contains global styles used across the app.
- `tailwind.config.js`: Configuration file for NativeWind (Tailwind CSS for React Native).
- `scripts/`: Helper scripts for development and build tasks.
- `tsconfig.json`: Configuration for TypeScript to define project-specific compiler options and settings.

## Prerequisites

Ensure you have the following installed on your system:
- Node.js (version 16+ recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

## Installation

1. Clone or download this repository.
2. Navigate to the project directory:
   ```bash
   cd PocketPayV2/PocketPayV2
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the Expo development server:
   ```bash
   npm start
   ```
2. Use the Expo Go app on your mobile device or an emulator to run the app by scanning the QR code displayed in the terminal or browser.

## Configuration

- **Tailwind CSS**: Modify the `tailwind.config.js` file to customize the design system.
- **Environment Variables**: If the app uses environment-specific configurations, they should be added in the appropriate file or a `.env` file.

## License

This project is licensed under the MIT License.
