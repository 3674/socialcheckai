import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Send,
  PieChart,
  History,
  Info,
  BookOpen,
  Menu,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { checkServerHealth } from '../utils/api';

export type AppScreen = 'home' | 'check' | 'result' | 'history' | 'about' | 'references';

interface NavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  hasResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, hasResult }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [healthStatus, setHealthStatus] = useState<{ checked: boolean; hasApiKey: boolean }>({
    checked: false,
    hasApiKey: true,
  });

  useEffect(() => {
    checkServerHealth().then((res) => {
      setHealthStatus({ checked: true, hasApiKey: res.hasApiKey });
    });
  }, []);

  const navItems = [
    { id: 'home' as AppScreen, label: 'Trang chủ', icon: ShieldAlert },
    { id: 'check' as AppScreen, label: 'Kiểm tra bài đăng', icon: Send },
    {
      id: 'result' as AppScreen,
      label: 'Kết quả phân tích',
      icon: PieChart,
      disabled: !hasResult,
      badge: hasResult ? 'Có sẵn' : undefined,
    },
    { id: 'history' as AppScreen, label: 'Lịch sử', icon: History },
    { id: 'about' as AppScreen, label: 'Giới thiệu', icon: Info },
    { id: 'references' as AppScreen, label: 'Nguồn tham khảo', icon: BookOpen },
  ];

  const handleNavClick = (screen: AppScreen, disabled?: boolean) => {
    if (disabled) return;
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-hidden group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  SOCIAL CHECK AI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-800 border border-blue-200">
                  G02
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium hidden sm:block">
                Trợ lý kiểm tra bài đăng mạng xã hội • IMTA TECH x FPT Poly
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.disabled)}
                  disabled={item.disabled}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : item.disabled
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="ml-1 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* System status pill & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {healthStatus.checked && (
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                  healthStatus.hasApiKey
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
                title={
                  healthStatus.hasApiKey
                    ? 'Gemini 3.8 Flash đã kết nối thành công'
                    : 'Chưa phát hiện GEMINI_API_KEY. Vui lòng cấu hình Secret để phân tích thực tế.'
                }
              >
                {healthStatus.hasApiKey ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Gemini 3.8 Flash</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Chưa có API Key</span>
                  </>
                )}
              </div>
            )}

            <button
              onClick={() => handleNavClick('check')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs hover:shadow-md transition-all active:scale-95"
            >
              Kiểm tra ngay
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-hidden"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.disabled)}
                disabled={item.disabled}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : item.disabled
                    ? 'text-slate-300'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('check')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg text-center shadow-xs"
            >
              Bắt đầu kiểm tra bài đăng
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
