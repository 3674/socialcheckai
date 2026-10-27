import React from 'react';
import { SAMPLE_POSTS } from '../data/samplePosts';
import { SamplePost } from '../types';
import { X, Sparkles, AlertCircle, Check } from 'lucide-react';

interface SamplePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (sample: SamplePost) => void;
}

export const SamplePostModal: React.FC<SamplePostModalProps> = ({ isOpen, onClose, onSelectSample }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Chọn nội dung mẫu thử nghiệm</h3>
              <p className="text-xs text-slate-500">
                Dữ liệu minh họa các tình huống thực tế để trải nghiệm tính năng AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note banner */}
        <div className="px-6 py-2.5 bg-amber-50/70 border-b border-amber-100 text-xs text-amber-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Lưu ý:</strong> Đây là các ví dụ minh họa mô phỏng, không chứa thông tin cá nhân thực tế.
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-100">
          {SAMPLE_POSTS.map((sample) => (
            <div key={sample.id} className="pt-4 first:pt-0 group">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {sample.title}
                    </h4>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {sample.platform}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {sample.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{sample.description}</p>
                </div>

                <button
                  onClick={() => {
                    onSelectSample(sample);
                    onClose();
                  }}
                  className="shrink-0 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  Sử dụng mẫu này
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 line-clamp-3 font-mono leading-relaxed group-hover:border-blue-200 transition-colors">
                "{sample.content}"
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
