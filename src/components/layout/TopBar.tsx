"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Bell, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "bg-gradient-to-br from-red-500 to-orange-500",
  "bg-gradient-to-br from-blue-500 to-cyan-500",
  "bg-gradient-to-br from-emerald-500 to-teal-500",
  "bg-gradient-to-br from-purple-500 to-pink-500",
  "bg-gradient-to-br from-indigo-500 to-purple-500",
  "bg-gradient-to-br from-rose-400 to-red-500",
  "bg-gradient-to-br from-amber-400 to-orange-500",
];

export function TopBar() {
  const pathname = usePathname();
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

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card/50 backdrop-blur-xl px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
      <Sheet>
        <SheetTrigger
          render={<Button variant="outline" size="icon" className="shrink-0 md:hidden glass" />}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col border-r-0 bg-card/95 backdrop-blur-xl">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Building className="h-6 w-6 text-primary" />
              <span>Leadhouse</span>
            </Link>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto">
            <nav className="grid gap-2 text-lg font-medium">
              {BOTTOM_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search leads, properties..."
              className="w-full appearance-none bg-background/50 pl-8 shadow-none md:w-2/3 lg:w-1/3 glass"
              suppressHydrationWarning
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="icon" className="glass relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="sr-only">Toggle notifications</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-80 glass-card border-white/10">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={() => router.push("/dashboard/properties")} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-sm">New Lead Assigned</span>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <span className="text-xs text-muted-foreground line-clamp-2">Sarah Jenkins has been assigned to you. Follow up within 24 hours.</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/properties")} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-sm">Meeting Reminder</span>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
                <span className="text-xs text-muted-foreground line-clamp-2">You have a property showing at 124 Luxury Ave with Emma Watson.</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleAvatarUpload}
        />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="glass-card border-none">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                Upload Avatar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/support")}>Support</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              localStorage.clear();
              router.push("/");
            }}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
