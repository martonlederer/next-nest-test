import styles from '../styles/components/footer.module.sass';
import Link from 'next/link';
import iconLight from '../assets/icon-light.svg';
import vercelLogo from '../assets/vercel.svg';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.menus}>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><Link href="/modules">Modules</Link></li>
            <li><Link href="/std">Standard Library</Link></li>
            <li><Link href="/tokens">Tokens</Link></li>
            <li><a href="https://docs.nest.land">Documentation</a></li>
          </ul>
        </div>
        <div>
          <h4>Tools</h4>
          <ul>
            <li><Link href="/TODO">Eggs</Link></li>
            <li><a href="https://deno.land" target="_blank" rel="noopener noreferrer">Deno</a></li>
            <li><a href="https://github.com/nestdotland/api" target="_blank" rel="noopener noreferrer">API</a></li>
            <li><a href="https://verto.exchange" target="_blank" rel="noopener noreferrer">Verto</a></li>
          </ul>
        </div>
        <div>
          <h4>About us</h4>
          <ul>
            <li><a href="https://github.com/nestdotland" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://twitter.com/nestdotland" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://discord.gg/hYUsX3H" target="_blank" rel="noopener noreferrer">Discord</a></li>
            <li><a href="https://viewblock.io/arweave/address/tySYSW93nDky1sbCO56PmyEyspbyYx7x9ZXMNueKOOg" target="_blank" rel="noopener noreferrer">ViewBlock</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="https://github.com/nestdotland/nest.land/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">License</a></li>
            <li><Link href="/TODO">Privacy Policy</Link></li>
            <li><Link href="/TODO">Terms of Usage</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.branding}>
        <div>
          <img src={iconLight} alt="logo"/>
          Nest
        </div>
        <a href="https://vercel.com?utm_source=nest-land" target="_blank" rel="noopener noreferrer">
          Powered by
          <img src={vercelLogo} alt="vercel"/>
        </a>
      </div>
      <p className={styles.copyright}>Copyright © 2020 Nest team. Licensed under the <a href="http://opensource.org/licenses/mit-license.php" target="_blank" rel="noopener noreferrer">MIT License</a>.</p>
    </footer>
  );
}