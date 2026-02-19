import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Game3DState } from './types';
import Player from './entities/Player';
import Pickups from './entities/Pickups';
import Obstacles from './entities/Obstacles';

interface ThreeGameCanvasProps {
  gameState: Game3DState;
}

export default function ThreeGameCanvas({ gameState }: ThreeGameCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 8, 12], fov: 50 }}
      shadows
      className="absolute inset-0"
    >
      <color attach="background" args={['#1a1410']} />
      <fog attach="fog" args={['#1a1410', 10, 30]} />
      
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#d4a574" />

      {gameState.status === 'playing' && (
        <>
          <Player gameState={gameState} />
          <Pickups gameState={gameState} />
          <Obstacles gameState={gameState} />
        </>
      )}

      {/* Ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#2a1f1a" />
      </mesh>

      {/* Grid helper for visual reference */}
      <gridHelper args={[30, 30, '#3a2f2a', '#2a1f1a']} position={[0, 0.01, 0]} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
