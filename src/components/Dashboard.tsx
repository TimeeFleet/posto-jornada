import { useState, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Fuel,
  FileText,
  Upload,
  Settings,
  Megaphone,
  BarChart3,
  Package,
  CreditCard,
  Users,
  Wrench,
  Calendar,
  Shield,
  FileBarChart,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WhatsAppFloat from "./WhatsAppFloat";
import BannerSlide from "./BannerSlide";

const menuItems = [
  {
    title: "Dashboard Principal",
    path: "/dashboard/home",
    icon: BarChart3,
    color: "bg-white/20",
  },
  {
    title: "Processo de abastecimento",
    path: "/dashboard/abastecimento",
    icon: Fuel,
    color: "bg-white/20",
  },
  {
    title: "Recolha de NF",
    path: "/dashboard/recolha-nf",
    icon: FileText,
    color: "bg-white/20",
  },
  {
    title: "Gestão de indicadores e resultados",
    path: "/dashboard/indicadores",
    icon: BarChart3,
    color: "bg-white/20",
  },
  {
    title: "Gestão financeira",
    path: "/dashboard/financeiro",
    icon: CreditCard,
    color: "bg-white/20",
  },
  {
    title: "Negociação de Desconto",
    path: "/dashboard/negociacao-desconto",
    icon: Package,
    color: "bg-white/20",
  },
  {
    title: "Transações",
    path: "/dashboard/transacoes",
    icon: FileBarChart,
    color: "bg-white/20",
  },
];

// Módulos que o Caixa pode acessar
const caixaAllowedPaths = ["/dashboard/abastecimento", "/dashboard/recolha-nf"];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, isGerente, isCaixa, loading } = useUserRole();

  const filteredMenuItems = useMemo(() => {
    if (isCaixa) {
      return menuItems.filter(item => caixaAllowedPaths.includes(item.path));
    }
    return menuItems;
  }, [isCaixa]);

  const isDashboardHome = location.pathname === "/dashboard/home";

  const handleLogout = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className={`sidebar-portal transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-16'} flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-primary-foreground/20">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-accent rounded-lg flex items-center justify-center">
                  <Fuel className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Posto eFleet</h2>
                  <p className="text-xs text-primary-foreground/70">Sistema de Gestão</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {filteredMenuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={index}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left p-3 h-auto ${
                    isActive 
                      ? "bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20" 
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <div className={`w-8 h-8 rounded-md ${item.color} flex items-center justify-center mr-3 ${!sidebarOpen && 'mr-0'}`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  {sidebarOpen && (
                    <span className="flex-1 text-sm font-medium">{item.title}</span>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Banners Section */}
          {sidebarOpen && (
            <div className="mt-6 px-2">
              <BannerSlide />
            </div>
          )}
        </ScrollArea>

        {/* User Section */}
        <div className="p-4 border-t border-primary-foreground/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-accent-foreground" />
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-primary-foreground">João Silva</p>
                <p className="text-xs text-primary-foreground/70">Gerente</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-foreground">
                {isDashboardHome ? "Dashboard Principal" : filteredMenuItems.find(item => location.pathname === item.path)?.title}
              </h1>
              {!isDashboardHome && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/dashboard/home")}
                  className="text-sm"
                >
                  ← Voltar ao Dashboard
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {isDashboardHome ? "Visão geral do sistema" : "Gestão e controle"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Online
            </Badge>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
      
      {/* WhatsApp Float Button */}
      <WhatsAppFloat />
    </div>
  );
};

export default Dashboard;