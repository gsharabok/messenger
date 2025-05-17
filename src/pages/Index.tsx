import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to ChatFlow</h1>
        <p className="text-muted-foreground">
          A modern messaging platform for seamless communication
        </p>
        <div className="flex justify-center">
          <Link to="/messenger">
            <Button size="lg" className="gap-2">
              <MessageSquare className="h-5 w-5" />
              Open Messenger
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}