"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Bed, Bath, Square, FileText, CheckCircle2, Clock, ArrowLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function OrderDetailsPage() {
  const params = useParams();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        const foundOrder = parsedOrders.find((o: any) => o.property.id.toString() === params.id);
        if (foundOrder) {
          setOrder(foundOrder);
        }
      } catch (e) {
        console.error("Failed to parse orders");
      }
    }
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return <div className="flex h-[50vh] items-center justify-center">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-4">Order Not Found</h2>
        <p className="text-muted-foreground mb-8">
          We couldn't find the details for this order.
        </p>
        <Link href="/client-dashboard/orders" className={cn(buttonVariants({ variant: "default" }), "bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8")}>Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-6xl mx-auto">
      <div>
        <Link href="/client-dashboard/orders" className="flex items-center text-muted-foreground hover:text-primary mb-4 transition-colors w-fit">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Order Details</h1>
        <p className="text-muted-foreground">Order Reference: #{params.id || "ORD-12345"}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Property Details & Docs */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="glass-card border-none shadow-xl overflow-hidden group">
            <div className="relative h-72 w-full overflow-hidden">
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <Badge className="bg-primary/90 backdrop-blur-md text-primary-foreground border-none px-3 py-1 font-semibold">
                  Property
                </Badge>
                <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none px-3 py-1 font-semibold">
                  {order.property.status}
                </Badge>
              </div>
              <Image 
                src={order.property.image_url || order.property.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"} 
                alt={order.property.title || "Property image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
              />
            </div>
            
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <h2 className="font-extrabold text-3xl mb-2">{order.property.title}</h2>
                  <div className="flex items-center text-muted-foreground text-base">
                    <MapPin className="h-4 w-4 mr-2 shrink-0" />
                    <span>{order.property.address}</span>
                  </div>
                </div>
                <span className="font-extrabold text-primary text-3xl shrink-0">{order.property.price}</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm pt-6 mt-6 border-t border-white/10">
                <div className="flex items-center gap-2 font-medium">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary"><Bed className="h-5 w-5" /></div>
                  <div className="flex flex-col"><span className="text-xl font-bold">{order.property.beds}</span><span className="text-muted-foreground text-xs uppercase tracking-wider">Beds</span></div>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary"><Bath className="h-5 w-5" /></div>
                  <div className="flex flex-col"><span className="text-xl font-bold">{order.property.baths}</span><span className="text-muted-foreground text-xs uppercase tracking-wider">Baths</span></div>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary"><Square className="h-5 w-5" /></div>
                  <div className="flex flex-col"><span className="text-xl font-bold">{order.property.sqft}</span><span className="text-muted-foreground text-xs uppercase tracking-wider">Sqft</span></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-none shadow-lg">
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Review and sign documents related to your property.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Purchase Agreement</p>
                    <p className="text-sm text-muted-foreground">Requires your signature</p>
                  </div>
                </div>
                <Button variant="outline" className="glass text-xs">Review</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Initial Deposit Receipt</p>
                    <p className="text-sm text-muted-foreground">Paid on May 12, 2026</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-xs">Download</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Status & Agent */}
        <div className="space-y-8">
          <Card className="glass-card border-none shadow-lg">
            <CardHeader>
              <CardTitle>Transaction Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-primary">Under Contract</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-2 bg-white/5" />
              </div>
              
              <div className="relative pl-6 border-l-2 border-white/10 space-y-6 before:absolute before:inset-y-0 before:left-[-2px] before:border-l-2 before:border-primary before:h-[40%]">
                <div className="relative">
                  <div className="absolute -left-[31px] bg-primary rounded-full p-1 border-4 border-background">
                    <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm">Offer Accepted</h4>
                  <p className="text-xs text-muted-foreground mt-1">May 10, 2026</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] bg-primary rounded-full p-1 border-4 border-background">
                    <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm">Deposit Received</h4>
                  <p className="text-xs text-muted-foreground mt-1">May 12, 2026</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] bg-background border-2 border-primary rounded-full p-1.5">
                    <Clock className="h-2 w-2 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm text-primary">Pending Inspection</h4>
                  <p className="text-xs text-muted-foreground mt-1">Scheduled for May 28, 2026</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] bg-white/10 rounded-full p-2 border-2 border-background">
                  </div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Closing</h4>
                  <p className="text-xs text-muted-foreground mt-1">TBD</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-none shadow-lg">
            <CardHeader>
              <CardTitle>Assigned Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full overflow-hidden relative">
                  <Image src={order.agent.image} alt={order.agent.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{order.agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{order.agent.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="glass w-full text-xs">Call Agent</Button>
                <Button className="w-full text-xs bg-primary hover:bg-primary/90 text-primary-foreground">Message</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
