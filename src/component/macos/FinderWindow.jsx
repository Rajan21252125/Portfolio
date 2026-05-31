import React from 'react';
import MacWindow from './MacWindow';
import useLocationStore from '../../store/macos-location';
import useWindowStore from '../../store/macos-windows';

export default function FinderWindow({ locations }) {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();
  const locationList = Object.values(locations);

  const openItem = (item) => {
    if (item.kind === 'folder') {
      setActiveLocation(item);
      return;
    }

    if (item.fileType === 'url' && item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }

    if (item.fileType === 'pdf') {
      openWindow('resume');
      return;
    }

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  return (
    <MacWindow id="finder" title={activeLocation?.name || 'Projects'} className="mac-finder">
      <div className="mac-finder-body">
        <aside>
          <p>Favorites</p>
          {locationList.map((item) => (
            <button
              key={item.id}
              className={activeLocation?.id === item.id ? 'active' : ''}
              onClick={() => setActiveLocation(item)}
            >
              <img src={item.icon} alt="" />
              <span>{item.name}</span>
            </button>
          ))}
        </aside>
        <div className="mac-finder-content">
          {(activeLocation?.children || []).map((item) => (
            <button key={item.id} onClick={() => openItem(item)} title={item.name}>
              <img src={item.icon} alt="" />
              <span>{item.name}</span>
            </button>
          ))}
          {!activeLocation?.children?.length && (
            <div className="mac-empty">No files here yet.</div>
          )}
        </div>
      </div>
    </MacWindow>
  );
}
