import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FileText,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Building2,
  Phone,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Header: React.FC = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("Loading...");
  const [notifications] = useState(3);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUsername(res.data.username);
      } catch (err) {
        setUsername("Guest");
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, []);

  const navigation = [
    { name: "मुख्य पान", nameEn: "Home", href: "/dashboard", icon: Home },
    { name: "फॉर्म्स", nameEn: "Forms", href: "/forms", icon: FileText },
    { name: "सेवा", nameEn: "Services", href: "/services", icon: Building2 },
    { name: "संपर्क", nameEn: "Contact", href: "/contact", icon: Phone }
  ];

  const handleLogout = async () => {
  try {
    await api.post("/api/auth/logout", {}, { withCredentials: true });

    toast({
      title: "लॉगआउट",
      description: "तुम्ही यशस्वीरित्या लॉगआउट झाला आहात",
    });

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    toast({
      title: "त्रुटी",
      description: "लॉगआउट करताना अडचण आली",
      variant: "destructive",
    });
    console.error("Logout failed:", error);
  }
};
  const handleNotificationClick = () => {
    toast({
      title: "सूचना",
      description: "तुमच्याकडे 3 नवीन सूचना आहेत"
    });
  };

  return (
    <header className="bg-card/95 backdrop-blur-sm shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-elegant">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PaperPath</h1>
              <p className="text-xs text-muted-foreground">सरकारी फॉर्म पोर्टल</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/10 border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.name}</span>
                  <span className="lg:hidden">{item.nameEn}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-muted/50">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground hidden sm:block">
                    {username}
                  </span>
                  <ChevronDown className="h-4 w-4 hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-sm">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  प्रोफाइल पहा
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  सेटिंग्ज
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  माझे अर्ज
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  लॉगआउट
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-card/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
