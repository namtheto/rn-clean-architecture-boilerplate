import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {vs} from '../../src/app/utils/responsive';

interface InfoIconProps {
  color?: string;
  size?: number;
}

export const IconThreeDot = ({size = 25, color = 'white'}: InfoIconProps) => {
  // render
  return (
    <Svg width={vs(size)} height={vs(size)} viewBox="0 0 25 24" fill="none">
      <Path
        d="M14.3672 5.58986C14.3673 5.83514 14.319 6.07804 14.2252 6.30468C14.1315 6.53132 13.9939 6.73727 13.8205 6.91077C13.6472 7.08426 13.4413 7.22191 13.2147 7.31585C12.9881 7.40979 12.7453 7.45818 12.5 7.45826C12.2547 7.45834 12.0118 7.4101 11.7852 7.31631C11.5585 7.22252 11.3526 7.085 11.1791 6.91161C11.0056 6.73823 10.8679 6.53237 10.774 6.30579C10.6801 6.07921 10.6317 5.83634 10.6316 5.59106C10.6314 5.09569 10.8281 4.62054 11.1782 4.27015C11.5284 3.91975 12.0034 3.72282 12.4988 3.72266C12.9942 3.7225 13.4693 3.91913 13.8197 4.2693C14.1701 4.61947 14.367 5.09448 14.3672 5.58986Z"
        fill={color}
      />
      <Path
        d="M12.5 13.8672C13.5312 13.8672 14.3672 13.0312 14.3672 12C14.3672 10.9688 13.5312 10.1328 12.5 10.1328C11.4688 10.1328 10.6328 10.9688 10.6328 12C10.6328 13.0312 11.4688 13.8672 12.5 13.8672Z"
        fill={color}
      />
      <Path
        d="M12.5 20.2793C13.5312 20.2793 14.3672 19.4433 14.3672 18.4121C14.3672 17.3809 13.5312 16.5449 12.5 16.5449C11.4688 16.5449 10.6328 17.3809 10.6328 18.4121C10.6328 19.4433 11.4688 20.2793 12.5 20.2793Z"
        fill={color}
      />
    </Svg>
  );
};