import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.sass';
import cardStyles from '../styles/cards.module.sass';

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
            <a className={cardStyles.card}>
              <h3>Modules</h3>
              <br/>
              <p>Find awesome modules on Nest</p>
            </a>
          </Link>

          <Link href="/user">
            <a className={cardStyles.card}>
              <h3>Profile</h3>
              <br/>
              <p>View your user profile</p>
            </a>
          </Link>

          <a href="https://nextjs.org/" className={cardStyles.card}>
            <h3>Next.js</h3>
            <br/>
            <p>The React Framework</p>
          </a>

          <a href="https://github.com/maximousblk/next-nest-test" className={cardStyles.card}>
            <h3>Source code</h3>
            <br/>
            <p>Source code on GitHub.</p>
          </a>
        </div>

        <div className="section">
          <h1>What is Nest.land?</h1>
          <p className="description">
            Nest.land combines <a href="https://deno.land" target="_blank" rel="noopener noreferrer">Deno</a> with the <a href="https://arweave.org" target="_blank" rel="noopener noreferrer">Arweave</a>. With us, you can publish your Deno modules to the permaweb, where they can never be deleted. This avoids a major pitfall for web-based module imports while allowing developers to leverage Deno's import design!
          </p>
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
