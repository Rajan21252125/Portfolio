# Adding Another Portfolio Theme

This client supports multiple portfolio designs through a small design-mode config and a render switch.

Current designs:

- `classic` - the green classic portfolio
- `macos` - the macOS desktop-style portfolio

## 1. Add The Design Mode

Open:

```txt
src/config/portfolioDesigns.js
```

Add a new mode to `DESIGN_MODES` and a new item to `PORTFOLIO_DESIGNS`.

Example:

```js
export const DESIGN_MODES = {
  CLASSIC: 'classic',
  MACOS: 'macos',
  MINIMAL: 'minimal',
};

export const PORTFOLIO_DESIGNS = [
  {
    id: DESIGN_MODES.CLASSIC,
    label: 'Classic',
    shortLabel: 'CLASSIC',
  },
  {
    id: DESIGN_MODES.MACOS,
    label: 'macOS',
    shortLabel: 'MACOS',
  },
  {
    id: DESIGN_MODES.MINIMAL,
    label: 'Minimal',
    shortLabel: 'MINIMAL',
  },
];
```

The navbar `Change Theme` dropdown reads from this list automatically.

## 2. Create The Theme Component

Create a folder for the new design:

```txt
src/component/minimal/
```

Then create the main component:

```txt
src/component/MinimalHome.jsx
```

Use `PortfolioContext` so the theme reuses already-fetched API data instead of calling the API again.

```jsx
import React from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function MinimalHome() {
  const { profileData, projectData } = usePortfolio();

  return (
    <main>
      <h1>{profileData?.name}</h1>
      {projectData.map((project) => (
        <article key={project._id || project.id || project.name}>
          <h2>{project.name || project.title}</h2>
          <p>{project.description}</p>
        </article>
      ))}
    </main>
  );
}
```

## 3. Render It In PublicHomeWrapper

Open:

```txt
src/component/PublicHomeWrapper.jsx
```

Import your component and add a branch.

```jsx
import MinimalHome from './MinimalHome';
import { DESIGN_MODES } from '../contexts/ThemeContext';
```

Then update the render logic:

```jsx
if (designMode === DESIGN_MODES.MINIMAL) {
  return <MinimalHome />;
}
```

Keep the classic portfolio as the final fallback.

## 4. Keep API Data Dynamic

Do not fetch `/profile` or `/projects` again inside the new theme.

Use:

```js
const { profileData, projectData } = usePortfolio();
```

This keeps switching themes fast and avoids duplicate API calls.

## 5. Add Theme-Specific Styles

For small styles, add scoped CSS in:

```txt
src/index.css
```

Use a unique prefix for the new theme, for example:

```css
.minimal-shell {
  min-height: 100vh;
}

.minimal-project-card {
  border-radius: 8px;
}
```

For a larger theme, keep components inside its own folder:

```txt
src/component/minimal/Header.jsx
src/component/minimal/ProjectGrid.jsx
src/component/minimal/ContactPanel.jsx
```

## 6. Verify

Run:

```bash
npm run build
```

Then switch using the navbar `Change Theme` dropdown.

## Checklist

- Add mode in `src/config/portfolioDesigns.js`
- Create the new theme component
- Use `usePortfolio()` for dynamic API data
- Add render branch in `PublicHomeWrapper.jsx`
- Add scoped CSS
- Run `npm run build`
