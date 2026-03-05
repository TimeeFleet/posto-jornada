import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Car, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText,
  AlertTriangle,
  ThumbsUp,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Base de dados fictícia para vinculação
const vehicleDatabase = {
  "ABC1234": { cartao: "1234567890123456", empresa: "Transportes Silva LTDA" },
  "XYZ5678": { cartao: "2345678901234567", empresa: "Logística Express" },
  "DEF9012": { cartao: "3456789012345678", empresa: "Frota Norte" }
};

const cardDatabase = {
  "1234567890123456": { placa: "ABC1234", empresa: "Transportes Silva LTDA" },
  "2345678901234567": { placa: "XYZ5678", empresa: "Logística Express" },
  "3456789012345678": { placa: "DEF9012", empresa: "Frota Norte" }
};

const ProcessoAbastecimento = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPrecoEditavel, setIsPrecoEditavel] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationField, setSimulationField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    placa: "",
    cartao: "",
    empresa: "",
    matricula: "",
    senha: "",
    combustivel: "gasolina",
    precoLitro: 5.89,
    litros: 0,
    valorTotal: 0,
  });
  const { toast } = useToast();

  // Simulação automática do processo completo
  const startSimulation = async () => {
    setIsSimulating(true);
    setCurrentStep(1);
    setFormData({
      placa: "", cartao: "", empresa: "", matricula: "", senha: "",
      combustivel: "gasolina", precoLitro: 5.89, litros: 0, valorTotal: 0,
    });

    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
    const typeText = async (field: string, text: string, updater: (val: string) => void) => {
      setSimulationField(field);
      for (let i = 1; i <= text.length; i++) {
        updater(text.slice(0, i));
        await delay(80);
      }
      setSimulationField(null);
      await delay(400);
    };

    // Etapa 1 - Placa
    await delay(600);
    await typeText("placa", "ABC1234", (val) => {
      const upper = val.toUpperCase();
      if (vehicleDatabase[upper]) {
        setFormData(prev => ({
          ...prev, placa: upper,
          cartao: vehicleDatabase[upper].cartao,
          empresa: vehicleDatabase[upper].empresa,
        }));
      } else {
        setFormData(prev => ({ ...prev, placa: val }));
      }
    });
    await delay(800);

    toast({ title: "Etapa 1 concluída!", description: "Veículo identificado com sucesso." });
    setCurrentStep(2);
    await delay(1000);

    // Etapa 2 - Matrícula e Senha
    await typeText("matricula", "12345", (val) =>
      setFormData(prev => ({ ...prev, matricula: val }))
    );
    await typeText("senha", "****", (val) =>
      setFormData(prev => ({ ...prev, senha: val }))
    );
    await delay(800);

    toast({ title: "Etapa 2 concluída!", description: "Motorista autenticado." });
    setCurrentStep(3);
    await delay(1000);

    // Etapa 3 - Combustível e litros
    setFormData(prev => ({ ...prev, combustivel: "diesel-s10" }));
    await delay(600);
    const targetLitros = 45.5;
    for (let i = 0; i <= targetLitros; i += 5) {
      const litros = Math.min(i, targetLitros);
      setFormData(prev => ({ ...prev, litros, valorTotal: litros * prev.precoLitro }));
      await delay(120);
    }
    setFormData(prev => ({ ...prev, litros: targetLitros, valorTotal: targetLitros * prev.precoLitro }));
    await delay(800);

    toast({ title: "Etapa 3 concluída!", description: "Abastecimento realizado." });
    setCurrentStep(4);
    await delay(1500);

    // Etapa 4 - Finalização
    toast({ title: "Etapa 4 concluída!", description: "Registro e comprovante gerados." });
    setCurrentStep(5);
    await delay(500);

    toast({ title: "✅ Simulação concluída!", description: "Todas as etapas foram percorridas com sucesso." });
    setIsSimulating(false);
  };

  const steps = [
    { id: 1, title: "Atendimento ao motorista", description: "Identificação do veículo" },
    { id: 2, title: "Autenticação", description: "Dados do motorista" },
    { id: 3, title: "Execução", description: "Abastecimento" },
    { id: 4, title: "Finalização", description: "Registro e comprovante" },
    { id: 5, title: "Pós-venda", description: "Entrega de documentos" },
  ];

  // Auto-preenchimento baseado na placa
  const handlePlacaChange = (placa: string) => {
    setFormData(prev => ({ ...prev, placa }));
    
    const upperPlaca = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (vehicleDatabase[upperPlaca]) {
      setFormData(prev => ({
        ...prev,
        placa: upperPlaca,
        cartao: vehicleDatabase[upperPlaca].cartao,
        empresa: vehicleDatabase[upperPlaca].empresa
      }));
    }
  };

  // Auto-preenchimento baseado no cartão
  const handleCartaoChange = (cartao: string) => {
    setFormData(prev => ({ ...prev, cartao }));
    
    const cleanCartao = cartao.replace(/\s/g, '');
    if (cardDatabase[cleanCartao]) {
      setFormData(prev => ({
        ...prev,
        cartao: cleanCartao,
        placa: cardDatabase[cleanCartao].placa,
        empresa: cardDatabase[cleanCartao].empresa
      }));
    }
  };

  // Cálculo automático do valor total
  useEffect(() => {
    const total = formData.precoLitro * formData.litros;
    setFormData(prev => ({ ...prev, valorTotal: total }));
  }, [formData.precoLitro, formData.litros]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Etapa concluída!",
        description: `${steps[currentStep - 1].title} finalizada com sucesso.`,
      });
    }
  };

  const handleFinalizarAtendimento = () => {
    toast({
      title: "Atendimento Finalizado!",
      description: "Abastecimento registrado com sucesso no sistema.",
    });
    setCurrentStep(1);
    setIsPrecoEditavel(false);
    setFormData({
      placa: "",
      cartao: "",
      empresa: "",
      matricula: "",
      senha: "",
      combustivel: "gasolina",
      precoLitro: 5.89,
      litros: 0,
      valorTotal: 0,
    });
  };

  const handleNovoAbastecimento = () => {
    // Vai direto para a terceira etapa mantendo placa, matrícula e senha
    setCurrentStep(3);
    setIsPrecoEditavel(false);
    setFormData({
      placa: formData.placa,
      cartao: formData.cartao,
      empresa: formData.empresa,
      matricula: formData.matricula,
      senha: formData.senha,
      combustivel: "gasolina",
      precoLitro: 5.89,
      litros: 0,
      valorTotal: 0,
    });
    toast({
      title: "Novo Abastecimento",
      description: "Dados do veículo mantidos. Prossiga com o abastecimento.",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="placa">Placa do Veículo</Label>
                <Input
                  id="placa"
                  placeholder="ABC-1234"
                  value={formData.placa}
                  onChange={(e) => handlePlacaChange(e.target.value)}
                  className={`input-portal transition-all duration-300 ${simulationField === 'placa' ? 'ring-2 ring-accent shadow-md' : ''}`}
                  readOnly={isSimulating}
                />
              </div>
              <div>
                <Label htmlFor="cartao">Número do Cartão</Label>
                <Input
                  id="cartao"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cartao}
                  onChange={(e) => handleCartaoChange(e.target.value)}
                  className={`input-portal transition-all duration-300 ${simulationField === 'cartao' ? 'ring-2 ring-accent shadow-md' : ''}`}
                  readOnly={isSimulating}
                />
              </div>
              {formData.empresa && (
                <Card className="card-portal bg-accent/10 border-accent">
                  <CardContent className="pt-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-medium">Cliente Identificado</p>
                        <p className="text-sm text-muted-foreground">{formData.empresa}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="matricula">Matrícula do Motorista</Label>
                <Input
                  id="matricula"
                  placeholder="12345"
                  value={formData.matricula}
                  onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                  className={`input-portal transition-all duration-300 ${simulationField === 'matricula' ? 'ring-2 ring-accent shadow-md' : ''}`}
                  readOnly={isSimulating}
                />
              </div>
              <div>
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="****"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  className={`input-portal transition-all duration-300 ${simulationField === 'senha' ? 'ring-2 ring-accent shadow-md' : ''}`}
                  readOnly={isSimulating}
                />
              </div>
            </div>
            
            {formData.matricula && formData.senha && (
              <Card className="card-portal bg-accent/10 border-accent">
                <CardHeader>
                  <CardTitle className="text-sm">Status da Autorização</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="text-sm">Motorista autorizado para abastecimento</span>
                    </div>
                    <div className="bg-background p-3 rounded-lg border">
                      <p className="font-medium text-sm text-foreground">João Silva Santos</p>
                      <p className="text-xs text-muted-foreground">Motorista habilitado - CNH: 123456789</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tipo de Combustível</Label>
                <Select 
                  value={formData.combustivel}
                  onValueChange={(value) => setFormData({ ...formData, combustivel: value })}
                >
                  <SelectTrigger className="input-portal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasolina">Gasolina Comum</SelectItem>
                    <SelectItem value="gasolina-aditivada">Gasolina Aditivada</SelectItem>
                    <SelectItem value="etanol">Etanol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="diesel-s10">Diesel S10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="litros">Quantidade (Litros)</Label>
                <Input
                  id="litros"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.litros || ""}
                  onChange={(e) => setFormData({ ...formData, litros: parseFloat(e.target.value) || 0 })}
                  className="input-portal"
                />
              </div>
            </div>

            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm">Dados do Abastecimento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Bomba:</span>
                  <Badge variant="secondary">Bomba 03</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Bico:</span>
                  <Badge variant="secondary">Bico 06</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Preço/Litro:</span>
                  <div className="flex items-center space-x-2">
                    {isPrecoEditavel ? (
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.precoLitro}
                        onChange={(e) => setFormData({ ...formData, precoLitro: parseFloat(e.target.value) || 0 })}
                        className="w-20 h-6 text-sm"
                      />
                    ) : (
                      <span className="font-medium">R$ {formData.precoLitro.toFixed(2)}</span>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPrecoEditavel(!isPrecoEditavel)}
                      className="h-6 px-2 text-xs"
                    >
                      {isPrecoEditavel ? "OK" : "Editar"}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Litros:</span>
                  <span className="font-medium">{formData.litros.toFixed(2)} L</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-lg">
                  <span className="font-semibold">Valor Total:</span>
                  <span className="font-bold text-accent">R$ {formData.valorTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card className="card-portal">
              <CardHeader>
                <CardTitle className="text-sm">Registro da Venda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Número de Autorização</Label>
                    <Input value="AUT789456123" readOnly className="input-portal" />
                  </div>
                  <div>
                    <Label>Número do Doc (NSU)</Label>
                    <Input value="NSU001234567" readOnly className="input-portal" />
                  </div>
                  <div>
                    <Label>Data/Hora</Label>
                    <Input value={new Date().toLocaleString('pt-BR')} readOnly className="input-portal" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Forma de Entrega do Comprovante</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="entrega" value="fisico" defaultChecked />
                      <span>Físico</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="entrega" value="email" />
                      <span>E-mail</span>
                    </label>
                  </div>
                </div>

                {/* Comprovante físico */}
                <Card className="card-portal bg-accent/5 border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-sm">Comprovante de Abastecimento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="text-center border-b pb-2 mb-2">
                      <p className="font-bold">Posto eFleet</p>
                      <p className="text-xs">Sistema de Gestão</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Placa:</span>
                        <span className="font-medium">{formData.placa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Empresa:</span>
                        <span className="font-medium">{formData.empresa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Combustível:</span>
                        <span className="font-medium">{formData.combustivel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Litros:</span>
                        <span className="font-medium">{formData.litros.toFixed(2)} L</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Preço/L:</span>
                        <span className="font-medium">R$ {formData.precoLitro.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-bold">
                        <span>Total:</span>
                        <span>R$ {formData.valorTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>NSU:</span>
                        <span>NSU001234567</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Autorização:</span>
                        <span>AUT789456123</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        Baixar PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card className="card-portal bg-accent/10 border-accent">
              <CardHeader>
                <CardTitle className="text-accent flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Abastecimento Concluído!
                </CardTitle>
                <CardDescription>
                  Todos os processos foram finalizados com sucesso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Placa:</span>
                    <span className="font-medium">{formData.placa || "Não informado"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Empresa:</span>
                    <span className="font-medium">{formData.empresa || "Não informado"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Combustível:</span>
                    <span className="font-medium">{formData.combustivel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Litros:</span>
                    <span className="font-medium">{formData.litros.toFixed(2)} L</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Valor Total:</span>
                    <span className="font-bold text-accent">R$ {formData.valorTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comprovante:</span>
                    <Badge variant="secondary">Entregue</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button onClick={handleNovoAbastecimento} variant="outline" className="flex-1">
                Novo abastecimento para o mesmo veículo?
              </Button>
              <Button onClick={handleFinalizarAtendimento} className="button-portal flex-1">
                Finalizar Atendimento
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card className="card-portal">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Processo de Abastecimento</CardTitle>
              <CardDescription>Siga os passos para um atendimento completo e eficiente</CardDescription>
            </div>
            <Button
              onClick={startSimulation}
              disabled={isSimulating}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {isSimulating ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Simulando...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Simular Abastecimento
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  currentStep >= step.id 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-full mt-4 ${
                    currentStep > step.id ? 'bg-accent' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="card-portal">
        <CardHeader>
          <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
          <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
          
          {currentStep < steps.length && (
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleNext} 
                className="button-portal"
                disabled={
                  (currentStep === 1 && (!formData.placa || !formData.cartao)) ||
                  (currentStep === 2 && (!formData.matricula || !formData.senha)) ||
                  (currentStep === 3 && formData.litros <= 0)
                }
              >
                {currentStep === steps.length - 1 ? 'Finalizar' : 'Próxima Etapa'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessoAbastecimento;