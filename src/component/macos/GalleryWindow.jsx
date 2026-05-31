import React from 'react';
import { FileText } from 'lucide-react';
import MacWindow from './MacWindow';
import useWindowStore from '../../store/macos-windows';

export default function GalleryWindow({ items }) {
  const { openWindow } = useWindowStore();

  const openItem = (item) => {
    if (item.fileType === 'pdf') {
      openWindow('resume');
      return;
    }

    openWindow('imgfile', item);
  };

  return (
    <MacWindow id="photos" title="Gallery" className="mac-gallery-window">
      <div className="mac-gallery-body">
        {items.map((item) => (
          <button key={item.id} onClick={() => openItem(item)}>
            {item.fileType === 'pdf' ? (
              <span className="mac-gallery-pdf"><FileText size={42} /></span>
            ) : (
              <img src={item.imageUrl} alt={item.name} />
            )}
            <p>{item.name}</p>
          </button>
        ))}
        {!items.length && <p className="mac-empty">No gallery files found yet.</p>}
      </div>
    </MacWindow>
  );
}
