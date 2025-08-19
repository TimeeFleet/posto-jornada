import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProcessoAbastecimento from "./components/modules/ProcessoAbastecimento";
import RecolhaNF from "./components/modules/RecolhaNF";
import GestaoCampanhas from "./components/modules/GestaoCampanhas";
import GestaoIndicadores from "./components/modules/GestaoIndicadores";
import GestaoFinanceira from "./components/modules/GestaoFinanceira";
import CadastroClientes from "./components/modules/CadastroClientes";
import RelatoriosGerenciais from "./components/modules/RelatoriosGerenciais";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="abastecimento" element={<ProcessoAbastecimento />} />
            <Route path="recolha-nf" element={<RecolhaNF />} />
            <Route path="campanhas" element={<GestaoCampanhas />} />
            <Route path="indicadores" element={<GestaoIndicadores />} />
            <Route path="financeiro" element={<GestaoFinanceira />} />
            <Route path="clientes" element={<CadastroClientes />} />
            <Route path="relatorios" element={<RelatoriosGerenciais />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
