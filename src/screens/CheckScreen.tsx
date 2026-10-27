import React, { useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  BookOpenCheck,
  AlertTriangle,
  Lock,
  CheckCircle2,
  Share2,
  Target,
  Users,
  Info,
  Loader2,
  FileText,
} from 'lucide-react';
import { SamplePost, AnalysisResult, AnalysisMeta } from '../types';
import { SamplePostModal } from '../components/SamplePostModal';
import { analyzePost } from '../utils/api';

interface CheckScreenProps {
  initialContent?: string;
  initialPlatform?: string;
  initialPurpose?: string;
  initialAudience?: string;
  onAnalysisComplete: (result: AnalysisResult, meta: AnalysisMeta, originalContent: string) => void;
}

const PLATFORMS = [
  { id: 'Facebook', label: 'Facebook', icon: '📘' },
  { id: 'Zalo', label: 'Zalo', icon: '💬' },
  { id: 'Instagram', label: 'Instagram', icon: '📸' },
  { id: 'TikTok', label: 'TikTok', icon: '🎵' },
  { id: 'X', label: 'X (Twitter)', icon: '✖️' },
  { id: 'Khác', label: 'Nền tảng khác', icon: '🌐' },
];

const PURPOSES = [
  'Chia sẻ thông tin',
  'Bán hàng hoặc quảng bá sản phẩm',
  'Bày tỏ ý kiến',
  'Tuyển dụng',
  'Chia sẻ nội dung cá nhân',
  'Hoạt động cộng đồng',
  'Khác',
];

const AUDIENCES = [
  'Bạn bè và người quen',
  'Khách hàng',
  'Công chúng',
  'Học sinh, sinh viên',
  'Khác',
];

