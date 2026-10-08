import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  Calendar,
  Menu,
  X,
  ShieldCheck,
  Shield,
  Award,
  Globe2,
  CheckSquare,
  BarChart3,
  FileText,
  Users2,
  BookOpen,
  GraduationCap,
  HeadphonesIcon,
  Settings,
  Sparkles,
  RotateCcw,
  LogOut
} from 'lucide-react';
import { NavigationTab } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface MobileNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
  onOpenLanding: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenSettings,
  onOpenAdmin,
  onOpenLanding,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { suppliers, seedSampleData, clearAllData } = useData();

  const handleSelect = (tab: NavigationTab) => {
    onSelectTab(tab);
    setDrawerOpen(false);
  };

  const navItems = [
    { id: 'painel' as NavigationTab, label: 'Painel', icon: LayoutDashboard },
    { id: 'fornecedores' as NavigationTab, label: 'Fornecedores', icon: Building2 },
    { id: 'auditorias' as NavigationTab, label: 'Auditorias', icon: ClipboardCheck },
    { id: 'agenda' as NavigationTab, label: 'Agenda', icon: Calendar },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B132B]/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg text-slate-400">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-blue-400 font-semibold scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] leading-tight">{item.label}</span>
            </button>
          );
        })}

        {/* Menu Drawer Toggle */}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
            drawerOpen ? 'text-blue-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Mais</span>
        </button>
      </nav>

      {/* Drawer Overlay & Panel */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative ml-auto w-4/5 max-w-xs bg-[#0F172A] border-l border-slate-800 h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200 text-slate-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-transparent flex items-center justify-center overflow-hidden p-0.5">
                  <img
                    src="https://i.postimg.cc/zvWspM3H/Chat-GPT-Image-8-de-out-de-2026-18-07-55.png"
                    alt="Nexus Veritas Logo"
                    className="w-full h-full object-contain drop-shadow"
                  />
                </div>
                <span className="font-brand text-xs font-bold text-white tracking-wider">
                  NEXUS VERITAS
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  MÓDULOS DE GESTÃO
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleSelect('mapa-mundial')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <Globe2 className="w-4 h-4 text-blue-400" />
                    <span>Mapa Mundial de Fornecedores</span>
                  </button>
                  <button
                    onClick={() => handleSelect('planos-de-acao')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <CheckSquare className="w-4 h-4 text-blue-400" />
                    <span>Planos de Ação (CAPA)</span>
                  </button>
                  <button
                    onClick={() => handleSelect('indicadores')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                    <span>Indicadores de Desempenho</span>
                  </button>
                  <button
                    onClick={() => handleSelect('certificados')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <Award className="w-4 h-4 text-blue-400" />
                    <span>Certificados & Acreditação</span>
                  </button>
                  <button
                    onClick={() => handleSelect('documentos')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Documentos Personalizados</span>
                  </button>
                  <button
                    onClick={() => handleSelect('rede-profissional')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <Users2 className="w-4 h-4 text-blue-400" />
                    <span>Rede de Auditores</span>
                  </button>
                  <button
                    onClick={() => handleSelect('revista')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span>Revista Técnica</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  ACADEMY & SUPORTE
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleSelect('meus-cursos')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                    <span>Meus Cursos / Academy</span>
                  </button>
                  <button
                    onClick={() => handleSelect('fala-com-corpo-tecnico')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <HeadphonesIcon className="w-4 h-4 text-blue-400" />
                    <span>Fala com Corpo Técnico</span>
                  </button>
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenSettings();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800"
                  >
                    <Settings className="w-4 h-4 text-blue-400" />
                    <span>Configurações & Perfil</span>
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-blue-300 bg-blue-950/60 border border-blue-800/80 hover:bg-blue-900/60 font-semibold"
                    >
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>Painel Master Admin</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Data Demo Toggle for mobile */}
              <div className="pt-2 border-t border-slate-800">
                {suppliers.length === 0 ? (
                  <button
                    onClick={() => {
                      seedSampleData();
                      setDrawerOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Carregar Dados de Exemplo</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      clearAllData();
                      setDrawerOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retornar a Empty States</span>
                  </button>
                )}
              </div>
            </div>

            {/* Drawer User Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-700 flex items-center justify-center text-blue-300 font-bold text-xs">
                  {user?.name?.slice(0, 2).toUpperCase() || 'NV'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user?.name || 'Visitante'}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user?.email || ''}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setDrawerOpen(false);
                }}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
