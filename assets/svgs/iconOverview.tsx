import React from 'react';
import {Path, Svg, G} from 'react-native-svg';
import {vs} from '../../src/app/utils/responsive';

interface InfoIconProps {
  color?: string;
  size?: number;
}

export const IconOverview = ({size = 20, color = '#adadbd'}: InfoIconProps) => {
  // render
  return (
    <Svg width={vs(size)} height={vs(size)} viewBox="0 0 23 23">
      <G id="overview_icon" transform="translate(0.5 0.5)">
        <Path
          id="overview_icon-2"
          data-name="overview_icon"
          d="M15.392,22a3.171,3.171,0,0,1-3.17-3.171V15.393a3.171,3.171,0,0,1,3.17-3.17H18.83A3.171,3.171,0,0,1,22,15.393V18.83A3.171,3.171,0,0,1,18.83,22ZM3.17,22A3.17,3.17,0,0,1,0,18.83V15.393a3.17,3.17,0,0,1,3.17-3.17H6.607a3.17,3.17,0,0,1,3.17,3.17V18.83A3.17,3.17,0,0,1,6.607,22ZM15.392,9.779a3.171,3.171,0,0,1-3.17-3.17V3.171A3.171,3.171,0,0,1,15.392,0H18.83A3.171,3.171,0,0,1,22,3.171V6.608a3.171,3.171,0,0,1-3.17,3.17Zm-12.221,0A3.17,3.17,0,0,1,0,6.608V3.171A3.17,3.17,0,0,1,3.17,0H6.607a3.17,3.17,0,0,1,3.17,3.171V6.608a3.17,3.17,0,0,1-3.17,3.17Z"
          fill={color}
          stroke="rgba(0,0,0,0)"
          stroke-miterlimit="10"
          stroke-width="1"
        />
      </G>
    </Svg>
  );
};
