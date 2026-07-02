"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Mail, Phone, Home, DollarSign } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewLeadPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Lead added successfully!");
    router.push("/dashboard/leads");
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/leads")} className="hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Lead</h1>
          <p className="text-muted-foreground mt-1">Enter details for a new prospective client.</p>
        </div>
      </div>

      <Card className="glass-card border-none shadow-lg">
        <CardHeader>
          <CardTitle>Lead Information</CardTitle>
          <CardDescription>Fill out the contact and property preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="e.g. Olivia Martin" required className="pl-9 glass bg-background/50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="e.g. olivia@email.com" required className="pl-9 glass bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" type="tel" placeholder="e.g. (555) 123-4567" required className="pl-9 glass bg-background/50" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <div className="relative">
                  <Home className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="propertyType" placeholder="e.g. Single Family, Condo" required className="pl-9 glass bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="budget" placeholder="e.g. 850,000" required className="pl-9 glass bg-background/50" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => router.push("/dashboard/leads")} className="hover:bg-white/10">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Lead
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
