import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FEATURES = [
  {
    title: 'Interactive Table',
    desc: 'All 118 elements with category colors, live search and detailed data on click.',
    img: '/assets/images/preview-table-900-DFW-Nf5A.webp',
    w: 900,
    h: 603,
  },
  {
    title: 'Atom Models',
    desc: 'Open any element to see its electron shells animate around the nucleus.',
    img: '/assets/images/preview-modal.png',
    w: 1200,
    h: 609,
  },
  {
    title: 'Chemistry Tools',
    desc: 'Molar mass, ionic states and phase facts at a glance for quick study help.',
    img: '/assets/images/preview-tools-900-BB3xW-C1.webp',
    w: 900,
    h: 603,
  },
  {
    title: 'Worksheet Practice',
    desc: 'Practice chemistry skills with guided worksheets across every periodic group.',
    img: '/assets/images/preview-worksheet-900-D4DiQHS-.webp',
    w: 900,
    h: 603,
  },
];

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section className="zp-hero" id="about" ref={ref}>
      <div className="zp-hero-blob-1" />
      <div className="zp-hero-blob-2" />
      <div className="zp-hero-inner">
        <motion.span
          className="zp-kicker"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="dot">Z</span>
          Modern chemistry learning
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
        >
          The periodic table, <em>alive</em> — every element in your pocket, on screen.
        </motion.h1>
        <p>
          Zperiod is a complete interactive periodic table with all 118 elements, colored by
          chemistry family. Hover to preview, click to open a full view with atom models, common
          ions and key facts.
        </p>

        <div className="zp-hero-cta">
          <a className="zp-btn-primary" href="#table">
            Open The Table ↓
          </a>
          <a className="zp-btn-secondary" href="#about">
            How It Works
          </a>
        </div>

        <h2 className="zp-visually-hidden">Features</h2>
        <motion.div className="zp-hero-features" style={{ y }}>
          {FEATURES.map((f) => (
            <a className="zp-feature" href="#table" key={f.title}>
              <span className="zp-feature-media">
                <img src={f.img} alt="" loading="lazy" width={f.w} height={f.h} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
