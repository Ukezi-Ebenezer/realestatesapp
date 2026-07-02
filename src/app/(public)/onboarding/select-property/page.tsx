"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Bed, Bath, Square, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const MOCK_AGENTS = [
  { name: "Sarah Jenkins", role: "Senior Realtor", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80" },
  { name: "Michael Chen", role: "Property Specialist", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80" },
  { name: "Emily Rodriguez", role: "Leasing Agent", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80" },
];

interface Property {
  id: string;
  title: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
  status: string;
  image_url: string;
}

export default function SelectPropertyPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Modal state
  const [selectingAgentFor, setSelectingAgentFor] = useState<Property | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      // Get user
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);

      // Fetch properties
      const { data: propData } = await supabase.from("properties").select("*");
      if (propData) setProperties(propData);

      // Fetch orders if user is logged in
      if (authUser) {
        const { data: orderData } = await supabase.from("orders").select("*, property:properties(*)");
        if (orderData) {
          setOrders(orderData);
        }
      } else {
        // Fallback for visual testing if not logged in
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
          try { setOrders(JSON.parse(storedOrders)); } catch (e) { }
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  const handleToggleOrder = async (property: Property) => {
    if (!user) {
      toast.error("Please log in to manage orders.");
      return;
    }

    const isOrdered = orders.some(o => o.property_id === property.id || (o.property && o.property.id === property.id));

    if (isOrdered) {
      setActionLoading(property.id);
      // Remove order from Supabase
      const { error } = await supabase.from("orders").delete().eq("property_id", property.id).eq("user_id", user.id);

      if (error) {
        toast.error("Failed to remove order.");
      } else {
        setOrders(orders.filter(o => o.property_id !== property.id && (!o.property || o.property.id !== property.id)));
        toast.success("Property removed from orders.");
      }
      setActionLoading(null);
    } else {
      // Open modal to select agent
      setSelectingAgentFor(property);
    }
  };

  const handleSelectAgent = async (agent: typeof MOCK_AGENTS[0]) => {
    if (!selectingAgentFor || !user) return;

    const propertyId = selectingAgentFor.id;
    setActionLoading(propertyId);
    setSelectingAgentFor(null);

    const { data, error } = await supabase.from("orders").insert({
      user_id: user.id,
      property_id: propertyId,
      agent_name: agent.name,
      agent_image: agent.image,
      agent_role: agent.role,
      status: "Active"
    }).select("*, property:properties(*)").single();

    if (error) {
      console.error("Supabase insert error:", error);
      toast.error("Failed to create order. Please try again or contact support.");
    } else {
      setOrders([...orders, data]);
      toast.success("Agent assigned and property added to orders!");
    }
    setActionLoading(null);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/10 px-3 py-1 text-sm rounded-full">
            Step 2 of 2
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Choose Your Property</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the property you are interested in purchasing or renting to set up your personalized dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="flex justify-center p-8 text-muted-foreground col-span-full">Loading properties...</div>
          ) : properties.map((property) => {
            const isOrdered = orders.some(o => o.property_id === property.id || (o.property && o.property.id === property.id));
            const isProcessing = actionLoading === property.id;

            return (
              <Card key={property.id} className="glass-card border-none shadow-xl overflow-hidden flex flex-col group">
                <div className="relative h-56 w-full overflow-hidden shrink-0">
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none">
                      {property.status}
                    </Badge>
                  </div>
                  <Image
                    src={property.image_url || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"}
                    alt={property.title || "Property image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{property.title}</h3>
                  </div>
                  <span className="font-extrabold text-primary text-xl mb-4">{property.price}</span>

                  <div className="flex items-center text-muted-foreground text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1.5 shrink-0" />
                    <span className="line-clamp-1">{property.address}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-white/10 mt-auto mb-6">
                    <div className="flex items-center gap-1 font-medium">
                      <Bed className="h-4 w-4 text-primary/70" /> {property.beds}
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                      <Bath className="h-4 w-4 text-primary/70" /> {property.baths}
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                      <Square className="h-4 w-4 text-primary/70" /> {property.sqft}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleToggleOrder(property)}
                    disabled={isProcessing}
                    className={`w-full gap-2 transition-colors ${isOrdered
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {isProcessing ? "Processing..." : isOrdered ? "Remove from Orders" : "Add to Orders"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => router.push("/client-dashboard")}
            className="px-8 py-6 text-lg rounded-full shadow-lg bg-primary hover:bg-primary/90"
            disabled={orders.length === 0}
          >
            Proceed to Dashboard ({orders.length} {orders.length === 1 ? 'Order' : 'Orders'})
          </Button>
        </div>
      </div>

      {/* Agent Selection Modal */}
      {selectingAgentFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <Card className="glass-card shadow-2xl max-w-lg w-full relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 rounded-full"
              onClick={() => setSelectingAgentFor(null)}
            >
              <X className="h-5 w-5" />
            </Button>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">Assign an Agent</h2>
              <p className="text-muted-foreground mb-6">
                Choose a housing agent to guide you through the process for <strong>{selectingAgentFor.title}</strong>.
              </p>
              <div className="space-y-4">
                {MOCK_AGENTS.map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                    onClick={() => handleSelectAgent(agent)}
                  >
                    <div className="h-14 w-14 rounded-full overflow-hidden relative shrink-0">
                      <Image src={agent.image} alt={agent.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{agent.role}</p>
                    </div>
                    <Button variant="secondary" size="sm" className="shrink-0 group-hover:bg-primary group-hover:text-primary-foreground">
                      Select Agent
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
