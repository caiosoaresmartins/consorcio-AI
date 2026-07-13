"use client"

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  BrainCircuit, 
  Files, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  ChevronRight,
  TrendingUp,
  Activity,
  FileText,
  UploadCloud,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Database
} from 'lucide-react';

const mockGroups = [
  { id: 'GR-4021', admin: 'Sicredi', members: 450, defaultRate: '2.4%', avgBid: '34%', status: 'Saudável' },
  { id: 'GR-8890', admin: 'Itaú', members: 600, defaultRate: '5.1%', avgBid: '42%', status: 'Alerta' },
  { id: 'GR-1102', admin: 'Porto Seguro', members: 320, defaultRate: '1.2%', avgBid: '28%', status: 'Excelente' },
];

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Visão Geral' },
    { id: 'groups', icon: Users, label: 'Meus Grupos' },
    { id: 'simulator', icon: Calculator, label: 'Simulador de Lances' },
    { id: 'xai', icon: BrainCircuit, label: 'IA Explicativa (XAI)' },
    { id: 'documents', icon: Files, label: 'Document AI / OCR' },
    { id: 'comparator', icon: BarChart3, label: 'Comparador' },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/60 text-slate-300 flex flex-col h-full fixed left-0 top-0 z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-800/60">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 mr-3">
          <BrainCircuit className="w-5 h-5 text-blue-400" />
        </div>
        <span className="text-xl font-bold text-slate-100 tracking-tight">Consórcio<span className="text-blue-500">AI</span></span>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Plataforma Analítica</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                isActive 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[inset_0_0_12px_rgba(59,130,246,0.05)]' 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/60">
        <button className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors">
          <Settings className="w-4 h-4 mr-3 text-slate-500" />
          Configurações
        </button>
      </div>
    </aside>
  );
};

const Topbar = () => (
  <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-8 sticky top-0 z-10">
    <div className="flex items-center bg-slate-900/50 rounded-lg px-3 py-2 w-96 border border-slate-800 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
      <Search className="w-4 h-4 text-slate-500 mr-2" />
      <input 
        type="text" 
        placeholder="Pesquisar cota, grupo ou administradora..." 
        className="bg-transparent border-none outline-none text-sm text-slate-200 w-full placeholder-slate-600"
      />
    </div>

    <div className="flex items-center space-x-5">
      <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors rounded-full hover:bg-slate-800/50">
        <Bell className="w-5 h-5" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
      </button>
      <div className="h-6 w-px bg-slate-800"></div>
      <div className="flex items-center cursor-pointer group">
        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm group-hover:border-blue-500/50 transition-colors">
          CR
        </div>
        <div className="ml-3 hidden md:block">
          <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">Corretor Premium</p>
          <p className="text-xs text-slate-500">Agência Alpha</p>
        </div>
      </div>
    </div>
  </header>
);

