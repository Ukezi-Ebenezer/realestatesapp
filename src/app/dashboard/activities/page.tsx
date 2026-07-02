"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, MessageSquare, PhoneCall, Mail, FileText, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    type: "call",
    icon: PhoneCall,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    user: "Sarah Jenkins",
    action: "completed a discovery call with",
    target: "Emma Watson",
    time: "10:30 AM, Today",
    details: "Client is very interested in the Luxury Ave property. Needs to consult with husband.",
    avatar: "SJ"
  },
  {
    id: 2,
    type: "email",
    icon: Mail,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    user: "Mike Ross",
    action: "sent a property brochure to",
    target: "John Doe",
    time: "09:15 AM, Today",
    details: "Sent the updated pricing sheet for the downtown condo units.",
    avatar: "MR"
  },
  {
    id: 3,
    type: "document",
    icon: FileText,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    user: "Rachel Zane",
    action: "uploaded signed contract for",
    target: "124 Luxury Ave",
    time: "Yesterday, 4:45 PM",
    details: "Purchase agreement signed by both parties. Moving to escrow.",
    avatar: "RZ"
  },
  {
    id: 4,
    type: "meeting",
    icon: MessageSquare,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    user: "Jessica Pearson",
    action: "had an in-person meeting with",
    target: "David Miller",
    time: "Yesterday, 2:00 PM",
    details: "Showed 3 properties. Client made an offer on 786 Maple Street.",
    avatar: "JP"
  },
  {
    id: 5,
    type: "status",
    icon: CheckCircle2,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    user: "Louis Litt",
    action: "updated deal stage to 'Closed Won' for",
    target: "Commercial Space",
    time: "May 18, 11:30 AM",
    details: "Finalized the lease agreement for 5 years.",
    avatar: "LL"
  }
];

import { toast } from "sonner";

export default function ActivitiesPage() {
  const exportToCSV = () => {
    const headers = ["User", "Action", "Target", "Time", "Details"];
    const rows = activities.map(act => [
      `"${act.user}"`,
      `"${act.action}"`,
      `"${act.target}"`,
      `"${act.time}"`,
      `"${act.details.replace(/"/g, '""')}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "activity_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Activity log exported successfully");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
          <p className="text-muted-foreground mt-1">Track all interactions and updates across your team.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={exportToCSV}>
          Export Log
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-2">
        <div className="relative w-full sm:max-w-md flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search activities, users, or clients..." className="pl-9 glass bg-background/50" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none glass border-white/10 gap-2">
            <Filter className="h-4 w-4" />
            Type
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none glass border-white/10 gap-2">
            <Filter className="h-4 w-4" />
            Date
          </Button>
        </div>
      </div>

      <Card className="glass-card border-none shadow-lg">
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="p-6 hover:bg-white/[0.02] transition-colors flex gap-4 md:gap-6">
                  <div className={`mt-1 h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${activity.bgColor} ${activity.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <p className="text-base">
                        <span className="font-semibold text-foreground mr-1.5">{activity.user}</span>
                        <span className="text-muted-foreground">{activity.action}</span>
                        <span className="font-medium text-primary ml-1.5">{activity.target}</span>
                      </p>
                      <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">{activity.time}</span>
                    </div>
                    
                    <div className="bg-background/40 rounded-lg p-3 text-sm text-muted-foreground border border-white/5">
                      {activity.details}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
