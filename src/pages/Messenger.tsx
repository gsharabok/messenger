import React from "react";
import { ConversationList } from "@/components/messenger/ConversationList";
import { MessageArea } from "@/components/messenger/MessageArea";
import { ContactDetails } from "@/components/messenger/ContactDetails";
import { useMediaQuery } from "@/hooks/use-mobile";

export function Messenger() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeView, setActiveView] = React.useState<"conversations" | "messages" | "details">("conversations");
  
  // On desktop, show all panels
  if (!isMobile) {
    return (
      <div className="flex h-screen">
        <div className="w-1/4 min-w-[280px] max-w-[350px]">
          <ConversationList />
        </div>
        <div className="flex-1">
          <MessageArea />
        </div>
        <div className="w-1/4 min-w-[280px] max-w-[350px]">
          <ContactDetails />
        </div>
      </div>
    );
  }
  
  // On mobile, show only one panel at a time
  return (
    <div className="h-screen">
      {activeView === "conversations" && (
        <div className="h-full">
          <ConversationList />
          <div className="fixed bottom-4 right-4">
            <button 
              onClick={() => setActiveView("messages")}
              className="bg-primary text-white p-4 rounded-full shadow-lg"
            >
              New Message
            </button>
          </div>
        </div>
      )}
      
      {activeView === "messages" && (
        <div className="h-full">
          <div className="flex items-center p-2 bg-muted/50">
            <button 
              onClick={() => setActiveView("conversations")}
              className="p-2 rounded-md hover:bg-muted"
            >
              Back
            </button>
          </div>
          <MessageArea />
          <div className="fixed top-4 right-4">
            <button 
              onClick={() => setActiveView("details")}
              className="bg-secondary p-2 rounded-md shadow-md"
            >
              Details
            </button>
          </div>
        </div>
      )}
      
      {activeView === "details" && (
        <div className="h-full">
          <div className="flex items-center p-2 bg-muted/50">
            <button 
              onClick={() => setActiveView("messages")}
              className="p-2 rounded-md hover:bg-muted"
            >
              Back
            </button>
          </div>
          <ContactDetails />
        </div>
      )}
    </div>
  );
}