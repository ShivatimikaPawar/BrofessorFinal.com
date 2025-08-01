// pages/SimpleNotes.jsx
import React, { useState, useEffect } from 'react';
import'./SimpleNotes.css';

const SimpleNotes = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('simple-note');
    if (saved) setContent(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('simple-note', content);
  }, [content]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Simple Notes</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your notes..."
        style={{
          width: '100%',
          height: '400px',
          fontSize: '16px',
          padding: '1rem',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );
};

export default SimpleNotes;

