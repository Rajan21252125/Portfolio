import React from 'react';
import { Check } from 'lucide-react';
import MacWindow from './MacWindow';

const formatProficiency = (value) => {
  if (value === undefined || value === null || value === '') return '';
  return typeof value === 'number' ? `${value}%` : value;
};

export default function SkillsWindow({ techStack }) {
  return (
    <MacWindow id="terminal" title="Tech Stack" className="mac-terminal">
      <div className="mac-terminal-body">
        <p><strong>@portfolio %</strong> show tech stack</p>
        <ul>
          {techStack.map((group) => (
            <li key={group.id || group.category}>
              <Check size={16} />
              <strong>{group.category}</strong>
              <div className="mac-skill-list">
                {group.items.map((item) => (
                  <span key={item.name}>
                    {item.name}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
        {!techStack.length && <p>No skills returned from the API yet.</p>}
      </div>
    </MacWindow>
  );
}
