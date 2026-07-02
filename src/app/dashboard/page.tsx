"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Home, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const revenueData = [
  { name: "Jan", total: 1250 },
  { name: "Feb", total: 3100 },
  { name: "Mar", total: 2400 },
  { name: "Apr", total: 4500 },
  { name: "May", total: 3800 },
  { name: "Jun", total: 5200 },
  { name: "Jul", total: 4800 },
];

const recentActivities = [
  { id: 1, user: "Sarah Jenkins", action: "closed a deal", target: "124 Luxury Ave", time: "2 hours ago", avatar: "SJ" },
  { id: 2, user: "Mike Ross", action: "added a new lead", target: "John Doe", time: "4 hours ago", avatar: "MR" },
  { id: 3, user: "Jessica Pearson", action: "scheduled a viewing", target: "45 Riverside Dr", time: "5 hours ago", avatar: "JP" },
  { id: 4, user: "Harvey Specter", action: "sent an offer", target: "789 Pine St", time: "1 day ago", avatar: "HS" },
  { id: 5, user: "Louis Litt", action: "updated property status", target: "12 Sunset Blvd", time: "1 day ago", avatar: "LL" },
  { id: 6, user: "Rachel Zane", action: "uploaded signed contract", target: "124 Luxury Ave", time: "2 days ago", avatar: "RZ" },
  { id: 7, user: "Donna Paulsen", action: "left a note on lead", target: "Emma Smith", time: "2 days ago", avatar: "DP" },
];

export default function DashboardOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-none shadow-lg bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-indigo-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-50">$45,231.89</div>
            <p className="text-xs text-emerald-400 flex items-center mt-1 font-medium">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none shadow-lg bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-50">+2350</div>
            <p className="text-xs text-emerald-400 flex items-center mt-1 font-medium">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none shadow-lg bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties Listed</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Home className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-50">+12,234</div>
            <p className="text-xs text-emerald-400 flex items-center mt-1 font-medium">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none shadow-lg bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <div className="h-8 w-8 rounded-full bg-rose-500/20 flex items-center justify-center">
              <Activity className="h-4 w-4 text-rose-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-50">+573</div>
            <p className="text-xs text-rose-400 flex items-center mt-1 font-medium">
              <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
              -201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 glass-card border-none shadow-lg">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: 'none' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 glass-card border-none shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0 px-6 pb-6">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-6">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/avatars/${activity.id}.png`} alt="Avatar" />
                      <AvatarFallback className="bg-primary/20 text-primary">{activity.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.user}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action} <span className="text-foreground font-medium">{activity.target}</span>
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
