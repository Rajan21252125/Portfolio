import React from 'react';
import MacWindow from './MacWindow';

export default function BinWindow() {
  return (
    <MacWindow id="trash" title="Bin" className="mac-bin">
      <div className="mac-bin-body">
        <img src="/images/trash.png" alt="" />
        <h3>Bin is empty</h3>
        <p>Archived or hidden portfolio items can live here later.</p>
      </div>
    </MacWindow>
  );
}
