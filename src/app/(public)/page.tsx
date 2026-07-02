"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Bed, Bath, Square, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PublicNav } from "@/components/layout/PublicNav";

// Sample featured properties
const FEATURED_PROPERTIES = [
  { 
    id: 1, 
    title: "Modern Glass Villa", 
    price: "$2,450,000", 
    address: "124 Luxury Ave, Beverly Hills, CA", 
    beds: 5, baths: 4.5, sqft: "4,200", 
    status: "For Sale", 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 2, 
    title: "Contemporary Estate", 
    price: "$1,850,000", 
    address: "892 Summit Drive, Austin, TX", 
    beds: 4, baths: 3, sqft: "3,100", 
    status: "For Rent", 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
  },
  { 
    id: 3, 
    title: "Suburban Oasis", 
    price: "$1,250,000", 
    address: "786 Maple Street, Denver, CO", 
    beds: 4, baths: 3.5, sqft: "3,800", 
    status: "For Sale", 
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80" 
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <PublicNav />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex-1 flex flex-col justify-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] opacity-50"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px] opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10 flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 glass border-primary/20 text-primary bg-primary/10 rounded-full text-sm font-medium">
            ✨ The Future of Real Estate
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-balance leading-tight">
            Find your new home, <br className="hidden md:block"/>
            explore your new community
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl text-balance">
            Secure your dream property with Leadhouse. Browse premium listings for living and investments.
          </p>
          
          {/* Search Component */}
          <div className="w-full max-w-3xl glass-card rounded-2xl p-2 md:p-3 flex flex-col md:flex-row gap-3 shadow-2xl border border-white/10 relative z-20">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="e.g. New York, Beverly Hills..." 
                className="w-full pl-10 h-12 bg-transparent border-none shadow-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/70"
              />
            </div>
            <div className="w-full md:w-px h-px md:h-10 bg-white/10 self-center hidden md:block"></div>
            <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-md font-semibold shrink-0">
              Search Properties
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 text-center">
            <div>
              <p className="text-3xl font-bold text-foreground">12.8K+</p>
              <p className="text-sm text-muted-foreground mt-1">Properties Listed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">5,000+</p>
              <p className="text-sm text-muted-foreground mt-1">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">120+</p>
              <p className="text-sm text-muted-foreground mt-1">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="listings" className="py-24 bg-card/30 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Featured Properties</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Explore our handpicked selection of premium real estate options tailored for your lifestyle.
              </p>
            </div>
            <Button variant="outline" className="glass gap-2 rounded-full px-6">
              View All Properties <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROPERTIES.map((property) => (
              <Card key={property.id} className="glass-card border-none shadow-lg overflow-hidden group hover:ring-1 hover:ring-primary/50 transition-all duration-300">
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none px-3 py-1 font-semibold">
                      {property.status}
                    </Badge>
                  </div>
                  <Image 
                    src={property.image} 
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-xl line-clamp-1 group-hover:text-primary transition-colors">{property.title}</h3>
                    <span className="font-bold text-primary text-xl shrink-0">{property.price}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground text-sm mb-6">
                    <MapPin className="h-4 w-4 mr-2 shrink-0" />
                    <span className="line-clamp-1">{property.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-5 text-sm pt-5 border-t border-white/10">
                    <div className="flex items-center gap-2 font-medium">
                      <div className="p-1.5 rounded-md bg-primary/10 text-primary"><Bed className="h-4 w-4" /></div>
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <div className="p-1.5 rounded-md bg-primary/10 text-primary"><Bath className="h-4 w-4" /></div>
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <div className="p-1.5 rounded-md bg-primary/10 text-primary"><Square className="h-4 w-4" /></div>
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <footer className="py-16 border-t border-white/10 bg-background relative z-10 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to find your dream home?</h2>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="inline-flex items-center justify-center whitespace-nowrap text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-14 px-8 py-6 rounded-full">
              Get Started Today
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-12">© 2026 Leadhouse Real Estate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
