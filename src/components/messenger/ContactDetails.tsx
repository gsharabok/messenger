import React, { useState } from "react";
import { ChevronDown, Edit, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function ContactDetails() {
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    tasks: false,
    notes: false,
    units: false,
    files: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEditContact = () => {
    toast({
      title: "Edit Contact",
      description: "Opening contact edit form...",
    });
  };

  return (
    <div className="flex flex-col h-full border-l">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Contact Details</h2>
          <Button variant="ghost" size="sm" onClick={handleEditContact}>
            <Edit className="h-4 w-4 mr-1" />
            EDIT
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Sales</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-xs text-muted-foreground mb-1">First name</h3>
            <p>Simon</p>
          </div>

          <div>
            <h3 className="text-xs text-muted-foreground mb-1">Last Name</h3>
            <p>Williams</p>
          </div>

          <div>
            <h3 className="text-xs text-muted-foreground mb-1">Mobile Phone</h3>
            <p>(423) 546-7733</p>
          </div>

          <div>
            <h3 className="text-xs text-muted-foreground mb-1">Email</h3>
            <p>simon@example.com</p>
          </div>

          <div>
            <h3 className="text-xs text-muted-foreground mb-1">Address</h3>
            <p>3437 Grape Road, Mishawaka, Indiana 5633</p>
          </div>

          <div>
            <h3 className="text-xs text-muted-foreground mb-1">Status</h3>
            <Badge className="bg-primary text-primary-foreground">VERIFIED</Badge>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Tasks</h3>
              <Badge className="bg-destructive text-destructive-foreground rounded-full h-5 w-5 flex items-center justify-center p-0">1</Badge>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto mt-2"
              onClick={() => toggleSection('tasks')}
            >
              {expandedSections.tasks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {expandedSections.tasks && (
              <div className="mt-2 pl-4 border-l-2 border-muted">
                <div className="p-2 bg-muted/40 rounded-md">
                  <p className="text-sm font-medium">Follow up on proposal</p>
                  <p className="text-xs text-muted-foreground">Due: Tomorrow</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium">Note</h3>
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto mt-2"
              onClick={() => toggleSection('notes')}
            >
              {expandedSections.notes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {expandedSections.notes && (
              <div className="mt-2 pl-4 border-l-2 border-muted">
                <p className="text-sm">Client is interested in our premium package. Schedule a demo next week.</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium">Units of Interest</h3>
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto mt-2"
              onClick={() => toggleSection('units')}
            >
              {expandedSections.units ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {expandedSections.units && (
              <div className="mt-2 pl-4 border-l-2 border-muted">
                <ul className="space-y-2">
                  <li className="text-sm">Premium Package</li>
                  <li className="text-sm">Support Add-on</li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium">Files</h3>
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto mt-2"
              onClick={() => toggleSection('files')}
            >
              {expandedSections.files ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {expandedSections.files && (
              <div className="mt-2 pl-4 border-l-2 border-muted">
                <div className="flex items-center justify-between p-2 bg-muted/40 rounded-md mb-2">
                  <span className="text-sm">proposal.pdf</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6"
                    onClick={() => toast({ title: "Download", description: "Downloading proposal.pdf..." })}
                  >
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/40 rounded-md">
                  <span className="text-sm">contract.docx</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6"
                    onClick={() => toast({ title: "Download", description: "Downloading contract.docx..." })}
                  >
                    View
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}