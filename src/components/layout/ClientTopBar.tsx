"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building, LogOut, Settings, HelpCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

const GRADIENTS = [
  "bg-gradient-to-br from-red-500 to-orange-500",
  "bg-gradient-to-br from-blue-500 to-cyan-500",
  "bg-gradient-to-br from-emerald-500 to-teal-500",
  "bg-gradient-to-br from-purple-500 to-pink-500",
  "bg-gradient-to-br from-indigo-500 to-purple-500",
  "bg-gradient-to-br from-rose-400 to-red-500",
  "bg-gradient-to-br from-amber-400 to-orange-500",
];

export function ClientTopBar() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [initials, setInitials] = useState<string>("US");
  const [avatarColor, setAvatarColor] = useState<string>("bg-primary/20 text-primary");

  useEffect(() => {
    const fullName = localStorage.getItem("userFullName");
    if (fullName) {
      const parts = fullName.trim().split(" ");
      const newInitials = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
      setInitials(newInitials.toUpperCase());
    }

    let storedColor = localStorage.getItem("userAvatarColor");
    if (!storedColor) {
      const randomGradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
      storedColor = `${randomGradient} text-white font-medium`;
      localStorage.setItem("userAvatarColor", storedColor);
    }
    setAvatarColor(storedColor);

    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) {
      setAvatarUrl(storedAvatar);
    }
  }, []);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        localStorage.setItem("userAvatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    localStorage.clear();
    router.push("/");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card/50 backdrop-blur-xl px-4 lg:px-6 sticky top-0 z-10">
      <Link href="/client-dashboard" className="flex items-center gap-2 font-bold text-xl">
        <Building className="h-6 w-6 text-primary" />
        <span className="hidden sm:inline">Leadhouse Client Portal</span>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/client-dashboard/orders">
          <Button variant="ghost" className="hidden md:flex font-medium">
            My Orders
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="glass relative">
          <Bell className="h-4 w-4" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleAvatarUpload}
        />

        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-56 glass-card border-none">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                Upload Avatar
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push("/client-dashboard/settings")}>
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push("/dashboard/support")}>
                <HelpCircle className="h-4 w-4" /> Support
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="gap-2 cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-400/10" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
