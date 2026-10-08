import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Users2,
  Globe2,
  FileCheck2,
  ArrowRight,
  ExternalLink,
  Shield,
  Layers,
  Lock,
  Leaf,
  HeartPulse,
  Car,
  Utensils,
  FileKey,
  CheckSquare,
  Building2,
  Search,
  Sparkles,
  X,
  ChevronRight
} from 'lucide-react';
import { STANDARD_NORMS } from '../../data/initialData';
import { useData } from '../../context/DataContext';
import { Partner } from '../../types';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onEnterPlatform: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onEnterPlatform,
}) => {
  const { landingContent, partners } = useData();

  // Selected partner modal state
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchPartner, setSearchPartner] = useState<string>('');

  const normIcons: Record<string, any> = {
    'ISO 9001': ShieldCheck,
    'ISO 14001': Leaf,
    'ISO 45001': HeartPulse,
    'ISO 27001': Lock,
    'FSSC 22000': Utensils,
    'IATF 16949': Car,
    'ESG': Globe2,
    'LGPD': FileKey,
    'GMP': CheckSquare,
    'BRC': Award,
  };

  const capabilities = [
    {
      num: '01',
      title: 'Portal de Qualificação & IQF Automatizado',
      desc: 'Cálculo analítico do Índice de Qualificação de Fornecedores com ponderação dinâmica por criticidade e matriz de risco regulatório.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Auditorias de 1ª, 2ª e 3ª Partes',
      desc: 'Checklists digitais multinorma com registro instantâneo de não conformidades, relatórios fotográficos e trilha de auditoria inviolável.',
      icon: FileCheck2,
    },
    {
      num: '03',
      title: 'Certificados Digitais com Validação QR Code',
      desc: 'Emissão oficial de certificados criptograficamente rastreáveis com link público de autenticidade instantânea contra adulterações.',
      icon: Award,
    },
    {
      num: '04',
      title: 'Planos de Ação 5W2H & Metodologia CAPA',
      desc: 'Fluxo estruturado de tratamento de causa raiz, contenção e verificação de eficácia de ações corretivas com prazos contratuais.',
      icon: CheckCircle2,
    },
    {
      num: '05',
      title: 'Corpo Técnico & Auditores Líderes IRCA',
      desc: 'Corpo técnico sênior homologado para atendimento de demandas complexas em sistemas de gestão integrados em âmbito nacional.',
      icon: Users2,
    },
    {
      num: '06',
      title: 'Nexus Academy & Capacitação Executiva',
      desc: 'Capacitação contínua para gestores da qualidade, auditores internos e líderes industriais com metodologia prática de conformidade.',
      icon: ShieldCheck,
    },
  ];

  // Filter partners
  const activePartners = partners.filter((p) => p.isActive !== false);

  const filteredPartners = activePartners.filter((p) => {
    const matchesSector =
      selectedSector === 'all' ||
      (selectedSector === 'energia' && p.category.toLowerCase().includes('energia') || p.category.toLowerCase().includes('petróleo')) ||
      (selectedSector === 'aero' && p.category.toLowerCase().includes('aero')) ||
      (selectedSector === 'mineracao' && (p.category.toLowerCase().includes('minera') || p.category.toLowerCase().includes('siderurg') || p.category.toLowerCase().includes('metal'))) ||
      (selectedSector === 'automacao' && (p.category.toLowerCase().includes('auto') || p.category.toLowerCase().includes('elétr'))) ||
      (selectedSector === 'alimentos' && (p.category.toLowerCase().includes('alimento') || p.category.toLowerCase().includes('bio') || p.category.toLowerCase().includes('papel'))) ||
      (selectedSector === 'tech' && (p.category.toLowerCase().includes('tecno') || p.category.toLowerCase().includes('infra') || p.category.toLowerCase().includes('esg')));

    const matchesSearch =
      searchPartner === '' ||
      p.name.toLowerCase().includes(searchPartner.toLowerCase()) ||
      (p.tradeName && p.tradeName.toLowerCase().includes(searchPartner.toLowerCase())) ||
      p.norm.toLowerCase().includes(searchPartner.toLowerCase()) ||
      p.category.toLowerCase().includes(searchPartner.toLowerCase());

    return matchesSector && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Top Bar Contract (3 zones: Brand title, nav links, primary action) */}
      <header className="sticky top-0 z-50 bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="/"
            className="flex items-center gap-2 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg min-w-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-transparent flex items-center justify-center shrink-0 overflow-hidden p-0.5">
              <img
                src="https://i.postimg.cc/zvWspM3H/Chat-GPT-Image-8-de-out-de-2026-18-07-55.png"
                alt="Nexus Veritas Logo"
                className="w-full h-full object-contain drop-shadow"
              />
            </div>
            <div className="min-w-0">
              <span className="font-brand text-xs sm:text-lg font-bold tracking-wider text-white block leading-none truncate">
                NEXUS VERITAS
              </span>
              <span className="text-[8px] sm:text-[10px] font-semibold text-blue-400 tracking-[0.15em] uppercase leading-tight block truncate">
                CERTIFICATION
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 Clean navigation text links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a
              href="#parceiros"
              className="hover:text-blue-400 transition-colors py-1 hover:underline underline-offset-4 decoration-blue-500"
            >
              Empresas Parceiras
            </a>
            <a
              href="#normas"
              className="hover:text-blue-400 transition-colors py-1 hover:underline underline-offset-4 decoration-blue-500"
            >
              Normas Acreditadas
            </a>
            <a
              href="#capacidades"
              className="hover:text-blue-400 transition-colors py-1 hover:underline underline-offset-4 decoration-blue-500"
            >
              Capacidades Técnicas
            </a>
            <a
              href="#conformidade"
              className="hover:text-blue-400 transition-colors py-1 hover:underline underline-offset-4 decoration-blue-500"
            >
              Protocolo IQF
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => onOpenAuth('login')}
              className="hidden sm:inline-flex px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors whitespace-nowrap"
            >
              Portal do Cliente
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="sm:hidden px-2 py-1.5 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg whitespace-nowrap"
            >
              Entrar
            </button>
            <button
              onClick={onEnterPlatform}
              className="px-2.5 sm:px-5 py-1.5 sm:py-2.5 text-[11px] sm:text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm shadow-blue-600/30 transition-all whitespace-nowrap"
            >
              Acessar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#0B132B] via-[#0D1836] to-[#0A1329]">
        {/* Subtle executive geometric lighting grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Unboxed Metadata Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-8 shadow-inner">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>{landingContent.badgeText}</span>
          </div>

          {/* Dominant Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 text-balance">
            {landingContent.heroTitle}
          </h1>

          {/* Concrete Executive Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 text-balance font-normal">
            {landingContent.heroSubtitle}
          </p>

          {/* Primary Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnterPlatform}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              <span>{landingContent.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 text-sm font-semibold transition-all whitespace-nowrap"
            >
              <span>{landingContent.secondaryCtaText}</span>
            </button>
          </div>

          {/* Claim-to-Proof Adjacency Stats */}
          <div className="mt-16 pt-10 border-t border-slate-800/90 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight">
                {landingContent.statsSuppliers}
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1 font-medium">
                Cadeia de Suprimentos
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums tracking-tight">
                {landingContent.statsAudits}
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1 font-medium">
                Auditorias Homologadas
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums tracking-tight">
                {landingContent.statsCertificates}
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1 font-medium">
                Conformidade Comprovada
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-2xl font-bold text-blue-400 tabular-nums tracking-tight">
                {landingContent.statsSatisfaction}
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1 font-medium">
                Escopo Multinorma Global
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: EMPRESAS COLABORADORAS & PARCEIROS HOMOLOGADOS (Exact user request) */}
      <section id="parceiros" className="py-20 bg-[#0F172A] border-y border-slate-800/90 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
                REDE CORPORATIVA & CONFORMIDADE
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                Empresas Colaboradoras & Parceiros Homologados
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                Corporações e indústrias de grande porte que integram nossa esteira técnica de qualificação de fornecedores, auditorias periódicas e certificações acreditadas.
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar empresa, norma..."
                value={searchPartner}
                onChange={(e) => setSearchPartner(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchPartner && (
                <button
                  onClick={() => setSearchPartner('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Segmented Filter Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {[
              { id: 'all', label: 'Todas as Empresas' },
              { id: 'energia', label: 'Energia & Petróleo' },
              { id: 'aero', label: 'Aeroespacial & Defesa' },
              { id: 'mineracao', label: 'Mineração & Siderurgia' },
              { id: 'automacao', label: 'Automação & Indústria' },
              { id: 'alimentos', label: 'Bioeconomia & Alimentos' },
              { id: 'tech', label: 'Tecnologia & ESG' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSector(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedSector === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-blue-950/20 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Logo Container */}
                  <div className="w-full h-20 bg-slate-950/60 rounded-xl p-3 flex items-center justify-center border border-slate-800/80 mb-4 group-hover:border-slate-700 transition-colors">
                    {partner.logoUrl ? (
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="max-h-12 max-w-[180px] object-contain transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                        <Building2 className="w-5 h-5 text-blue-400" />
                        <span>{partner.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Company Name & Category */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors truncate">
                      {partner.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md whitespace-nowrap">
                      {partner.partnershipType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 truncate mb-3">
                    {partner.category}
                  </p>

                  {/* Scope description */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {partner.description || partner.tradeName}
                  </p>
                </div>

                {/* Footer with Norms & Detail Trigger */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="font-mono text-[11px] text-blue-300 font-medium truncate max-w-[170px]">
                    {partner.norm}
                  </div>
                  <span className="text-slate-400 group-hover:text-blue-400 flex items-center gap-1 font-semibold text-[11px] whitespace-nowrap">
                    Detalhes <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
              <Building2 className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">
                Nenhuma empresa parceira encontrada para este filtro.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Tente redefinir os critérios de busca ou selecione outra categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Norms Covered Section */}
      <section id="normas" className="py-20 bg-[#0B132B] border-b border-slate-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
              ESCOPO NORMATIVO INTERNACIONAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Sistemas de Gestão & Normas Homologadas
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Auditorias estruturadas com checklists nativos, relatórios conclusivos e trilha de evidências parametrizada para cada norma técnica.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {STANDARD_NORMS.map((norm) => {
              const IconComp = normIcons[norm.code] || ShieldCheck;
              return (
                <div
                  key={norm.code}
                  className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/60 rounded-2xl p-5 text-center transition-all group flex flex-col items-center justify-center hover:-translate-y-1 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 group-hover:bg-blue-600 group-hover:text-white text-blue-400 flex items-center justify-center transition-colors mb-3">
                    <IconComp className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                    {norm.code}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {norm.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capacidades" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
            ARQUITETURA DE CONFORMIDADE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Engenharia de Qualidade para Organizações Exigentes
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Substitua fragmentações analógicas por uma plataforma centralizada de auditorias, governança de dados e qualificação preditiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.num}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-slate-700 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-blue-950/90 border border-blue-800/70 text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500">
                    {c.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {c.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Institutional Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border-t border-slate-800 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-bold uppercase mb-4">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>APRESENTAÇÃO CORPORATIVA & ACCREDITATION</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-balance">
            Pronto para implementar o mais alto padrão de auditoria em sua organização?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Acesse o ambiente corporativo com credenciais oficiais ou inicie o credenciamento de sua empresa hoje mesmo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnterPlatform}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap"
            >
              Acessar Módulos da Plataforma
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all border border-slate-700 whitespace-nowrap"
            >
              Portal de Auditores & Clientes
            </button>
          </div>
        </div>
      </section>

      {/* Corporate Accreditation Footer */}
      <footer className="py-10 bg-[#070D1E] text-slate-400 text-xs border-t border-slate-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-brand font-bold text-white text-sm tracking-wider">
                  NEXUS VERITAS CERTIFICATION
                </span>
                <span className="block text-[10px] text-blue-400 uppercase tracking-widest font-semibold">
                  SISTEMA INTERNACIONAL DE CONFORMIDADE
                </span>
              </div>
            </div>

            <div className="text-slate-400 text-xs text-center md:text-right">
              Normas Acreditadas: ISO 9001 · ISO 14001 · ISO 45001 · ISO 27001 · FSSC 22000 · IATF 16949
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              © 2026 Nexus Veritas Certification S.A. Todos os direitos reservados. Conformidade ISO/IEC 17021-1.
            </div>
            <div className="flex items-center gap-4">
              <span>Termos Regulatórios</span>
              <span aria-hidden="true">·</span>
              <span>Privacidade & LGPD</span>
              <span aria-hidden="true">·</span>
              <span>Canal de Integridade</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PARTNER DETAIL MODAL */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 rounded-xl p-2 border border-slate-700 flex items-center justify-center">
                  {selectedPartner.logoUrl ? (
                    <img
                      src={selectedPartner.logoUrl}
                      alt={selectedPartner.name}
                      className="max-h-10 max-w-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-7 h-7 text-blue-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-white">
                      {selectedPartner.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full">
                      {selectedPartner.partnershipType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedPartner.tradeName || selectedPartner.category}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Setor Industrial
                  </span>
                  <span className="font-semibold text-sm text-white mt-1 block">
                    {selectedPartner.category}
                  </span>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    Normas Acreditadas
                  </span>
                  <span className="font-semibold text-sm text-blue-400 mt-1 block font-mono">
                    {selectedPartner.norm}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
                  Escopo da Colaboração & Auditoria
                </h4>
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 leading-relaxed text-slate-300">
                  {selectedPartner.description || 'Monitoramento contínuo de conformidade e integridade operacional na cadeia de suprimentos crítica.'}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cadastrado no Banco de Dados Nexus Veritas</span>
                </div>

                {selectedPartner.websiteUrl && (
                  <a
                    href={selectedPartner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all"
                  >
                    <span>Visitar Portal da Empresa</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
