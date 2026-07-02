"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SettingsRedirect() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    async function checkAndRedirect() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      // Default to client dashboard settings since this is the primary role
      // In production, determine role from user metadata or profiles table
      router.replace("/client-dashboard/settings");
    }
    checkAndRedirect();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
      <p className="text-muted-foreground text-sm animate-pulse">Redirecting to settings...</p>
    </div>
  );
}
