import React from 'react';
import {
  Info,
  GraduationCap,
  Sparkles,
  Code2,
  CheckCircle2,
  AlertTriangle,
  User,
  Hash,
  Users2,
  Building,
  Bookmark,
  Layers,
} from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const studentInfo = {
    fullName: 'Trần Quang Đức',
    studentId: 'PH58855',
    internshipGroup: 'Nhóm 1',
    topic: 'G02: Trợ lý kiểm tra bài đăng mạng xã hội',
    program: 'IMTA TECH x FPT Polytechnic',
    appName: 'Social Check AI – Trợ lý kiểm tra bài đăng mạng xã hội',
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <Info className="w-3.5 h-3.5" />
          <span>Hồ sơ đề tài thực tập tốt nghiệp</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Về Social Check AI (Đề Tài G02)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Thông tin chi tiết về dự án thực tập sinh, mục tiêu phát triển và công nghệ nền tảng.
        </p>
      </div>

      {/* Project Introduction Statement */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-blue-800 space-y-3">
        <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Tuyên ngôn dự án</span>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-medium">
          “Social Check AI là ứng dụng thử nghiệm ứng dụng trí tuệ nhân tạo nhằm hỗ trợ người dùng rà soát nội dung trước khi đăng lên mạng xã hội. Dự án hướng đến việc nâng cao nhận thức về quyền riêng tư, kỹ năng kiểm chứng thông tin và văn hóa giao tiếp số văn minh.”
        </p>
      </div>

      {/* Student & Internship Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Thông tin sinh viên & đề tài thực tập
            </h2>
            <p className="text-xs text-slate-500">
              Chương trình thực tập doanh nghiệp IMTA TECH hợp tác cùng FPT Polytechnic
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0 mt-0.5">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Họ và tên sinh viên
              </span>
              <span className="text-base font-extrabold text-slate-900">{studentInfo.fullName}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3.5">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg shrink-0 mt-0.5">
              <Hash className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Mã số sinh viên (MSSV)
              </span>
              <span className="text-base font-extrabold font-mono text-blue-700">{studentInfo.studentId}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3.5">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5">
              <Users2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Nhóm thực tập
              </span>
              <span className="text-base font-extrabold text-slate-900">{studentInfo.internshipGroup}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3.5">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Đơn vị / Chương trình
              </span>
              <span className="text-sm font-bold text-slate-900">{studentInfo.program}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3.5">
            <div className="p-2 bg-sky-100 text-sky-700 rounded-lg shrink-0 mt-0.5">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Mã đề tài & Phân nhóm
              </span>
              <span className="text-sm font-bold text-blue-800">{studentInfo.topic}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3.5">
            <div className="p-2 bg-purple-100 text-purple-700 rounded-lg shrink-0 mt-0.5">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Tên chính thức của ứng dụng
              </span>
              <span className="text-sm font-bold text-slate-900">{studentInfo.appName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Objectives */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <span>Mục tiêu sản phẩm</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
            <strong className="text-slate-900 font-bold block">1. Nhận diện sớm rủi ro phát ngôn:</strong>
            <p>
              Giúp người dùng phát hiện sớm các từ ngữ có thể bị hiểu là công kích, quấy rối hoặc phân biệt đối xử trước khi đăng tải.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
            <strong className="text-slate-900 font-bold block">2. Ngăn ngừa lộ dữ liệu nhạy cảm:</strong>
            <p>
              Cảnh báo khi người dùng vô tình đăng số điện thoại, địa chỉ nhà, tài khoản ngân hàng hoặc dữ liệu danh tính cá nhân.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
            <strong className="text-slate-900 font-bold block">3. Khuyến khích kiểm chứng tin giả:</strong>
            <p>
              Chỉ ra các thông tin mang tính chất giật gân, thiếu nguồn xác minh, nhắc nhở tìm nguồn trước khi bấm nút chia sẻ.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
            <strong className="text-slate-900 font-bold block">4. Đề xuất viết lại văn minh:</strong>
            <p>
              Cung cấp câu chữ thay thế lịch sự, thiện chí, giữ nguyên ý định ban đầu và thúc đẩy đối thoại tích cực.
            </p>
          </div>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-600" />
          <span>Các công nghệ sử dụng trong dự án</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[
            { name: 'Gemini 3.8 Flash', role: 'Mô hình AI phân tích NLP' },
            { name: '@google/genai SDK', role: 'Thư viện AI chính thức' },
            { name: 'React 19 & TypeScript', role: 'Giao diện & Logic gõ tĩnh' },
            { name: 'Express Full-Stack', role: 'Proxy bảo vệ an toàn API key' },
            { name: 'Tailwind CSS v4', role: 'Hệ thống thiết kế giao diện' },
            { name: 'Vite 8 & TSX', role: 'Môi trường đóng gói & Bundler' },
            { name: 'Local Storage API', role: 'Lưu trữ lịch sử an toàn' },
            { name: 'Lucide Icons', role: 'Biểu tượng trực quan UX' },
          ].map((tech, i) => (
            <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block">{tech.name}</span>
              <span className="text-[11px] text-slate-500">{tech.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scope and Limitations */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>Phạm vi và giới hạn của sản phẩm</span>
        </div>
        <ul className="text-xs text-amber-900/90 space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              <strong>Tính chất tham khảo:</strong> Toàn bộ kết quả phân tích, điểm số và gợi ý từ AI chỉ đóng vai trò hỗ trợ tham khảo cho người dùng, không có giá trị pháp lý và không thay thế cho phán quyết của cơ quan có thẩm quyền.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              <strong>Không khẳng định vi phạm chắc chắn:</strong> AI không kết luận nội dung là vi phạm pháp luật hay sai sự thật nếu chưa có căn cứ đầy đủ và bằng chứng xác thực.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>
              <strong>Bảo mật thông tin:</strong> Hệ thống không lưu trữ bài đăng cá nhân lên cơ sở dữ liệu công khai và không sử dụng dữ liệu người dùng cho mục đích đào tạo mô hình.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
