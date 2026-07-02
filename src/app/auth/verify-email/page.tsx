"use client";

import Link from "next/link";
import { MailCheck } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[100px] opacity-50"></div>
      </div>

      <div className="w-full max-w-md">
        <Card className="glass-card border-white/10 shadow-2xl text-center">
          <CardHeader className="space-y-4 pt-10">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <MailCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Check your email</CardTitle>
            <CardDescription className="text-base">
              We've sent a verification link to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10">
            <p className="text-sm text-muted-foreground mb-8">
              Please click the link in the email to verify your account and complete the signup process. If you don't see the email, be sure to check your spam folder.
            </p>
            <Link 
              href="/login" 
              className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg rounded-xl font-medium transition-colors"
            >
              Return to Log In
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
