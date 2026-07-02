"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Video, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

const schedule = [
  {
    id: 1,
    title: "Property Showing: 124 Luxury Ave",
    time: "09:00 AM - 10:30 AM",
    type: "Showing",
    location: "124 Luxury Ave, Beverly Hills",
    client: "Emma Watson",
    color: "bg-emerald-500",
    icon: MapPin
  },
  {
    id: 2,
    title: "Initial Consultation",
    time: "11:00 AM - 11:45 AM",
    type: "Meeting",
    location: "Google Meet",
    client: "John Smith",
    color: "bg-blue-500",
    icon: Video
  },
  {
    id: 3,
    title: "Contract Review",
    time: "01:30 PM - 02:30 PM",
    type: "Internal",
    location: "Office (Room A)",
    client: "Internal Team",
    color: "bg-purple-500",
    icon: User
  },
  {
    id: 4,
    title: "Property Appraisal",
    time: "03:00 PM - 04:00 PM",
    type: "Task",
    location: "892 Summit Drive",
    client: "Appraiser: Tom Davis",
    color: "bg-amber-500",
    icon: MapPin
  },
  {
    id: 5,
    title: "Client Follow-up Calls",
    time: "04:30 PM - 05:30 PM",
    type: "Task",
    location: "Phone",
    client: "Multiple",
    color: "bg-rose-500",
    icon: Clock
  }
];

import { toast } from "sonner";

export default function CalendarPage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-1">Manage your appointments and schedule.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="glass bg-background/50 flex-1 sm:flex-none" onClick={() => toast.info("Jumping to today...")}>Today</Button>
          <Button onClick={() => router.push("/dashboard/calendar/new")} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 flex-1 sm:flex-none">
            <Plus className="h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card border-none shadow-lg min-h-[600px] flex items-center justify-center">
            <div className="text-center">
              <CalendarIcon className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">Full Calendar View</h3>
              <p className="text-sm text-muted-foreground/70 mt-1 max-w-sm">
                A full interactive calendar component would be rendered here in production (e.g., using react-big-calendar or fullcalendar).
              </p>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="glass-card border-none shadow-lg flex-1">
            <CardHeader className="pb-3 border-b border-white/10">
              <CardTitle className="text-lg flex items-center justify-between">
                Schedule for Today
                <Badge variant="secondary" className="bg-primary/20 text-primary border-none">
                  5 Events
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[520px] px-6 py-4">
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  {schedule.map((event) => {
                    const Icon = event.icon;
                    return (
                      <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background ${event.color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl border border-white/5 shadow-md hover:ring-1 hover:ring-primary/30 transition-all cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-primary">{event.time}</span>
                            <Badge variant="outline" className="text-[10px] bg-background/50 h-5 px-1.5">{event.type}</Badge>
                          </div>
                          <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                          <div className="text-xs text-muted-foreground flex flex-col gap-1.5 mt-2">
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1.5" />
                              {event.client}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1.5" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
