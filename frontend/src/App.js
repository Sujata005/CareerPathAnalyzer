import React, { useState, useEffect } from 'react';
import CareerInput from './components/CareerInput';
import Dashboard from './components/Dashboard';
import HackerNewsList from './components/HackerNewsList';
import { skillGap, roadmap, hackerNewsTop5 } from './api';

function App() {
  const [skillGapResult, setSkillGapResult] = useState(null);
  const [roadmapResult, setRoadmapResult] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // load news on mount
    hackerNewsTop5().then(data => {
      if (data && data.stories) setNews(data.stories);
    }).catch(err => {
      console.error('Failed to load HN', err);
    });
  }, []);

  const handleAnalyze = async (role, skillsCsv) => {
    try {
      // call backend skill-gap and roadmap
      const [sg] = await Promise.all([skillGap(role, skillsCsv), roadmap(role)]);
      setSkillGapResult(sg);
      setRoadmapResult(sg && sg.roadmap ? sg.roadmap : await roadmap(role).then(r => r));
      // note: roadmap endpoint returns object {roadmap: [...]}
      const rm = await roadmap(role);
      setRoadmapResult(rm);
    } catch (err) {
      console.error(err);
      alert('Failed to analyze. Check console.');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '12px auto', padding: 12 }}>
      <h2>Career Path Analyzer</h2>
      <CareerInput onAnalyze={handleAnalyze} />
      <div style={{ marginTop: 16 }}>
        <Dashboard skillGapResult={skillGapResult} roadmapResult={roadmapResult} news={news} />
      </div>
    </div>
  );
}

export default App;
