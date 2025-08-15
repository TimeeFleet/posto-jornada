import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Download,
  Upload,
  Eye,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FaturamentoControle = () => {
  const [selectedNF, setSelectedNF] = useState(null);
  const { toast } = useToast();

  const notasFiscais = [
    {
      id: "NF001234",
      valor: "R$ 1.250,30",
      cliente: "Transportadora ABC Ltda",
      data: "15/08/2025",
      status: "pendente",
      xml: false,
    },
    {
      id: "NF001235",
      valor: "R$ 890,50",
      cliente: "Logística XYZ S.A.",
      data: "15/08/2025",
      status: "enviada",
      xml: true,
    },
    {
      id: "NF001236",
      valor: "R$ 2.150,80",
      cliente: "Frota Nacional",
      data: "14/08/2025",
      status: "aprovada",
      xml: true,
    },
    {
      id: "NF001237",
      valor: "R$ 567,20",
      cliente: "Express Delivery",
      data: "14/08/2025",
      status: "erro",
      xml: false,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendente: { variant: "secondary" as const, color: "bg-yellow-500", text: "Pendente" },
      enviada: { variant: "default" as const, color: "bg-blue-500", text: "Enviada" },
      aprovada: { variant: "default" as const, color: "bg-green-500", text: "Aprovada" },
      erro: { variant: "destructive" as const, color: "bg-red-500", text: "Erro" },
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pendente;
  };

  const handleEnviarNF = (nfId: string) => {
    toast({
      title: "NF Enviada!",
      description: `Nota fiscal ${nfId} enviada com sucesso`,
    });
  };

  const handleAnexarXML = (nfId: string) => {
    toast({
      title: "XML Anexado!",
      description: `XML anexado à NF ${nfId}`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="emissao" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="emissao">Emissão de NF</TabsTrigger>
          <TabsTrigger value="anexacao">Anexação XML</TabsTrigger>
          <TabsTrigger value="conciliacao">Conciliação</TabsTrigger>
          <TabsTrigger value="fechamento">Fechamento Diário</TabsTrigger>
        </TabsList>

        <TabsContent value="emissao" className="space-y-6">
          <Card className="card-portal">
            <CardHeader>
              <CardTitle>Emissão de Notas Fiscais</CardTitle>
              <CardDescription>
                Processo de emissão e registro de notas fiscais com revisão dupla
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lista de NFs */}
                <div className="lg:col-span-2 space-y-4">
                  {notasFiscais.map((nf) => (
                    <Card key={nf.id} className="card-portal cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => setSelectedNF(nf)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-primary" />
                              <span className="font-medium">{nf.id}</span>
                              <Badge {...getStatusBadge(nf.status)}>
                                {getStatusBadge(nf.status).text}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{nf.cliente}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span>{nf.data}</span>
                              <span className="font-semibold text-accent">{nf.valor}</span>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            {nf.xml ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                XML OK
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-red-100 text-red-700">
                                <XCircle className="w-3 h-3 mr-1" />
                                Sem XML
                              </Badge>
                            )}
                            {nf.status === "pendente" && (
                              <Button 
                                size="sm" 
                                className="button-portal"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEnviarNF(nf.id);
                                }}
                              >
                                Enviar
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Painel de Ganhos e Dores */}
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-destructive bg-red-50">
                    <h4 className="font-semibold text-destructive flex items-center">
                      <XCircle className="w-4 h-4 mr-2" />
                      Dor
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Erro na emissão manual de notas fiscais
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-accent bg-green-50">
                    <h4 className="font-semibold text-accent flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Ganho
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Emissão automática com revisão dupla
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-600 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Job to be Done
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Emitir NFs corretas e completas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anexacao" className="space-y-6">
          <Card className="card-portal">
            <CardHeader>
              <CardTitle>Anexação de XML</CardTitle>
              <CardDescription>
                Vincular arquivos XML às notas fiscais emitidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nf-select">Selecionar Nota Fiscal</Label>
                    <select className="w-full input-portal" id="nf-select">
                      <option value="">Escolha uma NF...</option>
                      {notasFiscais.filter(nf => !nf.xml).map(nf => (
                        <option key={nf.id} value={nf.id}>
                          {nf.id} - {nf.cliente}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="xml-file">Arquivo XML</Label>
                    <div className="flex">
                      <Input 
                        id="xml-file" 
                        type="file" 
                        accept=".xml"
                        className="input-portal"
                      />
                      <Button className="ml-2 button-portal">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Preview de validação */}
                <Card className="border-accent bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="font-medium text-accent">XML Validado</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Número NF:</span>
                        <span>001234</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valor:</span>
                        <span>R$ 1.250,30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CNPJ:</span>
                        <span>12.345.678/0001-90</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border-l-4 border-destructive bg-red-50">
                    <h4 className="font-semibold text-destructive flex items-center">
                      <XCircle className="w-4 h-4 mr-2" />
                      Dor
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      XML não corresponde à venda
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-accent bg-green-50">
                    <h4 className="font-semibold text-accent flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Ganho
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Validação automática de correspondência
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-600 flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Job to be Done
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Anexar XML correto à NF
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conciliacao" className="space-y-6">
          <Card className="card-portal">
            <CardHeader>
              <CardTitle>Conciliação de Informações</CardTitle>
              <CardDescription>
                Comparar notas fiscais com registros do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Resumo da conciliação */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-accent">156</div>
                      <p className="text-sm text-muted-foreground">Total de NFs</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">143</div>
                      <p className="text-sm text-muted-foreground">Conciliadas</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-yellow-600">10</div>
                      <p className="text-sm text-muted-foreground">Pendentes</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <p className="text-sm text-muted-foreground">Divergentes</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista de divergências */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Divergências Encontradas</h3>
                  
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span className="font-medium">NF001240 - Divergência de valor</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Sistema: R$ 1.250,30 | NF: R$ 1.240,30
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="button-portal">
                            Corrigir
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border-l-4 border-destructive bg-red-50">
                    <h4 className="font-semibold text-destructive flex items-center">
                      <XCircle className="w-4 h-4 mr-2" />
                      Dor
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Divergências não identificadas
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-accent bg-green-50">
                    <h4 className="font-semibold text-accent flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Ganho
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Identificação automática de problemas
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-600 flex items-center">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Job to be Done
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Garantir consistência dos dados
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fechamento" className="space-y-6">
          <Card className="card-portal">
            <CardHeader>
              <CardTitle>Fechamento Diário</CardTitle>
              <CardDescription>
                Revisão e fechamento das operações do dia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Resumo do dia */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">R$ 15.420,80</div>
                      <p className="text-sm text-muted-foreground">Total Faturado</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-accent">234</div>
                      <p className="text-sm text-muted-foreground">NFs Emitidas</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">98.5%</div>
                      <p className="text-sm text-muted-foreground">Taxa de Aprovação</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Checklist de fechamento */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Checklist de Fechamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { item: "Todas as vendas possuem NF emitida", status: true },
                        { item: "XMLs anexados às respectivas NFs", status: true },
                        { item: "Conciliação de valores realizada", status: true },
                        { item: "Divergências corrigidas", status: false },
                        { item: "Backup dos dados realizado", status: true },
                      ].map((check, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <span>{check.item}</span>
                          {check.status ? (
                            <CheckCircle className="w-5 h-5 text-accent" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Gerar Relatório</Button>
                  <Button className="button-portal">Fechar Dia</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border-l-4 border-destructive bg-red-50">
                    <h4 className="font-semibold text-destructive flex items-center">
                      <XCircle className="w-4 h-4 mr-2" />
                      Dor
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fechamento manual demorado
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-accent bg-green-50">
                    <h4 className="font-semibold text-accent flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Ganho
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fechamento automático com checklist
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-600 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Job to be Done
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Encerrar operações com segurança
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FaturamentoControle;