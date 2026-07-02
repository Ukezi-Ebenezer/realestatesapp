"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Filter } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const performanceData = [
  { name: "Jan", sales: 4000, leads: 2400, properties: 2400 },
  { name: "Feb", sales: 3000, leads: 1398, properties: 2210 },
  { name: "Mar", sales: 2000, leads: 9800, properties: 2290 },
  { name: "Apr", sales: 2780, leads: 3908, properties: 2000 },
  { name: "May", sales: 1890, leads: 4800, properties: 2181 },
  { name: "Jun", sales: 2390, leads: 3800, properties: 2500 },
  { name: "Jul", sales: 3490, leads: 4300, properties: 2100 },
];

const sourceData = [
  { name: "Referrals", value: 400 },
  { name: "Organic Search", value: 300 },
  { name: "Social Media", value: 300 },
  { name: "Direct Mail", value: 200 },
];

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#f43f5e'];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Visualize your business performance and growth.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none glass border-white/10 gap-2">
            <Calendar className="h-4 w-4" />
            Last 6 Months
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 flex-1 sm:flex-none">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-card border-none shadow-lg bg-gradient-to-br from-indigo-500/5 to-transparent">
          <CardHeader>
            <CardTitle>Sales vs Leads Overview</CardTitle>
            <CardDescription>Monthly comparison of lead acquisition and closed sales.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  />
                  <Legend iconType="circle" />
                  <Bar dataKey="sales" name="Sales Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="leads" name="New Leads" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-lg bg-gradient-to-br from-amber-500/5 to-transparent">
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Where your highest quality leads are coming from.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
