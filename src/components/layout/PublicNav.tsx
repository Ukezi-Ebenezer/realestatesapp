"use client";

import Link from "next/link";
import { Building, Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Rental Listings", href: "#listings" },
  { name: "Local Businesses", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Contact", href: "#" },
];

export function PublicNav() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Building className="h-6 w-6 text-primary" />
          <span>Leadhouse</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }), "hover:bg-white/5")}>
            Log in
          </Link>
          <Link href="/signup" className={cn(buttonVariants({ variant: "default" }), "rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground")}>
            Sign Up
          </Link>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger 
            render={<Button variant="outline" size="icon" className="md:hidden glass border-white/10" />}
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="glass-card border-l border-white/10 bg-background/95 backdrop-blur-xl w-[85vw] sm:w-[380px] p-6 sm:p-8">
            <nav className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link) => (
                <Link key={link.name} href={link.href} className="text-lg font-medium hover:text-primary transition-colors py-1">
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 w-full my-4" />
              <div className="flex flex-col gap-4">
                <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full glass")}>
                  Log in
                </Link>
                <Link href="/signup" className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full bg-primary hover:bg-primary/90 text-primary-foreground")}>
                  Sign Up
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
