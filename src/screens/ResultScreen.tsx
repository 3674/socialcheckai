import React, { useState } from 'react';
import {
  AnalysisResult,
  AnalysisMeta,
  RiskLevel,
  HistoryRecord,
} from '../types';
import { RiskBadge } from '../components/RiskBadge';
import { ScoreGauge } from '../components/ScoreGauge';
import { AppScreen } from '../components/Navbar';
import { saveHistoryItem } from '../utils/storage';
import {
  Copy,
  Check,
  RotateCcw,
  Edit3,
  BookmarkCheck,
  PlusCircle,
  AlertTriangle,
  ShieldCheck,
  Info,
  CheckCircle2,
  FileText,
  Sparkles,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ResultScreenProps {
  result: AnalysisResult | null;
  meta: AnalysisMeta | null;
  originalContent: string;
  onNavigate: (screen: AppScreen) => void;
  onReEdit: () => void;
  onReAnalyze: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  meta,
  originalContent,
  onNavigate,
  onReEdit,
  onReAnalyze,
}) => {
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedRewritten, setCopiedRewritten] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
          <Info className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">Chưa có kết quả phân tích</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Bạn chưa thực hiện phân tích bài đăng nào. Vui lòng nhập nội dung để hệ thống kiểm tra và trả về báo cáo.
          </p>
        </div>
        <button
          onClick={() => onNavigate('check')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
        >
          Đến trang kiểm tra bài đăng
        </button>
      </div>
    );
  }

  const handleCopyRewritten = async () => {
    try {
      await navigator.clipboard.writeText(result.rewrittenPost);
      setCopiedRewritten(true);
      setTimeout(() => setCopiedRewritten(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleCopyOriginal = async () => {
    try {
      await navigator.clipboard.writeText(originalContent);
      setCopiedOriginal(true);
      setTimeout(() => setCopiedOriginal(false), 2000);
    } catch (err) {
      console.error('Failed to copy original', err);
    }
  };

  const handleSaveToHistory = () => {
    const record: HistoryRecord = {
      id: `record-${Date.now()}`,
      timestamp: meta?.timestamp || new Date().toISOString(),
      originalContent,
      platform: meta?.platform || 'Facebook',
      purpose: meta?.purpose || 'Chia sẻ thông tin',
      audience: meta?.audience || 'Công chúng',
      score: result.score,
      overallRisk: result.overallRisk,
      result,
    };

    saveHistoryItem(record);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const formattedTime = meta?.timestamp
    ? new Date(meta.timestamp).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('vi-VN');

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
              Báo Cáo Phân Tích AI
            </span>
            <span className="text-xs text-slate-400 font-medium">Hoàn tất lúc: {formattedTime}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kết Quả Rà Soát Bài Đăng
          </h1>
        </div>

        {/* Action button row */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onReEdit}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Quay lại biểu mẫu để chỉnh sửa"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Quay lại sửa</span>
          </button>

          <button
            onClick={onReAnalyze}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Yêu cầu AI phân tích lại bài đăng"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Phân tích lại</span>
          </button>

          <button
            onClick={handleSaveToHistory}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              savedSuccess
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
            }`}
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Đã lưu vào lịch sử</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Lưu kết quả</span>
              </>
            )}
          </button>

          <button
            onClick={() => onNavigate('check')}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Kiểm tra bài mới</span>
          </button>
        </div>
      </div>

      {/* SECTION A: SUMMARY & OVERVIEW */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-slate-900">A. Tóm tắt & Đánh giá tổng quan</h2>
            <RiskBadge level={result.overallRisk} size="md" />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="px-2.5 py-1 bg-slate-100 rounded-lg">
              Nền tảng: <strong>{meta?.platform || 'Facebook'}</strong>
            </span>
            <span className="px-2.5 py-1 bg-slate-100 rounded-lg">
              Mục đích: <strong>{meta?.purpose || 'Chia sẻ thông tin'}</strong>
            </span>
            <span className="px-2.5 py-1 bg-slate-100 rounded-lg">
              Người đọc: <strong>{meta?.audience || 'Công chúng'}</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Nội dung chính</span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {result.summary}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Giải thích mức rủi ro</span>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {result.scoreExplanation}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION B: REFERENCE SCORE & 5 CRITERIA GAUGE */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">B. Điểm đánh giá tham khảo & 5 tiêu chí</h2>
          <span className="text-xs text-slate-500">Thang đo 0 - 100</span>
        </div>
        <ScoreGauge
          score={result.score}
          overallRisk={result.overallRisk}
          criteria={result.criteriaScores}
          explanation={result.scoreExplanation}
        />
        <p className="text-[11px] text-slate-500 italic mt-2 text-right">
          * Điểm số là ước lượng do AI hỗ trợ, không phải phán quyết pháp lý hay cam kết an toàn tuyệt đối 100%.
        </p>
      </div>

      {/* SECTION C: DETECTED ISSUES */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">C. Danh sách vấn đề phát hiện</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Phát hiện {result.issues.length} vấn đề cần lưu ý hoặc khắc phục
            </p>
          </div>
          {result.issues.length === 0 ? (
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
              An toàn & Chuẩn mực
            </span>
          ) : (
            <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
              Có điểm cần lưu ý
            </span>
          )}
        </div>

        {result.issues.length === 0 ? (
          <div className="p-8 bg-emerald-50/60 border border-emerald-200 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-emerald-900">Không phát hiện rủi ro rõ ràng!</h4>
              <p className="text-xs text-emerald-800 max-w-lg mx-auto leading-relaxed">
                Bài đăng của bạn sử dụng câu từ lịch sự, không phát hiện dấu hiệu vi phạm quyền riêng tư, thông tin sai lệch
                hoặc ngôn từ công kích. Bạn có thể tự tin chia sẻ tới cộng đồng.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {result.issues.map((issue, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{issue.category}</h4>
                  </div>
                  <RiskBadge level={issue.severity} size="sm" />
                </div>

                {issue.excerpt && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 font-mono">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      Đoạn liên quan trong bài:
                    </span>
                    "{issue.excerpt}"
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-rose-950">
                    <strong className="font-bold text-rose-800 block mb-1">Tại sao có rủi ro?</strong>
                    <p className="leading-relaxed">{issue.explanation}</p>
                  </div>

                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-950">
                    <strong className="font-bold text-blue-800 block mb-1">Đề xuất khắc phục:</strong>
                    <p className="leading-relaxed">{issue.suggestion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION D: IMPROVEMENTS & VERIFICATION NOTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Notes */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">D1. Thông tin cần kiểm chứng thêm</h3>
          </div>
          <p className="text-xs text-slate-500">
            Các điểm dữ kiện trong bài nên đối chiếu lại với nguồn tin cậy trước khi chia sẻ.
          </p>

          {result.verificationNotes && result.verificationNotes.length > 0 ? (
            <ul className="space-y-2.5">
              {result.verificationNotes.map((note, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <span className="text-indigo-600 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 italic">Không có dữ kiện nào bắt buộc phải kiểm chứng thêm.</p>
          )}
        </div>

        {/* Improvements Checklist */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">D2. Đề xuất cải thiện bài đăng</h3>
          </div>
          <p className="text-xs text-slate-500">
            Các khuyến nghị theo thứ tự ưu tiên nhằm nâng cao tính văn minh và sự đón nhận.
          </p>

          {result.improvements && result.improvements.length > 0 ? (
            <ul className="space-y-2.5">
              {result.improvements.map((imp, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{imp}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 italic">Bài viết đã đạt chuẩn, không có thêm đề xuất lớn.</p>
          )}
        </div>
      </div>

      {/* SECTION E: REWRITTEN POST BY AI */}
      <div className="bg-gradient-to-b from-blue-50/70 to-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">E. Phiên bản đề xuất viết lại bởi AI</h3>
              <p className="text-xs text-slate-500">
                Lịch sự, tôn trọng, không tự ý bịa thêm dữ kiện, giữ nguyên ý định ban đầu
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyRewritten}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer ${
              copiedRewritten
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {copiedRewritten ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã sao chép vào bộ nhớ!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Sao chép bài đăng đã chỉnh sửa</span>
              </>
            )}
          </button>
        </div>

        {/* Rewritten Post Box */}
        <div className="p-5 bg-white rounded-2xl border border-blue-200 shadow-2xs font-sans text-sm text-slate-900 leading-relaxed whitespace-pre-wrap">
          {result.rewrittenPost}
        </div>

        {/* Collapsible Original Post Comparison */}
        <div className="pt-2">
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            {showOriginal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showOriginal ? 'Ẩn nội dung gốc đã nhập' : 'Xem lại nội dung gốc đã nhập'}</span>
          </button>

          {showOriginal && (
            <div className="mt-3 p-4 bg-slate-100/80 rounded-2xl border border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed relative group">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Nội dung bài viết gốc
                </span>
                <button
                  onClick={handleCopyOriginal}
                  className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  {copiedOriginal ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedOriginal ? 'Đã sao chép' : 'Sao chép gốc'}</span>
                </button>
              </div>
              {originalContent}
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer Box */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
        <strong className="font-semibold text-slate-800 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>Giới hạn của kết quả phân tích AI:</span>
        </strong>
        <p className="leading-relaxed">
          {result.disclaimer ||
            'Social Check AI chỉ đưa ra các đánh giá và gợi ý tham khảo dựa trên mô hình trí tuệ nhân tạo. Ứng dụng không khẳng định tuyệt đối một nội dung là vi phạm pháp luật hay sai sự thật nếu chưa đủ bằng chứng xác thực từ cơ quan có thẩm quyền.'}
        </p>
      </div>

      {/* Bottom Floating Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate('check')}
          className="w-full sm:w-auto px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
        >
          ← Quay lại biểu mẫu kiểm tra
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('history')}
            className="w-full sm:w-auto px-5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Xem lịch sử kiểm tra
          </button>

          <button
            onClick={() => onNavigate('check')}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Kiểm tra bài đăng khác →
          </button>
        </div>
      </div>
    </div>
  );
};
