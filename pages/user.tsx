import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.sass';
import { useSession } from 'next-auth/client';
import Nav from '../components/Nav';

export default function User() {
  const [session, loading] = useSession();
  return (
    <div className="container">
      <Head>
        <title>User - Nest</title>
        <meta name="description" content="User Profile" />

        <meta property="og:title" content="User - Nest" />
        <meta property="og:description" content="User Profile" />
        <meta property="og:image" content="https://og.nest.land/.png" />

        <meta name="twitter:title" content="User - Nest" />
        <meta name="twitter:description" content="User Profile" />
        <meta name="twitter:image" content="https://og.nest.land/.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main>
        <Nav />
        <div className="landing">
          {loading && <h1 className="title">loading...</h1>}
          {!loading && !session && (
            <h1 className="title">
              Please{' '}
              <Link href="/api/auth/signin">
                <a>Sign in</a>
              </Link>
            </h1>
          )}
          {!loading && session && (
            <h1 className="title">
              Signed in as{' '}
              <Link href="/api/auth/signout">
                <a>{session.user.name}</a>
              </Link>
            </h1>
          )}
          {!loading && session && (
            <p className={styles.description}>
              User email: <code className={styles.code}>{session.user.email}</code>
            </p>
          )}
        </div>

        <div className={styles.grid}>
          <Link href="/api/auth/signin">
            <a className={styles.card}>
              <h3>LogIn</h3>
              <p>Login using one of the providers.</p>
            </a>
          </Link>

          <Link href="/api/auth/signout">
            <a className={styles.card}>
              <h3>LogOut</h3>
              <p>Log out of the current session</p>
            </a>
          </Link>

          <a href="/api/auth/session" className={styles.card}>
            <h3>Session</h3>
            <p>The contents of the session object.</p>
          </a>

          <a href="/api/auth/csrf" className={styles.card}>
            <h3>CSRF token</h3>
            <p>NextAuth CSRF Token.</p>
          </a>
        </div>
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
