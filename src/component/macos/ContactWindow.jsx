import React from 'react';
import { Mail } from 'lucide-react';
import MacWindow from './MacWindow';

export default function ContactWindow({ contact }) {
  return (
    <MacWindow id="contact" title="Contact" className="mac-contact">
      <div className="mac-contact-body">
        <img src={contact.avatar} alt={contact.name} />
        <div>
          <h3>{contact.name}</h3>
          <p>{contact.bio || 'Available for thoughtful web work and collaboration.'}</p>
          {contact.email && <a href={`mailto:${contact.email}`}><Mail size={16} /> {contact.email}</a>}
        </div>
        <ul>
          {contact.socials.map((item) => (
            <li key={item.id} style={{ backgroundColor: item.bg }}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.icon} alt="" />
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </MacWindow>
  );
}
