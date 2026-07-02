"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Bed, Bath, Square, SlidersHorizontal, Plus } from "lucide-react";
import Image from "next/image";

const properties = [
  { 
    id: 1, 
    title: "Modern Glass Villa", 
    price: "$2,450,000", 
    address: "124 Luxury Ave, Beverly Hills, CA", 
    beds: 5, baths: 4.5, sqft: "4,200", 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 2, 
    title: "Contemporary Estate", 
    price: "$1,850,000", 
    address: "892 Summit Drive, Austin, TX", 
    beds: 4, baths: 3, sqft: "3,100", 
    status: "Pending", 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 3, 
    title: "Minimalist Townhouse", 
    price: "$950,000", 
    address: "45 Riverwalk Blvd, Chicago, IL", 
    beds: 3, baths: 2.5, sqft: "2,400", 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 4, 
    title: "Suburban Oasis", 
    price: "$1,250,000", 
    address: "786 Maple Street, Denver, CO", 
    beds: 4, baths: 3.5, sqft: "3,800", 
    status: "Sold", 
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 5, 
    title: "Lakefront Mansion", 
    price: "$3,200,000", 
    address: "12 Waterway Point, Miami, FL", 
    beds: 6, baths: 5.5, sqft: "5,500", 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 6, 
    title: "Downtown Penthouse", 
    price: "$2,100,000", 
    address: "100 Skyline Way, New York, NY", 
    beds: 2, baths: 2, sqft: "1,800", 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" 
  },
];

import { toast } from "sonner";

export default function PropertiesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground mt-1">View and manage your property portfolio.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2" onClick={() => toast.success("Opening new property wizard...")}>
          <Plus className="h-4 w-4" />
          Add Property
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-2">
        <div className="relative w-full sm:max-w-md flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by address, city, or zip..." className="pl-9 glass bg-background/50" />
        </div>
        <Button variant="outline" className="w-full sm:w-auto glass border-white/10 gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="glass-card border-none shadow-lg overflow-hidden group hover:ring-1 hover:ring-primary/50 transition-all duration-300">
            <div className="relative h-60 w-full overflow-hidden">
              <div className="absolute top-3 left-3 z-10">
                <Badge 
                  variant={property.status === "Active" ? "default" : property.status === "Pending" ? "secondary" : "outline"}
                  className={
                    property.status === "Active" ? "bg-emerald-500/90 text-white hover:bg-emerald-600 border-none shadow-sm backdrop-blur-md" : 
                    property.status === "Pending" ? "bg-amber-500/90 text-white hover:bg-amber-600 border-none shadow-sm backdrop-blur-md" : 
                    "bg-slate-800/90 text-white hover:bg-slate-900 border-none shadow-sm backdrop-blur-md"
                  }
                >
                  {property.status}
                </Badge>
              </div>
              <Image 
                src={property.image} 
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                <span className="font-bold text-primary text-lg">{property.price}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground text-sm mb-4">
                <MapPin className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                <span className="line-clamp-1">{property.address}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm pt-4 border-t border-white/10">
                <div className="flex items-center gap-1.5 font-medium">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span>{property.beds} <span className="text-muted-foreground hidden sm:inline">Beds</span></span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span>{property.baths} <span className="text-muted-foreground hidden sm:inline">Baths</span></span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span>{property.sqft} <span className="text-muted-foreground hidden sm:inline">Sqft</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
