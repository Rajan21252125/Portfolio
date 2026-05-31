import React from 'react';
import dockApps from './dockApps';

export default function Dock({ onOpen }) {
  return (
    <section className="mac-dock" aria-label="macOS dock">
      {dockApps.map((app) => (
        <button
          key={app.id}
          onClick={() => onOpen(app.id)}
          title={app.name}
          aria-label={app.name}
          data-label={app.name}
        >
          <img src={app.icon} alt="" />
        </button>
      ))}
    </section>
  );
}
