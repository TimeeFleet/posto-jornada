import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Building,
  Phone,
  Mail,
  CreditCard,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CadastroClientes = () => {
  const [activeTab, setActiveTab] = useState("lista");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    documento: "",
    email: "",
    telefone: "",
    endereco: "",
    cidade: "",
    uf: "",
    cep: ""
  });
  const { toast } = useToast();

  const clientes = [
    {
      id: 1,
      nome: "Transportadora ABC Ltda",
      documento: "12.345.678/0001-90",
      email: "contato@transportadoraabc.com",
      telefone: "(11) 99999-9999",
      cidade: "São Paulo",
      uf: "SP",
      status: "ativo",
      ultimaCompra: "15/08/2025",
      totalCompras: "R$ 145.650"
    },
    {
      id: 2,
      nome: "João Silva",
      documento: "123.456.789-00",
      email: "joao.silva@email.com",
      telefone: "(11) 88888-8888",
      cidade: "São Paulo",
      uf: "SP",
      status: "ativo",
      ultimaCompra: "14/08/2025",
      totalCompras: "R$ 8.950"
    },
    {
      id: 3,
      nome: "Empresa XYZ Logística",
      documento: "98.765.432/0001-10",
      email: "financeiro@xyzlogistica.com",
      telefone: "(11) 77777-7777",
      cidade: "Guarulhos",
      uf: "SP",
      status: "inativo",
      ultimaCompra: "02/08/2025",
      totalCompras: "R$ 67.300"
    }
  ];

  const handleNovoCliente = () => {
    if (!novoCliente.nome || !novoCliente.documento) {
      toast({
        title: "Erro",
        description: "Nome e documento são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Cliente cadastrado!",
      description: `${novoCliente.nome} foi adicionado com sucesso.`,
    });

    setNovoCliente({
      nome: "",
      documento: "",
      email: "",
      telefone: "",
      endereco: "",
      cidade: "",
      uf: "",
      cep: ""
    });
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    return status === "ativo" ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">Ativo</Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inativo</Badge>
    );
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.documento.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Cadastro de Clientes</h2>
          <p className="text-muted-foreground">Gerencie o cadastro de todos os seus clientes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do cliente abaixo
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome/Razão Social *</Label>
                <Input
                  id="nome"
                  value={novoCliente.nome}
                  onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
                  placeholder="Digite o nome ou razão social"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documento">CPF/CNPJ *</Label>
                <Input
                  id="documento"
                  value={novoCliente.documento}
                  onChange={(e) => setNovoCliente({ ...novoCliente, documento: e.target.value })}
                  placeholder="000.000.000-00 ou 00.000.000/0001-00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={novoCliente.email}
                  onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
                  placeholder="cliente@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={novoCliente.telefone}
                  onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={novoCliente.endereco}
                  onChange={(e) => setNovoCliente({ ...novoCliente, endereco: e.target.value })}
                  placeholder="Rua, número, bairro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={novoCliente.cidade}
                  onChange={(e) => setNovoCliente({ ...novoCliente, cidade: e.target.value })}
                  placeholder="São Paulo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uf">UF</Label>
                <Input
                  id="uf"
                  value={novoCliente.uf}
                  onChange={(e) => setNovoCliente({ ...novoCliente, uf: e.target.value.toUpperCase() })}
                  placeholder="SP"
                  maxLength={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleNovoCliente} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Cadastrar Cliente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lista">Lista de Clientes</TabsTrigger>
          <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
          <TabsTrigger value="inativos">Clientes Inativos</TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-4">
          <Card className="card-portal">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-accent" />
                  Clientes Cadastrados
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Compra</TableHead>
                    <TableHead>Total Compras</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{cliente.nome}</p>
                          <p className="text-sm text-muted-foreground">{cliente.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{cliente.documento}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">{cliente.telefone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">{cliente.cidade}/{cliente.uf}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(cliente.status)}</TableCell>
                      <TableCell className="text-sm">{cliente.ultimaCompra}</TableCell>
                      <TableCell className="font-medium text-accent">{cliente.totalCompras}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estatisticas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="card-portal">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">2.847</span>
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-green-600 mt-1">+156 este mês</p>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Clientes Ativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">1.923</span>
                  <Building className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">67,5% do total</p>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Novos (30 dias)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">156</span>
                  <Plus className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-blue-600 mt-1">+23% vs mês anterior</p>
              </CardContent>
            </Card>

            <Card className="card-portal">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Ticket Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">R$ 185</span>
                  <CreditCard className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-green-600 mt-1">+8% vs mês anterior</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inativos">
          <Card className="card-portal">
            <CardHeader>
              <CardTitle>Clientes Inativos</CardTitle>
              <CardDescription>Clientes que não fazem compras há mais de 60 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Lista de clientes inativos será exibida aqui</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CadastroClientes;