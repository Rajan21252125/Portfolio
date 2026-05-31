import React from 'react';
import { Download, FileText } from 'lucide-react';
import MacWindow from './MacWindow';

export default function ResumeWindow({ resume }) {
  return (
    <MacWindow id="resume" title={resume.name || 'Resume.pdf'} className="mac-resume">
      <div className="mac-resume-body">
        <FileText size={56} />
        <h3>{resume.name || 'Resume.pdf'}</h3>
        <a href={resume.href} target="_blank" rel="noopener noreferrer">
          <Download size={16} />
          Open Resume
        </a>
      </div>
    </MacWindow>
  );
}
