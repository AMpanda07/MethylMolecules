import { LEARN_TOPICS, TOPIC_BY_SLUG } from '@/data/learn-topics';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './LearnTopic.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LEARN_TOPICS.map(topic => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = TOPIC_BY_SLUG[slug];
  if (!topic) return { title: 'Topic Not Found' };
  return {
    title: `${topic.number}. ${topic.title} — Learn Chemistry`,
    description: topic.shortDescription,
  };
}

export default async function LearnTopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = TOPIC_BY_SLUG[slug];
  if (!topic) notFound();

  // Find prev/next topics
  const idx = LEARN_TOPICS.findIndex(t => t.slug === slug);
  const prev = idx > 0 ? LEARN_TOPICS[idx - 1] : null;
  const next = idx < LEARN_TOPICS.length - 1 ? LEARN_TOPICS[idx + 1] : null;

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/learn" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Topics
        </Link>
      </div>

      <div className={styles.layout}>
        {/* Left Sidebar: TOC / Key Points */}
        <aside className={styles.sidebar}>
          <div className={styles.stickySidebar}>
            <div className={styles.keyPointsCard}>
              <h3 className={styles.keyPointsTitle}>Key Points</h3>
              <ul className={styles.keyPointsList}>
                {topic.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.content}>
          <header className={styles.header}>
            <span className={styles.topicNumber}>Topic {topic.number}</span>
            <h1 className={styles.title}>{topic.title}</h1>
            <p className={styles.intro}>{topic.introduction}</p>
          </header>

          <div className={styles.sections}>
            {topic.sections.map((section, i) => (
              <section key={i} className={styles.section}>
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
                <div className={styles.sectionContent}>
                  <p className={styles.sectionText}>{section.content}</p>
                  
                  {section.diagramType && (
                    <div className={styles.diagramPlaceholder}>
                      <span className={styles.diagramIcon} aria-hidden="true">🔬</span>
                      <span className={styles.diagramLabel}>Interactive Diagram: {section.diagramType}</span>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Navigation Footer */}
          <footer className={styles.footerNav}>
            {prev ? (
              <Link href={`/learn/${prev.slug}`} className={styles.navBtn}>
                <span className={styles.navBtnLabel}>Previous Topic</span>
                <span className={styles.navBtnTitle}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {prev.title}
                </span>
              </Link>
            ) : <div />}
            
            {next ? (
              <Link href={`/learn/${next.slug}`} className={`${styles.navBtn} ${styles.navBtnRight}`}>
                <span className={styles.navBtnLabel}>Next Topic</span>
                <span className={styles.navBtnTitle}>
                  {next.title}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            ) : (
              <Link href="/practice" className={`${styles.navBtn} ${styles.navBtnRight}`}>
                <span className={styles.navBtnLabel}>Up Next</span>
                <span className={styles.navBtnTitle}>
                  Practice Quiz
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            )}
          </footer>
        </main>
      </div>
    </div>
  );
}
