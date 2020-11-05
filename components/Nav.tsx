import { useEffect, useState } from 'react';
import styles from '../styles/nav.module.sass'

export default function Nav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    if(window.scrollY > 55) {
      setShown(true);
    }else {
      setShown(false);
    }
  }

  return (
    <div className={styles.nav + (shown ? ' scrolled' : '')}>
      Navbar TODO: Marton
    </div>
  )
}