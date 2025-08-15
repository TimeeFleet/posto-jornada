import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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

const menuItems = [
  {
    title: "Processo de abastecimento",
    path: "/dashboard/abastecimento",
    icon: Fuel,
    color: "bg-white/20",
  },
  {
    title: "Faturamento e controle",
    path: "/dashboard/faturamento",
    icon: FileText,
    color: "bg-white/20",
  },
  {
    title: "Organização da operação",
    path: "/dashboard/operacao",
    icon: Settings,
    color: "bg-white/20",
  },
  {
    title: "Gestão de campanhas e promoções",
    path: "/dashboard/campanhas",
    icon: Megaphone,
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
    title: "Cadastro de clientes",
    path: "/dashboard/clientes",
    icon: Users,
    color: "bg-white/20",
  },
  {
    title: "Relatórios gerenciais",
    path: "/dashboard/relatorios",
    icon: FileBarChart,
    color: "bg-white/20",
  },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboardHome = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

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
                  <h2 className="text-lg font-bold">Posto Portal</h2>
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
            {menuItems.map((item, index) => {
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
            <h1 className="text-xl font-semibold text-foreground">
              {isDashboardHome ? "Dashboard Principal" : menuItems.find(item => location.pathname === item.path)?.title}
            </h1>
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
          {isDashboardHome ? (
            <DashboardHome />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-portal">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vendas Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 12.450,30</div>
            <p className="text-xs text-accent">+12.5% vs ontem</p>
          </CardContent>
        </Card>
        
        <Card className="card-portal">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Abastecimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">847</div>
            <p className="text-xs text-accent">+3.2% vs ontem</p>
          </CardContent>
        </Card>
        
        <Card className="card-portal">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendências</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">23</div>
            <p className="text-xs text-muted-foreground">NFs para envio</p>
          </CardContent>
        </Card>
        
        <Card className="card-portal">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estoque Crítico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3 itens</div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-portal lg:col-span-2">
          <CardHeader>
            <CardTitle>Módulos Principais</CardTitle>
            <CardDescription>Acesso rápido às funcionalidades mais utilizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {menuItems.slice(0, 6).map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col space-y-2 hover:bg-accent/10"
                  onClick={() => window.location.href = item.path}
                >
                  <div className={`w-8 h-8 rounded-md ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-xs text-center">{item.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-portal">
          <CardHeader>
            <CardTitle>Últimas Atividades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <div className="text-sm">
                <p className="font-medium">NF enviada</p>
                <p className="text-muted-foreground text-xs">há 5 min</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="text-sm">
                <p className="font-medium">Abastecimento concluído</p>
                <p className="text-muted-foreground text-xs">há 12 min</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="text-sm">
                <p className="font-medium">Estoque baixo detectado</p>
                <p className="text-muted-foreground text-xs">há 1h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;