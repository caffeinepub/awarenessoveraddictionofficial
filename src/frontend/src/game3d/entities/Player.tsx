import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Game3DState } from '../types';
import { useKeyboardControls } from '../systems/useKeyboardControls';

interface PlayerProps {
  gameState: Game3DState;
}

export default function Player({ gameState }: PlayerProps) {
  const meshRef = useRef<Mesh>(null);
  const controls = useKeyboardControls();
  const speed = 0.15;
  const bounds = 12;

  useFrame(() => {
    if (!meshRef.current || gameState.status !== 'playing') return;

    const position = meshRef.current.position;
    let moved = false;

    if (controls.forward && position.z > -bounds) {
      position.z -= speed;
      moved = true;
    }
    if (controls.backward && position.z < bounds) {
      position.z += speed;
      moved = true;
    }
    if (controls.left && position.x > -bounds) {
      position.x -= speed;
      moved = true;
    }
    if (controls.right && position.x < bounds) {
      position.x += speed;
      moved = true;
    }

    if (moved) {
      gameState.updatePlayerPosition([position.x, position.y, position.z]);
    }

    // Gentle bobbing animation
    meshRef.current.rotation.y += 0.02;
  });

  return (
    <mesh ref={meshRef} position={gameState.playerPosition} castShadow>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color="#c97a4a" metalness={0.3} roughness={0.7} />
    </mesh>
  );
}
