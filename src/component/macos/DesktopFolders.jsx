import React, { useMemo, useState } from 'react';

const getInitialPositions = (projects) => (
  projects.reduce((positions, project, index) => ({
    ...positions,
    [project.id]: {
      top: 96 + (index % 4) * 118,
      left: 28 + Math.floor(index / 4) * 150,
    },
  }), {})
);

export default function DesktopFolders({ projects, onOpenProject }) {
  const initialPositions = useMemo(() => getInitialPositions(projects), [projects]);
  const [positions, setPositions] = useState(initialPositions);

  const startDrag = (event, project) => {
    if (event.button !== 0) return;

    const currentPosition = positions[project.id] || initialPositions[project.id];
    const startX = event.clientX;
    const startY = event.clientY;

    const moveFolder = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      setPositions((current) => ({
        ...current,
        [project.id]: {
          top: Math.max(48, currentPosition.top + deltaY),
          left: Math.max(8, currentPosition.left + deltaX),
        },
      }));
    };

    const stopDrag = () => {
      window.removeEventListener('mousemove', moveFolder);
      window.removeEventListener('mouseup', stopDrag);
    };

    window.addEventListener('mousemove', moveFolder);
    window.addEventListener('mouseup', stopDrag);
  };

  return (
    <ul className="mac-desktop-folders">
      {projects.map((project) => {
        const position = positions[project.id] || initialPositions[project.id];

        return (
          <li
            key={project.id}
            className="mac-desktop-folder"
            style={position}
            onMouseDown={(event) => startDrag(event, project)}
            onDoubleClick={() => onOpenProject(project)}
          >
            <img src="/images/folder.png" alt="" draggable="false" />
            <p>{project.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
