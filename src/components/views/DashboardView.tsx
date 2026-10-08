import React from 'react';
import {
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  Award,
  BarChart3,
  Globe2,
  Calendar,
  Users2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { NavigationTab } from '../layout/Sidebar';
import { StatCard } from '../common/StatCard';

interface DashboardViewProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const {
    suppliers,
    audits,
    certificates,
    events,
    actionPlans,
    partners,
  } = useData();

  const homologadosCount = suppliers.filter((s) => s.status === 'Homologado').length;
  const activeAuditsCount = audits.filter((a) => a.status === 'Em Andamento').length;
  const validCertsCount = certificates.filter((c) => c.status === 'Aprovado').length;
  const averageIQF =
    suppliers.length > 0
      ? Math.round(
          suppliers.reduce((acc, curr) => acc + curr.iqfScore, 0) / suppliers.length
        )
      : null;

  return (
    <div className="space-y-6 text-slate-200">
      {/* Welcome Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-900/25 to-transparent rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>PAINEL EXECUTIVO DE CONFORMIDADE & IQF</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bem-vindo, {user?.name || 'Auditor Líder'}
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm mt-2 font-normal leading-relaxed">
              Monitore a integridade da sua cadeia de suprimentos crítica, audite requisitos normativos e emita certificações com padrão internacional.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('fornecedores')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>+ Novo Fornecedor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('auditorias')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
            >
              Nova Auditoria
            </button>
          </div>
        </div>
      </div>

      {/* Primary 4 Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="FORNECEDORES HOMOLOGADOS"
          value={homologadosCount}
          subtitle={`De ${suppliers.length} cadastrados`}
          icon={Building2}
          badge="Cadeia"
          badgeColor="green"
          onClick={() => onNavigate('fornecedores')}
        />
        <StatCard
          label="AUDITORIAS EM ANDAMENTO"
          value={activeAuditsCount}
          subtitle="Ciclos em execução"
          icon={ClipboardCheck}
          badge="Ativas"
          badgeColor="yellow"
          onClick={() => onNavigate('auditorias')}
        />
        <StatCard
          label="CERTIFICADOS APROVADOS"
          value={validCertsCount}
          subtitle="Selo com QR Code"
          icon={Award}
          badge="Oficiais"
          badgeColor="blue"
          onClick={() => onNavigate('certificados')}
        />
        <StatCard
          label="IQF MÉDIO GLOBAL"
          value={averageIQF !== null ? `${averageIQF}/100` : '--'}
          subtitle="Índice de Qualificação"
          icon={BarChart3}
          badge="Score"
          badgeColor="orange"
          onClick={() => onNavigate('indicadores')}
        />
      </div>

      {/* Grid: Módulos de Acesso Rápido */}
      <div>
        <h2 className="text-base font-bold text-white mb-3">
          Módulos Operacionais da Plataforma
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: 'fornecedores' as NavigationTab, label: 'Portal Fornecedores', icon: Building2, count: suppliers.length },
            { id: 'auditorias' as NavigationTab, label: 'Auditorias', icon: ClipboardCheck, count: audits.length },
            { id: 'planos-de-acao' as NavigationTab, label: 'Planos de Ação', icon: CheckCircle2, count: actionPlans.length },
            { id: 'agenda' as NavigationTab, label: 'Agenda 2026', icon: Calendar, count: events.length },
            { id: 'mapa-mundial' as NavigationTab, label: 'Mapa Mundial', icon: Globe2 },
            { id: 'rede-profissional' as NavigationTab, label: 'Rede de Auditores', icon: Users2 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 text-center shadow-xs transition-all group flex flex-col items-center justify-center text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950 group-hover:bg-blue-950 text-slate-400 group-hover:text-blue-400 flex items-center justify-center transition-colors mb-2 border border-slate-800">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white leading-tight block truncate max-w-full">
                  {item.label}
                </span>
                {item.count !== undefined && (
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {item.count} registro(s)
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Recent Audits & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recentes */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-white">
              Últimas Auditorias Realizadas
            </h3>
            <button
              onClick={() => onNavigate('auditorias')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              Ver todas →
            </button>
          </div>

          {audits.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              <ClipboardCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p>Nenhuma auditoria iniciada ainda.</p>
              <button
                onClick={() => onNavigate('auditorias')}
                className="mt-2 text-blue-400 font-semibold underline"
              >
                Criar primeira auditoria
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {audits.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  onClick={() => onNavigate('auditorias')}
                  className="p-3 bg-slate-950/60 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {a.clientName}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {a.norm} · {a.code}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-blue-400">{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Próximos eventos na Agenda */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-white">
              Agenda de Auditorias & Ciclos
            </h3>
            <button
              onClick={() => onNavigate('agenda')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              Ver calendário →
            </button>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p>Nenhum compromisso agendado no momento.</p>
              <button
                onClick={() => onNavigate('agenda')}
                className="mt-2 text-blue-400 font-semibold underline"
              >
                Agendar evento
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {events.slice(0, 3).map((e) => (
                <div
                  key={e.id}
                  onClick={() => onNavigate('agenda')}
                  className="p-3 bg-slate-950/60 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">{e.title}</span>
                    <span className="text-[11px] text-slate-400">
                      {e.date} · {e.time}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400">{e.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
