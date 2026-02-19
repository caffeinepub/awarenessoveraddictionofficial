import { Card, CardContent } from '@/components/ui/card';
import { Keyboard } from 'lucide-react';

export default function ControlsHint() {
  return (
    <Card className="bg-background/80 backdrop-blur-sm">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 text-sm">
          <Keyboard className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">WASD / Arrows to move</span>
        </div>
      </CardContent>
    </Card>
  );
}
