"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const leads = [
  { id: "1", name: "Olivia Martin", email: "olivia.martin@email.com", phone: "(555) 123-4567", status: "Hot", propertyType: "Single Family", budget: "$850,000", lastContact: "2 hours ago" },
  { id: "2", name: "Jackson Lee", email: "jackson.lee@email.com", phone: "(555) 987-6543", status: "Warm", propertyType: "Condo", budget: "$450,000", lastContact: "1 day ago" },
  { id: "3", name: "Isabella Nguyen", email: "isabella.nguyen@email.com", phone: "(555) 555-0192", status: "Hot", propertyType: "Townhouse", budget: "$600,000", lastContact: "3 hours ago" },
  { id: "4", name: "William Kim", email: "will@email.com", phone: "(555) 234-5678", status: "Cold", propertyType: "Multi-Family", budget: "$1.2M", lastContact: "5 days ago" },
  { id: "5", name: "Sofia Davis", email: "sofia.davis@email.com", phone: "(555) 876-5432", status: "Warm", propertyType: "Single Family", budget: "$950,000", lastContact: "2 days ago" },
  { id: "6", name: "Liam Wilson", email: "liam.w@email.com", phone: "(555) 111-2222", status: "Hot", propertyType: "Commercial", budget: "$2.5M", lastContact: "1 hour ago" },
];

export default function LeadsPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads Management</h1>
          <p className="text-muted-foreground mt-1">View and manage your prospective clients.</p>
        </div>
        <Button onClick={() => router.push("/dashboard/leads/new")} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <Card className="glass-card border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle>All Leads</CardTitle>
            <CardDescription>A list of all your active leads in the pipeline.</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search leads..." className="pl-8 glass bg-background/50" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-white/10 overflow-hidden bg-card/30 backdrop-blur-sm">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Property Type</TableHead>
                  <TableHead className="text-right">Budget</TableHead>
                  <TableHead className="text-right">Last Contact</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="border-white/10 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {lead.email}</span>
                        <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {lead.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={lead.status === "Hot" ? "default" : lead.status === "Warm" ? "secondary" : "outline"}
                        className={
                          lead.status === "Hot" ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-rose-500/20" : 
                          lead.status === "Warm" ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20" : 
                          "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 border-slate-500/20"
                        }
                      >
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.propertyType}</TableCell>
                    <TableCell className="text-right font-medium">{lead.budget}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{lead.lastContact}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
