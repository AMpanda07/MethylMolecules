'use client';

import Link from 'next/link';
import { LEARN_TOPICS } from '@/data/learn-topics';
import styles from './Learn.module.css';

export default function LearnPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Learn Chemistry</h1>
          <p className={styles.subtitle}>
            From the basic building blocks of matter to complex chemical reactions. 
            A structured path to understanding how the world works at a molecular level.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.topicsGrid}>
          {LEARN_TOPICS.map((topic, i) => (
            <Link href={`/learn/${topic.slug}`} key={topic.slug} className={styles.topicCard}>
              <div className={styles.topicNumber} aria-hidden="true">
                {String(topic.number).padStart(2, '0')}
              </div>
              <div className={styles.topicContent}>
                <h2 className={styles.topicTitle}>{topic.title}</h2>
                <p className={styles.topicDesc}>{topic.shortDescription}</p>
                <div className={styles.topicMeta}>
                  <span>{topic.sections.length} sections</span>
                  <span className={styles.topicArrow} aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
