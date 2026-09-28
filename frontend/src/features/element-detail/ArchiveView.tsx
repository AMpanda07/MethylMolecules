import React, { useState, useEffect, useRef } from 'react';
import { ElementDetailData } from '../../types';
import {
  ArchiveSection,
  ArchiveItemData,
  getArchiveItem,
  getFullElementArchive
} from '../../data/archiveData';
import { ExternalLink, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface ArchiveViewProps {
  element: ElementDetailData;
}

const SECTIONS: { id: ArchiveSection; label: string }[] = [
  { id: 'portrait', label: 'Portrait' },
  { id: 'science', label: 'Science' },
  { id: 'origin', label: 'Origin' },
  { id: 'uses', label: 'Uses' }
];

export const ArchiveView: React.FC<ArchiveViewProps> = ({ element }) => {
  // Single authoritative selected category
  const [selectedSection, setSelectedSection] = useState<ArchiveSection>('portrait');
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const [hasImgError, setHasImgError] = useState<boolean>(false);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState<boolean>(false);
  const [suggestFormSubmitted, setSuggestFormSubmitted] = useState<boolean>(false);
  const [suggestSourceUrl, setSuggestSourceUrl] = useState<string>('');
  const [suggestNotes, setSuggestNotes] = useState<string>('');

  // Race condition protection ref for image preloading
  const activeRequestIdRef = useRef<string>('');

  // Synchronously derive current archive item from authoritative state
  const currentArchiveItem: ArchiveItemData = getArchiveItem(element, selectedSection);
  const fullArchive = getFullElementArchive(element);

  // Stable key combining element symbol and section
  const currentKey = `${element.symbol}-${selectedSection}`;

  // Reset loading and error states whenever element or section changes
  useEffect(() => {
    setIsImgLoaded(false);
    setHasImgError(false);

    const requestId = `${currentKey}-${Date.now()}`;
    activeRequestIdRef.current = requestId;

    // Preload current image
    const img = new Image();
    img.src = currentArchiveItem.image;

    img.onload = () => {
      // Ignore stale async completions
      if (activeRequestIdRef.current === requestId) {
        setIsImgLoaded(true);
      }
    };

    img.onerror = () => {
      if (activeRequestIdRef.current === requestId) {
        setHasImgError(true);
      }
    };

    // Also preload remaining sections in background for instant transitions
    SECTIONS.forEach(({ id }) => {
      if (id !== selectedSection) {
        const otherItem = fullArchive[id];
        if (otherItem?.image) {
          const preImg = new Image();
          preImg.src = otherItem.image;
        }
      }
    });

    return () => {
      activeRequestIdRef.current = '';
    };
  }, [element.symbol, selectedSection, currentKey, currentArchiveItem.image]);

  const handleSectionSelect = (section: ArchiveSection) => {
    if (selectedSection !== section) {
      setSelectedSection(section);
    }
  };

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestFormSubmitted(true);
    setTimeout(() => {
      setIsSuggestModalOpen(false);
      setSuggestFormSubmitted(false);
      setSuggestSourceUrl('');
      setSuggestNotes('');
    }, 1500);
  };

  // Determine satellite orbs for the constellation view
  const satelliteSections = SECTIONS.filter(s => s.id !== selectedSection);

  // Orbital positions around the center
  const orbitPositions = [
    { top: '24%', left: '38%', size: 105 },
    { top: '48%', left: '76%', size: 115 },
    { top: '72%', left: '42%', size: 110 }
  ];

  return (
    <div
      className="archive-viewport"
      key={element.symbol} // Root element boundary ensures clean state
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#faf8f5',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* ─── 1. TOP ARCHIVE NAVIGATION BUTTONS (Coherent Group) ─── */}
      <div
        className="archive-nav-container"
        style={{
          padding: '16px 20px 8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 30,
          position: 'relative'
        }}
      >
        <div
          className="archive-nav-group"
          role="tablist"
          aria-label="Archive category navigation"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.06)',
            borderRadius: '999px',
            padding: '4px',
            gap: '4px',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
            maxWidth: '100%',
            overflowX: 'auto'
          }}
        >
          {SECTIONS.map(({ id, label }) => {
            const isActive = selectedSection === id;
            return (
              <button
                key={id}
                role="tab"
                id={`archive-tab-${id}`}
                aria-selected={isActive}
                aria-pressed={isActive}
                aria-controls={`archive-panel-${id}`}
                onClick={() => handleSectionSelect(id)}
                className={`archive-nav-btn ${isActive ? 'active' : ''}`}
                style={{
                  height: '34px',
                  minWidth: '84px',
                  padding: '0 16px',
                  borderRadius: '999px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive ? '#0f172a' : 'transparent',
                  color: isActive ? '#ffffff' : '#475569',
                  boxShadow: isActive ? '0 2px 8px rgba(15, 23, 42, 0.25)' : 'none',
                  transform: isActive ? 'scale(1)' : 'scale(0.98)',
                  transition: 'background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, transform 0.15s ease',
                  outline: 'none',
                  whiteSpace: 'nowrap',
                  userSelect: 'none'
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 2. MAIN VISUAL STAGE & CONSTELLATION ─── */}
      <div
        className="archive-stage"
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Main Central Orb for selected section */}
        <div
          className="archive-orb-main-wrap"
          style={{
            position: 'absolute',
            top: '46%',
            left: '52%',
            transform: 'translate(-50%, -50%)',
            width: '230px',
            height: '230px',
            borderRadius: '50%',
            zIndex: 10,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div
            className="archive-orb-card"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 48px rgba(0,0,0,0.22), 0 0 0 4px #ffffff, 0 0 0 6px #0f172a',
              background: '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Loading Shimmer Skeleton */}
            {!isImgLoaded && !hasImgError && (
              <div
                className="archive-img-skeleton"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 50%, #e2e8f0 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'archive-shimmer 1.4s infinite linear'
                }}
              />
            )}

            {/* Error Fallback Graphics */}
            {hasImgError ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  background: '#f8fafc',
                  textAlign: 'center'
                }}
              >
                {currentArchiveItem.fallbackSvg ? (
                  <img
                    src={currentArchiveItem.fallbackSvg}
                    alt={currentArchiveItem.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <>
                    <AlertCircle size={32} color="#94a3b8" style={{ marginBottom: '8px' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
                      Archive image unavailable
                    </span>
                  </>
                )}
              </div>
            ) : (
              <img
                key={currentKey}
                src={currentArchiveItem.image}
                alt={`${element.name} ${selectedSection}`}
                className="archive-main-img"
                onLoad={() => setIsImgLoaded(true)}
                onError={() => setHasImgError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  opacity: isImgLoaded ? 1 : 0,
                  transform: isImgLoaded ? 'scale(1)' : 'scale(1.04)',
                  transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            )}

            {/* Bottom Section Label in Orb */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '8px 4px 6px',
                textAlign: 'center',
                background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.4) 60%, transparent 100%)',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                pointerEvents: 'none'
              }}
            >
              {selectedSection}
            </div>
          </div>
        </div>

        {/* Satellite Orbiting Orbs for non-selected sections */}
        {satelliteSections.map((sec, index) => {
          const item = fullArchive[sec.id];
          const pos = orbitPositions[index] || { top: '50%', left: '50%', size: 100 };

          return (
            <button
              key={`${element.symbol}-${sec.id}`}
              onClick={() => handleSectionSelect(sec.id)}
              aria-label={`Switch to ${sec.label}`}
              title={`View ${element.name} ${sec.label}`}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
                width: `${pos.size}px`,
                height: `${pos.size}px`,
                borderRadius: '50%',
                border: 'none',
                padding: 0,
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 0 0 2px rgba(255,255,255,0.8)',
                cursor: 'pointer',
                overflow: 'hidden',
                zIndex: 6,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.2), 0 0 0 3px #0f172a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12), 0 0 0 2px rgba(255,255,255,0.8)';
              }}
            >
              <img
                src={item?.image || item?.fallbackSvg}
                alt={sec.label}
                onError={(e) => {
                  if (item?.fallbackSvg) {
                    (e.currentTarget as HTMLImageElement).src = item.fallbackSvg;
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '4px 0',
                  textAlign: 'center',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.5px'
                }}
              >
                {sec.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* ─── 3. BOTTOM INFO & ATTRIBUTION PANEL ─── */}
      <div
        className="archive-info-card"
        style={{
          padding: '12px 24px 72px', // Bottom padding leaves space for atom-bottom-controls
          background: 'linear-gradient(to top, rgba(250,248,245,1) 70%, rgba(250,248,245,0.85) 100%)',
          zIndex: 20,
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: '#0284c7',
              background: '#e0f2fe',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            {selectedSection}
          </span>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            {currentArchiveItem.metadata.category || 'Specimen'} · {currentArchiveItem.metadata.year || ''}
          </span>
        </div>

        <h3
          style={{
            margin: '0 0 6px 0',
            fontSize: '15px',
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.2
          }}
        >
          {currentArchiveItem.title}
        </h3>

        <p
          style={{
            margin: '0 0 8px 0',
            fontSize: '12px',
            lineHeight: 1.45,
            color: '#334155',
            maxHeight: '44px',
            overflowY: 'auto'
          }}
        >
          {currentArchiveItem.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
          <span>
            Source: <strong>{currentArchiveItem.metadata.source}</strong> ({currentArchiveItem.metadata.license || 'Public Domain'})
          </span>

          {currentArchiveItem.metadata.sourceUrl && (
            <a
              href={currentArchiveItem.metadata.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              <span>Ref</span>
              <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>

      {/* ─── 4. BOTTOM-LEFT SUGGEST A SOURCE BUTTON ─── */}
      <div style={{ position: 'absolute', bottom: '24px', left: '24px', zIndex: 50 }}>
        <button
          className="suggest-source-btn"
          aria-label="Suggest a source for this archive entry"
          onClick={() => setIsSuggestModalOpen(true)}
          style={{
            padding: '8px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.12)',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(10px)',
            fontSize: '12px',
            fontWeight: 600,
            color: '#1e293b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            transition: 'all 0.2s ease'
          }}
        >
          <span>+ Suggest a Source</span>
          <ExternalLink size={12} />
        </button>
      </div>

      {/* ─── 5. SUGGEST SOURCE MODAL DIALOG ─── */}
      {isSuggestModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="suggest-modal-title"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}
          onClick={() => setIsSuggestModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              background: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 20px 48px rgba(0,0,0,0.25)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4
              id="suggest-modal-title"
              style={{
                margin: '0 0 8px 0',
                fontSize: '16px',
                fontWeight: 700,
                color: '#0f172a'
              }}
            >
              Suggest Archive Source
            </h4>
            <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
              Help improve the visual archive for <strong>{element.name} ({element.symbol})</strong> · {selectedSection}.
            </p>

            {suggestFormSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <Check size={40} color="#16a34a" style={{ margin: '0 auto 8px' }} />
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#16a34a', margin: 0 }}>
                  Thank you! Suggestion recorded.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSuggestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Image or Source URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://commons.wikimedia.org/..."
                    value={suggestSourceUrl}
                    onChange={(e) => setSuggestSourceUrl(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Attribution & Scientific Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specimen details, license, institution..."
                    value={suggestNotes}
                    onChange={(e) => setSuggestNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      outline: 'none',
                      resize: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIsSuggestModalOpen(false)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      background: '#f8fafc',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#0f172a',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    Submit Source
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
