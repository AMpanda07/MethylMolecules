import { ELEMENTS, ELEMENT_BY_SYMBOL } from '@/data/elements';
import { notFound } from 'next/navigation';
import ElementDetailClient from './ElementDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ symbol: string }>;
}

export async function generateStaticParams() {
  return ELEMENTS.map(el => ({ symbol: el.symbol }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const el = ELEMENT_BY_SYMBOL[symbol];
  if (!el) return { title: 'Element Not Found' };
  return {
    title: `${el.name} (${el.symbol}) — Element ${el.atomicNumber}`,
    description: el.description,
  };
}

export default async function ElementPage({ params }: Props) {
  const { symbol } = await params;
  const el = ELEMENT_BY_SYMBOL[symbol];
  if (!el) notFound();

  // Find prev/next elements for navigation
  const sorted = ELEMENTS.slice().sort((a, b) => a.atomicNumber - b.atomicNumber);
  const idx = sorted.findIndex(e => e.symbol === symbol);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  return <ElementDetailClient el={el} prev={prev} next={next} />;
}
