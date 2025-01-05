export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

import ReactDOMServer from 'react-dom/server'
import { PageShell } from './PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'

async function render(pageContext) {
  const { Page, pageProps } = pageContext
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )

  const documentHtml = escapeInject`<!DOCTYPE html>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="keywords" content="portfolio, Rajan Gupta, projects, skills, web development, design , stranger2125" />
    <meta name="author" content="Rajan Gupta" />
    <meta name="description" content="Explore Rajan Gupta's portfolio showcasing web development projects, design expertise, and achievements in modern tech stacks. Discover more!" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content="Rajan Gupta | Portfolio | Web Development" />
    <meta property="og:description" content="Showcasing Rajan Gupta's projects, web development expertise, and skills in modern technologies." />
    <meta property="og:image" content="icons8-portfolio-48.png" />
    <meta property="og:url" content="https://stranger2125.me/" />
    <meta property="og:type" content="website" />
    <meta property="og:stranger2125.me" content="Rajan Gupta Portfolio" />

    <meta name="twitter:card" content="icons8-portfolio-48.png" />
    <meta name="twitter:title" content="Rajan Gupta Portfolio" />
    <meta name="twitter:description" content="Explore web development projects and skills of Rajan Gupta." />
    <meta name="twitter:image" content="icons8-portfolio-48.jpg" />
    <meta property="og:image:alt" content="Rajan Gupta Portfolio Logo">
    <meta name="twitter:image:alt" content="Rajan Gupta Portfolio Logo">
    <title>Rajan Gupta | Portfolio | Web Development Projects</title>
    <link rel="icon" type="image/svg+xml" href="icons8-portfolio-48.png" style="background-color: #fff;" />
    <link rel="canonical" href="https://stranger2125.me/"/>
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Rajan Gupta",
        "url": "https://stranger2125.me/",
        "sameAs": [
          "https://github.com/Rajan21252125",
          "https://linkedin.com/in/rajan-gupta-141991215/"
        ],
        "jobTitle": "Web Developer",
        "description": "Showcasing web development projects, design expertise, and achievements in modern tech stacks.",
        "image": "https://stranger2125.me/icons8-portfolio-48.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "India"
        }
      }
      </script>
  </head>
  <body>
    <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
  </body>
</html>
`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}
