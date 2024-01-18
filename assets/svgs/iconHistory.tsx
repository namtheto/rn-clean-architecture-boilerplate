import React from 'react';
import {Path, Svg, G} from 'react-native-svg';
import {vs} from '../../src/app/utils/responsive';

interface InfoIconProps {
  color?: string;
  size?: number;
}

export const IconHistory = ({size = 25, color = 'white'}: InfoIconProps) => {
  // render
  return (
    <Svg width={vs(size)} height={vs(size)} viewBox="0 0 25 24" fill="none">
      <G opacity="1">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.5 12C21.5 7.0293 17.4707 3 12.5 3C7.52931 3 3.50001 7.0293 3.50001 12C3.49801 13.4786 3.86159 14.9348 4.55841 16.239L3.50001 21L8.26281 19.9425C9.56639 20.639 11.022 21.0023 12.5 21C17.4707 21 21.5 16.9707 21.5 12ZM12.8601 7.49965C12.8601 7.0523 12.4974 6.68965 12.0501 6.68965C11.6027 6.68965 11.2401 7.0523 11.2401 7.49965V12.8996C11.2401 13.347 11.6027 13.7096 12.0501 13.7096H17.4501C17.8974 13.7096 18.2601 13.347 18.2601 12.8996C18.2601 12.4523 17.8974 12.0896 17.4501 12.0896H12.8601V7.49965Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};
