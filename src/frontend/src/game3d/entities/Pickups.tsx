import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { type Mesh, Vector3 } from "three";
import type { Game3DState, PickupData } from "../types";

interface PickupsProps {
  gameState: Game3DState;
}

function Pickup({ data }: { data: PickupData }) {
  const meshRef = useRef<Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    if (!meshRef.current || data.collected) return;

    timeRef.current += delta;
    meshRef.current.rotation.y += delta * 2;
    meshRef.current.position.y =
      data.position[1] + Math.sin(timeRef.current * 3) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={data.position} castShadow>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial
        color="#7fb069"
        emissive="#7fb069"
        emissiveIntensity={0.3}
        metalness={0.5}
        roughness={0.3}
      />
    </mesh>
  );
}

export default function Pickups({ gameState }: PickupsProps) {
  const [pickups, setPickups] = useState<PickupData[]>([]);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState.status === "playing") {
      const initialPickups: PickupData[] = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 6 + Math.random() * 4;
        initialPickups.push({
          id: `pickup-${i}`,
          position: [Math.cos(angle) * radius, 0.5, Math.sin(angle) * radius],
          collected: false,
        });
      }
      setPickups(initialPickups);
    }

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [gameState.status]);

  useFrame(() => {
    if (gameState.status !== "playing") return;

    const playerPos = new Vector3(...gameState.playerPosition);
    const collectionRadius = 1.2;

    for (const pickup of pickups) {
      if (!pickup.collected) {
        const pickupPos = new Vector3(...pickup.position);
        const distance = playerPos.distanceTo(pickupPos);

        if (distance < collectionRadius) {
          pickup.collected = true;
          gameState.addScore(10);
          setPickups((prev) =>
            prev.map((p) =>
              p.id === pickup.id ? { ...p, collected: true } : p,
            ),
          );
        }
      }
    }
  });

  return (
    <group>
      {pickups.map((pickup) =>
        !pickup.collected ? <Pickup key={pickup.id} data={pickup} /> : null,
      )}
    </group>
  );
}
