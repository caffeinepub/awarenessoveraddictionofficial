import { Game3DState } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Trophy } from 'lucide-react';
import ControlsHint from './ControlsHint';

interface Game3DOverlayProps {
  gameState: Game3DState;
}

export default function Game3DOverlay({ gameState }: Game3DOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col">
      {/* Top HUD */}
      {gameState.status === 'playing' && (
        <div className="pointer-events-auto flex items-start justify-between p-4">
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{gameState.score}</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart
                    key={i}
                    className={`h-5 w-5 ${
                      i < gameState.lives
                        ? 'fill-destructive text-destructive'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <ControlsHint />
        </div>
      )}

      {/* Center content */}
      <div className="pointer-events-auto flex flex-1 items-center justify-center p-4">
        {gameState.status === 'start' && (
          <Card className="w-full max-w-md bg-background/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-3xl">3D Collection Game</CardTitle>
              <CardDescription className="text-center text-base">
                Collect the green spheres while avoiding the red obstacles!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                <h3 className="font-semibold">How to Play:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use WASD or Arrow Keys to move</li>
                  <li>• Collect green spheres for points</li>
                  <li>• Avoid red obstacles</li>
                  <li>• You have 3 lives</li>
                </ul>
              </div>
              <Button onClick={gameState.startGame} size="lg" className="w-full">
                Start Game
              </Button>
            </CardContent>
          </Card>
        )}

        {gameState.status === 'gameover' && (
          <Card className="w-full max-w-md bg-background/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-3xl">Game Over</CardTitle>
              <CardDescription className="text-center text-base">
                You ran out of lives!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  <Trophy className="mr-2 h-5 w-5" />
                  Final Score: {gameState.score}
                </Badge>
              </div>
              <Button onClick={gameState.restartGame} size="lg" className="w-full">
                Play Again
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
