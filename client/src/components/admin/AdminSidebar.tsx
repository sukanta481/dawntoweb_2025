import { Button } from "@/components/ui/button";
import { LayoutDashboard, Mail, FileText, LogOut } from "lucide-react";
import { useLocation } from "wouter";

interface AdminSidebarProps {
  isOpen: boolean;
  onLogout: () => void;
}

export default function AdminSidebar({ isOpen, onLogout }: AdminSidebarProps) {
  const [, setLocation] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Mail, label: "Leads", path: "/admin/leads" },
    { icon: FileText, label: "Blog Posts", path: "/admin/blog" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-card border-r w-64`}
    >
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-2">
            <img src="/assets/images/logo.png" alt="DawnToWeb Logo" className="h-8 w-auto" />
            <h2 className="text-2xl font-bold">DawnToWeb</h2>
          </div>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={window.location.pathname.startsWith(item.path) ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setLocation(item.path)}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
