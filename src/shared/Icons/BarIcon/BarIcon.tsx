import React from 'react';

interface IBarIconProps {
  height?: number,
}

export function BarIcon({ height = 285 }: IBarIconProps) {
  return (
    <svg width="77" height={height} viewBox={`0 0 77 ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="77" height={height} fill="#EA8A79"/>
    </svg>
  );
}
