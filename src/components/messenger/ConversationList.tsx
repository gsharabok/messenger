import React, { useState } from "react";
import { Search, Plus, Filter, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  online?: boolean;
  isActive?: boolean;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Simon Williams",
    avatar: "SW",
    lastMessage: "Hey there, I need your help",
    time: "1 minute ago",
    online: true,
    isActive: true
  },
  {
    id: "2",
    name: "Mary Smith",
    avatar: "MS",
    lastMessage: "Thank you for your time!",
    time: "1 minute ago"
  },
  {
    id: "3",
    name: "Barry George",
    avatar: "BG",
    lastMessage: "Thank you, I'll take a look now.",
    time: "Dec 20, 2023",
    online: true
  },
  {
    id: "4",
    name: "Michael Bell",
    avatar: "MB",
    lastMessage: "These are fantastic! Is there a way to check them...",
    time: "Jan 5, 2023"
  },
  {
    id: "5",
    name: "Melissa Nelson",
    avatar: "MN",
    lastMessage: "Thanks a lot for the help, you are very kind!",
    time: "Jan 5, 2023"
  }
];

export function ConversationList() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConversation, setActiveConversation] = useState("1");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleNewConversation = () => {
    toast({
      title: "New Conversation",
      description: "Creating a new conversation...",
    });
  };

  const handleFilterClick = (filter: string) => {
    toast({
      title: "Filter Applied",
      description: `Showing ${filter}`,
    });
  };

  const handleConversationClick = (id: string) => {
    setActiveConversation(id);
    toast({
      title: "Conversation Selected",
      description: `Viewing conversation with ID: ${id}`,
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Messaging</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations"
            className="pl-8 bg-muted/40"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                Open <span className="ml-1">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => toast({ title: "Status Changed", description: "Status set to Open" })}>
                Open
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Status Changed", description: "Status set to Closed" })}>
                Closed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Status Changed", description: "Status set to Pending" })}>
                Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="icon" variant="ghost" onClick={handleNewConversation}>
            <Plus className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilterClick("All conversations")}>
                All conversations
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterClick("Unread conversations")}>
                Unread
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterClick("Flagged conversations")}>
                Flagged
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="px-4 pt-2">
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger
            value="all"
            onClick={() => setActiveTab("all")}
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="sms"
            onClick={() => setActiveTab("sms")}
          >
            SMS
          </TabsTrigger>
          <TabsTrigger
            value="email"
            onClick={() => setActiveTab("email")}
          >
            Email
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ScrollArea className="flex-1">
        <div className="px-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-start gap-3 p-3 rounded-md transition-colors hover:bg-muted/50 cursor-pointer mb-1 relative ${conversation.id === activeConversation ? 'conversation-active' : ''}`}
              onClick={() => handleConversationClick(conversation.id)}
            >
              <Avatar className="h-10 w-10 relative">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground">
                  {conversation.avatar}
                </div>
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                  <span className="text-xs text-muted-foreground">{conversation.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}