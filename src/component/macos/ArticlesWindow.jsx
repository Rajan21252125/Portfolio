import React from 'react';
import { Clock3 } from 'lucide-react';
import MacWindow from './MacWindow';

const articleTimeline = [
  'Article system not made yet.',
  'Draft timeline will appear here once articles are connected.',
  'Later this can read from an articles API without changing the dock.',
];

export default function ArticlesWindow() {
  return (
    <MacWindow id="safari" title="Articles" className="mac-articles">
      <div className="mac-articles-body">
        <h3>Developer Articles</h3>
        <ol>
          {articleTimeline.map((item, index) => (
            <li key={item}>
              <span><Clock3 size={15} /></span>
              <div>
                <strong>{index === 0 ? 'Pending' : 'Planned'}</strong>
                <p>{item}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </MacWindow>
  );
}
