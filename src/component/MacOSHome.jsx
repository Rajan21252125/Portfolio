import React, { useEffect, useMemo } from 'react';
import { Code2, ExternalLink, Mail, Search } from 'lucide-react';
import { createMacOSData } from '../services/macOS-data';
import { usePortfolio } from '../contexts/PortfolioContext';
import useWindowStore from '../store/macos-windows';
import useLocationStore from '../store/macos-location';
import TopBar from './macos/TopBar';
import Welcome from './macos/Welcome';
import DesktopFolders from './macos/DesktopFolders';
import Dock from './macos/Dock';
import FinderWindow from './macos/FinderWindow';
import SkillsWindow from './macos/SkillsWindow';
import ContactWindow from './macos/ContactWindow';
import ResumeWindow from './macos/ResumeWindow';
import TextWindow from './macos/TextWindow';
import ImageWindow from './macos/ImageWindow';
import ArticlesWindow from './macos/ArticlesWindow';
import GalleryWindow from './macos/GalleryWindow';
import BinWindow from './macos/BinWindow';

export default function MacOSHome() {
  const { profileData, projectData } = usePortfolio();
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const macOSData = useMemo(
    () => createMacOSData(profileData, projectData),
    [profileData, projectData]
  );

  const locations = useMemo(() => ({
    work: macOSData.projectsStructure.work,
    about: {
      id: 'about',
      type: 'about',
      name: 'About',
      icon: '/icons/info.svg',
      kind: 'folder',
      children: [
        {
          id: 'about-text',
          name: 'about-me.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          description: [
            macOSData.profile?.about || macOSData.contact.bio || 'No about text returned from the API yet.'
          ]
        },
        ...(macOSData.contact.avatar ? [{
          id: 'profile-image',
          name: 'profile.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          imageUrl: macOSData.contact.avatar
        }] : [])
      ]
    },
    resume: {
      id: 'resume-folder',
      type: 'resume',
      name: 'Resume',
      icon: '/icons/file.svg',
      kind: 'folder',
      children: [{
        id: 'resume-file',
        name: macOSData.resume.name,
        icon: '/images/pdf.png',
        kind: 'file',
        fileType: 'pdf'
      }]
    }
  }), [macOSData]);

  useEffect(() => {
    setActiveLocation(macOSData.projectsStructure.work);
  }, [macOSData.projectsStructure.work, setActiveLocation]);

  const galleryItems = useMemo(() => {
    const items = [];

    if (macOSData.contact.avatar) {
      items.push({
        id: 'profile-photo',
        name: 'profile.png',
        fileType: 'img',
        imageUrl: macOSData.contact.avatar,
      });
    }

    macOSData.projects.forEach((project, index) => {
      const imageUrl = project.image_url
        || project.thumbnail
        || (project.image ? (project.image.startsWith('http') || project.image.startsWith('/') ? project.image : `/img/${project.image}`) : '');
      if (!imageUrl) return;

      items.push({
        id: project._id || project.id || `gallery-project-${index}`,
        name: `${project.name || project.title || `Project ${index + 1}`}.png`,
        fileType: 'img',
        imageUrl,
      });
    });

    if (macOSData.resume.href) {
      items.push({
        id: 'resume-gallery',
        name: macOSData.resume.name || 'Resume.pdf',
        fileType: 'pdf',
      });
    }

    return items;
  }, [macOSData]);

  const openProject = (project) => {
    setActiveLocation(project);
    openWindow('finder');
  };

  const projects = macOSData.projectsStructure.work.children || [];

  return (
    <main className="macos-shell">
      <TopBar name={macOSData.profile?.name} onOpen={openWindow} />
      <Welcome name={macOSData.profile?.name} />

      <DesktopFolders projects={projects} onOpenProject={openProject} />
      <Dock onOpen={openWindow} />

      <FinderWindow locations={locations} />
      <SkillsWindow techStack={macOSData.techStack} />
      <ContactWindow contact={macOSData.contact} />
      <ResumeWindow resume={macOSData.resume} />
      <ArticlesWindow />
      <GalleryWindow items={galleryItems} />
      <BinWindow />
      <TextWindow />
      <ImageWindow />

      <div className="mac-floating-tools">
        <button onClick={() => openWindow('finder')} title="Projects"><Search size={16} /></button>
        <button onClick={() => openWindow('terminal')} title="Skills"><Code2 size={16} /></button>
        <button onClick={() => openWindow('contact')} title="Contact"><Mail size={16} /></button>
        <button onClick={() => openWindow('resume')} title="Resume"><ExternalLink size={16} /></button>
      </div>
    </main>
  );
}
