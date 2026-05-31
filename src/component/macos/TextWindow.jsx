import React from 'react';
import MacWindow from './MacWindow';
import useWindowStore from '../../store/macos-windows';

export default function TextWindow() {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;
  if (!data) return null;

  return (
    <MacWindow id="txtfile" title={data.name || 'Notes'} className="mac-text-window">
      <div className="mac-document">
        {(data.description || []).map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </MacWindow>
  );
}
