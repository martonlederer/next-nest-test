import Head from 'next/head';
import styles from '../../styles/mod.module.sass';
import 'highlight.js/styles/github.css';
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Link from 'next/link';
import hljs from 'highlight.js';
import { bashFixer } from '../../utils/markdown';

const HeaderIdsPlugin = require('remarkable-header-ids');
// setup markdown rendering
const md = new Remarkable({
  html: true,
  typographer: true,
  highlight: function (str: string, lang: string) {
    if (lang === 'sh' || lang === 'bash' || lang === 'shell') return ''; // highlighting breaks selecting terminal commands and comments display
    if (lang && hljs.getLanguage(lang))
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return '';
  }
})
  .use(HeaderIdsPlugin({ anchorText: '<span class="head_anchor">#</span>' }))
  .use(linkify)
  .use(bashFixer);

export default function Module({ module, readme }) {
  if (!module.not_found) {
    return (
      <div className="container">
        <Head>
          <title>{module.name}</title>
          <meta name="description" content={module.description} />
          <meta name="theme-color" content="#22c1c3" />

          <meta property="og:title" content={module.name + ' - Nest'} />
          <meta property="og:description" content={module.description} />
          <meta property="og:image" content={`https://og.nest.land/${module.name}.png&fontSize=175px`} />

          <meta name="twitter:title" content={module.name + ' - Nest'} />
          <meta name="twitter:description" content={module.description} />
          <meta name="twitter:image" content={`https://og.nest.land/${module.name}.png&fontSize=175px`} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <main>
          <Nav />
          <div className="landing">
            <h1 className="title">
              <Link href="/x">
                <a className={styles.landingLink}>x</a>
              </Link>
              /{module.name}
            </h1>
            <p className={'description ' + styles.description}>{module.description}</p>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className="markdown" dangerouslySetInnerHTML={{ __html: md.render(readme) }}></div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  } else {
    return (
      <div className="container">
        <Head>
          <title>Not Found</title>
        </Head>

        <main>
          <div className="landing">
            <h1 className="title">Module Not Found</h1>
            <p className="description">The Module you're looking for doesn't exist.</p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export async function getStaticProps({ params }) {
  const module = await fetch(`https://x.nest.land/api/package/${params.module}`)
    .then((res) => res.json())
    .catch((err) => {
      return { latestVersion: '', not_found: true };
    });
  const latest_mod = await fetch(`https://x.nest.land/api/package/${module.latestVersion.replace('@', '/')}`)
    .then((res) => res.json())
    .catch((err) => '');
  const readme = await fetch(`${latest_mod.prefix}/README.md`)
    .then((res) => res.text())
    .catch((err) => '');
  return {
    props: { module, readme, not_found: false },
    revalidate: 20
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}
