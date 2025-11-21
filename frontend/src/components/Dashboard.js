import React from 'react';

export default function Dashboard({ skillGapResult, roadmapResult, news }) {
  return (
    <div>
      <div className="grid-2">
        <div className="card">
          <h3>Skill Gap Results</h3>
          {!skillGapResult ? (
            <div>Analyze to see results</div>
          ) : (
            <>
              <p><strong>Matched:</strong> {skillGapResult.matchedSkills.join(', ') || 'None'}</p>
              <p><strong>Missing:</strong> {skillGapResult.missingSkills.join(', ') || 'None'}</p>

              <h4>Recommendations</h4>
              <ul>
                {skillGapResult.recommendations?.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="card">
          <h3>Career Roadmap</h3>
          {!roadmapResult ? (
            <div>Analyze to see roadmap</div>
          ) : (
            roadmapResult.roadmap.map((phase, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <strong>{phase.phase}</strong>
                <ul>
                  {phase.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Latest Tech News (HackerNews)</h3>
        {!news.length ? (
          <div>Loading news...</div>
        ) : (
          news.map((s) => (
            <div key={s.id} className="news-item">
              <a href={s.url || `https://news.ycombinator.com/item?id=${s.id}`} target="_blank" rel="noreferrer">
                {s.title}
              </a>
              <div className="news-meta">
                By {s.by} | Score: {s.score} | {new Date(s.time * 1000).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
