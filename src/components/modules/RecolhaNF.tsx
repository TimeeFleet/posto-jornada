import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle, Clock, FileText, Upload, RefreshCw, BarChart3, AlertCircle, Eye, ArrowRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RecolhaNF = () => {
  const [selectedNF, setSelectedNF] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("todas");
  const [reportOpen, setReportOpen] = useState(false);
  const { toast } = useToast();

  // Dados de notas fiscais
  const notasFiscais = [
    { id: "NF001", valor: "R$ 2.450,30", cliente: "Transportadora ABC", data: "2024-01-15", status: "pendente", xml: false },
    { id: "NF002", valor: "R$ 1.890,75", cliente: "Logística XYZ", data: "2024-01-15", status: "enviada", xml: true },
    { id: "NF003", valor: "R$ 3.200,00", cliente: "Frota Brasil", data: "2024-01-14", status: "validada", xml: true },
    { id: "NF004", valor: "R$ 950,40", cliente: "Express Delivery", data: "2024-01-14", status: "pendente", xml: false },
  ];

  // Dados de pendências operacionais
  const pendencias = [
    {
      id: "P001",
      tipo: "Validação de NF",
      cliente: "Transportadora ABC",
      valor: "R$ 2.450,30",
      prazo: "2 horas",
      prioridade: "crítica",
      venda: "V12345",
      data: "15/01/2024 08:30"
    },
    {
      id: "P002", 
      tipo: "Anexar XML",
      cliente: "Express Delivery",
      valor: "R$ 950,40",
      prazo: "4 horas",
      prioridade: "alta",
      venda: "V12346",
      data: "15/01/2024 09:15"
    },
    {
      id: "P003",
      tipo: "Conciliação",
      cliente: "Frota Brasil",
      valor: "R$ 3.200,00", 
      prazo: "1 dia",
      prioridade: "média",
      venda: "V12347",
      data: "14/01/2024 16:45"
    },
    {
      id: "P004",
      tipo: "Envio SEFAZ",
      cliente: "Logística XYZ",
      valor: "R$ 1.890,75",
      prazo: "30 min",
      prioridade: "crítica",
      venda: "V12348", 
      data: "15/01/2024 10:20"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="destructive">Pendente</Badge>;
      case "enviada":
        return <Badge variant="default">Enviada</Badge>;
      case "validada":
        return <Badge variant="secondary">Validada</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "crítica":
        return { variant: "destructive" as const, color: "text-red-600", icon: AlertTriangle };
      case "alta": 
        return { variant: "default" as const, color: "text-orange-600", icon: AlertCircle };
      case "média":
        return { variant: "secondary" as const, color: "text-yellow-600", icon: Clock };
      default:
        return { variant: "outline" as const, color: "text-gray-600", icon: Clock };
    }
  };

  const getProgressColor = (prazo: string) => {
    if (prazo.includes("min") || prazo.includes("hora")) {
      return "bg-red-500";
    } else if (prazo.includes("dia")) {
      return "bg-yellow-500"; 
    }
    return "bg-green-500";
  };

  const filteredPendencias = pendencias.filter(pendencia => {
    if (filterStatus === "todas") return true;
    return pendencia.prioridade === filterStatus;
  });

  const handleEnviarNF = (id: string) => {
    toast({
      title: "Nota Fiscal Enviada",
      description: `NF ${id} foi enviada com sucesso para o SEFAZ.`,
    });
  };

  const handleResolverPendencia = (id: string) => {
    toast({
      title: "Pendência Resolvida",
      description: `Pendência ${id} foi marcada como resolvida.`,
    });
  };

  const handleAlertarGestor = (id: string) => {
    toast({
      title: "Gestor Alertado", 
      description: `Alerta enviado ao gestor sobre a pendência ${id}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Métricas - Removido prioridades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total de NFs</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Processadas Hoje</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recolha de NF</CardTitle>
              <CardDescription>
                Gestão integrada de notas fiscais e pendências operacionais
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              <Button variant="outline" size="sm" onClick={() => setReportOpen(true)}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Relatório
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="pendencias" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pendencias">Notas Fiscais</TabsTrigger>
              <TabsTrigger value="conciliacao">Conciliação</TabsTrigger>
            </TabsList>

            <TabsContent value="pendencias" className="space-y-4">
              {/* Filtros - Removido filtros de prioridade */}
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  className="capitalize"
                >
                  Todas as NFs
                </Button>
              </div>

              {/* Lista simplificada de NFs para envio */}
              <div className="space-y-3">
                {notasFiscais.map((nf) => (
                  <Card key={nf.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{nf.id}</h4>
                              {getStatusBadge(nf.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {nf.cliente} • {nf.data}
                            </p>
                            <p className="text-sm font-medium">{nf.valor}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {!nf.xml && (
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-1" />
                              XML
                            </Button>
                          )}
                          {nf.status === "pendente" && (
                            <Button 
                              size="sm"
                              onClick={() => handleEnviarNF(nf.id)}
                            >
                              Enviar
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => setSelectedNF(nf.id)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notas" className="space-y-4">
              <div className="space-y-3">
                {notasFiscais.map((nf) => (
                  <Card key={nf.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{nf.id}</h4>
                              {getStatusBadge(nf.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {nf.cliente} • {nf.data}
                            </p>
                            <p className="text-sm font-medium">{nf.valor}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {!nf.xml && (
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-1" />
                              XML
                            </Button>
                          )}
                          {nf.status === "pendente" && (
                            <Button 
                              size="sm"
                              onClick={() => handleEnviarNF(nf.id)}
                            >
                              Enviar
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="conciliacao" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">R$ 8.491,45</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Conciliado</p>
                    <p className="text-2xl font-bold text-green-600">R$ 6.140,75</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Pendente</p>
                    <p className="text-2xl font-bold text-yellow-600">R$ 2.350,70</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Divergente</p>
                    <p className="text-2xl font-bold text-red-600">R$ 0,00</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-4">Itens Pendentes de Conciliação</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">NF001 - Transportadora ABC</p>
                        <p className="text-sm text-muted-foreground">Aguardando confirmação do pagamento</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">R$ 2.450,30</span>
                        <Button variant="outline" size="sm">Ver</Button>
                        <Button size="sm">Conciliar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog - Visualizar NF */}
      <Dialog open={!!selectedNF} onOpenChange={() => setSelectedNF(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Nota Fiscal {selectedNF}
            </DialogTitle>
            <DialogDescription>Detalhes completos da nota fiscal</DialogDescription>
          </DialogHeader>
          {(() => {
            const nf = notasFiscais.find(n => n.id === selectedNF);
            if (!nf) return null;
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Número</p>
                    <p className="font-medium">{nf.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(nf.status)}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cliente</p>
                    <p className="font-medium">{nf.cliente}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Emissão</p>
                    <p className="font-medium">{nf.data}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="font-semibold text-lg">{nf.valor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">XML Anexado</p>
                    {nf.xml ? (
                      <Badge variant="secondary" className="bg-accent/15 text-accent">
                        <CheckCircle className="w-3 h-3 mr-1" /> Sim
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <X className="w-3 h-3 mr-1" /> Não
                      </Badge>
                    )}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Chave de Acesso</p>
                  <p className="text-xs font-mono bg-muted p-2 rounded break-all">
                    3524 0108 7654 3210 0012 5500 1000 0000 {nf.id.replace("NF", "")} 1234 5678 9012
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  {!nf.xml && (
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-1" /> Anexar XML
                    </Button>
                  )}
                  {nf.status === "pendente" && (
                    <Button size="sm" onClick={() => { handleEnviarNF(nf.id); setSelectedNF(null); }}>
                      Enviar <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Dialog - Relatório */}
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Relatório de Notas Fiscais
            </DialogTitle>
            <DialogDescription>Resumo operacional do período</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Resumo */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total NFs</p>
                  <p className="text-2xl font-bold">{notasFiscais.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Enviadas</p>
                  <p className="text-2xl font-bold text-accent">
                    {notasFiscais.filter(n => n.status === "enviada" || n.status === "validada").length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold text-destructive">
                    {notasFiscais.filter(n => n.status === "pendente").length}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Valor total */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Valor Total Faturado</p>
                <p className="text-3xl font-bold">R$ 8.491,45</p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Conciliado</span>
                    <span className="font-medium text-accent">R$ 6.140,75 (72%)</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Detalhamento */}
            <div>
              <h4 className="font-medium mb-3">Detalhamento por NF</h4>
              <div className="space-y-2">
                {notasFiscais.map(nf => (
                  <div key={nf.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{nf.id} — {nf.cliente}</p>
                        <p className="text-xs text-muted-foreground">{nf.data}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{nf.valor}</span>
                      {getStatusBadge(nf.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecolhaNF;