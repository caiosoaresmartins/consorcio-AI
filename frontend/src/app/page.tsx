"use client"

import React, { useState, useEffect } from 'react';
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
  TrendingDown,
  Activity,
  FileText,
  UploadCloud,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Clock,
  Award,
  AlertTriangle,
  X,
  Send
} from 'lucide-react';

const mockGroups = [
  { id: 'GR-4021', admin: 'Sicredi', members: 450, defaultRate: '2.4%', avgBid: '34%', status: 'Saudável', credit: 'R$ 80K', type: 'Automóvel' },
  { id: 'GR-8890', admin: 'Itaú', members: 600, defaultRate: '5.1%', avgBid: '42%', status: 'Alerta', credit: 'R$ 350K', type: 'Imóvel' },
  { id: 'GR-1102', admin: 'Porto Seguro', members: 320, defaultRate: '1.2%', avgBid: '28%', status: 'Excelente', credit: 'R$ 60K', type: 'Automóvel' },
];

const STATUS_COLORS: Record<string, string> = {
  'Excelente': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Saudável': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Alerta': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Crítico': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

const TAB_LABELS: Record<string, string> = {
  dashboard: 'Visão Geral',
  groups: 'Meus Grupos',
  simulator: 'Simulador de Lances',
  xai: 'IA Explicativa (XAI)',
  documents: 'Document AI / OCR',
  comparator: 'Comparador',
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
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
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/60">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 shadow-[0_0_20px_rgba(37,99,235,0.4)] mr-3">
          <BrainCircuit className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-100 tracking-tight">
          Consórcio<span className="text-blue-400">AI</span>
        </span>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Plataforma Analítica</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group ${
                isActive
                  ? 'bg-blue-600/15 text-blue-300 border border-blue-500/25 shadow-inner'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 mr-3 shrink-0 transition-colors ${
                isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
              }`} />
              {item.label}
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-400/60" />}
            </button>
          );
        })}
      </nav>

      {/* User card */}
      <div className="p-3 border-t border-slate-800/60 space-y-1">
        <button className="flex items-center w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors">
          <Settings className="w-4 h-4 mr-3 text-slate-500" />
          Configurações
        </button>
        <div className="flex items-center px-3 py-2.5 rounded-xl bg-slate-900/50 border border-slate-800/50 mt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs mr-3">
            CR
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200 leading-none">Corretor Premium</p>
            <p className="text-xs text-slate-500 mt-0.5">Agência Alpha</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

// ─── Topbar ───────────────────────────────────────────────────────────────────
const Topbar = ({ activeTab }: { activeTab: string }) => (
  <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-8 sticky top-0 z-10">
    <div className="flex items-center">
      <span className="text-xs text-slate-500 font-medium">Plataforma</span>
      <ChevronRight className="w-3.5 h-3.5 text-slate-600 mx-2" />
      <span className="text-sm font-semibold text-slate-200">{TAB_LABELS[activeTab]}</span>
    </div>

    <div className="flex items-center bg-slate-900/60 rounded-xl px-3 py-2 w-80 border border-slate-800 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/30 transition-all">
      <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
      <input
        type="text"
        placeholder="Pesquisar cota, grupo..."
        className="bg-transparent border-none outline-none text-sm text-slate-200 w-full placeholder-slate-600"
      />
    </div>

    <div className="flex items-center space-x-3">
      <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors rounded-xl hover:bg-slate-800/60">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
      </button>
      <div className="flex items-center gap-2 cursor-pointer group bg-slate-900/50 border border-slate-800 rounded-xl px-3 py-1.5 hover:border-slate-700 transition-colors">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
          CR
        </div>
        <div className="hidden md:block">
          <p className="text-xs font-semibold text-slate-200 leading-none">Corretor Premium</p>
          <p className="text-[10px] text-slate-500">Agência Alpha</p>
        </div>
      </div>
    </div>
  </header>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, delta, color }: {
  icon: React.ElementType; label: string; value: string; delta?: string; color: string;
}) => {
  const isPositive = delta && !delta.startsWith('-');
  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] group relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-8 translate-x-8 ${color}`}></div>
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${color} bg-opacity-10 border border-current border-opacity-20`}>
          <Icon className="w-4 h-4" />
        </div>
        {delta && (
          <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full border ${
            isPositive ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {delta}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-slate-100 mt-4 tracking-tight">{value}</p>
      <p className="text-xs font-medium text-slate-500 mt-1">{label}</p>
    </div>
  );
};

// ─── Dashboard View ───────────────────────────────────────────────────────────
const DashboardView = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
  <div className="max-w-6xl mx-auto space-y-8">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Bom dia, Corretor! 👋</h1>
        <p className="text-slate-400 mt-1 text-sm">Aqui está o resumo analítico de hoje — <span className="text-blue-400">3 grupos monitorados</span>.</p>
      </div>
      <div className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
        Modelos atualizados há 2 min
      </div>
    </div>

    {/* KPI Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={Target} label="Probabilidade Média" value="68%" delta="+4.2%" color="text-blue-400" />
      <StatCard icon={Users} label="Cotas Monitoradas" value="1.370" delta="+12" color="text-purple-400" />
      <StatCard icon={Award} label="Contemplações (30d)" value="23" delta="+3" color="text-emerald-400" />
      <StatCard icon={AlertTriangle} label="Grupos em Alerta" value="1" delta="-2" color="text-amber-400" />
    </div>

    {/* Groups Table */}
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
        <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider flex items-center">
          <Users className="w-4 h-4 mr-2 text-blue-400" />
          Grupos Ativos
        </h3>
        <button onClick={() => setActiveTab('groups')} className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors">
          Ver todos <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-950 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Grupo / Admin</th>
              <th className="px-6 py-3 text-left font-semibold">Tipo</th>
              <th className="px-6 py-3 text-left font-semibold">Crédito</th>
              <th className="px-6 py-3 text-left font-semibold">Inadimplência</th>
              <th className="px-6 py-3 text-left font-semibold">Lance Médio</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {mockGroups.map((g) => (
              <tr key={g.id} className="hover:bg-slate-800/30 transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-200">{g.id}</p>
                  <p className="text-xs text-slate-500">{g.admin}</p>
                </td>
                <td className="px-6 py-4 text-slate-400">{g.type}</td>
                <td className="px-6 py-4 text-slate-200 font-mono text-xs">{g.credit}</td>
                <td className="px-6 py-4">
                  <span className={`font-mono text-xs font-bold ${
                    parseFloat(g.defaultRate) > 4 ? 'text-rose-400' : parseFloat(g.defaultRate) > 2 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>{g.defaultRate}</span>
                </td>
                <td className="px-6 py-4 text-slate-300 font-mono text-xs">{g.avgBid}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[g.status]}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
                    {g.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Quick actions */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { icon: Calculator, label: 'Simular Lance', desc: 'Calcule probabilidade de contemplação', tab: 'simulator', color: 'from-blue-600/20 to-blue-800/10 border-blue-500/20' },
        { icon: BrainCircuit, label: 'Explicação IA', desc: 'Entenda o que impacta seu ranking', tab: 'xai', color: 'from-purple-600/20 to-purple-800/10 border-purple-500/20' },
        { icon: Files, label: 'Processar Ata', desc: 'Faça upload de documentos do grupo', tab: 'documents', color: 'from-emerald-600/20 to-emerald-800/10 border-emerald-500/20' },
      ].map((action) => (
        <button
          key={action.tab}
          onClick={() => setActiveTab(action.tab)}
          className={`flex items-center gap-4 p-5 rounded-2xl border bg-gradient-to-br ${action.color} hover:scale-[1.02] transition-all duration-200 text-left group`}
        >
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/50">
            <action.icon className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <p className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">{action.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-slate-400 transition-colors" />
        </button>
      ))}
    </div>
  </div>
);

// ─── Groups View ──────────────────────────────────────────────────────────────
const GroupsView = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
  <div className="max-w-6xl mx-auto space-y-6">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Meus Grupos</h1>
        <p className="text-slate-400 mt-1 text-sm">Gerencie e monitore todos os grupos em carteira.</p>
      </div>
      <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all">
        <Zap className="w-4 h-4" />
        Adicionar Grupo
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {mockGroups.map((g) => (
        <div key={g.id} className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden group">
          <div className="p-5 border-b border-slate-800 flex justify-between items-start">
            <div>
              <p className="font-bold text-slate-100 text-base">{g.id}</p>
              <p className="text-sm text-slate-400 mt-0.5">{g.admin} · {g.type}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[g.status]}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
              {g.status}
            </span>
          </div>
          <div className="p-5 grid grid-cols-2 gap-3">
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Crédito</p>
              <p className="text-sm font-bold text-slate-200 mt-1">{g.credit}</p>
            </div>
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Participantes</p>
              <p className="text-sm font-bold text-slate-200 mt-1">{g.members}</p>
            </div>
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Inadimplência</p>
              <p className={`text-sm font-bold mt-1 ${
                parseFloat(g.defaultRate) > 4 ? 'text-rose-400' : parseFloat(g.defaultRate) > 2 ? 'text-amber-400' : 'text-emerald-400'
              }`}>{g.defaultRate}</p>
            </div>
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Lance Médio</p>
              <p className="text-sm font-bold text-blue-400 mt-1">{g.avgBid}</p>
            </div>
          </div>
          <div className="px-5 pb-5">
            <button
              onClick={() => setActiveTab('simulator')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-300 hover:text-white transition-colors border border-slate-700 flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" /> Simular Lance
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Simulator View ───────────────────────────────────────────────────────────
const SimulatorView = () => {
  const [bidValue, setBidValue] = useState<number>(30);
  const [horizon, setHorizon] = useState('6');
  const [calculating, setCalculating] = useState(false);

  const baseProb = horizon === '3' ? 15 : horizon === '6' ? 45 : 82;
  const currentProb = Math.min(99, Math.round(baseProb + (bidValue * 0.8)));
  const expectedTime = Math.max(1, Math.round(18 - (bidValue * 0.15)));

  const handleRecalc = () => {
    setCalculating(true);
    setTimeout(() => setCalculating(false), 900);
  };

  const probColor = currentProb > 70 ? '#34d399' : currentProb > 40 ? '#60a5fa' : '#fbbf24';
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (currentProb / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            Simulador Probabilístico
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">Modelo v2.1</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Previsão de contemplação utilizando Survival Analysis (Cox/GBS).</p>
        </div>
        <div className="bg-slate-900 text-slate-300 px-4 py-2 rounded-xl flex items-center text-xs font-medium border border-slate-800">
          <Activity className="w-4 h-4 mr-2 text-emerald-400" />
          Última inferência: há 2 minutos
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Params */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col">
          <h3 className="font-bold text-slate-200 mb-6 flex items-center text-xs uppercase tracking-wider text-slate-400">
            <Settings className="w-4 h-4 mr-2 text-blue-400" /> Parâmetros da Cota
          </h3>
          <div className="space-y-6 flex-1">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Grupo Alvo</label>
              <div className="relative">
                <select className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 appearance-none transition-all">
                  <option>Grupo 4021 - Sicredi (Carros)</option>
                  <option>Grupo 8890 - Itaú (Imóveis)</option>
                  <option>Grupo 1102 - Porto Seguro (Carros)</option>
                </select>
                <ChevronRight className="absolute right-3 top-3.5 w-4 h-4 text-slate-500 rotate-90 pointer-events-none" />
              </div>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
              <div className="flex justify-between mb-3">
                <label className="text-sm font-semibold text-slate-300">Percentual de Lance</label>
                <span className="text-xl font-extrabold text-blue-400">{bidValue}%</span>
              </div>
              <input
                type="range" min="0" max="100"
                value={bidValue}
                onChange={(e) => setBidValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] uppercase font-bold text-slate-600 mt-2">
                <span>0% (Sorteio)</span><span>100% (Máx)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Horizonte de Previsão</label>
              <div className="grid grid-cols-3 gap-2">
                {['3', '6', '12'].map(m => (
                  <button
                    key={m} onClick={() => setHorizon(m)}
                    className={`py-2.5 text-sm font-bold rounded-xl border transition-all duration-200 ${
                      horizon === m
                        ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.35)]'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >{m}m</button>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleRecalc}
            disabled={calculating}
            className="w-full mt-6 bg-white hover:bg-slate-100 disabled:opacity-60 text-slate-900 font-extrabold py-3 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg"
          >
            {calculating ? (
              <><div className="w-4 h-4 border-2 border-slate-400 border-t-slate-900 rounded-full animate-spin"></div> Calculando...</>
            ) : (
              <><Calculator className="w-4 h-4" /> Recalcular Cenário</>
            )}
          </button>
        </div>

        {/* Results */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center">
              <Activity className="w-4 h-4 mr-2 text-blue-400" /> Resultado da Inferência
            </h3>
            <span className="text-xs text-slate-500 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">IC: 95%</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Gauge */}
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Probabilidade P(t)</p>
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="54" fill="none" stroke="#1e293b" strokeWidth="10" />
                  <circle
                    cx="64" cy="64" r="54" fill="none"
                    stroke={probColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s ease', filter: `drop-shadow(0 0 8px ${probColor}60)` }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold tracking-tighter" style={{ color: probColor }}>{currentProb}%</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-1">[{Math.max(0, currentProb-4)}% – {Math.min(100, currentProb+4)}%]</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Tempo Esperado E(T)</p>
              <div className="flex items-end justify-center mb-2">
                <span className="text-5xl font-extrabold text-slate-100 tracking-tighter">{expectedTime}</span>
                <span className="ml-2 text-base font-bold text-slate-500 mb-1">meses</span>
              </div>
              <p className="text-xs text-slate-500 flex items-center mt-2">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
                Baseado no histórico do Fundo Comum
              </p>
              <div className="mt-3 flex items-center gap-1 text-emerald-400 text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                Sazonalidade favorável em Dez.
              </div>
            </div>
          </div>

          <div className="flex-1 border-t border-slate-800 pt-5">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Curva de Sobrevivência S(t)</h4>
              <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Cox/AFT Model</span>
            </div>
            <div className="h-28 flex items-end justify-between px-1 gap-1 relative">
              <div className="absolute bottom-0 left-0 w-full h-px bg-slate-800/80"></div>
              {[...Array(12)].map((_, i) => {
                const h = currentProb > 50
                  ? Math.max(8, Math.min(95, (12 - i) * 7.5 + Math.random() * 5))
                  : Math.max(8, Math.min(95, (i + 1) * 7.5 + Math.random() * 5));
                return (
                  <div key={i} className="flex-1 flex items-end" style={{ height: '100%' }}>
                    <div
                      className="w-full rounded-t-sm border-t-2 border-blue-400 bg-blue-500/20 hover:bg-blue-400/40 transition-colors cursor-pointer"
                      style={{ height: `${h}%` }}
                      title={`Mês ${i + 1}`}
                    ></div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3 px-1">
              <span>Hoje</span><span>+6 Meses</span><span>+12 Meses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── XAI View ─────────────────────────────────────────────────────────────────
const XAIView = () => {
  const [messages, setMessages] = useState([
    { from: 'user', text: 'Por que minha probabilidade caiu 5% em relação ao mês passado se mantive o mesmo lance?', time: '14:02' },
    { from: 'ai', text: 'Analisando a última ata de assembleia via Document AI, identifiquei duas mudanças estruturais no **Grupo Sicredi GR-4021**: (1) a inadimplência subiu de 2.1% para 4.5%; (2) apenas 1 lance foi contemplado este mês vs. 3 no anterior. Recomendação: mantenha 35% — a sazonalidade cai no próximo trimestre, aumentando seu ranking relativo.', time: '14:03' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: input, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'ai', text: 'Processando sua consulta com base nos documentos e histórico do grupo... Aguarde a análise.', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          IA Explicativa (XAI)
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">Transparência Ativa</span>
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Compreenda o peso de cada variável nas predições do modelo de risco.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SHAP */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-4 mb-6 flex items-center text-xs uppercase tracking-wider text-slate-400">
            <BrainCircuit className="w-4 h-4 mr-2 text-purple-400" /> Feature Importance (SHAP Values)
          </h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Impacto das variáveis para a probabilidade final de <span className="text-white font-bold bg-slate-800 px-1.5 py-0.5 rounded-md">78%</span> estimada para a Cota 124.
          </p>
          <div className="space-y-4 flex-1">
            {[
              { label: 'Percentual de Lance', value: 35, impact: 45, type: 'positive' },
              { label: 'Sazonalidade (Dezembro)', value: null, impact: 15, type: 'positive' },
              { label: 'Saúde do Fundo Comum', value: null, impact: 8, type: 'positive' },
              { label: 'Inadimplência Grupo', value: 5.2, impact: -12, type: 'negative' },
              { label: 'Taxa Hist. Vencedores', value: null, impact: -5, type: 'negative' },
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                    {item.label}{item.value !== null ? ` (${item.value}%)` : ''}
                  </span>
                  <span className={`text-xs font-bold font-mono ${
                    item.type === 'positive' ? 'text-emerald-400' : 'text-rose-400'
                  }`}>{item.type === 'positive' ? '+' : ''}{item.impact}%</span>
                </div>
                <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.type === 'positive' ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : 'bg-gradient-to-r from-rose-600 to-rose-400'
                    }`}
                    style={{ width: `${Math.abs(item.impact) * 2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-6 border-t border-slate-800 pt-4">
            <div className="flex items-center text-xs text-slate-400"><div className="w-3 h-1.5 rounded-full bg-emerald-400 mr-2"></div> Aumenta</div>
            <div className="flex items-center text-xs text-slate-400"><div className="w-3 h-1.5 rounded-full bg-rose-400 mr-2"></div> Reduz</div>
          </div>
        </div>

        {/* RAG Chat */}
        <div className="bg-slate-900 rounded-2xl flex flex-col border border-slate-800 shadow-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-200 flex items-center text-xs uppercase tracking-wider text-slate-400">
              <MessageSquare className="w-4 h-4 mr-2 text-blue-400" /> Agente RAG Consórcio
            </h3>
            <span className="flex items-center text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></div>Online
            </span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/20 min-h-0" style={{ maxHeight: 360 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col gap-1 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl text-sm max-w-[90%] leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tr-sm'
                    : 'bg-blue-900/20 text-slate-300 border border-blue-500/20 rounded-tl-sm'
                }`}>
                  {msg.text}
                  {msg.from === 'ai' && (
                    <p className="mt-2 pt-2 border-t border-slate-700/50 flex items-center text-xs text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> Baseado nos documentos do grupo
                    </p>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 px-1">
                  {msg.from === 'ai' ? <span className="flex items-center"><BrainCircuit className="w-3 h-3 mr-1 text-blue-500" />ConsórcioAI</span> : 'Você'} • {msg.time}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-950/50 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Pergunte sobre regras, extratos ou previsões..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder-slate-600"
              />
              <button
                onClick={sendMessage}
                className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Document View ────────────────────────────────────────────────────────────
const DocumentView = () => {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Ingestão de Dados</h1>
          <p className="text-slate-400 mt-1 text-sm">Extração automática via AWS Textract e OCR em atas e planilhas.</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium px-4 py-2.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-2">
          <Database className="w-4 h-4" /> Sincronizar DW
        </button>
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={() => setDragging(false)}
        className={`border-2 border-dashed rounded-2xl p-14 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
          dragging
            ? 'border-blue-500 bg-blue-500/5'
            : 'border-slate-700 hover:border-blue-500/50 bg-slate-900/30 hover:bg-slate-900/50'
        }`}
      >
        <div className={`p-4 rounded-2xl mb-5 border transition-all duration-300 shadow-lg ${
          dragging ? 'bg-blue-600/20 border-blue-500/40 scale-110' : 'bg-slate-800 border-slate-700'
        }`}>
          <UploadCloud className={`w-8 h-8 transition-colors ${ dragging ? 'text-blue-400' : 'text-slate-400' }`} />
        </div>
        <h3 className="text-lg font-bold text-slate-200 mb-2">
          {dragging ? 'Solte aqui para processar' : 'Arraste atas ou extratos do grupo'}
        </h3>
        <p className="text-slate-500 text-sm mb-6 max-w-md">
          Suporte nativo para PDF (Textract) e Excel/CSV. A IA estruturará dados de participantes, lances e histórico financeiro.
        </p>
        <button className="bg-slate-100 hover:bg-white text-slate-900 font-bold px-6 py-2.5 rounded-xl transition-colors shadow-lg">
          Procurar Arquivos
        </button>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" /> Pipeline de Processamento
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-950 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold">Documento</th>
                <th className="px-6 py-3 font-semibold">Grupo</th>
                <th className="px-6 py-3 font-semibold">Volume</th>
                <th className="px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {[
                { name: 'Ata_Assembleia_Ref_03_2024.pdf', group: 'Sicredi GR-4021', volume: '12 Lances', status: 'success', badge: 'AWS Textract', icon: 'pdf' },
                { name: 'hist_contemplacoes_total.xlsx', group: 'Itaú GR-8890', volume: '450 Registros', status: 'info', badge: 'ETL Normalizado', icon: 'xls' },
                { name: 'Regulamento_Geral_V2.pdf', group: 'Porto Seguro (Geral)', volume: 'Extraindo...', status: 'warning', badge: 'Document AI (NLP)', icon: 'pdf' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <FileText className={`w-4 h-4 shrink-0 ${ row.icon === 'pdf' ? 'text-rose-400' : 'text-emerald-500' }`} />
                    <span className="text-slate-300 font-medium">{row.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{row.group}</td>
                  <td className="px-6 py-4 text-slate-300 font-mono text-xs">{row.volume}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                      row.status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      row.status === 'info' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-current mr-1.5 ${ row.status === 'warning' ? 'animate-pulse' : '' }`}></span>
                      {row.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Comparator View ──────────────────────────────────────────────────────────
const ComparatorView = () => {
  const [selected, setSelected] = useState<string[]>(['GR-4021', 'GR-1102']);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id].slice(-2));
  };

  const groups = mockGroups.filter(g => selected.includes(g.id));

  const metrics = [
    { key: 'members', label: 'Participantes', format: (v: string | number) => v.toString() },
    { key: 'defaultRate', label: 'Inadimplência', format: (v: string | number) => v.toString() },
    { key: 'avgBid', label: 'Lance Médio', format: (v: string | number) => v.toString() },
    { key: 'credit', label: 'Crédito', format: (v: string | number) => v.toString() },
    { key: 'status', label: 'Status', format: (v: string | number) => v.toString() },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Comparador de Grupos</h1>
        <p className="text-slate-400 mt-1 text-sm">Selecione até 2 grupos para comparar lado a lado.</p>
      </div>

      {/* Group selector */}
      <div className="flex gap-3">
        {mockGroups.map(g => (
          <button
            key={g.id}
            onClick={() => toggle(g.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              selected.includes(g.id)
                ? 'bg-blue-600/15 border-blue-500/40 text-blue-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600'
            }`}
          >
            {selected.includes(g.id) && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
            {g.id} · {g.admin}
          </button>
        ))}
      </div>

      {groups.length === 2 ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="grid grid-cols-3 divide-x divide-slate-800">
            <div className="p-5 bg-slate-950/50">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Métrica</p>
            </div>
            {groups.map(g => (
              <div key={g.id} className="p-5 bg-slate-950/30">
                <p className="font-bold text-slate-100">{g.id}</p>
                <p className="text-xs text-slate-500">{g.admin} · {g.type}</p>
              </div>
            ))}
          </div>
          {metrics.map((m, i) => (
            <div key={i} className="grid grid-cols-3 divide-x divide-slate-800 border-t border-slate-800 hover:bg-slate-800/20 transition-colors">
              <div className="p-4 px-5 text-xs font-semibold text-slate-400 flex items-center">{m.label}</div>
              {groups.map(g => (
                <div key={g.id} className="p-4 px-5">
                  {m.key === 'status' ? (
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[g.status]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>{g.status}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-slate-200">{m.format((g as Record<string, string | number>)[m.key])}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
          <BarChart3 className="w-10 h-10 text-slate-700 mb-3" />
          <p className="text-sm font-medium">Selecione exatamente 2 grupos para comparar</p>
        </div>
      )}
    </div>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200 overflow-hidden selection:bg-blue-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden bg-[radial-gradient(ellipse_80%_50%_at_80%_-20%,rgba(30,58,138,0.15),transparent)]">
        <Topbar activeTab={activeTab} />
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <DashboardView setActiveTab={setActiveTab} />}
          {activeTab === 'groups' && <GroupsView setActiveTab={setActiveTab} />}
          {activeTab === 'simulator' && <SimulatorView />}
          {activeTab === 'xai' && <XAIView />}
          {activeTab === 'documents' && <DocumentView />}
          {activeTab === 'comparator' && <ComparatorView />}
        </main>
      </div>
    </div>
  );
}
