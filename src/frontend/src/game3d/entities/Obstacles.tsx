import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { Game3DState, ObstacleData } from '../types';

interface ObstaclesProps {
  gameState: Game3DState;
}

function Obstacle({ data }: { data: ObstacleData }) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.z += 0.01;
  });

  return (
    <mesh ref={meshRef} position={data.position} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#8b4049"
        emissive="#8b4049"
        emissiveIntensity={0.2}
        metalness={0.4}
        roughness={0.6}
      />
    </mesh>
  );
}

export default function Obstacles({ gameState }: ObstaclesProps) {
  const [obstacles, setObstacles] = useState<ObstacleData[]>([]);
  const lastHitTimeRef = useRef(0);

  useEffect(() => {
    if (gameState.status === 'playing') {
      const initialObstacles: ObstacleData[] = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + Math.PI / 5;
        const radius = 4 + Math.random() * 3;
        const speed = 0.02 + Math.random() * 0.02;
        initialObstacles.push({
          id: `obstacle-${i}`,
          position: [
            Math.cos(angle) * radius,
            0.5,
            Math.sin(angle) * radius,
          ],
          velocity: [
            Math.cos(angle + Math.PI / 2) * speed,
            0,
            Math.sin(angle + Math.PI / 2) * speed,
          ],
        });
      }
      setObstacles(initialObstacles);
      lastHitTimeRef.current = 0;
    }
  }, [gameState.status]);

  useFrame((state) => {
    if (gameState.status !== 'playing') return;

    const bounds = 12;
    const playerPos = new Vector3(...gameState.playerPosition);
    const collisionRadius = 1.0;
    const currentTime = state.clock.getElapsedTime();

    setObstacles((prev) =>
      prev.map((obstacle) => {
        let [x, y, z] = obstacle.position;
        const [vx, vy, vz] = obstacle.velocity;

        x += vx;
        z += vz;

        if (x > bounds || x < -bounds) {
          return { ...obstacle, velocity: [-vx, vy, vz], position: [x, y, z] };
        }
        if (z > bounds || z < -bounds) {
          return { ...obstacle, velocity: [vx, vy, -vz], position: [x, y, z] };
        }

        const obstaclePos = new Vector3(x, y, z);
        const distance = playerPos.distanceTo(obstaclePos);

        if (distance < collisionRadius && currentTime - lastHitTimeRef.current > 1.0) {
          lastHitTimeRef.current = currentTime;
          gameState.loseLife();
        }

        return { ...obstacle, position: [x, y, z] };
      })
    );
  });

  return (
    <group>
      {obstacles.map((obstacle) => (
        <Obstacle key={obstacle.id} data={obstacle} />
      ))}
    </group>
  );
}
