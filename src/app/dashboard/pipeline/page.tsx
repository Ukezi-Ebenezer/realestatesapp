"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Calendar, DollarSign } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const pipelineStages = [
  {
    id: "new",
    name: "New Leads",
    color: "bg-blue-500",
    value: "$1.2M",
    deals: [
      { id: 1, client: "Emma Watson", property: "124 Luxury Ave", value: "$850,000", date: "Today" },
      { id: 2, client: "John Smith", property: "Condo downtown", value: "$350,000", date: "Yesterday" },
    ]
  },
  {
    id: "contacted",
    name: "Contacted",
    color: "bg-amber-500",
    value: "$2.5M",
    deals: [
      { id: 3, client: "Sarah Jenkins", property: "892 Summit Drive", value: "$1,850,000", date: "2 days ago" },
      { id: 4, client: "Michael Chen", property: "Townhouse", value: "$650,000", date: "3 days ago" },
    ]
  },
  {
    id: "showing",
    name: "Showing",
    color: "bg-purple-500",
    value: "$4.1M",
    deals: [
      { id: 5, client: "David Miller", property: "786 Maple Street", value: "$1,250,000", date: "May 15" },
      { id: 6, client: "Jessica Pearson", property: "Lakefront Mansion", value: "$2,850,000", date: "May 12" },
    ]
  },
  {
    id: "offer",
    name: "Offer Pending",
    color: "bg-rose-500",
    value: "$3.3M",
    deals: [
      { id: 7, client: "Robert Zane", property: "Downtown Penthouse", value: "$2,100,000", date: "May 10" },
      { id: 8, client: "Louis Litt", property: "Suburban Oasis", value: "$1,200,000", date: "May 8" },
    ]
  },
  {
    id: "closed",
    name: "Closed Won",
    color: "bg-emerald-500",
    value: "$5.8M",
    deals: [
      { id: 9, client: "Harvey Specter", property: "Minimalist Townhouse", value: "$950,000", date: "May 1" },
      { id: 10, client: "Donna Paulsen", property: "Commercial Space", value: "$4,850,000", date: "Apr 28" },
    ]
  }
];

export default function PipelinePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let animationFrameId: number;
    const scrollContainer = scrollRef.current;
    let direction = 1;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 0.3 * direction;
        // Reverse direction when hitting bounds
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 1) {
          direction = -1;
        } else if (scrollContainer.scrollLeft <= 0) {
          direction = 1;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline</h1>
          <p className="text-muted-foreground mt-1">Track deals across your sales stages.</p>
        </div>
        <Button 
          onClick={() => router.push("/dashboard/pipeline/new")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="h-4 w-4" />
          New Deal
        </Button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-x-auto pb-6"
        style={{
          scrollbarWidth: "auto",
          scrollbarColor: "hsl(var(--primary)) hsl(var(--muted))"
        }}
      >
        <div className="flex gap-6 h-full min-h-[600px] min-w-max">
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="w-80 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <h3 className="font-semibold">{stage.name}</h3>
                  <Badge variant="secondary" className="ml-1 bg-white/10">{stage.deals.length}</Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign className="h-3.5 w-3.5 mr-1" />
                Total: <span className="text-foreground ml-1">{stage.value}</span>
              </div>

              <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="flex flex-col gap-3 pb-4">
                  {stage.deals.map((deal) => (
                    <Card key={deal.id} className="glass-card border-none shadow-md hover:ring-1 hover:ring-primary/50 transition-all cursor-pointer group">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <Badge variant="outline" className="bg-background/50 text-xs font-normal border-white/10">
                            {deal.value}
                          </Badge>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
                              {deal.client.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">{deal.client}</h4>
                        <p className="text-xs text-muted-foreground mb-3">{deal.property}</p>
                        <div className="flex items-center text-[11px] text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1.5" />
                          {deal.date}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2 border border-dashed border-white/20 text-muted-foreground hover:text-foreground hover:bg-white/5"
                    onClick={() => toast.info(`Adding deal to ${stage.name}...`)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deal
                  </Button>
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
