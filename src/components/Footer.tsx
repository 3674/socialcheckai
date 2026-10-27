import React from 'react';
import { AppScreen } from './Navbar';
import { Sparkles, CheckSquare, ShieldCheck, HeartHandshake, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: AppScreen) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      {/* 5 Principles Banner */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              <HeartHandshake className="w-3.5 h-3.5" />
              Văn hóa không gian mạng
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              5 Nguyên Tắc Đăng Bài Có Trách Nhiệm
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Hãy cùng xây dựng môi trường mạng xã hội văn minh, an toàn và tràn đầy năng lượng tích cực
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                num: '01',
                title: 'Dừng lại 10 giây',
                desc: 'Bình tĩnh đọc lại toàn bộ nội dung trước khi bấm chia sẻ ra cộng đồng.',
              },
              {
                num: '02',
                title: 'Kiểm chứng nguồn tin',
                desc: 'Xác minh từ ít nhất hai nguồn chính thống, không chia sẻ theo cảm tính.',
              },
              {
                num: '03',
                title: 'Tôn trọng sự khác biệt',
                desc: 'Tranh luận dựa trên sự thật và lý lẽ văn minh, không công kích xúc phạm cá nhân.',
              },
              {
                num: '04',
                title: 'Bảo vệ quyền riêng tư',
                desc: 'Tuyệt đối không đăng tải số điện thoại, địa chỉ, tài khoản hay hình ảnh nhạy cảm.',
              },
              {
                num: '05',
                title: 'Lan tỏa điều tích cực',
                desc: 'Ưu tiên những thông điệp xây dựng, hữu ích và sẻ chia vì lợi ích chung.',
              },
            ].map((p) => (
              <div
                key={p.num}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 hover:border-blue-500/40 transition-colors"
              >
                <span className="text-blue-500 font-mono text-sm font-bold block mb-1">{p.num}</span>
                <h4 className="text-white text-sm font-bold mb-1">{p.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Program */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                <Sparkles className="w-5 h-5 text-blue-200" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">SOCIAL CHECK AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Sản phẩm đề tài <strong>G02 – Trợ lý kiểm tra bài đăng mạng xã hội</strong> thuộc chương trình thực tập
              do <strong>IMTA TECH</strong> phối hợp cùng <strong>FPT Polytechnic</strong> tổ chức. Ứng dụng tích hợp
              Gemini AI nhằm nâng cao ý thức văn hóa số và bảo vệ an toàn thông tin cá nhân.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bảo vệ quyền riêng tư • Dữ liệu kiểm tra không dùng để đào tạo</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Điều hướng nhanh</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('check')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Kiểm tra bài đăng
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Lịch sử kiểm tra
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Về Social Check AI (Đề tài G02)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('references')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Tài liệu tham khảo chính thống
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Disclaimer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Tuyên bố miễn trừ</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Các đánh giá, điểm số và gợi ý từ Social Check AI chỉ có tính chất tham khảo dựa trên mô hình trí tuệ nhân
              tạo. Ứng dụng không đưa ra kết luận pháp lý hay xác nhận sai phạm tuyệt đối thay cho cơ quan có thẩm quyền
              hoặc chính sách chính thức của các nền tảng mạng xã hội.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Social Check AI • IMTA TECH x FPT Polytechnic Internship Project (G02).</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('references')} className="hover:text-slate-400 transition-colors">
              Chính sách & Nguồn dẫn
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-slate-400 transition-colors">
              Thông tin nhóm sinh viên
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
