import { ClientTopBar } from "@/components/layout/ClientTopBar";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <ClientTopBar />
      <main className="flex-1 overflow-auto p-4 lg:p-8 bg-background relative">
        <div className="mx-auto max-w-6xl w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
