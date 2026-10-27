import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Info } from 'lucide-react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showIcon = true }) => {
  const normalizedLevel = (level || 'low').toLowerCase() as RiskLevel;

  const config = {
    low: {
      label: 'Rủi ro Thấp (An toàn)',
      subtext: 'Nội dung phù hợp & tích cực',
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600',
      dotColor: 'bg-emerald-500',
    },
    medium: {
      label: 'Rủi ro Trung bình',
      subtext: 'Có điểm cần lưu ý hoặc làm rõ',
      bg: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      dotColor: 'bg-amber-500',
    },
    high: {
      label: 'Rủi ro Cao',
      subtext: 'Cần chỉnh sửa trước khi đăng',
      bg: 'bg-rose-50 border-rose-200 text-rose-800',
      icon: AlertOctagon,
      iconColor: 'text-rose-600',
      dotColor: 'bg-rose-500',
    },
  }[normalizedLevel] || {
    label: 'Chưa xác định',
    subtext: 'Đang chờ phân tích',
    bg: 'bg-slate-50 border-slate-200 text-slate-700',
    icon: Info,
    iconColor: 'text-slate-500',
    dotColor: 'bg-slate-400',
  };

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3.5 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2.5 font-semibold',
  }[size];

  const IconComp = config.icon;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-xs transition-all ${config.bg} ${sizeClasses}`}
    >
      {showIcon && <IconComp className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{config.label}</span>
    </span>
  );
};
