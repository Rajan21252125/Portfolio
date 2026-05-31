import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import useWindowStore from '../../store/macos-windows';

export default function MacWindow({ id, title, children, className = '' }) {
  const { windows, closeWindow, focusWindow } = useWindowStore();
  const win = windows[id];
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  if (!win?.isOpen) return null;

  const startDrag = (event) => {
    if (event.button !== 0 || event.target.closest('button')) return;

    const el = ref.current;
    if (!el) return;

    focusWindow(id);
    const rect = el.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const initialX = offset.x;
    const initialY = offset.y;

    const moveWindow = (moveEvent) => {
      setOffset({
        x: initialX + moveEvent.clientX - startX,
        y: initialY + moveEvent.clientY - startY,
      });
    };

    const stopDrag = () => {
      window.removeEventListener('mousemove', moveWindow);
      window.removeEventListener('mouseup', stopDrag);
    };

    if (rect.width) {
      window.addEventListener('mousemove', moveWindow);
      window.addEventListener('mouseup', stopDrag);
    }
  };

  return (
    <section
      ref={ref}
      className={`mac-window ${className}`}
      style={{
        zIndex: win.zIndex,
        '--mac-window-x': `${offset.x}px`,
        '--mac-window-y': `${offset.y}px`,
      }}
      onMouseDown={() => focusWindow(id)}
    >
      <div className="mac-window-header" onMouseDown={startDrag}>
        <div className="mac-window-controls">
          <button className="mac-control close" onClick={() => closeWindow(id)} aria-label={`Close ${title}`}>
            <X size={10} />
          </button>
          <span className="mac-control minimize" />
          <span className="mac-control maximize" />
        </div>
        <h2>{title}</h2>
        <div className="mac-header-spacer" />
      </div>
      {children}
    </section>
  );
}
