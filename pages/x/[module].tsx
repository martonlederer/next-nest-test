import Head from 'next/head';
import styles from '../../styles/mod.module.sass';
import 'highlight.js/styles/github.css';
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Link from 'next/link';
import hljs from 'highlight.js';
import { bashFixer, resourceFixer } from '../../utils/markdown';
import semver from 'semver';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  .use(bashFixer)
  .use(resourceFixer);

export default function Module({ module, readme, error }) {
  const router = useRouter();

  useEffect(() => {
    if (error && error.msg === 'Invalid versioning') router.push(`/x/${error.redirect}`);
  });

  if (!error) {
    return (
      <div className="container">
        <Head>
          <title>{module.package.name}</title>
          <meta name="description" content={module.package.description} />
          <meta name="theme-color" content="#22c1c3" />

          <meta property="og:title" content={module.package.name + ' - Nest'} />
          <meta property="og:description" content={module.package.description} />
          <meta
            property="og:image"
            content={`https://og.nest.land/${module.package.name}.png&fontSize=175px`}
          />

          <meta name="twitter:title" content={module.package.name + ' - Nest'} />
          <meta name="twitter:description" content={module.package.description} />
          <meta
            name="twitter:image"
            content={`https://og.nest.land/${module.package.name}.png&fontSize=175px`}
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <main>
          <Nav />
          <div className="landing">
            <h1 className="title">
              <Link href="/x">
                <a className={styles.landingLink}>x</a>
              </Link>
              /{module.package.name}
            </h1>
            <p className={'description ' + styles.description}>{module.package.description}</p>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div
                className="markdown"
                dangerouslySetInnerHTML={{ __html: md.render(readme).replace(/<MOD_NAME>/g, module.name) }}
              ></div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  } else if (error.redirect) {
    return <></>;
  } else {
    return (
      <div className="container">
        <Head>
          <title>Not Found</title>
        </Head>

        <main>
          <div className="landing">
            <h1 className="title">{error.msg}</h1>
            <p className="description">{error.description}</p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export async function getStaticProps({ params }) {
  // check if module includes version
  if (!params.module.includes('@')) {
    const latestVersion = await getLatestVersion(params.module);
    if (typeof latestVersion !== 'string') return { props: { error: latestVersion } };
    return { props: { error: { msg: 'Invalid versioning', redirect: `${params.module}@${latestVersion}` } } };
  }

  const [module, version] = params.module.split('@');

  // check if version is valid semver
  if (!semver.valid(version)) {
    const latestVersion = await getLatestVersion(module);
    if (typeof latestVersion !== 'string') return { props: { error: latestVersion } };
    return { props: { error: { msg: 'Invalid versioning', redirect: `${module}@${latestVersion}` } } };
  }

  const latestModule = await axios
    .get(`https://x.nest.land/api/package/${module}/${version}`)
    .then(({ data }) => data)
    .catch(() => null);
  const moduleReadme = await axios
    .get(`${latestModule.prefix}/README.md`)
    .then(({ data }) => data)
    .catch(() => null);

  if (!latestModule) return { props: { msg: 'Could not load', description: 'Error loading module info.' } };

  return {
    props: { module: latestModule, readme: moduleReadme ?? '# Could not load README.md' },
    revalidate: 20
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

async function getLatestVersion(module: string): Promise<string | { msg: string; description: string }> {
  return await axios
    .get(`https://x.nest.land/api/package/${module}`)
    .then(({ data }) => {
      const stable = data.latestStableVersion,
        latest = data.latestVersion;

      if (stable) return stable.split('@')[stable.split('@').length - 1];
      else if (latest) return latest.split('@')[latest.split('@').length - 1];
      else return { msg: 'No version published', description: "There are't any versions published." };
    })
    .catch(({ response }) => {
      if (response.status === 404)
        return { msg: 'Module Not Found', description: "The Module you're looking for doesn't exist." };
      else return { msg: 'Server error', description: 'There was an error with the server.' };
    });
}
