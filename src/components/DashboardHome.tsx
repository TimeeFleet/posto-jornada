import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Fuel,
  FileText,
  BarChart3,
  CreditCard,
} from "lucide-react";

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
];

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
            <CardTitle className="text-sm font-medium text-muted-foreground">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.247</div>
            <p className="text-xs text-accent">+15.3% este mês</p>
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
              {menuItems.map((item, index) => (
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
                <p className="font-medium">Cliente cadastrado</p>
                <p className="text-muted-foreground text-xs">há 1h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;