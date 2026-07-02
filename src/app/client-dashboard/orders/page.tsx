"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function OrdersDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchOrders() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);

      if (authUser) {
        // Fetch orders and join with properties
        const { data: orderData, error } = await supabase
          .from("orders")
          .select("*, property:properties(*)")
          .eq("user_id", authUser.id)
          .order('created_at', { ascending: false });

        if (orderData) {
          setOrders(orderData);
        } else if (error) {
          toast.error("Failed to load orders");
        }
      } else {
        // Fallback
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
          try { setOrders(JSON.parse(storedOrders)); } catch (e) {}
        }
      }
      setIsLoading(false);
    }
    
    fetchOrders();
  }, [supabase]);

  const handleRemoveOrder = async (e: React.MouseEvent, orderId: string, propertyId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (user) {
      // Delete from DB
      const { error } = await supabase.from("orders").delete().eq("id", orderId).eq("user_id", user.id);
      if (error) {
        toast.error("Failed to remove order from database.");
        return;
      }
      toast.success("Order removed from database.");
    } else {
      toast.success("Order removed locally.");
    }

    const updatedOrders = orders.filter(o => o.id !== orderId);
    setOrders(updatedOrders);
    
    // Also remove from local storage if it was there
    if (!user) {
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }
  };

  if (isLoading) {
    return <div className="flex h-[50vh] items-center justify-center text-muted-foreground">Loading orders...</div>;
  }

  const totalOrders = orders.length;

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Orders</h1>
          <p className="text-muted-foreground">Manage and track all your property transactions.</p>
        </div>
        <Link href="/onboarding/select-property">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md">
            Browse More Properties
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-none shadow-lg md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Active Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Active Orders</h2>
        {orders.length === 0 ? (
          <Card className="glass-card border-dashed border-2 bg-transparent">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
              <h3 className="font-bold text-xl mb-2">No Active Orders</h3>
              <p className="text-muted-foreground mb-6">You haven't selected any properties to purchase or rent yet.</p>
              <Link href="/onboarding/select-property">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">Browse Properties</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => {
              const property = order.property || {};
              // For backwards compatibility with local storage structure
              const agentName = order.agent_name || (order.agent && order.agent.name) || "Assigned Agent";
              const agentImage = order.agent_image || (order.agent && order.agent.image) || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80";

              return (
                <Link key={order.id} href={`/client-dashboard/orders/${property.id}`} className="block group">
                  <Card className="glass-card border-none shadow-md transition-all hover:shadow-xl hover:bg-white/5">
                    <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                        <Image 
                          src={property.image_url || property.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"} 
                          alt={property.title || "Property"} 
                          fill 
                          className="object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground border-none">{order.status || 'Active'}</Badge>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{property.title}</h3>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-4 w-4 mr-1 shrink-0" />
                          <span>{property.address}</span>
                        </div>
                        <div className="font-extrabold text-lg">{property.price}</div>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-black/20 p-3 rounded-lg sm:max-w-[220px] w-full">
                        <div className="h-10 w-10 rounded-full overflow-hidden relative shrink-0">
                          <Image src={agentImage} alt={agentName} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground">Assigned Agent</div>
                          <div className="font-semibold text-sm truncate">{agentName}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 sm:ml-auto shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
                        <div className="flex items-center justify-center sm:justify-end gap-2 text-primary font-medium w-full sm:w-auto p-2">
                          View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={(e) => handleRemoveOrder(e, order.id, property.id)}
                          className="w-full sm:w-auto bg-destructive/80 hover:bg-destructive text-white"
                        >
                          Remove Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
