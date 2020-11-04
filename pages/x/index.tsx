import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/x.module.sass';

export default function list({ modules, count }) {
  return (
    <div className="container">
      <Head>
        <title>Modules - Nest</title>
        <meta property="og:title" content="Modules - Nest" />
        <meta name="description" content="Find awesome Deno modules on Nest" />

        <meta property="og:description" content="Find awesome Deno modules on Nest" />
        <meta property="og:image" content="https://og.nest.land/.png" />

        <meta name="twitter:title" content="Modules - Nest" />
        <meta name="twitter:description" content="Find awesome Deno modules on Nest" />
        <meta name="twitter:image" content="https://og.nest.land/.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main>
        <div className="landing">
          <h1 className="title">Modules</h1>
          <p className="description">
            Currently listing <code>{count}</code> modules
          </p>
        </div>

        <div className={styles.grid}>
          {modules.map((module, i) => (
            <Link href={`x/${module.name}`}>
              <a className={styles.card} key={i}>
                <h3>{module.name}</h3>
                <p>{module.description}</p>
                <sub>by @{module.owner}</sub>
              </a>
            </Link>
          ))}
        </div>
        <p>You've reached the nether region!</p>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className="vercel-logo" />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const modules = await fetch(`https://x.nest.land/api/packages`).then((res) => res.json());
  return { props: { modules, count: modules.length }, revalidate: 20 };
}
