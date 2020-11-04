import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.sass';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nest</title>
        <meta name="description" content="Immutable Module registry for Deno" />

        <meta property="og:title" content="Nest" />
        <meta property="og:description" content="Immutable Module registry for Deno" />
        <meta property="og:image" content="https://og.nest.land/.png" />

        <meta name="twitter:title" content="Nest" />
        <meta name="twitter:description" content="Immutable Module registry for Deno" />
        <meta name="twitter:image" content="https://og.nest.land/.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Nest</span>
        </h1>

        <p className={styles.description}>
          An <em>immutable</em> module registry for Deno, on the blockweave
        </p>

        <div className={styles.grid}>
          <Link href="/x">
            <a className={styles.card}>
              <h3>Modules</h3>
              <br/>
              <p>Find awesome modules on Nest</p>
            </a>
          </Link>

          <Link href="/user">
            <a className={styles.card}>
              <h3>Profile</h3>
              <br/>
              <p>View your user profile</p>
            </a>
          </Link>

          <a href="https://nextjs.org/" className={styles.card}>
            <h3>Next.js</h3>
            <br/>
            <p>The React Framework</p>
          </a>

          <a href="https://github.com/maximousblk/next-nest-test" className={styles.card}>
            <h3>Source code</h3>
            <br/>
            <p>Source code on GitHub.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
