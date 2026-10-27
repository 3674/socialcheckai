import React, { useState } from 'react';
import { REFERENCES_LIST, ReferenceSource } from '../data/referencesData';
import {
  BookOpen,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Building2,
  Filter,
  CheckCircle2,
  Scale,
  Cpu,
  HeartHandshake,
} from 'lucide-react';

export const ReferencesScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  // Format current access date
  const accessDateStr = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const categories = ['Tất cả', 'Kỹ thuật AI', 'Chính sách nền tảng', 'Văn bản pháp luật', 'Bảo vệ cộng đồng'];

  const filteredReferences = REFERENCES_LIST.filter((ref) => {
    if (selectedCategory === 'Tất cả') return true;
    return ref.category === selectedCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Kỹ thuật AI':
        return <Cpu className="w-4 h-4 text-blue-600" />;
      case 'Chính sách nền tảng':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'Văn bản pháp luật':
        return <Scale className="w-4 h-4 text-amber-600" />;
      case 'Bảo vệ cộng đồng':
        return <HeartHandshake className="w-4 h-4 text-indigo-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Thư viện tài liệu tham khảo chính thống</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Nguồn Tài Liệu Tham Khảo
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Các tài liệu kỹ thuật, tiêu chuẩn cộng đồng nền tảng và căn cứ pháp lý được sử dụng làm cơ sở phát triển Social Check AI.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sources List */}
      <div className="space-y-4">
        {filteredReferences.map((ref) => (
          <div
            key={ref.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-100">{getCategoryIcon(ref.category)}</div>
                <span className="text-xs font-bold text-slate-700">{ref.category}</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {ref.verifiedStatus}
                </span>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Thời điểm truy cập tham chiếu: {accessDateStr}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">{ref.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Đơn vị phát hành: {ref.publisher}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{ref.description}</p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-100">
              <strong className="text-slate-800 font-semibold block mb-0.5">Ý nghĩa đối với đề tài G02:</strong>
              {ref.relevance}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-xs sm:max-w-md">
                {ref.url}
              </span>

              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Mở liên kết nguồn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Verification & Transparency Note */}
      <div className="p-5 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
        <strong className="font-semibold text-slate-800 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Cam kết tính xác thực nguồn tài liệu:</span>
        </strong>
        <p className="leading-relaxed">
          Tất cả các tài liệu trên đều là nguồn chính thống công khai từ Google, Meta, TikTok, UNICEF và Cổng thông tin
          văn bản pháp luật Việt Nam. Dự án phân biệt rõ ràng giữa hướng dẫn kỹ thuật công nghệ, quy định nội bộ của mạng xã
          hội và pháp luật hiện hành.
        </p>
      </div>
    </div>
  );
};
