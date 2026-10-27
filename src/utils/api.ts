import { AnalysisResult, AnalysisMeta } from '../types';

export interface AnalyzeResponse {
  success: boolean;
  data: AnalysisResult;
  meta: AnalysisMeta;
}

export interface AnalyzePayload {
  postContent: string;
  platform: string;
  purpose: string;
  audience: string;
}

export async function checkServerHealth(): Promise<{ status: string; hasApiKey: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    return { status: 'error', hasApiKey: false };
  }
}

export async function analyzePost(
  payload: AnalyzePayload,
  signal?: AbortSignal
): Promise<AnalyzeResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 40000); // 40s maximum timeout

  // If external signal is passed, link it
  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const rawText = await response.text();
    let resJson: any;
    try {
      resJson = JSON.parse(rawText);
    } catch {
      throw new Error(
        `Máy chủ phản hồi không đúng định dạng (${response.status}). Vui lòng tải lại trang hoặc kiểm tra kết nối mạng.`
      );
    }

    if (!response.ok) {
      if (resJson?.error === 'MISSING_API_KEY') {
        throw new Error(
          resJson.message ||
            'Chưa cấu hình GEMINI_API_KEY. Vui lòng thiết lập khóa bí mật trong bảng điều khiển Secrets để kích hoạt phân tích AI thực tế.'
        );
      }
      throw new Error(resJson?.message || `Lỗi máy chủ (${response.status}): Không thể hoàn tất phân tích.`);
    }

    return resJson;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Yêu cầu phân tích bị hủy hoặc quá thời gian chờ (timeout). Vui lòng thử lại.');
    }
    throw err;
  }
}
