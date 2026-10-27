import React, { useState, useEffect } from 'react';
import { HistoryRecord, RiskLevel, AnalysisResult, AnalysisMeta } from '../types';
import { getHistory, deleteHistoryItem, clearHistory } from '../utils/storage';
import { RiskBadge } from '../components/RiskBadge';
import { AppScreen } from '../components/Navbar';
import {
  History,
  Trash2,
  Eye,
  Search,
  Filter,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Lock,
  PlusCircle,
  CheckCircle2,
  X,
} from 'lucide-react';

interface HistoryScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSelectHistoryRecord: (record: HistoryRecord) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ onNavigate, onSelectHistoryRecord }) => {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [confirmClearModal, setConfirmClearModal] = useState(false);

  const loadRecords = () => {
    setRecords(getHistory());
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteHistoryItem(id);
    loadRecords();
  };

  const handleClearAll = () => {
    clearHistory();
    loadRecords();
    setConfirmClearModal(false);
  };

  // Filter records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.originalContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rec.result?.summary || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = riskFilter === 'all' || rec.overallRisk === riskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              Lưu trữ cục bộ (Local Storage)
            </span>
            <span className="text-xs text-slate-400 font-medium">Tổng số: {records.length} bài đăng</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lịch Sử Kiểm Tra Bài Đăng
          </h1>
        </div>

        {records.length > 0 && (
          <button
            onClick={() => setConfirmClearModal(true)}
            className="px-4 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa toàn bộ lịch sử</span>
          </button>
        )}
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200/90 flex items-start gap-3 text-xs text-slate-600">
        <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="font-semibold text-slate-800">Quyền riêng tư tuyệt đối của bạn:</strong>
          <p className="leading-relaxed">
            Dữ liệu lịch sử chỉ được lưu trữ trên trình duyệt web của máy tính / thiết bị bạn đang dùng (thông qua
            localStorage). Không có bất kỳ nội dung bài đăng cá nhân nào được lưu trữ cố định hay đồng bộ lên máy chủ.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      {records.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm nội dung bài đăng, tóm tắt hoặc nền tảng..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter by risk */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">Lọc rủi ro:</span>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'low', label: 'Thấp' },
              { id: 'medium', label: 'Trung bình' },
              { id: 'high', label: 'Cao' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setRiskFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  riskFilter === f.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Record List */}
      {records.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">Chưa có lịch sử kiểm tra</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Các bài đăng sau khi được phân tích sẽ được lưu tạm tại đây để bạn có thể xem lại kết quả bất cứ khi nào.
            </p>
          </div>
          <button
            onClick={() => onNavigate('check')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Kiểm tra bài đăng đầu tiên</span>
          </button>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-700">Không tìm thấy bản ghi phù hợp với bộ lọc</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setRiskFilter('all');
            }}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            Xóa bộ lọc tìm kiếm
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((rec) => {
            const dateStr = new Date(rec.timestamp).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            return (
              <div
                key={rec.id}
                onClick={() => onSelectHistoryRecord(rec)}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      {rec.platform}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {dateStr}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500 font-medium">Điểm:</span>
                      <span className="text-sm font-extrabold font-mono text-slate-800">{rec.score}/100</span>
                    </div>
                    <RiskBadge level={rec.overallRisk} size="sm" />
                  </div>
                </div>

                {/* Post snippet */}
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono line-clamp-2 border border-slate-100 group-hover:border-blue-100 transition-colors">
                  "{rec.originalContent}"
                </div>

                {/* AI Summary snippet */}
                {rec.result?.summary && (
                  <p className="text-xs text-slate-500 line-clamp-1 italic">
                    <strong className="text-slate-700 font-semibold not-italic">Tóm tắt:</strong> {rec.result.summary}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-400">
                    Mục đích: {rec.purpose} • Đối tượng: {rec.audience}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(rec.id, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa bản ghi này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onSelectHistoryRecord(rec)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem kết quả</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirm Clear All Modal */}
      {confirmClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">Xác nhận xóa toàn bộ lịch sử?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thao tác này sẽ xóa vĩnh viễn tất cả {records.length} bản ghi kiểm tra trên trình duyệt này và không thể
                khôi phục lại.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmClearModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Đồng ý xóa hết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
