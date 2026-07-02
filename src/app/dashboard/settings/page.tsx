"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().max(160, "Bio must be at most 160 characters.").optional(),
});

const accountFormSchema = z.object({
  brokerageName: z.string().min(1, "Brokerage name is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  language: z.string(),
});

const notificationsFormSchema = z.object({
  emailAlerts: z.boolean().default(false).optional(),
  smsNotifications: z.boolean().default(false).optional(),
  newLeadAlerts: z.boolean().default(false).optional(),
});

export default function SettingsPage() {
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Morgan",
      email: "alex@leadhouse.app",
      phone: "(555) 123-4567",
      bio: "Top producing agent specializing in luxury properties.",
    },
  });

  const {
    register: registerAccount,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors },
  } = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      brokerageName: "Premier Realty Group",
      licenseNumber: "RE-12345678",
      language: "English",
    },
  });

  const {
    register: registerNotifications,
    handleSubmit: handleNotificationsSubmit,
    setValue: setNotificationValue,
    watch: watchNotifications,
  } = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailAlerts: true,
      smsNotifications: true,
      newLeadAlerts: true,
    },
  });

  const emailAlerts = watchNotifications("emailAlerts");
  const smsNotifications = watchNotifications("smsNotifications");
  const newLeadAlerts = watchNotifications("newLeadAlerts");

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    // TODO: Implement server-side profile update
  }

  function onAccountSubmit(values: z.infer<typeof accountFormSchema>) {
    // TODO: Implement server-side account update
  }

  function onNotificationsSubmit(values: z.infer<typeof notificationsFormSchema>) {
    // TODO: Implement server-side notification preferences update
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-3xl font-bold tracking-tight">Settings</h3>
        <p className="text-muted-foreground text-lg">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8 p-1 bg-card/50 backdrop-blur-xl border">
          <TabsTrigger value="profile" className="rounded-md">Profile</TabsTrigger>
          <TabsTrigger value="account" className="rounded-md">Account</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-md">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="animate-in fade-in-50 duration-500">
          <Card className="glass-card border-none shadow-lg">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" className="glass bg-background/50" {...registerProfile("name")} />
                    {profileErrors.name && <p className="text-sm text-destructive">{profileErrors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" className="glass bg-background/50" {...registerProfile("email")} />
                    {profileErrors.email && <p className="text-sm text-destructive">{profileErrors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Your phone number" className="glass bg-background/50" {...registerProfile("phone")} />
                    {profileErrors.phone && <p className="text-sm text-destructive">{profileErrors.phone.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="A short bio" className="glass bg-background/50" {...registerProfile("bio")} />
                  <p className="text-sm text-muted-foreground">This will be displayed on your public profile.</p>
                  {profileErrors.bio && <p className="text-sm text-destructive">{profileErrors.bio.message}</p>}
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md">
                  Save Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="animate-in fade-in-50 duration-500">
          <Card className="glass-card border-none shadow-lg">
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                Update your brokerage and license information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAccountSubmit(onAccountSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="brokerageName">Brokerage Name</Label>
                    <Input id="brokerageName" placeholder="Brokerage Name" className="glass bg-background/50" {...registerAccount("brokerageName")} />
                    {accountErrors.brokerageName && <p className="text-sm text-destructive">{accountErrors.brokerageName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input id="licenseNumber" placeholder="License Number" className="glass bg-background/50" {...registerAccount("licenseNumber")} />
                    {accountErrors.licenseNumber && <p className="text-sm text-destructive">{accountErrors.licenseNumber.message}</p>}
                  </div>
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md">
                  Save Account Details
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="animate-in fade-in-50 duration-500">
          <Card className="glass-card border-none shadow-lg">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive alerts and updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationsSubmit(onNotificationsSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-row items-center justify-between rounded-xl border border-white/10 p-5 bg-card/50 glass hover:bg-card/70 transition-colors">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive daily summaries and important updates via email.
                      </p>
                    </div>
                    <Switch
                      checked={emailAlerts}
                      onCheckedChange={(checked) => setNotificationValue("emailAlerts", checked)}
                    />
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-xl border border-white/10 p-5 bg-card/50 glass hover:bg-card/70 transition-colors">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get immediate text messages for urgent matters.
                      </p>
                    </div>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={(checked) => setNotificationValue("smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex flex-row items-center justify-between rounded-xl border border-white/10 p-5 bg-card/50 glass hover:bg-card/70 transition-colors">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">New Lead Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Instantly notify me when a new lead is captured.
                      </p>
                    </div>
                    <Switch
                      checked={newLeadAlerts}
                      onCheckedChange={(checked) => setNotificationValue("newLeadAlerts", checked)}
                    />
                  </div>
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md">
                  Save Preferences
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
