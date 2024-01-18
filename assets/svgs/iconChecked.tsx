import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {vs} from '../../src/app/utils/responsive';

interface InfoIconProps {
  color?: string;
  size?: number;
}

export const IconChecked = ({size = 20, color = 'white'}: InfoIconProps) => {
  // render
  return (
    <Svg width={vs(size)} height={vs(size)} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5 10.6665L7.85714 13.3332L15 6.6665"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
