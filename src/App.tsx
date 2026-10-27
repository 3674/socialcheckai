/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, AppScreen } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './screens/HomeScreen';
import { CheckScreen } from './screens/CheckScreen';
import { ResultScreen } from './screens/ResultScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ReferencesScreen } from './screens/ReferencesScreen';
import { AnalysisResult, AnalysisMeta, HistoryRecord, SamplePost } from './types';
import { saveHistoryItem } from './utils/storage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [latestResult, setLatestResult] = useState<AnalysisResult | null>(null);
  const [latestMeta, setLatestMeta] = useState<AnalysisMeta | null>(null);
  const [originalContent, setOriginalContent] = useState<string>('');

  // Form pre-fill states
  const [formContent, setFormContent] = useState<string>('');
  const [formPlatform, setFormPlatform] = useState<string>('Facebook');
  const [formPurpose, setFormPurpose] = useState<string>('Chia sẻ thông tin');
  const [formAudience, setFormAudience] = useState<string>('Công chúng');

  // Handle URL Hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'check', 'result', 'history', 'about', 'references'].includes(hash)) {
        setCurrentScreen(hash as AppScreen);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
    window.location.hash = `#/${screen}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisComplete = (
    result: AnalysisResult,
    meta: AnalysisMeta,
    content: string
  ) => {
    setLatestResult(result);
    setLatestMeta(meta);
    setOriginalContent(content);

    // Auto-save to local history
    const historyItem: HistoryRecord = {
      id: `record-${Date.now()}`,
      timestamp: meta.timestamp,
      originalContent: content,
      platform: meta.platform,
      purpose: meta.purpose,
      audience: meta.audience,
      score: result.score,
      overallRisk: result.overallRisk,
      result,
    };
    saveHistoryItem(historyItem);

    navigateTo('result');
  };

  const handleSelectHistoryRecord = (record: HistoryRecord) => {
    setLatestResult(record.result);
    setLatestMeta({
      timestamp: record.timestamp,
      model: 'gemini-3.8-flash',
      platform: record.platform,
      purpose: record.purpose,
      audience: record.audience,
    });
    setOriginalContent(record.originalContent);
    setFormContent(record.originalContent);
    setFormPlatform(record.platform);
    setFormPurpose(record.purpose);
    setFormAudience(record.audience);

    navigateTo('result');
  };

  const handleSelectSampleFromHome = (sample: SamplePost) => {
    setFormContent(sample.content);
    setFormPlatform(sample.platform);
    setFormPurpose(sample.purpose);
    setFormAudience(sample.audience);
    navigateTo('check');
  };

  const handleReEdit = () => {
    setFormContent(originalContent);
    if (latestMeta) {
      setFormPlatform(latestMeta.platform);
      setFormPurpose(latestMeta.purpose);
      setFormAudience(latestMeta.audience);
    }
    navigateTo('check');
  };

  const handleReAnalyze = () => {
    navigateTo('check');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        hasResult={latestResult !== null}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={navigateTo}
            onSelectSampleForCheck={handleSelectSampleFromHome}
          />
        )}

        {currentScreen === 'check' && (
          <CheckScreen
            initialContent={formContent}
            initialPlatform={formPlatform}
            initialPurpose={formPurpose}
            initialAudience={formAudience}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            result={latestResult}
            meta={latestMeta}
            originalContent={originalContent}
            onNavigate={navigateTo}
            onReEdit={handleReEdit}
            onReAnalyze={handleReAnalyze}
          />
        )}

        {currentScreen === 'history' && (
          <HistoryScreen
            onNavigate={navigateTo}
            onSelectHistoryRecord={handleSelectHistoryRecord}
          />
        )}

        {currentScreen === 'about' && <AboutScreen />}

        {currentScreen === 'references' && <ReferencesScreen />}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
