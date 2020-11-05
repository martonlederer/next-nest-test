import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/home.module.sass';
import cardStyles from '../styles/components/cards.module.sass';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="container">
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

      <main>
        <Nav />
        <div className="landing">
          <h1 className="title">
            Welcome to <span>Nest</span>
          </h1>
          <p className="description">
            An <em>immutable</em> module registry for Deno, on the blockweave
          </p>
        </div>

        <div className={styles.grid}>
          <Link href="/x">
            <a className={cardStyles.card}>
              <h3>Modules</h3>
              <br/>
              <p>Find awesome modules on Nest</p>
            </a>
          </Link>

          <Link href="/std">
            <a className={cardStyles.card}>
              <h3>Std</h3>
              <br/>
              <p>Deno STD on nest</p>
            </a>
          </Link>

          <Link href="/tokens">
            <a className={cardStyles.card}>
              <h3>Tokens</h3>
              <br/>
              <p>Get paid for your modules</p>
            </a>
          </Link>

          <a href="https://docs.nest.land" className={cardStyles.card}>
            <h3>Docs</h3>
            <br/>
            <p>Nest.land documentation</p>
          </a>
        </div>

        <div className="section">
          <h1>What is Nest.land?</h1>
          <p className="description">
            Nest.land combines <a href="https://deno.land" target="_blank" rel="noopener noreferrer">Deno</a> with the <a href="https://arweave.org" target="_blank" rel="noopener noreferrer">Arweave</a>. With us, you can publish your Deno modules to the permaweb, where they can never be deleted. This avoids a major pitfall for web-based module imports while allowing developers to leverage Deno's import design!
          </p>
        </div>

        <div className="section">
          <h1>Frequently Asked Questions</h1>
          <div className={styles.faq}>
            <div>
              <h3>Is my password uploaded to the blockchain too?</h3>
              <p>No, your password is stored in our secure database. In fact, no personal user information is <span>ever</span> uploaded to the blockchain!</p>
            </div>
            <div>
              <h3>How does Nest.land deal with malicious or broken modules?</h3>
              <p>If a module is reported to us as malicious or broken, we flag it on our registry. All users will then be warned when importing or updating this module.</p>
              <p className={styles.prevents}><a href="https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident" target="_blank" rel="noopener noreferrer">Prevents NPM issue: event-stream</a></p>
            </div>
            <div>
              <h3>What if an author takes down a module?</h3>
              <p>Taking down a module is impossible thanks to the Arweave Blockchain! A module uploaded through our CLI is permanently immutable.</p>
              <p className={styles.prevents}><a href="https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm" target="_blank" rel="noopener noreferrer">Prevents NPM issue: left-pad</a></p>
            </div>
            <div>
              <h3>Does nest.land have Deno's Standard Modules built in?</h3>
              <p>Yes, we do! If you wish to ensure security and immutability of your standard modules, check out nest.land's std <Link href="/std">mirror</Link>.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
