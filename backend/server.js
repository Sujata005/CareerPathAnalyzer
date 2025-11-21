const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// load predefined skills
const skillsPath = path.join(__dirname, 'data', 'predefinedSkills.json');
const predefinedSkills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));

// Utility to normalize skill strings
function norm(s) {
  return s.trim().toLowerCase();
}

// POST /api/skill-gap
// body: { role: string, skills: [string] }  OR skills as CSV string
app.post('/api/skill-gap', (req, res) => {
  try {
    const { role, skills } = req.body;
    if (!role) return res.status(400).json({ error: 'role is required' });

    const roleKey = Object.keys(predefinedSkills).find(r => r.toLowerCase() === role.toLowerCase());
    if (!roleKey) {
      // If role not found, return best-effort: empty matched, all missing
      return res.json({
        matchedSkills: [],
        missingSkills: [],
        recommendations: [`Role "${role}" not found in predefined list. Consider adding it to backend/data/predefinedSkills.json`],
        suggestedLearningOrder: []
      });
    }

    // input skills array or CSV string
    let userSkills = [];
    if (Array.isArray(skills)) userSkills = skills;
    else if (typeof skills === 'string') userSkills = skills.split(',').map(s => s.trim()).filter(Boolean);

    const desired = predefinedSkills[roleKey];

    const normalizedUser = userSkills.map(norm);
    const matched = [];
    const missing = [];

    desired.forEach(ds => {
      if (normalizedUser.includes(norm(ds))) matched.push(ds);
      else missing.push(ds);
    });

    // recommendations (simple examples)
    const recommendations = missing.map((m, i) => `Learn ${m} — try a small project or course for 1-3 weeks.`);

    // suggested learning order: put fundamentals first (simple mock)
    const suggestedLearningOrder = [
      ...missing.slice(0, Math.ceil(missing.length/2)),
      ...missing.slice(Math.ceil(missing.length/2))
    ];

    return res.json({
      matchedSkills: matched,
      missingSkills: missing,
      recommendations,
      suggestedLearningOrder
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/roadmap
// body: { role: string }
app.post('/api/roadmap', (req, res) => {
  try {
    const { role } = req.body;
    if (!role) return res.status(400).json({ error: 'role is required' });

    const roleLower = role.toLowerCase();

    // Mock logic for roadmaps (expand as needed)
    const roadmaps = {
      'backend developer': [
        { phase: 'Phase 1 (1–2 months)', items: ['Language basics (Java/Python)', 'OOP', 'Git & version control'] },
        { phase: 'Phase 2 (2 months)', items: ['Web frameworks (Spring Boot/Flask)', 'SQL & Databases', 'REST APIs'] },
        { phase: 'Phase 3 (1–2 months)', items: ['Deployment (Docker)', 'Build 2 projects', 'System design basics'] }
      ],
      'frontend developer': [
        { phase: 'Phase 1 (1–2 months)', items: ['HTML, CSS basics', 'JavaScript fundamentals', 'Git'] },
        { phase: 'Phase 2 (2 months)', items: ['React or framework', 'State management', 'APIs integration'] },
        { phase: 'Phase 3 (1–2 months)', items: ['Deployment', 'Projects & Portfolio', 'Accessibility & Testing'] }
      ],
      'data analyst': [
        { phase: 'Phase 1 (1–2 months)', items: ['Excel basics', 'SQL basics', 'Statistics fundamentals'] },
        { phase: 'Phase 2 (2 months)', items: ['Python for data', 'Dashboards (Tableau/PowerBI)', 'Data cleaning'] },
        { phase: 'Phase 3 (1–2 months)', items: ['End-to-end projects', 'Storytelling with data', 'Advanced statistics'] }
      ]
    };

    // find best match
    const key = Object.keys(roadmaps).find(k => k === roleLower || k.toLowerCase() === roleLower);
    if (key) return res.json({ roadmap: roadmaps[key] });

    // fallback: simple generic roadmap
    return res.json({
      roadmap: [
        { phase: 'Phase 1 (1–2 months)', items: ['Core fundamentals', 'Git'] },
        { phase: 'Phase 2 (2 months)', items: ['Role-specific frameworks & tools'] },
        { phase: 'Phase 3 (1–2 months)', items: ['Projects, deployment, interview prep'] }
      ],
      note: `Used generic roadmap because "${role}" not found in mock mapping. Add to backend if desired.`
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Optional: Proxy HackerNews top stories (frontends can call directly if CORS allowed)
app.get('/api/hackernews/top5', async (req, res) => {
  try {
    const topUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    const { data: ids } = await axios.get(topUrl);
    const top5 = ids.slice(0, 5);

    const promises = top5.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.data));
    const stories = await Promise.all(promises);

    const mapped = stories.map(s => ({
      id: s.id,
      title: s.title,
      url: s.url,
      score: s.score,
      time: s.time,
      type: s.type,
      by: s.by
    }));

    res.json({ stories: mapped });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch HackerNews' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
