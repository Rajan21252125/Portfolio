import React, { useEffect, useState } from 'react';
import DesignToggle from '../DesignToggle';

export default function TopBar({ name, onOpen }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="mac-topbar">
      <div className="mac-topbar-left">
        <img src="/images/logo.svg" alt="" />
        <strong>{name || 'Portfolio'}</strong>
        <button onClick={() => onOpen('finder')}>Projects</button>
        <button onClick={() => onOpen('safari')}>Articles</button>
        <button onClick={() => onOpen('photos')}>Gallery</button>
        <button onClick={() => onOpen('terminal')}>Skills</button>
        <button onClick={() => onOpen('contact')}>Contact</button>
        <button onClick={() => onOpen('trash')}>Bin</button>
      </div>
      <DesignToggle compact />
      <time>{now.toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</time>
    </nav>
  );
}
