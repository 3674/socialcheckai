export interface ReferenceSource {
  id: string;
  name: string;
  publisher: string;
  url: string;
  category: 'Kỹ thuật AI' | 'Chính sách nền tảng' | 'Văn bản pháp luật' | 'Bảo vệ cộng đồng';
  description: string;
  relevance: string;
  verifiedStatus: 'Đã xác minh nguồn chính thống' | 'Tài liệu tham khảo bổ trợ';
}

export const REFERENCES_LIST: ReferenceSource[] = [
  {
    id: 'ref-1',
    name: 'Google AI for Developers – Gemini API Documentation',
    publisher: 'Google LLC',
    url: 'https://ai.google.dev/gemini-api/docs',
    category: 'Kỹ thuật AI',
    description: 'Tài liệu hướng dẫn kỹ thuật chính thức về cấu hình, tích hợp mô hình ngôn ngữ lớn Gemini, cơ chế bảo vệ an toàn và xử lý dữ liệu có cấu trúc JSON qua @google/genai SDK.',
    relevance: 'Nền tảng kỹ thuật trực tiếp để phát triển module phân tích văn bản AI trong ứng dụng Social Check AI.',
    verifiedStatus: 'Đã xác minh nguồn chính thống',
  },
  {
    id: 'ref-2',
    name: 'Google AI Studio',
    publisher: 'Google LLC',
    url: 'https://aistudio.google.com/',
    category: 'Kỹ thuật AI',
    description: 'Môi trường phát triển và thử nghiệm nhanh (prototype) các hệ thống AI với mô hình Gemini, quản lý API key bảo mật và tùy biến prompt an toàn.',
    relevance: 'Nền tảng kiểm thử system instruction và tinh chỉnh phản hồi có cấu trúc cho ứng dụng.',
    verifiedStatus: 'Đã xác minh nguồn chính thống',
  },
  {
    id: 'ref-3',
    name: 'Meta Transparency Center – Community Standards',
    publisher: 'Meta Platforms, Inc.',
    url: 'https://transparency.meta.com/policies/',
    category: 'Chính sách nền tảng',
    description: 'Bộ nguyên tắc và tiêu chuẩn cộng đồng toàn diện của Facebook và Instagram về ngôn từ kích động thù ghét, quấy rối, bắt nạt và thông tin sai lệch.',
    relevance: 'Cung cấp cơ sở định nghĩa các nhóm rủi ro ngôn từ và giới hạn chia sẻ trên mạng xã hội Facebook & Instagram.',
    verifiedStatus: 'Đã xác minh nguồn chính thống',
  },
  {
    id: 'ref-4',
    name: 'TikTok Community Guidelines',
    publisher: 'TikTok Pte. Ltd.',
    url: 'https://www.tiktok.com/community-guidelines',
    category: 'Chính sách nền tảng',
    description: 'Hướng dẫn cộng đồng chi tiết của nền tảng TikTok nhằm duy trì không gian an toàn, ngăn chặn hành vi lan truyền thông tin sai lệch và nội dung độc hại.',
    relevance: 'Tham chiếu tiêu chuẩn an toàn cho các nội dung ngắn và tương tác hướng tới giới trẻ.',
    verifiedStatus: 'Đã xác minh nguồn chính thống',
  },
  {
    id: 'ref-5',
    name: 'UNICEF – Child Online Protection Guidelines',
    publisher: 'UNICEF (Quỹ Nhi đồng Liên Hợp Quốc)',
    url: 'https://www.unicef.org/protection/violence-against-children-online',
    category: 'Bảo vệ cộng đồng',
    description: 'Khung hướng dẫn bảo vệ trẻ em và thanh thiếu niên trước bạo lực mạng, bắt nạt trực tuyến và lộ dữ liệu danh tính cá nhân trên môi trường số.',
    relevance: 'Cơ sở lý luận cho tiêu chí phát hiện bắt nạt trực tuyến và bảo vệ đối tượng học sinh - sinh viên.',
    verifiedStatus: 'Đã xác minh nguồn chính thống',
  },
  {
    id: 'ref-6',
    name: 'Cổng thông tin điện tử Văn bản quy phạm pháp luật Việt Nam (VBPL)',
    publisher: 'Bộ Tư pháp Việt Nam',
    url: 'https://vbpl.vn/',
    category: 'Văn bản pháp luật',
    description: 'Hệ thống cơ sở dữ liệu quốc gia về văn bản quy phạm pháp luật, bao gồm Luật An ninh mạng số 24/2018/QH14 và Nghị định số 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân.',
    relevance: 'Căn cứ tham chiếu nguyên tắc bảo vệ bí mật đời tư, bảo vệ dữ liệu cá nhân và trách nhiệm khi chia sẻ thông tin trên không gian mạng tại Việt Nam.',
    verifiedStatus: 'Đã xác minh nguồn chính thống',
  },
];
