import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/x.module.sass';
import cardStyles from '../../styles/components/cards.module.sass';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function list() {
  const [modules, setModules] = useState([]);
  const [count, setCount] = useState(0);

  let loading = false;

  useEffect(() => {
    loadModules(20);
    axios.get('/api/modules/all').then(({ data }) => setCount(data.total));
    window.addEventListener('scroll', handleScroll, true);

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function handleScroll() {
    if (count === 0 || count <= modules.length) return;
    if (window.scrollY + window.innerHeight > document.body.clientHeight - 400) {
      loadModules(modules.length + 40);
    }
  }

  // TODO: in api v2 change the limit to the additional number of packages to load
  function loadModules(limit: number) {
    if (!loading && modules.length < limit) {
      loading = true;
      axios.get(`https://x.nest.land/api/packages/${limit}`).then(({ data }) => {
        setModules(data);
        setTimeout(() => (loading = false), 700); // wait a bit so everything renders / appears
      });
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Modules - Nest</title>
        <meta property="og:title" content="Modules - Nest" />
        <meta name="description" content="Find awesome Deno modules on Nest" />
        <meta name="theme-color" content="#22c1c3" />

        <meta property="og:description" content="Find awesome Deno modules on Nest" />
        <meta property="og:image" content="https://og.nest.land/.png" />

        <meta name="twitter:title" content="Modules - Nest" />
        <meta name="twitter:description" content="Find awesome Deno modules on Nest" />
        <meta name="twitter:image" content="https://og.nest.land/.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main>
        <Nav />
        <div className="landing">
          <h1 className="title">Modules</h1>
          <p className="description">
            Currently listing <code>{count}</code> modules
          </p>
        </div>

        <div className={styles.grid}>
          {modules.map((module, i) => (
            <Link href={`x/${module.name}`} key={i}>
              <a className={cardStyles.card + ' ' + styles.card}>
                <h3>{module.name}</h3>
                <br />
                <p>{module.description}</p>
                <br />
                <sub>by @{module.owner}</sub>
              </a>
            </Link>
          ))}
        </div>
        <p>You've reached the nether region!</p>
      </main>

      <Footer />
    </div>
  );
}
