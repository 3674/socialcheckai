import React from 'react';
import { CriteriaScores, RiskLevel } from '../types';
import { MessageSquare, Lock, HelpCircle, FileCheck, Users } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
  overallRisk: RiskLevel;
  criteria?: CriteriaScores;
  explanation?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, overallRisk, criteria, explanation }) => {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  // Color scheme based on score
  const getScoreTheme = (val: number) => {
    if (val >= 80) {
      return {
        stroke: '#10b981', // emerald-500
        text: 'text-emerald-700',
        bg: 'bg-emerald-500',
        lightBg: 'bg-emerald-50',
        badge: 'Phù hợp & An toàn cao',
      };
    }
    if (val >= 50) {
      return {
        stroke: '#f59e0b', // amber-500
        text: 'text-amber-700',
        bg: 'bg-amber-500',
        lightBg: 'bg-amber-50',
        badge: 'Mức độ phù hợp trung bình',
      };
    }
    return {
      stroke: '#f43f5e', // rose-500
      text: 'text-rose-700',
      bg: 'bg-rose-500',
      lightBg: 'bg-rose-50',
      badge: 'Cần cải thiện nhiều',
    };
  };

  const theme = getScoreTheme(normalizedScore);

  // SVG circular gauge calculation
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const criteriaList = [
    {
      label: 'Ngôn ngữ & Thái độ',
      val: criteria?.languageScore ?? 80,
      icon: MessageSquare,
      desc: 'Tính tôn trọng, không công kích hay xúc phạm',
    },
    {
      label: 'Bảo vệ quyền riêng tư',
      val: criteria?.privacyScore ?? 85,
      icon: Lock,
      desc: 'Không tiết lộ SĐT, địa chỉ, tài khoản cá nhân',
    },
    {
      label: 'Độ rõ ràng & tránh hiểu lầm',
      val: criteria?.clarityScore ?? 75,
      icon: HelpCircle,
      desc: 'Mạch lạc, câu chữ tường minh, không gây hiểu sai',
    },
    {
      label: 'Dấu hiệu thông tin cần kiểm chứng',
      val: criteria?.factCheckScore ?? 70,
      icon: FileCheck,
      desc: 'Phân biệt ý kiến cá nhân và sự thật cần chứng minh',
    },
    {
      label: 'Phù hợp mục đích & đối tượng',
      val: criteria?.contextScore ?? 80,
      icon: Users,
      desc: 'Đúng tôn chỉ nền tảng và người tiếp nhận',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Circular Gauge */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-slate-100"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={theme.stroke}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${theme.text}`}>
                {normalizedScore}
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-0.5">/ 100 điểm</span>
            </div>
          </div>

          <div className="mt-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${theme.lightBg} ${theme.text}`}>
              {theme.badge}
            </span>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Đánh giá định lượng tham khảo do AI phân tích</p>
          </div>
        </div>

        {/* 5 Criteria Bars */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">Chi tiết 5 tiêu chí đánh giá</h4>
            <span className="text-xs text-slate-400">Thang điểm 0 - 100</span>
          </div>

          <div className="space-y-3.5">
            {criteriaList.map((item, idx) => {
              const Icon = item.icon;
              const barTheme = getScoreTheme(item.val);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Icon className="w-3.5 h-3.5 text-slate-400" />
                      {item.label}
                    </span>
                    <span className={`font-bold font-mono ${barTheme.text}`}>{item.val}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${barTheme.bg}`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {explanation && (
            <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800 font-semibold block mb-0.5">Lý giải điểm số:</strong>
              {explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
