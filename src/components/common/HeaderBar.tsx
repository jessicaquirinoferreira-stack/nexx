import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Shield, Sparkles, RotateCcw, User, LogOut, Settings, Award } from 'lucide-react';

interface HeaderBarProps {
  moduleTitle: string;
  moduleCategory?: string;
  onOpenSettings?: () => void;
  onOpenAdmin?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  moduleTitle,
  moduleCategory = 'PRINCIPAL',
  onOpenSettings,
  onOpenAdmin,
}) => {
  const { user, isAdmin, logout } = useAuth();
  const { seedSampleData, clearAllData, suppliers } = useData();

  return (
    <header className="sticky top-0 z-30 bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5 transition-all text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Module Indicator & Title */}
        <div className="flex items-center gap-3">
          {/* Executive Active Module Indicator */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-wider text-blue-300 uppercase font-sans">
              NEXUS · MÓDULO ATIVO
            </span>
          </div>

          <div className="hidden sm:block h-4 w-px bg-slate-700" />

          <div>
            <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              {moduleCategory}
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white leading-none tracking-tight">
              {moduleTitle}
            </h1>
          </div>
        </div>

        {/* Action Controls & User Capsule */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Demo Data / Clear Data Quick Toggle */}
          <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
            {suppliers.length === 0 ? (
              <button
                onClick={seedSampleData}
                title="Preencher com registros de teste para visualizar gráficos e fluxos"
                className="flex items-center gap-1.5 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-all font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Popular Demonstração</span>
              </button>
            ) : (
              <button
                onClick={clearAllData}
                title="Zerar todos os registros e retornar aos Empty States originais"
                className="flex items-center gap-1.5 px-2.5 py-1 text-slate-400 hover:text-rose-400 hover:bg-slate-700 rounded-lg transition-all font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Zerar (Empty States)</span>
              </button>
            )}
          </div>

          {/* Admin badge if role is admin */}
          {isAdmin && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-all border border-blue-500/50"
            >
              <Shield className="w-3.5 h-3.5 text-blue-200" />
              <span>Painel Master Admin</span>
            </button>
          )}

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 sm:border-l border-slate-800">
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-2 p-1 sm:pr-2.5 rounded-full hover:bg-slate-800/80 transition-colors text-left"
              title="Acessar Configurações e Perfil"
            >
              <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-600/70 flex items-center justify-center overflow-hidden text-blue-300 font-bold text-xs shadow-xs">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.slice(0, 2).toUpperCase() || 'NV'
                )}
              </div>
              <div className="hidden xl:block">
                <p className="text-xs font-semibold text-white leading-tight truncate max-w-[110px]">
                  {user?.name || 'Visitante'}
                </p>
                <span className="text-[10px] text-slate-400 block leading-none">
                  {user?.role === 'admin' ? 'Administrador' : user?.role === 'auditor' ? 'Auditor Líder' : 'Empresa'}
                </span>
              </div>
            </button>

            <button
              onClick={logout}
              title="Sair da plataforma"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
