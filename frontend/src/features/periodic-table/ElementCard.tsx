import React from 'react';
import { ElementGridItem } from '../../types';
import { useAppStore } from '../../state/useAppStore';

interface ElementCardProps {
  element: ElementGridItem;
  onClick: () => void;
  isPlaceholder?: boolean;
}

export const getCategoryClass = (category: string): string => {
  const cat = category.toLowerCase().trim();
  if (cat.includes('alkali') && !cat.includes('earth')) return 'cat-alkali-metal';
  if (cat.includes('alkaline') || cat.includes('earth')) return 'cat-alkaline-earth-metal';
  if (cat.includes('transition') && !cat.includes('post')) return 'cat-transition-metal';
  if (cat.includes('post-transition')) return 'cat-post-transition-metal';
  if (cat.includes('metalloid')) return 'cat-metalloid';
  if (cat.includes('halogen')) return 'cat-halogen';
  if (cat.includes('noble')) return 'cat-noble-gas';
  if (cat.includes('lanthan')) return 'cat-lanthanide';
  if (cat.includes('actin')) return 'cat-actinide';
  return 'cat-other-nonmetal';
};

export const isCategoryMatch = (filter: string, elementCat: string): boolean => {
  const f = filter.toLowerCase().trim();
  const c = elementCat.toLowerCase().trim();
  if (f === c) return true;
  if (f.includes('alkaline') && c.includes('alkaline')) return true;
  if (f.includes('alkali') && !f.includes('alkaline') && c.includes('alkali') && !c.includes('alkaline')) return true;
  if (f.includes('transition') && !f.includes('post') && c.includes('transition') && !c.includes('post')) return true;
  if (f.includes('post') && c.includes('post')) return true;
  if (f.includes('metalloid') && c.includes('metalloid')) return true;
  if (f.includes('halogen') && c.includes('halogen')) return true;
  if (f.includes('noble') && c.includes('noble')) return true;
  if (f.includes('lanthan') && c.includes('lanthan')) return true;
  if (f.includes('actin') && c.includes('actin')) return true;
  if (f.includes('nonmetal') && c.includes('nonmetal')) return true;
  return false;
};

export const ElementCard: React.FC<ElementCardProps> = ({ element, onClick, isPlaceholder }) => {
  const { categoryFilter, customLayout } = useAppStore();

  const categoryClass = getCategoryClass(element.category);
  const rawCategoryClass = categoryClass.replace(/^cat-/, '');
  const isFilteredOut = categoryFilter ? !isCategoryMatch(categoryFilter, element.category) : false;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const cardStyle: React.CSSProperties = {
    gridRow: element.row,
    gridColumn: element.column,
    borderRadius: `${customLayout.borderRadius}px`,
    opacity: isFilteredOut ? 0.2 : 1,
    transform: isFilteredOut ? 'scale(0.95)' : undefined,
    filter: customLayout.grayscale ? 'grayscale(100%)' : undefined
  };

  if (isPlaceholder) {
    const rangeLabel = element.number === 5771 ? 'Lanthanide Series (57-71)' : 'Actinide Series (89-103)';
    return (
      <div
        className={`element range-block ${categoryClass} ${rawCategoryClass}`}
        style={cardStyle}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={rangeLabel}
        title={`Filter table by ${rangeLabel}`}
      >
        <span className="number">{element.number === 5771 ? '57-71' : '89-103'}</span>
        <span className="symbol" style={{ fontSize: '14px', fontWeight: 800 }}>{element.symbol}</span>
        <span className="name">{element.name}</span>
      </div>
    );
  }

  const tooltipText = `#${element.number} ${element.name} (${element.symbol}) · ${element.category}`;

  return (
    <div
      className={`element ${categoryClass} ${rawCategoryClass}`}
      style={cardStyle}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${element.name} (${element.symbol}), atomic number ${element.number}`}
      title={tooltipText}
      data-number={element.number}
      data-symbol={element.symbol}
    >
      {customLayout.showAtomicNumber && (
        <span className="number">{element.number}</span>
      )}
      {customLayout.showSymbol && (
        <span
          className="symbol"
          style={{
            fontSize: `${customLayout.symbolFontSize}px`,
            fontWeight: customLayout.symbolFontWeight,
            color: customLayout.symbolColor !== '#1a1a1a' ? customLayout.symbolColor : undefined
          }}
        >
          {element.symbol}
        </span>
      )}
      {customLayout.showMainContent && (
        <span
          className="name"
          style={{
            fontSize: `${customLayout.fontSize}px`,
            fontWeight: customLayout.fontWeight,
            color: customLayout.fontColor !== '#4a4a4a' ? customLayout.fontColor : undefined
          }}
        >
          {element.name}
        </span>
      )}
    </div>
  );
};
