import { useNavigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../i18n';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t } = useTranslation();

  return (
    <div className="min-h-full flex flex-col bg-slate-950">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1 -ml-1"
              aria-label={t('layout.goBack')}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Logo size={40} />
          </div>
        </div>

        {isHome && (
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <button
              onClick={() => navigate('/setup')}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
              aria-label={t('layout.manageSupplements')}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
