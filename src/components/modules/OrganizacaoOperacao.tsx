import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  FileText, 
  TrendingUp,
  Filter,
  Calendar,
  Bell,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrganizacaoOperacao = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  const pendencias = [
    {
      id: "P001",
      tipo: "NF sem XML",
      cliente: "Transportadora ABC",
      valor: "R$ 1.250,30",
      prazo: "2 dias",
      prioridade: "alta",
      venda: "V123456",
      data: "13/08/2025",
    },
    {
      id: "P002",
      tipo: "Conciliação pendente",
      cliente: "Logística XYZ",
      valor: "R$ 890,50",
      prazo: "5 dias",
      prioridade: "media",
      venda: "V123457",
      data: "14/08/2025",
    },
    {
      id: "P003",
      tipo: "NF rejeitada",
      cliente: "Frota Nacional",
      valor: "R$ 2.150,80",
      prazo: "1 dia",
      prioridade: "critica",
      venda: "V123458",
      data: "15/08/2025",
    },
    {
      id: "P004",
      tipo: "Documentação incompleta",
      cliente: "Express Delivery",
      valor: "R$ 567,20",
      prazo: "3 dias",
      prioridade: "media",
      venda: "V123459",
      data: "14/08/2025",
    },
  ];

  const getPrioridadeBadge = (prioridade: string) => {
    const config = {
      critica: { variant: "destructive" as const, text: "Crítica", color: "bg-red-500" },
      alta: { variant: "destructive" as const, text: "Alta", color: "bg-orange-500" },
      media: { variant: "secondary" as const, text: "Média", color: "bg-yellow-500" },
      baixa: { variant: "secondary" as const, text: "Baixa", color: "bg-green-500" },
    };
    return config[prioridade as keyof typeof config] || config.media;
  };

  const getProgressColor = (prazo: string) => {
    const dias = parseInt(prazo);
    if (dias <= 1) return "bg-red-500";
    if (dias <= 2) return "bg-orange-500";
    if (dias <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const filteredPendencias = filterStatus === "all" 
    ? pendencias 
    : pendencias.filter(p => p.prioridade === filterStatus);

  const handleResolverPendencia = (id: string) => {
    toast({
      title: "Pendência resolvida!",
      description: `Pendência ${id} foi marcada como resolvida.`,
    });
  };

  const handleAlertarGestor = (id: string) => {
    toast({
      title: "Gestor alertado!",
      description: `Notificação enviada ao gestor sobre a pendência ${id}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Painel de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-portal">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">
              {pendencias.filter(p => p.prioridade === "critica").length}
            </div>
            <p className="text-sm text-muted-foreground">Críticas</p>
          </CardContent>
        </Card>
        <Card className="card-portal">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {pendencias.filter(p => p.prioridade === "alta").length}
            </div>
            <p className="text-sm text-muted-foreground">Alta Prioridade</p>
          </CardContent>
        </Card>
        <Card className="card-portal">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {pendencias.filter(p => p.prioridade === "media").length}
            </div>
            <p className="text-sm text-muted-foreground">Média Prioridade</p>
          </CardContent>
        </Card>
        <Card className="card-portal">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {pendencias.filter(p => parseInt(p.prazo) <= 1).length}
            </div>
            <p className="text-sm text-muted-foreground">Vencendo Hoje</p>
          </CardContent>
        </Card>
      </div>

      {/* Painel Principal */}
      <Card className="card-portal">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Painel de Pendências</CardTitle>
              <CardDescription>
                Organize e monitore todas as pendências operacionais
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Relatório
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex space-x-2 mb-6">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              Todas
            </Button>
            <Button
              variant={filterStatus === "critica" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("critica")}
            >
              Críticas
            </Button>
            <Button
              variant={filterStatus === "alta" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("alta")}
            >
              Alta
            </Button>
            <Button
              variant={filterStatus === "media" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("media")}
            >
              Média
            </Button>
          </div>

          {/* Lista de Pendências */}
          <div className="space-y-4">
            {filteredPendencias.map((pendencia) => (
              <Card key={pendencia.id} className="border-l-4" 
                    style={{ borderLeftColor: getPrioridadeBadge(pendencia.prioridade).color }}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    {/* Informações principais */}
                    <div className="lg:col-span-6">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {pendencia.prioridade === "critica" ? (
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium">{pendencia.tipo}</span>
                            <Badge {...getPrioridadeBadge(pendencia.prioridade)}>
                              {getPrioridadeBadge(pendencia.prioridade).text}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{pendencia.cliente}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                            <span>Venda: {pendencia.venda}</span>
                            <span>Data: {pendencia.data}</span>
                            <span className="font-semibold text-accent">{pendencia.valor}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Prazo */}
                    <div className="lg:col-span-2">
                      <div className="text-center">
                        <div className="text-sm font-medium">Prazo</div>
                        <div className={`text-lg font-bold ${
                          parseInt(pendencia.prazo) <= 1 ? 'text-red-500' : 
                          parseInt(pendencia.prazo) <= 2 ? 'text-orange-500' : 'text-green-500'
                        }`}>
                          {pendencia.prazo}
                        </div>
                        <Progress 
                          value={100 - (parseInt(pendencia.prazo) * 20)} 
                          className="h-2 mt-1"
                        />
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="lg:col-span-4">
                      <div className="flex space-x-2 justify-end">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAlertarGestor(pendencia.id)}
                        >
                          <Bell className="w-4 h-4 mr-1" />
                          Alertar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Detalhes
                        </Button>
                        <Button 
                          size="sm" 
                          className="button-portal"
                          onClick={() => handleResolverPendencia(pendencia.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolver
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações Job to be Done, Dores e Ganhos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border-l-4 border-destructive bg-red-50 card-portal">
          <h4 className="font-semibold text-destructive flex items-center mb-3">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Principais Dores
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Perdas de prazo por falta de organização</li>
            <li>• Dificuldade em priorizar tarefas críticas</li>
            <li>• Comunicação falha com gestores</li>
            <li>• Retrabalho por falta de visibilidade</li>
          </ul>
        </div>

        <div className="p-6 border-l-4 border-accent bg-green-50 card-portal">
          <h4 className="font-semibold text-accent flex items-center mb-3">
            <CheckCircle className="w-5 h-5 mr-2" />
            Principais Ganhos
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Visualização clara de todas as pendências</li>
            <li>• Priorização automática por criticidade</li>
            <li>• Alertas proativos sobre prazos</li>
            <li>• Gestão eficiente do tempo</li>
          </ul>
        </div>

        <div className="p-6 border-l-4 border-blue-500 bg-blue-50 card-portal">
          <h4 className="font-semibold text-blue-600 flex items-center mb-3">
            <TrendingUp className="w-5 h-5 mr-2" />
            Job to be Done
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Organizar operação de forma eficiente</li>
            <li>• Garantir cumprimento de prazos</li>
            <li>• Facilitar tomada de decisões</li>
            <li>• Melhorar comunicação da equipe</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrganizacaoOperacao;