'use client';

import Link from 'next/link';
import { ELEMENTS, CATEGORY_COLORS, CATEGORY_LABELS, type Element } from '@/data/elements';
import styles from './Discover.module.css';

interface Collection {
  id: string;
  title: string;
  description: string;
  elements: Element[];
}

export default function DiscoverPage() {
  const getElements = (symbols: string[]) => symbols.map(s => ELEMENTS.find(e => e.symbol === s)!).filter(Boolean);

  const collections: Collection[] = [
    {
      id: 'essential',
      title: 'Essential for Life',
      description: 'The six most abundant elements in living organisms (CHNOPS).',
      elements: getElements(['C', 'H', 'N', 'O', 'P', 'S'])
    },
    {
      id: 'noble',
      title: 'The Noble Metals',
      description: 'Metals that are highly resistant to corrosion and oxidation.',
      elements: getElements(['Ru', 'Rh', 'Pd', 'Ag', 'Os', 'Ir', 'Pt', 'Au'])
    },
    {
      id: 'coinage',
      title: 'Coinage Metals',
      description: 'Historically used to make coins due to their low reactivity.',
      elements: getElements(['Cu', 'Ag', 'Au'])
    },
    {
      id: 'halogens',
      title: 'The Halogens',
      description: 'Highly reactive non-metals that form salts with metals.',
      elements: getElements(['F', 'Cl', 'Br', 'I', 'At'])
    },
    {
      id: 'gases',
      title: 'Noble Gases',
      description: 'Colourless, odourless, and extremely unreactive gases.',
      elements: getElements(['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'])
    },
    {
      id: 'magnetic',
      title: 'Ferromagnetic Elements',
      description: 'Elements that can be magnetized at room temperature.',
      elements: getElements(['Fe', 'Co', 'Ni'])
    }
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Discover Elements</h1>
          <p className={styles.subtitle}>
            Explore curated collections of elements based on their shared properties, history, and roles in our universe.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        {collections.map(collection => (
          <section key={collection.id} className={styles.collection}>
            <div className={styles.collectionInfo}>
              <h2 className={styles.collectionTitle}>{collection.title}</h2>
              <p className={styles.collectionDesc}>{collection.description}</p>
            </div>
            
            <div className={styles.elementGrid}>
              {collection.elements.map(el => {
                const c = CATEGORY_COLORS[el.category];
                return (
                  <Link 
                    href={`/elements/${el.symbol}`} 
                    key={el.symbol}
                    className={styles.elementCard}
                    style={{
                      '--bg': c.bg,
                      '--border': c.border,
                      '--text': c.text,
                    } as React.CSSProperties}
                  >
                    <div className={styles.elTop}>
                      <span className={styles.elNum}>{el.atomicNumber}</span>
                      <span className={styles.elMass}>{el.atomicMass.toFixed(1)}</span>
                    </div>
                    <span className={styles.elSymbol}>{el.symbol}</span>
                    <span className={styles.elName}>{el.name}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
