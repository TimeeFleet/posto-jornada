import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Percent, DollarSign, Calendar, RefreshCw, BarChart3, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const NegociacaoDesconto = () => {
  const [estabelecimento, setEstabelecimento] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [produto, setProduto] = useState("");
  const [precoBase, setPrecoBase] = useState("");
  const [desconto, setDesconto] = useState("");
  const [tipoDesconto, setTipoDesconto] = useState("percentual");
  const [inicioVigencia, setInicioVigencia] = useState("");
  const [horaInicial, setHoraInicial] = useState("");
  const [fimVigencia, setFimVigencia] = useState("");
  const [horaFinal, setHoraFinal] = useState("");
  const [precoFinal, setPrecoFinal] = useState("");
  const [naoEnviarEmail, setNaoEnviarEmail] = useState(false);
  const { toast } = useToast();

  // Mock data for negotiations
  const negociacoesPendentes = [
    {
      id: "NEG001",
      estabelecimento: "Posto eFleet",
      empresa: "Transportadora ABC",
      produto: "Diesel S-10",
      desconto: "8%",
      tipo: "percentual",
      vigencia: "25/08/2025 - 31/08/2025",
      precoFinal: "R$ 5,52",
      status: "pendente"
    },
    {
      id: "NEG002", 
      estabelecimento: "Posto eFleet",
      empresa: "Logística XYZ",
      produto: "Gasolina Comum",
      desconto: "R$ 0,15",
      tipo: "valor",
      vigencia: "25/08/2025 - 28/08/2025",
      precoFinal: "R$ 5,35",
      status: "pendente"
    }
  ];

  const negociacoesAprovadas = [
    {
      id: "NEG100",
      estabelecimento: "Posto eFleet",
      empresa: "Frota Brasil",
      produto: "Diesel S-10",
      desconto: "5%",
      tipo: "percentual",
      vigencia: "20/08/2025 - 25/08/2025",
      precoFinal: "R$ 5,70",
      status: "aprovada"
    }
  ];

  const handleSalvarNegociacao = () => {
    if (!estabelecimento || !empresa || !produto || !precoBase || !desconto) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Negociação Salva",
      description: `Negociação de desconto criada com sucesso para ${empresa}.`,
    });

    // Reset form
    setEstabelecimento("");
    setEmpresa("");
    setProduto("");
    setPrecoBase("");
    setDesconto("");
    setTipoDesconto("percentual");
    setInicioVigencia("");
    setHoraInicial("");
    setFimVigencia("");
    setHoraFinal("");
    setPrecoFinal("");
    setNaoEnviarEmail(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="destructive"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>;
      case "aprovada":
        return <Badge variant="secondary"><CheckCircle className="w-3 h-3 mr-1" />Aprovada</Badge>;
      case "vigente":
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />Vigente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="nova" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Negociação de Preço</h1>
            <p className="text-muted-foreground">Gerencie descontos e negociações de preços</p>
          </div>
          <TabsList>
            <TabsTrigger value="nova">Nova Negociação</TabsTrigger>
            <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            <TabsTrigger value="aprovadas">Aprovadas e Vigentes</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="nova">
          <Card>
            <CardHeader>
              <CardTitle>Negociação de Preço</CardTitle>
              <CardDescription>Crie uma nova negociação de desconto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estabelecimento">Estabelecimento</Label>
                  <Select value={estabelecimento} onValueChange={setEstabelecimento}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="posto-efleet">Posto eFleet</SelectItem>
                      <SelectItem value="posto-petrobras">Posto Petrobras</SelectItem>
                      <SelectItem value="posto-shell">Posto Shell</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Select value={empresa} onValueChange={setEmpresa}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transportadora-abc">Transportadora ABC</SelectItem>
                      <SelectItem value="logistica-xyz">Logística XYZ</SelectItem>
                      <SelectItem value="frota-brasil">Frota Brasil</SelectItem>
                      <SelectItem value="express-delivery">Express Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="produto">Produto</Label>
                  <Select value={produto} onValueChange={setProduto}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel-s10">Diesel S-10</SelectItem>
                      <SelectItem value="gasolina-comum">Gasolina Comum</SelectItem>
                      <SelectItem value="etanol">Etanol</SelectItem>
                      <SelectItem value="gasolina-aditivada">Gasolina Aditivada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precoBase">Preço Base</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="precoBase"
                      placeholder="0,000"
                      value={precoBase}
                      onChange={(e) => setPrecoBase(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Desconto</Label>
                  <RadioGroup
                    value={tipoDesconto}
                    onValueChange={setTipoDesconto}
                    className="flex flex-row space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentual" id="percentual" />
                      <Label htmlFor="percentual">Percentagem de Desconto</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="centavos" id="centavos" />
                      <Label htmlFor="centavos">Centavos de Desconto (centavos)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="desconto">Desconto/Preço</Label>
                  <div className="relative">
                    {tipoDesconto === "percentual" ? (
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    ) : (
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    )}
                    <Input
                      id="desconto"
                      placeholder="0,000"
                      value={desconto}
                      onChange={(e) => setDesconto(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inicioVigencia">Início da Vigência</Label>
                  <Input
                    id="inicioVigencia"
                    type="date"
                    value={inicioVigencia}
                    onChange={(e) => setInicioVigencia(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Opcional</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horaInicial">Hora Inicial</Label>
                  <Input
                    id="horaInicial"
                    type="time"
                    value={horaInicial}
                    onChange={(e) => setHoraInicial(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Opcional</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fimVigencia">Fim da Vigência</Label>
                  <Input
                    id="fimVigencia"
                    type="date"
                    value={fimVigencia}
                    onChange={(e) => setFimVigencia(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Opcional</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horaFinal">Hora Final</Label>
                  <Input
                    id="horaFinal"
                    type="time"
                    value={horaFinal}
                    onChange={(e) => setHoraFinal(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Opcional</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataInclusao">Data inclusão</Label>
                  <Input
                    id="dataInclusao"
                    value={new Date().toLocaleString('pt-BR')}
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="precoFinal">Preço Final</Label>
                  <Input
                    id="precoFinal"
                    placeholder="Calculado automaticamente"
                    value={precoFinal}
                    onChange={(e) => setPrecoFinal(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="naoEnviarEmail"
                  checked={naoEnviarEmail}
                  onChange={(e) => setNaoEnviarEmail(e.target.checked)}
                />
                <Label htmlFor="naoEnviarEmail">Não Enviar Email</Label>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSalvarNegociacao}>
                  Salvar Negociação
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pendentes">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Negociações Pendentes</CardTitle>
                  <CardDescription>Para consultar negociações antigas ou rejeitadas</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clique Aqui
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {negociacoesPendentes.map((negociacao) => (
                  <Card key={negociacao.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{negociacao.id}</h4>
                            {getStatusBadge(negociacao.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {negociacao.empresa} • {negociacao.produto}
                          </p>
                          <p className="text-sm">
                            Desconto: <strong>{negociacao.desconto}</strong> • 
                            Preço Final: <strong>{negociacao.precoFinal}</strong>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Vigência: {negociacao.vigencia}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Aprovar
                          </Button>
                          <Button variant="destructive" size="sm">
                            Rejeitar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aprovadas">
          <Card>
            <CardHeader>
              <CardTitle>Negociações Aprovadas e Vigentes</CardTitle>
              <CardDescription>Negociações já aprovadas e em vigência</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {negociacoesAprovadas.map((negociacao) => (
                  <Card key={negociacao.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{negociacao.id}</h4>
                            {getStatusBadge(negociacao.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {negociacao.empresa} • {negociacao.produto}
                          </p>
                          <p className="text-sm">
                            Desconto: <strong>{negociacao.desconto}</strong> • 
                            Preço Final: <strong>{negociacao.precoFinal}</strong>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Vigência: {negociacao.vigencia}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Detalhes
                          </Button>
                          <Button variant="outline" size="sm">
                            Histórico
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NegociacaoDesconto;