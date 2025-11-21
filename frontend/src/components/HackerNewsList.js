import React from 'react';

export default function HackerNewsList({ stories }) {
  if (!stories || stories.length === 0) return <div>No news available</div>;

  return (
    <div>
      <h3>Latest Tech News (HackerNews)</h3>
      <ul>
        {stories.map(s => (
          <li key={s.id} style={{ marginBottom: 6 }}>
            <a href={s.url || `https://news.ycombinator.com/item?id=${s.id}`} target="_blank" rel="noreferrer">{s.title}</a>
            <div style={{ fontSize: 12, color: '#666' }}>
              by {s.by} | score: {s.score} | type: {s.type} | {new Date(s.time * 1000).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
