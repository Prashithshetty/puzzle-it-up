
import React from 'react';
import { COLORS } from '../constants';

interface XPBarProps {
  xp: number;
}

const XPBar: React.FC<XPBarProps> = ({ xp }) => {
  return (
    <div style={{ backgroundColor: `${COLORS.primary.yellow}33`, borderColor: `${COLORS.primary.yellow}80` }} className="flex items-center gap-2 border-2 rounded-full px-4 py-2 shadow-sm">
      <span style={{ color: COLORS.primary.yellow }} className="text-2xl font-bold">⭐</span>
      <span style={{ color: '#FFA700' }} className="text-xl font-bold">{xp} XP</span>
    </div>
  );
};

export default XPBar;
