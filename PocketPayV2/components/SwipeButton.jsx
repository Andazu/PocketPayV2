import React from 'react';
import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';

const SwipeButton = ({
  buttonText = 'Swipe To Confirm',
  heightOffset = 50, // Default height of the outer container
  widthOffset = 40,
  onSwipeComplete,
}) => {
  const CONTAINER_WIDTH = Dimensions.get('screen').width - widthOffset; // Outer container width
  const BUTTON_SIZE = heightOffset - 8; // Circular button size (slightly smaller than container height)
  const END_POSITION = CONTAINER_WIDTH - BUTTON_SIZE - 8; // Max position for the button
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((e) => {
      let newPosition;
      if (onLeft.value) {
        newPosition = e.translationX;
      } else {
        newPosition = END_POSITION + e.translationX;
      }
      // Clamp position between 0 and END_POSITION
      position.value = Math.max(0, Math.min(newPosition, END_POSITION));
    })
    .onEnd(() => {
      if (position.value > END_POSITION / 1.5) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onLeft.value = false;
        if (onSwipeComplete) {
          onSwipeComplete(true); // Trigger callback with true
        }
      } else {
        position.value = withTiming(0, { duration: 100 });
        onLeft.value = true;
        if (onSwipeComplete) {
          onSwipeComplete(false); // Trigger callback with false
        }
      }
    });

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(position.value, [0, END_POSITION], [1, 0]),
  }));

  return (
    <View
      className='relative flex-row items-center justify-center bg-[#2ebb6e] overflow-hidden'
      style={{
        height: heightOffset,
        borderRadius: heightOffset / 2,
        width: CONTAINER_WIDTH,
      }}
    >
      <Animated.Text
        style={animatedTextStyle}
        className='text-white text-lg font-poppinsBold'
      >
        {buttonText}
      </Animated.Text>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            {
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              borderRadius: BUTTON_SIZE / 2,
              left: 4, // Padding from the left edge of the container
            },
            animatedButtonStyle,
          ]}
          className='absolute bg-white justify-center items-center'
        >
          <Entypo
            name='chevron-thin-right'
            size={BUTTON_SIZE / 2.5}
            color='#2ebb6e'
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default SwipeButton;
