import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Globe2,
  ClipboardCheck,
  Calendar,
  CheckSquare,
  BarChart3,
  Award,
  FileText,
  Users2,
  BookOpen,
  GraduationCap,
  Layers,
  UserCheck,
  HeadphonesIcon,
  ShieldCheck,
  Settings,
  Sparkles,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export type NavigationTab =
  | 'painel'
  | 'fornecedores'
  | 'mapa-mundial'
  | 'auditorias'
  | 'agenda'
  | 'planos-de-acao'
  | 'indicadores'
  | 'certificados'
  | 'documentos'
  | 'rede-profissional'
  | 'revista'
  | 'meus-cursos'
  | 'catalogo-academy'
  | 'area-do-instrutor'
  | 'fala-com-corpo-tecnico'
  | 'configuracoes-perfil'
  | 'admin-panel';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
  onOpenLanding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSettings,
  onOpenAdmin,
  onOpenLanding,
}) => {
  const { user, isAdmin } = useAuth();

  const sections = [
    {
      label: 'PRINCIPAL',
      items: [
        { id: 'painel' as NavigationTab, label: 'Painel', icon: LayoutDashboard },
        { id: 'fornecedores' as NavigationTab, label: 'Fornecedores', icon: Building2 },
        { id: 'mapa-mundial' as NavigationTab, label: 'Mapa Mundial', icon: Globe2 },
        { id: 'auditorias' as NavigationTab, label: 'Auditorias', icon: ClipboardCheck },
      ],
    },
    {
      label: 'GESTÃO',
      items: [
        { id: 'agenda' as NavigationTab, label: 'Agenda', icon: Calendar },
        { id: 'planos-de-acao' as NavigationTab, label: 'Planos de ação', icon: CheckSquare },
        { id: 'indicadores' as NavigationTab, label: 'Indicadores', icon: BarChart3 },
        { id: 'certificados' as NavigationTab, label: 'Certificados', icon: Award },
        { id: 'documentos' as NavigationTab, label: 'Documentos', icon: FileText },
        { id: 'rede-profissional' as NavigationTab, label: 'Rede profissional', icon: Users2 },
        { id: 'revista' as NavigationTab, label: 'Revista', icon: BookOpen },
      ],
    },
    {
      label: 'ACADEMY',
      items: [
        { id: 'meus-cursos' as NavigationTab, label: 'Meus cursos', icon: GraduationCap },
        { id: 'catalogo-academy' as NavigationTab, label: 'Catálogo Academy', icon: Layers },
        { id: 'area-do-instrutor' as NavigationTab, label: 'Área do instrutor', icon: UserCheck },
      ],
    },
    {
      label: 'SUPORTE',
      items: [
        { id: 'fala-com-corpo-tecnico' as NavigationTab, label: 'Fala com Corpo Técnico', icon: HeadphonesIcon },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#0B132B] border-r border-slate-800 flex flex-col h-screen shrink-0 sticky top-0 z-40 select-none shadow-sm text-slate-200">
      {/* Brand Logo Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <button
          onClick={onOpenLanding}
          className="flex items-center gap-3 text-left group"
          title="Ver Landing Page da Nexus Veritas"
        >
          {/* Official Logo with transparent background */}
          <div className="w-12 h-12 rounded-xl bg-transparent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden p-0.5">
            <img
              src="https://i.postimg.cc/zvWspM3H/Chat-GPT-Image-8-de-out-de-2026-18-07-55.png"
              alt="Nexus Veritas Logo"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>

          <div>
            <div className="font-brand text-[13px] font-extrabold text-white leading-none tracking-wider">
              NEXUS VERITAS
            </div>
            <div className="text-[9px] font-bold text-blue-400 tracking-[0.18em] uppercase leading-tight mt-0.5">
              CERTIFICATION
            </div>
          </div>
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-none">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase font-sans">
              {section.label}
            </div>
            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Master Admin Section if user is admin */}
        {isAdmin && (
          <div className="pt-2 border-t border-slate-800/80">
            <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-blue-400 uppercase font-sans">
              ADMINISTRAÇÃO
            </div>
            <button
              onClick={onOpenAdmin}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'admin-panel'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/80 border border-slate-700/60'
              }`}
            >
              <Shield className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Painel Master Admin</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer User Profile (Exact requirement: avatar circular + nome do usuário + email legível) */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/50">
        <div
          onClick={onOpenSettings}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/80 transition-all cursor-pointer group"
          title="Clique para editar seu perfil e configurações"
        >
          {/* Avatar circular */}
          <div className="w-10 h-10 rounded-full bg-blue-950 border-2 border-blue-600/60 flex items-center justify-center overflow-hidden shrink-0 text-blue-300 font-bold text-xs shadow-xs">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.name?.slice(0, 2).toUpperCase() || 'NV'
            )}
          </div>

          {/* Nome do usuário + email legível */}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate leading-tight group-hover:text-blue-400 transition-colors">
              {user?.name || 'Visitante Nexus'}
            </div>
            <div className="text-[11px] text-slate-400 truncate leading-tight select-all font-mono">
              {user?.email || 'contato@nexusveritas.com'}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenSettings();
            }}
            className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 shrink-0"
            title="Configurações"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
