import { Button } from '@/components/ui/button';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to My App</h1>
      <div className="space-y-4">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Click me</Button>
        {/* Test different Tailwind utilities */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-card text-card-foreground shadow-sm">Card 1</div>
          <div className="p-4 rounded-lg bg-muted text-muted-foreground">Card 2</div>
        </div>
      </div>
    </div>
  );
}
