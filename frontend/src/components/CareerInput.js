import React, { useState } from 'react';

export default function CareerInput({ onAnalyze }) {
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // send as CSV string (backend accepts array or CSV)
    onAnalyze(role.trim(), skills);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 12 }}>
      <div style={{ marginBottom: 8 }}>
        <label>Target Role</label><br />
        <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g., Backend Developer" required style={{ width: '100%' }}/>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Current Skills (comma-separated)</label><br />
        <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="HTML, CSS, JavaScript" style={{ width: '100%' }}/>
      </div>

      <button type="submit">Analyze My Career Path</button>
    </form>
  );
}
