import React from 'react';
import { AppScreen } from '../components/Navbar';
import {
  ShieldCheck,
  MessageSquareHeart,
  FileCheck2,
  ArrowRight,
  Sparkles,
  Lock,
  Flame,
  CheckCircle2,
  Users,
  Compass,
  BookOpen,
  History,
  TrendingUp,
} from 'lucide-react';
import { SAMPLE_POSTS } from '../data/samplePosts';
import { SamplePost } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSelectSampleForCheck: (sample: SamplePost) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onSelectSampleForCheck }) => {
  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Trợ lý AI rà soát bài đăng mạng xã hội • Đề tài G02</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Đăng bài có trách nhiệm – <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">Lan tỏa điều tích cực</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Social Check AI giúp bạn kiểm tra nội dung, nhận diện rủi ro và hoàn thiện bài đăng trước khi chia sẻ với cộng đồng.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('check')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Kiểm tra bài đăng ngay</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="w-full sm:w-auto px-6 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-semibold text-base rounded-xl border border-slate-700 transition-colors"
            >
              Tìm hiểu dự án G02
            </button>
          </div>

          {/* Quick stats / guarantees */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left border-t border-slate-800/80 mt-8">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-blue-400 font-bold text-xs uppercase tracking-wider mb-0.5">Tiêu chuẩn</div>
              <div className="text-sm font-semibold text-white">5 Tiêu chí rà soát</div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-0.5">Quyền riêng tư</div>
              <div className="text-sm font-semibold text-white">Không lưu dữ liệu</div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-indigo-400 font-bold text-xs uppercase tracking-wider mb-0.5">AI Engine</div>
              <div className="text-sm font-semibold text-white">Gemini 3.8 Flash</div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-0.5">Đề xuất</div>
              <div className="text-sm font-semibold text-white">Viết lại văn minh</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Benefits */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Giá trị cốt lõi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ba Lợi Ích Lớn Cho Mọi Người Dùng
          </h2>
          <p className="text-sm text-slate-500">
            Chủ động rà soát trước khi đăng tải giúp bạn giữ gìn uy tín cá nhân và góp phần kiến tạo không gian mạng tích cực.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Benefit 1 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Bảo Vệ Quyền Riêng Tư</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tự động nhận diện và cảnh báo khi bài viết vô tình để lộ số điện thoại, địa chỉ nhà, số tài khoản ngân hàng hoặc dữ liệu cá nhân nhạy cảm của bạn và người khác.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Phòng ngừa rủi ro lừa đảo & đánh cắp danh tính</span>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold">
                <MessageSquareHeart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Giao Tiếp Văn Minh</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Phát hiện từ ngữ xúc phạm, hạ bệ, bêu xấu, bắt nạt hoặc kích động định kiến. Đưa ra gợi ý viết lại với giọng điệu lịch sự, tôn trọng nhưng vẫn giữ trọn ý kiến cá nhân.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-blue-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Xây dựng hình ảnh cá nhân chuẩn mực trên mạng</span>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Chia Sẻ Thông Tin Có Trách Nhiệm</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cảnh báo thông tin giật gân, thiếu căn cứ hoặc khẳng định sự thật khi chưa có nguồn tin cậy. Nhắc nhở người viết bổ sung nguồn dẫn chứng xác thực.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-indigo-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Góp phần đẩy lùi tin giả & tin đồn thất thiệt</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="bg-slate-100/70 border border-slate-200/80 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quy trình đơn giản</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ba Bước Hoàn Thiện Bài Đăng
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Chỉ mất chưa đầy 15 giây để rà soát toàn diện trước khi đăng lên bất kỳ mạng xã hội nào.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 relative shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
              1
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Nhập nội dung bài đăng</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dán nội dung bạn dự định chia sẻ, chọn nền tảng (Facebook, Zalo, TikTok...), mục đích và đối tượng người đọc tiếp nhận.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 relative shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
              2
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">AI phân tích đa chiều</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mô hình Gemini 3.8 Flash rà soát theo 5 tiêu chí: ngôn ngữ thái độ, dữ liệu riêng tư, độ rõ ràng, nguồn tin kiểm chứng và tính phù hợp.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 relative shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-sm">
              3
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Xem cảnh báo & cải thiện</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nhận bảng điểm tham khảo, danh sách vấn đề cụ thể, lý do giải thích và bản viết lại đề xuất để bạn tự tin chia sẻ.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('check')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
          >
            <span>Trải nghiệm ngay bây giờ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Try with Sample Scenarios */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Trải nghiệm nhanh
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
              Thử Nghiệm Với Các Tình Huống Mẫu
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Nhấn vào tình huống bên dưới để tự động điền vào biểu mẫu kiểm tra và bắt đầu rà soát.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 self-start sm:self-auto">
            Dữ liệu mô phỏng minh họa
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_POSTS.map((sample) => (
            <div
              key={sample.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {sample.platform}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">{sample.badge}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {sample.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{sample.description}</p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 font-mono line-clamp-2 border border-slate-100">
                  "{sample.content}"
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => onSelectSampleForCheck(sample)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
                >
                  <span>Thử mẫu này</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Responsibility & Think-Before-You-Post Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white border border-blue-800 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/20 text-blue-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Thông điệp vì cộng đồng văn minh</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hãy suy nghĩ trước khi chia sẻ – Một cú click có thể thay đổi một cuộc đời
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Mạng xã hội không phải là khoảng không vô hình. Phía sau mỗi tài khoản, bình luận hay bài viết là những con người thật với cảm xúc và cuộc sống thực tế. Việc đăng bài có trách nhiệm chính là biểu hiện cao nhất của sự tôn trọng bản thân và xã hội.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-blue-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tôn trọng sự khác biệt
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Không công kích cá nhân
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Kiểm chứng trước khi bấm share
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bảo vệ bí mật đời tư
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
