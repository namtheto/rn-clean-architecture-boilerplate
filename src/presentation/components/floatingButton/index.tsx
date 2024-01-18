import React from 'react';
import {StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import NetworkInspector from '../networkLogger';
import {useAppColors} from '../../../app/hooks';
import {vs} from '../../../app/utils/responsive';
import {IconNetwork} from '../../../../assets/svgs';

export interface FloatingActionButtonProps {
  buttonSize?: number;
  onPress?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = props => {
  const {buttonSize, onPress} = props;
  const {width, height} = useWindowDimensions();
  const colors = useAppColors();
  const size = vs(buttonSize || 50);

  // Start from the center right
  const startingPosition = {
    x: width - (size || 50) - 16,
    y: height / 2 - (size || 50) / 2,
  };
  const x = useSharedValue(startingPosition.x);
  const y = useSharedValue(startingPosition.y);
  const currentX = useSharedValue(startingPosition.x);
  const currentY = useSharedValue(startingPosition.y);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      x.value = currentX.value + e.translationX;
      y.value = currentY.value + e.translationY;
    })
    .onEnd(_e => {
      if (x.value < width / 2) {
        x.value = withSpring(16);
      } else {
        x.value = withSpring(width - (size || 50) - 16);
      }
      currentX.value = x.value;
      currentY.value = y.value;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: size || 50,
      height: size || 50,
      borderRadius: (size || 50) / 2,
      backgroundColor: colors.newPrimary,
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    };
  });

  const handlePress = () => {
    if (onPress) {
      return onPress();
    }
    return NetworkInspector.show();
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <TouchableOpacity onPress={handlePress}>
          <IconNetwork color="white" />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999,
  },
});

export default FloatingActionButton;
