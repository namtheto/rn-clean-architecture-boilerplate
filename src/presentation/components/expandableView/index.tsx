import React, {useCallback, useEffect, useState} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  useInterpolate,
  useSharedTransition,
} from '../../../app/hooks/reanimated';
import {execFunc} from '../../../app/utils/helper';

export interface ExpandableViewProps {
  collapsedContent?: React.ReactNode;
  expandedContent?: React.ReactNode;
  initialValue?: boolean;
  toggleExpand?: (expand: boolean) => void;
  getContentHeight?: (height: number) => void;
  style?: StyleProp<ViewStyle>;
  containView?: boolean;
  duration?: number;
}

const ANIMATION_DURATION = 350;

const ExpandableView: React.FC<ExpandableViewProps> = ({
  collapsedContent,
  expandedContent,
  toggleExpand,
  getContentHeight,
  initialValue = false,
  containView = true,
  duration,
  style,
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const expand = useSharedTransition(isExpanded, {
    duration: duration || ANIMATION_DURATION,
  });

  const heightExpand = useInterpolate(expand, [0, 1], [0, contentHeight]);

  const currentExpandHeight = useAnimatedStyle(() => ({
    height: heightExpand.value,
    opacity: expand.value,
  }));

  // Function to toggle the expand/collapse state
  const onToggle = () => {
    setIsExpanded(!isExpanded);
    execFunc(toggleExpand, !isExpanded);
  };

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  }, []);

  useEffect(() => {
    setIsExpanded(initialValue);
  }, [initialValue]);

  useEffect(() => {
    execFunc(getContentHeight, contentHeight);
  }, [contentHeight, getContentHeight]);

  const renderExpandedContent = useCallback(() => {
    return (
      <View onLayout={onLayout} style={styles.hiddenView}>
        {expandedContent}
      </View>
    );
  }, [expandedContent, onLayout]);

  if (!containView) {
    return (
      <>
        {renderExpandedContent()}
        <TouchableOpacity onPress={onToggle}>
          {collapsedContent}
        </TouchableOpacity>
        <Animated.View style={[currentExpandHeight, style]}>
          {expandedContent}
        </Animated.View>
      </>
    );
  }

  return (
    <View style={style}>
      {renderExpandedContent()}
      <TouchableOpacity onPress={onToggle}>{collapsedContent}</TouchableOpacity>
      <Animated.View style={[currentExpandHeight]}>
        {expandedContent}
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  hiddenView: {
    opacity: 0,
    position: 'absolute',
    zIndex: -9999,
  },
});

export default ExpandableView;
