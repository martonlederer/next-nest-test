import Head from 'next/head';
import styles from '../../styles/mod.module.sass';
import { Remarkable } from 'remarkable';

const HeaderIdsPlugin = require('remarkable-header-ids');
const md = new Remarkable({
  html: true,
  typographer: true,
}).use(HeaderIdsPlugin({ anchorText: '<span class="head_anchor">#</span>' }));

export default function Module({ module, readme }) {
  if (!module.not_found) {
    return (
      <div className="container">
        <Head>
          <title>{module.name}</title>
          <meta name="description" content={module.description} />

          <meta property="og:title" content={module.name + ' - Nest'} />
          <meta property="og:description" content={module.description} />
          <meta property="og:image" content={`https://og.nest.land/${module.name}.png&fontSize=175px`} />

          <meta name="twitter:title" content={module.name + ' - Nest'} />
          <meta name="twitter:description" content={module.description} />
          <meta name="twitter:image" content={`https://og.nest.land/${module.name}.png&fontSize=175px`} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <main>
          <div className="landing">
            <h1 className="title">x/<a href={`https://nest.land/package/${module.name}`}>{module.name}</a></h1>
            <p className="description">{module.description}</p>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div dangerouslySetInnerHTML={{ __html: md.render(readme) }}></div>
            </div>
          </div>
        </main>

        <footer>
          <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
            Powered by <img src="/vercel.svg" alt="Vercel Logo" className="vercel-logo" />
          </a>
        </footer>
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

        <footer>
          <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
            Powered by <img src="/vercel.svg" alt="Vercel Logo" className="vercel-logo" />
          </a>
        </footer>
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
    revalidate: 20,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}
