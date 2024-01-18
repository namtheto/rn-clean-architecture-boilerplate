import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {vs} from '../../src/app/utils/responsive';

interface InfoIconProps {
  color?: string;
  size?: number;
}

export const ChevronLeft = ({size = 20, color = '#06041d'}: InfoIconProps) => {
  // render
  return (
    <Svg width={vs(size)} height={vs(size)} viewBox="0 0 9 17">
      <Path
        id="Shape"
        d="M9,1.293,7.508,0,0,8.5,7.508,17,9,15.707,2.634,8.5Z"
        fill={color}
      />
    </Svg>
  );
};
