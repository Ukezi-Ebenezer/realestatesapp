"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, LogOut, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function ClientSettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [initials, setInitials] = useState("US");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();

      // Fallback to local storage if not logged in
      const localName = localStorage.getItem("userFullName") || "";
      const localAvatar = localStorage.getItem("userAvatar") || "";

      setFullName(localName);
      setAvatarUrl(localAvatar);
      updateInitials(localName);

      if (user) {
        setUserId(user.id);
        setEmail(user.email || "");

        // Try to fetch from profiles table
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        if (data) {
          if (data.full_name) {
            setFullName(data.full_name);
            updateInitials(data.full_name);
            localStorage.setItem("userFullName", data.full_name);
          }
          if (data.avatar_url) {
            setAvatarUrl(data.avatar_url);
            localStorage.setItem("userAvatar", data.avatar_url);
          }
        }
      }
      setLoading(false);
    }
    loadProfile();
  }, [supabase]);

  const updateInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length > 0 && parts[0]) {
      const newInitials = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
      setInitials(newInitials.toUpperCase());
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Only JPEG, PNG, GIF, and WebP images are allowed.');
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File must be under 5MB.');
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${userId || 'anon'}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      localStorage.setItem("userAvatar", publicUrl);

      // Optionally update profile table if user is logged in
      if (userId) {
        await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", userId);
      }

      toast.success("Profile picture updated!");

      // Trigger a storage event manually to update TopBar
      window.dispatchEvent(new Event("storage"));

    } catch (error: any) {
      toast.error(error.message || "Error uploading image!");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      localStorage.setItem("userFullName", fullName);
      updateInitials(fullName);

      if (userId) {
        const { error } = await supabase.from("profiles").update({ full_name: fullName }).eq("id", userId);
        if (error) throw error;
      }

      toast.success("Profile details saved!");
      // Trigger a storage event manually to update TopBar
      window.dispatchEvent(new Event("storage"));

    } catch (error: any) {
      toast.error(error.message || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("userRole");
    localStorage.removeItem("selectedProperty");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("userAvatar");
    router.push("/");
  };

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center">Loading settings...</div>;
  }

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-4xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-8">
        <Card className="glass-card border-none shadow-lg">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your avatar to personalize your account.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="bg-primary/20 text-primary text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                variant="outline"
                className="glass gap-2"
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                {uploading ? 'Uploading...' : 'Change Picture'}
              </Button>
              <p className="text-xs text-muted-foreground text-center sm:text-left">
                Recommended size: 256x256px
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-lg">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="glass border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={email}
                disabled
                className="glass border-white/10 opacity-60"
                placeholder="Not available"
              />
              <p className="text-xs text-muted-foreground">Email addresses cannot be changed here.</p>
            </div>
          </CardContent>
          <CardFooter className="border-t border-white/5 pt-6">
            <Button onClick={handleSaveProfile} disabled={saving} className="gap-2">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-red-500/20 bg-red-500/5 shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-500">Account Actions</CardTitle>
            <CardDescription>Important actions for your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Logging out will end your current session and securely sign you out of the client portal.
            </p>
            <Button variant="destructive" onClick={handleLogout} className="gap-2 bg-red-500 hover:bg-red-600">
              <LogOut className="h-4 w-4" /> Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