const SimulatorView = () => {
  const [bidValue, setBidValue] = useState<number | string>(30);
  const [horizon, setHorizon] = useState('6');

  const baseProb = horizon === '3' ? 15 : horizon === '6' ? 45 : 82;
  const currentProb = Math.min(99, Math.round(baseProb + (Number(bidValue) * 0.8)));
  const expectedTime = Math.max(1, Math.round(18 - (Number(bidValue) * 0.15)));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center">
            Simulador Probabilístico
            <span className="ml-3 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">Modelo v2.1 Ativo</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Previsão de contemplação utilizando modelos de Survival Analysis (Cox/GBS).</p>
        </div>
        <div className="bg-slate-900 text-slate-300 px-4 py-2 rounded-lg flex items-center text-xs font-medium border border-slate-800">
          <Activity className="w-4 h-4 mr-2 text-emerald-400" />
          Última inferência: Há 2 minutos
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl col-span-1 flex flex-col">
          <h3 className="font-semibold text-slate-200 mb-6 flex items-center text-sm uppercase tracking-wider">
            <Settings className="w-4 h-4 mr-2 text-blue-400" />
            Parâmetros da Cota
          </h3>
          
          <div className="space-y-6 flex-1">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Grupo Alvo</label>
              <div className="relative">
                <select className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 appearance-none">
                  <option>Grupo 4021 - Sicredi (Carros)</option>
                  <option>Grupo 8890 - Itaú (Imóveis)</option>
                </select>
                <ChevronRight className="absolute right-3 top-3.5 w-4 h-4 text-slate-500 rotate-90 pointer-events-none" />
              </div>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
              <div className="flex justify-between mb-3">
                <label className="text-sm font-medium text-slate-300">Percentual de Lance</label>
                <span className="text-lg font-bold text-blue-400">{bidValue}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={bidValue}
                onChange={(e) => setBidValue(e.target.value)}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
              />
              <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mt-2">
                <span>0% (Sorteio)</span>
                <span>Máx (100%)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Horizonte de Previsão</label>
              <div className="grid grid-cols-3 gap-2">
                {['3', '6', '12'].map(months => (
                  <button 
                    key={months}
                    onClick={() => setHorizon(months)}
                    className={`py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
                      horizon === months 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {months} Meses
                  </button>
                ))}
              </div>
            </div>
          </div>
            
          <button className="w-full mt-6 bg-slate-100 hover:bg-white text-slate-900 font-bold py-3 rounded-lg transition-colors flex justify-center items-center shadow-lg">
            <Calculator className="w-4 h-4 mr-2" />
            Recalcular Cenário
          </button>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-200 text-sm uppercase tracking-wider flex items-center">
              <Activity className="w-4 h-4 mr-2 text-blue-400" />
              Resultado da Inferência
            </h3>
            <span className="text-xs text-slate-500 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
              Intervalo de Confiança: 95%
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800/80 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-sm font-medium text-slate-400 mb-2">Probabilidade Acumulada P(t)</p>
              <div className="flex items-baseline justify-center">
                <span className={`text-6xl font-extrabold tracking-tighter ${currentProb > 70 ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]' : currentProb > 40 ? 'text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.3)]' : 'text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]'}`}>
                  {currentProb}%
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-3 font-mono">[{Math.max(0, currentProb - 4)}% - {Math.min(100, currentProb + 4)}%]</p>
            </div>
            
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800/80 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-sm font-medium text-slate-400 mb-2">Tempo Médio Esperado E(T)</p>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-extrabold text-slate-100 tracking-tighter">
                  {expectedTime}
                </span>
                <span className="ml-2 text-lg font-medium text-slate-500 uppercase tracking-widest">meses</span>
              </div>
              <p className="text-xs text-slate-500 mt-3 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1 text-emerald-400" />
                Base histórico do Fundo Comum
              </p>
            </div>
          </div>

          <div className="flex-1 border-t border-slate-800 pt-6 flex flex-col justify-end">
             <div className="flex justify-between items-center mb-6">
               <h4 className="text-sm font-medium text-slate-300">Curva de Sobrevivência Estimada S(t)</h4>
               <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Cox/AFT Model</span>
             </div>
             
             <div className="h-32 flex items-end justify-between px-1 relative">
                <div className="absolute bottom-0 left-0 w-full h-px bg-slate-800"></div>
                
                {[...Array(12)].map((_, i) => {
                  const rawHeight = currentProb > 50 ? (12-i)*8 : (i+1)*8;
                  const finalHeight = Math.max(10, Math.min(100, rawHeight + (Math.random() * 10 - 5)));
                  
                  return (
                    <div key={i} className="w-full mx-1 group relative flex flex-col justify-end" style={{ height: '100%' }}>
                      <div 
                        className="w-full bg-blue-500/20 rounded-t-sm border-t-2 border-blue-400 group-hover:bg-blue-400/40 transition-all duration-300 relative" 
                        style={{ height: `${finalHeight}%` }}
                      >
                         <div className="absolute top-0 left-0 w-full h-4 bg-blue-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  )
                })}
             </div>
             <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-4 px-2">
                <span>Hoje</span>
                <span>+6 Meses</span>
                <span>+12 Meses</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const XAIView = () => (
  <div className="max-w-5xl mx-auto space-y-6">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center">
          IA Explicativa (XAI)
          <span className="ml-3 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">Transparência Ativa</span>
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Compreenda o peso de cada variável nas predições do modelo de risco.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col">
        <h3 className="font-semibold text-slate-200 border-b border-slate-800 pb-4 mb-6 flex items-center text-sm uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4 mr-2 text-purple-400" />
          Feature Importance (SHAP Values)
        </h3>
        
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          Impacto das variáveis para a probabilidade final de <span className="text-white font-bold bg-slate-800 px-1.5 py-0.5 rounded">78%</span> estimada para a Cota 124 na próxima assembleia.
        </p>

        <div className="space-y-5 flex-1 flex flex-col justify-center">
          {[
            { label: 'Percentual de Lance (35%)', impact: 45, type: 'positive' },
            { label: 'Sazonalidade (Dezembro)', impact: 15, type: 'positive' },
            { label: 'Saúde do Fundo Comum', impact: 8, type: 'positive' },
            { label: 'Inadimplência Grupo (5.2%)', impact: -12, type: 'negative' },
            { label: 'Taxa Histórica Vencedores', impact: -5, type: 'negative' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center text-sm group">
              <div className="w-2/5 text-right pr-4 text-slate-300 font-medium truncate group-hover:text-white transition-colors" title={item.label}>
                {item.label}
              </div>
              <div className="w-3/5 flex items-center relative h-7 bg-slate-950/50 rounded p-1 border border-slate-800/50">
                <div className="absolute left-1/2 w-px h-full bg-slate-700 z-0"></div>
                <div 
                  className={`h-full rounded-sm relative z-10 transition-all duration-500 ease-out ${item.type === 'positive' ? 'bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.2)]'}`}
                  style={{ 
                    width: `${Math.abs(item.impact)}%`,
                    marginLeft: item.type === 'positive' ? '50%' : `calc(50% - ${Math.abs(item.impact)}%)`
                  }}
                ></div>
                <span className={`text-xs font-mono font-bold ml-2 absolute ${item.type === 'positive' ? 'text-emerald-400 left-[calc(50%+'+item.impact+'%)]' : 'text-rose-400 right-[calc(50%+'+Math.abs(item.impact)+'%)]'}`}>
                  {item.type === 'positive' ? '+' : ''}{item.impact}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center gap-6 border-t border-slate-800 pt-4">
          <div className="flex items-center text-xs text-slate-400">
             <div className="w-3 h-3 rounded-sm bg-emerald-500/80 mr-2"></div> Aumenta Probabilidade
          </div>
          <div className="flex items-center text-xs text-slate-400">
             <div className="w-3 h-3 rounded-sm bg-rose-500/80 mr-2"></div> Reduz Probabilidade
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl flex flex-col border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-200 flex items-center text-sm uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 mr-2 text-blue-400" />
            Agente RAG Consórcio
          </h3>
          <span className="flex items-center text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></div>
            Online
          </span>
        </div>
        
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-950/30">
          <div className="flex flex-col gap-1 items-end">
             <div className="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%] border border-slate-700">
               Por que minha probabilidade caiu 5% em relação ao mês passado se mantive o mesmo lance?
             </div>
             <span className="text-[10px] text-slate-500 pr-1">Você • 14:02</span>
          </div>

          <div className="flex flex-col gap-1 items-start mt-4">
             <div className="bg-blue-900/20 text-slate-300 p-4 rounded-2xl rounded-tl-sm text-sm max-w-[95%] border border-blue-500/20 leading-relaxed shadow-[0_4px_20px_rgba(59,130,246,0.05)]">
               <p className="mb-2">Analisando a última ata de assembleia via <span className="text-blue-400 font-medium">Document AI</span>, identifiquei duas mudanças estruturais no <strong>Grupo Sicredi GR-4021</strong>:</p>
               <ol className="list-decimal list-inside space-y-1 ml-1 text-slate-400 mb-3">
                 <li>A inadimplência subiu de <span className="text-rose-400 font-mono">2.1%</span> para <span className="text-rose-400 font-mono">4.5%</span>.</li>
                 <li>A arrecadação do Fundo Comum permitiu a contemplação de apenas <strong>1 lance</strong> neste mês (versus 3 no mês anterior).</li>
               </ol>
               <p className="pt-2 border-t border-slate-700/50 flex items-start text-xs">
                 <ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
                 Recomendação: Mantenha a estratégia de 35% para a próxima janela, pois a sazonalidade de lances costuma cair no próximo trimestre, aumentando seu ranking relativo.
               </p>
             </div>
             <span className="text-[10px] text-slate-500 pl-1 flex items-center">
               <BrainCircuit className="w-3 h-3 mr-1 text-blue-500" /> ConsórcioAI • 14:03
             </span>
          </div>
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Pergunte sobre regras, extratos ou previsões..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-4 pr-12 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder-slate-500"
            />
            <button className="absolute right-2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors shadow-lg">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DocumentView = () => (
  <div className="max-w-5xl mx-auto space-y-6">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center">
          Ingestão de Dados (Document AI)
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Extração automática via AWS Textract e OCR em atas e planilhas.</p>
      </div>
      <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium px-4 py-2 rounded-lg border border-slate-700 transition-colors flex items-center">
        <Database className="w-4 h-4 mr-2" />
        Sincronizar Data Warehouse
      </button>
    </div>

    <div className="border-2 border-dashed border-slate-700 hover:border-blue-500/50 bg-slate-900/30 hover:bg-slate-900/50 transition-all rounded-2xl p-12 flex flex-col items-center justify-center text-center group cursor-pointer">
      <div className="bg-slate-800 p-4 rounded-full shadow-lg mb-5 border border-slate-700 group-hover:scale-110 group-hover:border-blue-500/30 transition-transform">
        <UploadCloud className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-200 mb-2">Arraste atas ou extratos do grupo aqui</h3>
      <p className="text-slate-500 text-sm mb-6 max-w-md">
        Suporte nativo para PDF (Textract Forms & Tables) e Excel/CSV. A IA estruturará dados de participantes, lances e histórico financeiro.
      </p>
      <button className="bg-slate-100 text-slate-900 font-bold px-6 py-2.5 rounded-lg hover:bg-white transition-colors shadow-lg shadow-white/5">
        Procurar Arquivos
      </button>
    </div>

    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-950/50 flex justify-between items-center">
        <h3 className="font-semibold text-slate-200 text-sm uppercase tracking-wider flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" />
          Pipeline de Processamento Recente
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-semibold">Documento Origem</th>
              <th className="px-6 py-4 font-semibold">Mapeamento Grupo</th>
              <th className="px-6 py-4 font-semibold">Volume Extraído</th>
              <th className="px-6 py-4 font-semibold">Status / Engine</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4 flex items-center text-slate-300 font-medium">
                <FileText className="w-4 h-4 mr-3 text-rose-400" />
                Ata_Assembleia_Ref_03_2024.pdf
              </td>
              <td className="px-6 py-4 text-slate-400">Sicredi GR-4021</td>
              <td className="px-6 py-4 text-slate-400"><span className="text-slate-200 font-mono">12</span> Lances Vencedores</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded text-xs font-bold border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
                  AWS Textract (Tables)
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4 flex items-center text-slate-300 font-medium">
                <FileText className="w-4 h-4 mr-3 text-emerald-500" />
                hist_contemplacoes_total.xlsx
              </td>
              <td className="px-6 py-4 text-slate-400">Itaú GR-8890</td>
              <td className="px-6 py-4 text-slate-400"><span className="text-slate-200 font-mono">450</span> Registros Validados</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded text-xs font-bold border border-blue-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5"></span>
                  ETL Normalizado (DB)
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4 flex items-center text-slate-300 font-medium">
                <FileText className="w-4 h-4 mr-3 text-rose-400" />
                Regulamento_Geral_V2.pdf
              </td>
              <td className="px-6 py-4 text-slate-400">Geral (Porto Seguro)</td>
              <td className="px-6 py-4 text-slate-400 italic">Extraindo regras...</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded text-xs font-bold border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
                  Document AI (NLP)
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator');

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200 overflow-hidden selection:bg-blue-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'simulator' && <SimulatorView />}
          {activeTab === 'xai' && <XAIView />}
          {activeTab === 'documents' && <DocumentView />}
          
          {['dashboard', 'groups', 'comparator'].includes(activeTab) && (
             <div className="flex flex-col items-center justify-center h-full text-slate-500 animate-in fade-in duration-500">
               <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 mb-6 shadow-2xl">
                 <BarChart3 className="w-10 h-10 text-slate-600" />
               </div>
               <h2 className="text-xl font-bold text-slate-300 uppercase tracking-widest">Módulo em Desenvolvimento</h2>
               <p className="mt-3 text-sm text-center max-w-md leading-relaxed">
                 O módulo <strong className="text-slate-400">{activeTab.toUpperCase()}</strong> exibirá dashboards analíticos usando os dados estruturados processados pelo motor de IA no Data Warehouse.
               </p>
               <button 
                  onClick={() => setActiveTab('simulator')}
                  className="mt-8 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                >
                 Retornar ao Simulador Probabilístico
               </button>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}