export const CheckScreen: React.FC<CheckScreenProps> = ({
  initialContent = '',
  initialPlatform = 'Facebook',
  initialPurpose = 'Chia sẻ thông tin',
  initialAudience = 'Công chúng',
  onAnalysisComplete,
}) => {
  const [content, setContent] = useState(initialContent);
  const [platform, setPlatform] = useState(initialPlatform);
  const [purpose, setPurpose] = useState(initialPurpose);
  const [audience, setAudience] = useState(initialAudience);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Character and word count
  const charCount = content.length;
  const wordCount = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;
  const isTooLong = charCount > 10000;
  const isEmpty = content.trim().length === 0;

  const handleSelectSample = (sample: SamplePost) => {
    setContent(sample.content);
    setPlatform(sample.platform);
    setPurpose(sample.purpose);
    setAudience(sample.audience);
    setErrorMessage(null);
  };

  const handleClear = () => {
    setContent('');
    setErrorMessage(null);
  };

  const [progressPercent, setProgressPercent] = useState(15);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const stepLabels = [
    'Đang kết nối tới mô hình AI Gemini...',
    'Rà soát dữ liệu riêng tư & thông tin nhạy cảm...',
    'Phân tích ngữ cảnh, sắc thái & phát hiện công kích...',
    'Đánh giá tính xác thực & sự phù hợp đối tượng...',
    'Tổng hợp đánh giá & tạo phiên bản viết lại tối ưu...',
  ];

  const handleCancelAnalysis = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsAnalyzing(false);
    setErrorMessage('Đã hủy quá trình phân tích. Bạn có thể nhấn Phân tích lại khi sẵn sàng.');
  };

  const handleAnalyze = async () => {
    if (isEmpty) {
      setErrorMessage('Vui lòng nhập nội dung bài đăng trước khi phân tích.');
      return;
    }
    if (isTooLong) {
      setErrorMessage('Nội dung quá dài (vượt quá 10.000 ký tự). Vui lòng rút ngắn bài đăng.');
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setProgressPercent(20);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Smooth progressive timer
    let currentStep = 0;
    let currentPercent = 20;
    const progressTimer = setInterval(() => {
      currentPercent = Math.min(92, currentPercent + Math.floor(Math.random() * 8) + 4);
      currentStep = Math.min(3, Math.floor((currentPercent / 90) * 4));
      setProgressPercent(currentPercent);
      setAnalysisStep(currentStep);
    }, 400);

    try {
      const response = await analyzePost(
        {
          postContent: content,
          platform,
          purpose,
          audience,
        },
        controller.signal
      );

      clearInterval(progressTimer);
      setAnalysisStep(4);
      setProgressPercent(100);

      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalysisComplete(response.data, response.meta, content);
      }, 400);
    } catch (err: any) {
      clearInterval(progressTimer);
      setIsAnalyzing(false);
      console.error('Analysis error:', err);
      setErrorMessage(
        err.message || 'Đã xảy ra lỗi trong quá trình phân tích. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại.'
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Biểu mẫu kiểm tra bài đăng</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Rà Soát Nội Dung Trước Khi Đăng
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Điền nội dung bài viết và các thiết lập dự kiến để AI phân tích toàn diện các rủi ro tiềm ẩn.
        </p>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Step 1: Text Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="post-content" className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>1. Nội dung bài đăng cần kiểm tra</span>
              <span className="text-rose-500">*</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <BookOpenCheck className="w-3.5 h-3.5" />
                <span>Dùng nội dung mẫu</span>
              </button>

              {content && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Xóa nội dung</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              id="post-content"
              rows={8}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Dán hoặc gõ nội dung bạn dự định đăng lên mạng xã hội vào đây..."
              className={`w-full p-4 rounded-2xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden transition-all font-sans leading-relaxed resize-y ${
                isTooLong
                  ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500'
                  : 'border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100'
              }`}
            />

            {/* Counters */}
            <div className="flex items-center justify-between text-xs px-2 pt-1 text-slate-500">
              <div className="flex items-center gap-3">
                <span>
                  Số từ: <strong className="text-slate-700">{wordCount}</strong>
                </span>
                <span>
                  Ký tự:{' '}
                  <strong className={isTooLong ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                    {charCount}
                  </strong>{' '}
                  / 10.000
                </span>
              </div>
              {isTooLong && (
                <span className="text-rose-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Nội dung quá dài
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          {/* Platform selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>2. Nền tảng dự kiến</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => {
                const isSelected = platform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-2xs font-bold ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span className="truncate">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Purpose selection */}
          <div className="space-y-2">
            <label htmlFor="post-purpose" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span>3. Mục đích bài đăng</span>
            </label>
            <select
              id="post-purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 font-medium focus:outline-hidden focus:border-blue-600 focus:ring-3 focus:ring-blue-100"
            >
              {PURPOSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">Giúp AI xác định chuẩn mực ngôn từ theo ngữ cảnh</p>
          </div>

          {/* Audience selection */}
          <div className="space-y-2">
            <label htmlFor="post-audience" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>4. Đối tượng người đọc</span>
            </label>
            <select
              id="post-audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 font-medium focus:outline-hidden focus:border-blue-600 focus:ring-3 focus:ring-blue-100"
            >
              {AUDIENCES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">Để tinh chỉnh mức độ trang trọng và độ nhạy cảm</p>
          </div>
        </div>

        {/* Security & Privacy Reminder */}
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
          <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold">Khuyến cáo bảo vệ quyền riêng tư:</strong>
            <p className="text-amber-800 leading-relaxed">
              Vui lòng chủ động che hoặc xóa các dữ liệu cá nhân tối mật (số CCCD, mật khẩu tài khoản, mã OTP, số thẻ tín
              dụng) trước khi gửi. Hệ thống không lưu trữ vĩnh viễn nội dung của bạn.
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-xs text-rose-800 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Không thể thực hiện phân tích:</strong>
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpenCheck className="w-4 h-4 text-slate-600" />
            <span>Xem các nội dung mẫu</span>
          </button>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || isEmpty || isTooLong}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition-all active:scale-98 ${
              isAnalyzing || isEmpty || isTooLong
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25 cursor-pointer'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Đang phân tích bài đăng...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>Phân tích bằng AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading Progress Overlay / Card */}
      {isAnalyzing && (
        <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-lg space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Gemini 3.8 Flash đang xử lý bài viết ({progressPercent}%)</h4>
                <p className="text-xs text-slate-500 font-medium">
                  {stepLabels[Math.min(analysisStep, stepLabels.length - 1)]}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCancelAnalysis}
              className="self-end sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Hủy phân tích
            </button>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Ngôn từ văn minh
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Bảo mật thông tin
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Nguồn kiểm chứng
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Đề xuất tối ưu
            </span>
          </div>
        </div>
      )}

      {/* Sample Post Modal */}
      <SamplePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectSample={handleSelectSample}
      />
    </div>
  );
};
