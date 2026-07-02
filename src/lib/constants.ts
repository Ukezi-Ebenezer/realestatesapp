import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  BarChart3,
  Settings,
  Layers,
  PhoneCall
} from "lucide-react";

export const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Pipeline", href: "/dashboard/pipeline", icon: Layers },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Properties", href: "/dashboard/properties", icon: Building2 },
  { name: "Activities", href: "/dashboard/activities", icon: PhoneCall },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

export const BOTTOM_NAV_ITEMS = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];
