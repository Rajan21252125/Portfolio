import React from 'react';
import MacWindow from './MacWindow';
import useWindowStore from '../../store/macos-windows';

export default function ImageWindow() {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;
  if (!data) return null;

  return (
    <MacWindow id="imgfile" title={data.name || 'Preview'} className="mac-image-window">
      <div className="mac-image-preview">
        <img src={data.imageUrl} alt={data.name || 'Project preview'} />
      </div>
    </MacWindow>
  );
}
