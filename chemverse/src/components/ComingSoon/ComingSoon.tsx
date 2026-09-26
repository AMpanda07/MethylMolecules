import type { Metadata } from 'next';
import Footer from '@/components/Footer/Footer';
import styles from './coming-soon.module.css';

interface ComingSoonProps {
  title: string;
  description: string;
  emoji: string;
}

export function ComingSoonPage({ title, description, emoji }: ComingSoonProps) {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.inner}>
          <span className={styles.emoji} aria-hidden="true">{emoji}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.badge}>Coming Soon</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
