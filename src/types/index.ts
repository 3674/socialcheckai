export type RiskLevel = 'low' | 'medium' | 'high';

export interface CriteriaScores {
  languageScore: number;
  privacyScore: number;
  clarityScore: number;
  factCheckScore: number;
  contextScore: number;
}

export interface IssueItem {
  id?: string;
  category: string;
  severity: RiskLevel;
  excerpt: string;
  explanation: string;
  suggestion: string;
}

export interface AnalysisResult {
  summary: string;
  overallRisk: RiskLevel;
  score: number;
  scoreExplanation: string;
  criteriaScores: CriteriaScores;
  issues: IssueItem[];
  verificationNotes: string[];
  improvements: string[];
  rewrittenPost: string;
  disclaimer: string;
}

export interface AnalysisMeta {
  timestamp: string;
  model: string;
  platform: string;
  purpose: string;
  audience: string;
}

export interface HistoryRecord {
  id: string;
  timestamp: string;
  originalContent: string;
  platform: string;
  purpose: string;
  audience: string;
  score: number;
  overallRisk: RiskLevel;
  result: AnalysisResult;
}

export interface StudentInfo {
  fullName: string;
  studentId: string;
  internshipGroup: string;
  topic: string;
  program: string;
  appName: string;
}

export interface SamplePost {
  id: string;
  title: string;
  description: string;
  platform: string;
  purpose: string;
  audience: string;
  content: string;
  badge: string;
}
