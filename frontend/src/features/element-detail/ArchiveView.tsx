import React, { useState, useEffect, useRef } from 'react';
import { ElementDetailData } from '../../types';
import {
  ArchiveSection,
  ArchiveItemData,
  getArchiveItem,
  getFullElementArchive
} from '../../data/archiveData';
import { getWikimediaDirectUrl } from '../../services/archiveImageService';
import { ExternalLink, Check, AlertCircle, RotateCcw } from 'lucide-react';

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
  // Single authoritative selected section
  const [selectedSection, setSelectedSection] = useState<ArchiveSection>('portrait');
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const [hasImgError, setHasImgError] = useState<boolean>(false);
  const [activeImgUrl, setActiveImgUrl] = useState<string>('');
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState<boolean>(false);
  const [suggestFormSubmitted, setSuggestFormSubmitted] = useState<boolean>(false);
  const [suggestSourceUrl, setSuggestSourceUrl] = useState<string>('');
  const [suggestNotes, setSuggestNotes] = useState<string>('');
  const [retryCount, setRetryCount] = useState<number>(0);

  // Stale request guard ref
  const activeRequestIdRef = useRef<string>('');

  // Authoritative item and full archive
  const currentArchiveItem: ArchiveItemData = getArchiveItem(element, selectedSection);
  const fullArchive = getFullElementArchive(element);

  // Stable key combining element and category
  const currentKey = `${element.symbol}-${selectedSection}-${retryCount}`;

  // Image load & lifecycle effect with current-priority, timeout, and lazy background preloading
  useEffect(() => {
    setIsImgLoaded(false);
    setHasImgError(false);

    const targetUrl = retryCount > 0 && currentArchiveItem.metadata.sourceUrl
      ? getWikimediaDirectUrl(currentArchiveItem.metadata.sourceUrl) || currentArchiveItem.image
      : currentArchiveItem.image;

    setActiveImgUrl(targetUrl);

    const requestId = `${currentKey}-${Date.now()}`;
    activeRequestIdRef.current = requestId;

    // Fast-path: data URIs (SVG or otherwise) load synchronously — no async needed
    if (targetUrl.startsWith('data:')) {
      setIsImgLoaded(true);
      return;
    }

    // Fast-path: empty URL means fallback SVG was selected — show error state cleanly
    if (!targetUrl) {
      setHasImgError(true);
      return;
    }

    const img = new Image();
    img.src = targetUrl;

    // 5-second timeout safeguard to prevent infinite skeleton loading
    const timeoutId = setTimeout(() => {
      if (activeRequestIdRef.current === requestId && !img.complete) {
        img.src = '';
        setHasImgError(true);
      }
    }, 5000);

    img.onload = () => {
      clearTimeout(timeoutId);
      if (activeRequestIdRef.current === requestId) {
        setIsImgLoaded(true);
        setHasImgError(false);

        // Optional background preload ONLY AFTER current image succeeds
        requestIdleCallback?.(() => {
          SECTIONS.forEach(({ id }) => {
            if (id !== selectedSection) {
              const other = fullArchive[id];
              if (other?.image && !other.image.startsWith('data:')) {
                const idleImg = new Image();
                idleImg.src = other.image;
              }
            }
          });
        });
      }
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      if (activeRequestIdRef.current === requestId) {
        setHasImgError(true);
      }
    };

    return () => {
      clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };
  }, [element.symbol, selectedSection, currentKey, retryCount, currentArchiveItem.image]);

  const handleSectionSelect = (section: ArchiveSection) => {
    if (selectedSection !== section) {
      setSelectedSection(section);
      setRetryCount(0);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
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

  // Satellite orbs for non-selected sections
  const satelliteSections = SECTIONS.filter(s => s.id !== selectedSection);

  // Circular constellation orbital angles around center
  const orbitCoordinates = [
    { top: '23%', left: '36%', size: 98 },
    { top: '48%', left: '77%', size: 108 },
    { top: '73%', left: '40%', size: 102 }
  ];

  return (
    <div className="archive-viewport" key={element.symbol}>
      {/* ─── 1. TOP ARCHIVE NAVIGATION BUTTONS ─── */}
      <div className="archive-nav-container">
        <div className="archive-nav-group" role="tablist" aria-label="Archive category navigation">
          {SECTIONS.map(({ id, label }) => {
            const isActive = selectedSection === id;
            return (
              <button
                key={id}
                role="tab"
                id={`archive-tab-${id}`}
                aria-selected={isActive}
                aria-controls={`archive-panel-${id}`}
                onClick={() => handleSectionSelect(id)}
                className={`archive-nav-btn ${isActive ? 'active' : ''}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 2. MAIN VISUAL STAGE & CONSTELLATION ─── */}
      <div className="archive-stage">
        {/* Main Focus Orb */}
        <div className="archive-orb-main-wrap">
          <div className="archive-orb-card">
            {/* Shimmer loading skeleton */}
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

            {/* Error Fallback & Retry */}
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
                  background: '#090d16',
                  textAlign: 'center',
                  position: 'relative'
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
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                      Image temporarily unavailable
                    </span>
                    <button
                      onClick={handleRetry}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.1)',
                        color: '#ffffff',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <RotateCcw size={12} />
                      Retry
                    </button>
                  </>
                )}
              </div>
            ) : (
              <img
                key={activeImgUrl}
                src={activeImgUrl}
                alt={`${element.name} (${element.symbol}) - ${currentArchiveItem.title}`}
                loading="eager"
                decoding="async"
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

            {/* Bottom Section Tag in Orb */}
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
                fontSize: '11px',
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

        {/* Satellite Orbiting Orbs */}
        {satelliteSections.map((sec, index) => {
          const item = fullArchive[sec.id];
          const pos = orbitCoordinates[index] || { top: '50%', left: '50%', size: 96 };

          return (
            <button
              key={`${element.symbol}-${sec.id}`}
              onClick={() => handleSectionSelect(sec.id)}
              aria-label={`Switch to ${sec.label}`}
              title={`View ${element.name} ${sec.label}`}
              className="archive-satellite-orb"
              style={{
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
                width: `${pos.size}px`,
                height: `${pos.size}px`
              }}
            >
              <img
                src={item?.image || item?.fallbackSvg}
                alt={sec.label}
                loading="lazy"
                onError={(e) => {
                  if (item?.fallbackSvg) {
                    (e.currentTarget as HTMLImageElement).src = item.fallbackSvg;
                  }
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '4px 0',
                  textAlign: 'center',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
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
      <div className="archive-info-card" id={`archive-panel-${selectedSection}`} role="tabpanel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: '#0284c7',
              background: 'rgba(2, 132, 199, 0.12)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            {selectedSection}
          </span>
          <span style={{ fontSize: '11px', opacity: 0.75 }}>
            {currentArchiveItem.metadata.category || 'Element Specimen'} · {currentArchiveItem.metadata.year || ''}
          </span>
        </div>

        <h3
          style={{
            margin: '0 0 4px 0',
            fontSize: '15px',
            fontWeight: 700,
            lineHeight: 1.25
          }}
        >
          {currentArchiveItem.title}
        </h3>

        <p
          style={{
            margin: '0 0 8px 0',
            fontSize: '12px',
            lineHeight: 1.45,
            opacity: 0.85,
            maxHeight: '44px',
            overflowY: 'auto'
          }}
        >
          {currentArchiveItem.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', opacity: 0.75 }}>
          <span>
            Source: <strong>{currentArchiveItem.metadata.source}</strong> ({currentArchiveItem.metadata.license || 'Public Domain'})
          </span>

          {currentArchiveItem.metadata.sourceUrl && (
            <a
              href={currentArchiveItem.metadata.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View verified original archive source on Wikimedia Commons"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#0284c7',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              <span>Verify Source</span>
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
            padding: '7px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(120, 120, 120, 0.2)',
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
            background: 'rgba(15, 23, 42, 0.55)',
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
              boxShadow: '0 20px 48px rgba(0,0,0,0.3)',
              position: 'relative',
              color: '#0f172a'
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
              Help expand the scientific archive for <strong>{element.name} ({element.symbol})</strong> · {selectedSection}.
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
