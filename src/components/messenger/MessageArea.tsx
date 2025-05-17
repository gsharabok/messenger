import React, { useState } from "react";
import { Send, Paperclip, Smile, Edit } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "contact";
  time: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hey, how are you?",
    sender: "contact",
    time: "5 minutes ago"
  },
  {
    id: "2",
    content: "I'm good, thanks! How about you?",
    sender: "user",
    time: "4 minutes ago"
  },
  {
    id: "3",
    content: "Just working on some new projects. Would love to catch up soon!",
    sender: "contact",
    time: "3 minutes ago"
  }
];

export function MessageArea() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: String(Date.now()),
      content: newMessage,
      sender: "user",
      time: "Just now"
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate response
    setTimeout(() => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const response: Message = {
          id: String(Date.now() + 1),
          content: "Thanks for your message! I'll get back to you soon.",
          sender: "contact",
          time: "Just now"
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEditContact = () => {
    toast({
      title: "Edit Contact",
      description: "Opening contact edit form...",
    });
  };

  const handleStartSale = () => {
    toast({
      title: "Sale Started",
      description: "Starting a new sale process...",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              SW
            </div>
          </Avatar>
          <div>
            <h2 className="font-medium">Simon Williams</h2>
            <p className="text-xs text-muted-foreground">3437 Grape Road, Mishawaka, Indiana 5633</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleEditContact}>
          <Edit className="h-4 w-4 mr-2" />
          EDIT
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div className={message.sender === "user" ? "message-bubble-sent" : "message-bubble-received"}>
                {message.content}
              </div>
              <span className="text-xs text-muted-foreground mt-1">{message.time}</span>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start">
              <div className="message-bubble-received typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="mb-2">
          <div className="text-xs text-muted-foreground mb-1">Subject:</div>
          <Input
            placeholder="Enter text"
            className="bg-muted/40"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="relative">
          <Textarea
            placeholder="Enter text"
            className="min-h-[80px] resize-none pr-20 bg-muted/40"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toast({ title: "Attachment", description: "Opening file picker..." })}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toast({ title: "Emoji", description: "Opening emoji picker..." })}
            >
              <Smile className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="h-8 w-8 bg-primary hover:bg-primary/90"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => toast({ title: "Add Content", description: "Opening content menu..." })}
          >
            <span>+</span>
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => toast({ title: "New Email", description: "Creating new email..." })}
            >
              New Email <span>▼</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary/90"
              onClick={handleStartSale}
            >
              START SALE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}