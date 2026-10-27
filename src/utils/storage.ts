import { HistoryRecord, StudentInfo } from '../types';

const HISTORY_STORAGE_KEY = 'social_check_ai_history_v1';
const STUDENT_INFO_KEY = 'social_check_ai_student_info_v1';

export const DEFAULT_STUDENT_INFO: StudentInfo = {
  fullName: 'Trần Quang Đức',
  studentId: 'PH58855',
  internshipGroup: 'Nhóm 1',
  topic: 'G02: Trợ lý kiểm tra bài đăng mạng xã hội',
  program: 'IMTA TECH x FPT Polytechnic',
  appName: 'Social Check AI – Trợ lý kiểm tra bài đăng mạng xã hội',
};

export function getHistory(): HistoryRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load history from localStorage', e);
    return [];
  }
}

export function saveHistoryItem(item: HistoryRecord): void {
  try {
    const current = getHistory();
    // Prepend new record, keep up to 50 records
    const updated = [item, ...current.filter((r) => r.id !== item.id)].slice(0, 50);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save history item to localStorage', e);
  }
}

export function deleteHistoryItem(id: string): void {
  try {
    const current = getHistory();
    const updated = current.filter((r) => r.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete history item', e);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

export function getStudentInfo(): StudentInfo {
  try {
    const raw = localStorage.getItem(STUDENT_INFO_KEY);
    if (!raw) return DEFAULT_STUDENT_INFO;
    return { ...DEFAULT_STUDENT_INFO, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load student info', e);
    return DEFAULT_STUDENT_INFO;
  }
}

export function saveStudentInfo(info: StudentInfo): void {
  try {
    localStorage.setItem(STUDENT_INFO_KEY, JSON.stringify(info));
  } catch (e) {
    console.error('Failed to save student info', e);
  }
}
