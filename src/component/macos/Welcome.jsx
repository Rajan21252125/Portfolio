import React from 'react';

const renderLetters = (text) => (
  [...text].map((char, index) => (
    <span key={`${char}-${index}`}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
);

export default function Welcome({ name }) {
  const subtitle = `Hey, I'm ${name || 'Rajan'}! Welcome to my`;

  return (
    <section className="mac-welcome">
      <p className="mac-welcome-subtitle" aria-label={subtitle}>
        {renderLetters(subtitle)}
      </p>
      <h1 className="mac-welcome-title" aria-label="portfolio">
        {renderLetters('portfolio')}
      </h1>
    </section>
  );
}
