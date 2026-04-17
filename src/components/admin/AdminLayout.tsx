import { ReactNode, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  Video, 
  Users, 
  LogOut, 
  Menu,
  X,
  ChevronRight,
  ShoppingBag,
  FileText,
  MessageCircle,
  BarChart3,
  Inbox
} from 'lucide-react';
import logoVerde from '@/assets/logo-zapper-verde.svg';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Lead / Form', icon: Inbox },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/models', label: 'Modelli', icon: Package },
  { href: '/admin/interventions', label: 'Interventi', icon: Video },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/admin/chat-logs', label: 'Chat Logs', icon: MessageCircle },
];

const adminOnlyItems = [
  { href: '/admin/users', label: 'Utenti', icon: Users },
  { href: '/admin/partners', label: 'Partner', icon: Users },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { user, profile, isLoading, isContentEditor, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/admin/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading && user && !isContentEditor) {
      navigate('/admin/auth');
    }
  }, [isLoading, user, isContentEditor, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isContentEditor) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/auth');
  };

  const allNavItems = isAdmin ? [...navItems, ...adminOnlyItems] : navItems;

  return (
    <div className="min-h-screen bg-muted">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b z-50 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <img src={logoVerde} alt="Zapper" className="h-8 ml-4" />
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-background border-r z-50 transform transition-transform duration-200",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b">
            <Link to="/admin" className="flex items-center gap-2">
              <img src={logoVerde} alt="Zapper" className="h-8" />
              <span className="font-semibold text-sm text-muted-foreground">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t">
            <div className="mb-3 px-3">
              <p className="text-sm font-medium truncate">{profile?.full_name || profile?.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{profile?.role}</p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Esci
            </Button>
            <Link to="/" className="block mt-2">
              <Button variant="outline" className="w-full text-xs">
                ← Torna al sito
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        {title && (
          <div className="bg-background border-b px-6 py-4">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        )}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
