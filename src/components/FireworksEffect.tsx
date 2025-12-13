import React from 'react';

interface FireworksEffectProps {
  onComplete?: () => void;
  duration?: number;
}

const FireworksEffect: React.FC<FireworksEffectProps> = ({ onComplete, duration = 0 }) => {
  // Only renders the popup overlay, no fireworks logic
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    />
  );
};

export default FireworksEffect;
