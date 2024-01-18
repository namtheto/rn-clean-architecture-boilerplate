import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {vs} from '../../src/app/utils/responsive';

interface InfoIconProps {
  color?: string;
  size?: number;
}

export const IconNetwork = ({size = 50, color = 'white'}: InfoIconProps) => {
  // render
  return (
    <Svg
      width={vs(size)}
      height={vs(size)}
      viewBox="0 -960 960 960"
      fill={color}>
      <Path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-43-61v-82q-35 0-59-26t-24-61v-44L149-559q-5 20-7 39.5t-2 39.5q0 130 84.5 227T437-141Zm294-108q22-24 38.5-51t28-56.5q11.5-29.5 17-60.5t5.5-63q0-106-58-192.5T607-799v18q0 35-24 61t-59 26h-87v87q0 17-13.5 28T393-568h-83v88h258q17 0 28 13t11 30v127h43q29 0 51 17t30 44Z" />
    </Svg>
  );
};
