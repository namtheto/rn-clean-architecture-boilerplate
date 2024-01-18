import React from 'react';
import {Path, Svg, G} from 'react-native-svg';
import {vs} from '../../src/app/utils/responsive';

interface InfoIconProps {
  color?: string;
  size?: number;
}

export const IconHome = ({size = 25, color = 'white'}: InfoIconProps) => {
  // render
  return (
    <Svg width={vs(size)} height={vs(size)} viewBox="0 0 25 24" fill={color}>
      <G opacity="1">
        <Path
          d="M11.8861 2.47751L3.88606 8.69973C3.64247 8.88919 3.5 9.18049 3.5 9.48908V20C3.5 20.5304 3.71071 21.0391 4.08579 21.4142C4.46086 21.7893 4.96957 22 5.5 22H8.5C9.05228 22 9.5 21.5523 9.5 21V16C9.5 15.4477 9.94772 15 10.5 15H14.5C15.0523 15 15.5 15.4477 15.5 16V21C15.5 21.5523 15.9477 22 16.5 22H19.5C20.0304 22 20.5391 21.7893 20.9142 21.4142C21.2893 21.0391 21.5 20.5304 21.5 20V9.48908C21.5 9.18049 21.3575 8.88919 21.1139 8.69973L13.1139 2.47751C12.7528 2.19665 12.2472 2.19665 11.8861 2.47751Z"
          fill={color}
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
};
