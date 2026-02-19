import { useEffect, useState } from 'react';

interface KeyboardControls {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

export function useKeyboardControls(): KeyboardControls {
  const [controls, setControls] = useState<KeyboardControls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      switch (key) {
        case 'w':
        case 'arrowup':
          setControls((prev) => ({ ...prev, forward: true }));
          break;
        case 's':
        case 'arrowdown':
          setControls((prev) => ({ ...prev, backward: true }));
          break;
        case 'a':
        case 'arrowleft':
          setControls((prev) => ({ ...prev, left: true }));
          break;
        case 'd':
        case 'arrowright':
          setControls((prev) => ({ ...prev, right: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      switch (key) {
        case 'w':
        case 'arrowup':
          setControls((prev) => ({ ...prev, forward: false }));
          break;
        case 's':
        case 'arrowdown':
          setControls((prev) => ({ ...prev, backward: false }));
          break;
        case 'a':
        case 'arrowleft':
          setControls((prev) => ({ ...prev, left: false }));
          break;
        case 'd':
        case 'arrowright':
          setControls((prev) => ({ ...prev, right: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return controls;
}
