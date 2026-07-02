"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, MapPin, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewDealPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Deal created successfully!");
    router.push("/dashboard/pipeline");
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/pipeline")} className="hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Deal</h1>
          <p className="text-muted-foreground mt-1">Add a new opportunity to your pipeline.</p>
        </div>
      </div>

      <Card className="glass-card border-none shadow-lg">
        <CardHeader>
          <CardTitle>Deal Details</CardTitle>
          <CardDescription>Enter the information for the new deal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="client">Client Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="client" placeholder="e.g. Harvey Specter" required className="pl-9 glass bg-background/50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="property">Property Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="property" placeholder="e.g. 124 Luxury Ave" required className="pl-9 glass bg-background/50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Deal Value</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="value" type="text" placeholder="e.g. 850,000" required className="pl-9 glass bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Expected Close Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="date" type="date" required className="pl-9 glass bg-background/50" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={() => router.push("/dashboard/pipeline")} className="hover:bg-white/10">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Create Deal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
