import { useEffect, useState } from 'react';
import styles from '../styles/components/nav.module.sass';
import { CSSTransition } from 'react-transition-group';
import logoLight from '../assets/icon-light.svg';
import Link from 'next/link';
import buttonStyles from '../styles/components/buttons.module.sass';

export default function Nav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    if(window.scrollY > 65) {
      setShown(true);
    }else {
      setShown(false);
    }
  }

  return (
    <CSSTransition
      in={shown}
      timeout={300}
      classNames="fade-transition"
      >
      <div className={styles.nav + (shown ? ' scrolled' : '')}>
        <Link href="/">
          <a className={styles.logo}>
            <img src={logoLight} alt="logo"/>
          </a>
        </Link>
        <div className={styles.links}>
          <Link href="/x">Modules</Link>
          <Link href="/std">Standard Library</Link>
          <Link href="/tokens">Tokens</Link>
          <a href="https://docs.nest.land" target="_blank" rel="noopener noreferer">Documentation</a>
          <Link href="/register">
            <a className={buttonStyles.button}>
              Get started
            </a>
          </Link>
        </div>
      </div>
    </CSSTransition>
  )
}