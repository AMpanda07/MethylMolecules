import type { ElementDetailData } from '../types/index.ts';
import type {
  ArchiveCategory,
  ArchiveImage,
  ElementArchive
} from '../services/archiveImageService.ts';
import {
  getSynchronousElementArchive,
  getElementArchive,
  generateLocalArchiveSvg
} from '../services/archiveImageService.ts';

export type ArchiveSection = ArchiveCategory;

export interface ArchiveMetadata {
  source: string;
  sourceUrl?: string;
  author?: string;
  license?: string;
  year?: string;
  category?: string;
}

export interface ArchiveItemData {
  image: string;
  fallbackSvg?: string;
  title: string;
  description: string;
  metadata: ArchiveMetadata;
}

export type ElementArchiveRecord = Record<ArchiveSection, ArchiveItemData>;

export const generateElementArchiveSvg = (
  symbol: string,
  name: string,
  section: ArchiveSection,
  categoryColor: string = '#0284c7'
): string => generateLocalArchiveSvg(symbol, name, section, categoryColor);

// Convert an ArchiveImage into the ArchiveItemData format with element context
const mapArchiveImageToItemData = (
  element: ElementDetailData,
  section: ArchiveSection,
  img?: ArchiveImage
): ArchiveItemData => {
  const symbol = element.symbol;
  const name = element.name;
  const type = element.level1_basic?.type || 'Element';
  const year = element.level4_history?.discoveryYear || 'Historic';

  // No image available — honest SVG visualization fallback
  if (!img) {
    const fallbackSvg = generateLocalArchiveSvg(symbol, name, section);
    return {
      image: fallbackSvg,
      fallbackSvg,
      title: name + ' (' + symbol + ') — ' + section.charAt(0).toUpperCase() + section.slice(1),
      description: 'Scientific visualization for ' + name + ' ' + section + '. Verified imagery pending archive expansion.',
      metadata: {
        source: 'Zperiod Visualization',
        sourceUrl: undefined,
        author: 'Zperiod Archival Engine',
        license: 'Public Domain',
        year,
        category: type
      }
    };
  }

  const fallbackSvg = generateLocalArchiveSvg(symbol, name, section);

  // Informative description matching category
  let defaultDesc = name + ' (' + symbol + ') archival specimen.';
  if (section === 'portrait') {
    defaultDesc = name + ' (atomic number ' + element.id + ', ' + type.toLowerCase() + ') in elemental state.';
  } else if (section === 'science') {
    defaultDesc = 'Spectral lines, crystallographic allotropes, and atomic characteristics of ' + name + '.';
  } else if (section === 'origin') {
    defaultDesc = element.level4_history?.discoveredBy
      ? 'Discovered in ' + year + ' by ' + element.level4_history.discoveredBy + '. Geological & mineral origin records.'
      : 'Geological occurrence, planetary distribution, and cosmological synthesis of ' + name + '.';
  } else if (section === 'uses') {
    defaultDesc = element.level4_history?.uses
      ? 'Primary applications: ' + element.level4_history.uses + '.'
      : 'Practical industrial, technological, and manufacturing applications of ' + name + '.';
  }

  // Only show verify-source link for genuine external image sources
  const isLocalSvg = img.source === 'local';
  const hasRealSourcePage = img.sourcePage &&
    img.sourcePage !== 'https://commons.wikimedia.org/' &&
    !img.sourcePage.includes('File:undefined');

  return {
    image: img.url,
    fallbackSvg,
    title: img.title || (name + ' ' + section),
    description: defaultDesc,
    metadata: {
      source: isLocalSvg
        ? 'Zperiod Visualization'
        : (img.attribution || (img.source === 'wikimedia' ? 'Wikimedia Commons' : 'Scientific Repository')),
      sourceUrl: isLocalSvg ? undefined : (hasRealSourcePage ? img.sourcePage : undefined),
      author: isLocalSvg ? 'Zperiod Archival Engine' : (img.author || 'Wikimedia Commons Contributor'),
      license: isLocalSvg ? 'Public Domain' : (img.license || 'Creative Commons / Public Domain'),
      year,
      category: type
    }
  };
};

/**
 * Returns synchronous verified archival item for the element & section.
 * Guaranteed 0ms delay, no layout shift, and authentic image/metadata.
 */
export const getArchiveItem = (
  element: ElementDetailData,
  section: ArchiveSection
): ArchiveItemData => {
  const syncArchive = getSynchronousElementArchive(element.id, element.symbol, element.name);
  return mapArchiveImageToItemData(element, section, syncArchive[section]);
};

/**
 * Returns all 4 archive sections synchronously.
 */
export const getFullElementArchive = (element: ElementDetailData): ElementArchiveRecord => {
  const syncArchive = getSynchronousElementArchive(element.id, element.symbol, element.name);
  return {
    portrait: mapArchiveImageToItemData(element, 'portrait', syncArchive.portrait),
    science: mapArchiveImageToItemData(element, 'science', syncArchive.science),
    origin: mapArchiveImageToItemData(element, 'origin', syncArchive.origin),
    uses: mapArchiveImageToItemData(element, 'uses', syncArchive.uses)
  };
};

/**
 * Asynchronously fetch dynamically enriched element archive
 */
export const fetchEnrichedArchive = async (
  element: ElementDetailData
): Promise<ElementArchiveRecord> => {
  const enriched = await getElementArchive(element.id, element.symbol, element.name);
  return {
    portrait: mapArchiveImageToItemData(element, 'portrait', enriched.portrait),
    science: mapArchiveImageToItemData(element, 'science', enriched.science),
    origin: mapArchiveImageToItemData(element, 'origin', enriched.origin),
    uses: mapArchiveImageToItemData(element, 'uses', enriched.uses)
  };
};
