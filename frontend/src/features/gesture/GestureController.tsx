import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../state/useAppStore';
import { Camera, X, Hand, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import elementsGridData from '../../data/elementsGrid.json';
import { ElementGridItem } from '../../types';

export const GestureController: React.FC = () => {
  const {
    isGestureEnabled,
    setIsGestureEnabled,
    selectedElementId,
    setSelectedElementId,
    elementDetailTab,
    setElementDetailTab
  } = useAppStore();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeGesture, setActiveGesture] = useState<string>('Tracking');
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [hoveredElementId, setHoveredElementId] = useState<number | null>(null);

  // High-frequency optical tracking refs (no setState on every frame)
  const animFrameRef = useRef<number>(0);
  const prevPosRef = useRef<{ x: number; y: number } | null>(null);
  const dwellTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActionTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isGestureEnabled) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      setCameraError(null);
      setCursorPos({ x: -100, y: -100 });
      return;
    }

    let isSubscribed = true;

    async function startCamera() {
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: 'user' },
          audio: false
        });

        if (!isSubscribed) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        // Initialize Optical Motion Frame Loop
        let prevImageData: ImageData | null = null;

        const processFrame = () => {
          if (!isSubscribed) return;

          const video = videoRef.current;
          const canvas = canvasRef.current;

          if (video && canvas && video.readyState === 4) {
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (ctx) {
              canvas.width = 160;
              canvas.height = 120;
              ctx.drawImage(video, 0, 0, 160, 120);

              const currentImageData = ctx.getImageData(0, 0, 160, 120);
              const data = currentImageData.data;

              // Compute center of motion / skin-tone mass
              let totalX = 0;
              let totalY = 0;
              let count = 0;

              for (let i = 0; i < data.length; i += 16) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Simple skin-tone / motion brightness filter
                if (r > 60 && g > 40 && b > 20 && r > b && Math.abs(r - g) > 15) {
                  const pixelIdx = i / 4;
                  const x = pixelIdx % 160;
                  const y = Math.floor(pixelIdx / 160);
                  totalX += x;
                  totalY += y;
                  count++;
                }
              }

              if (count > 80) {
                const rawX = totalX / count;
                const rawY = totalY / count;

                // Map mirrored camera coordinates to viewport X/Y
                const targetX = window.innerWidth - (rawX / 160) * window.innerWidth;
                const targetY = (rawY / 120) * window.innerHeight;

                // Smooth cursor position
                const prev = prevPosRef.current || { x: targetX, y: targetY };
                const smoothX = prev.x + (targetX - prev.x) * 0.25;
                const smoothY = prev.y + (targetY - prev.y) * 0.25;

                prevPosRef.current = { x: smoothX, y: smoothY };
                setCursorPos({ x: smoothX, y: smoothY });

                // Check gesture motion delta for Swipe
                const deltaX = smoothX - prev.x;
                const now = Date.now();

                if (now - lastActionTimeRef.current > 1200) {
                  if (deltaX < -120) {
                    // Fast Swipe Left -> Next Element
                    setActiveGesture('Swipe Left ➔ Next Element');
                    lastActionTimeRef.current = now;
                    if (selectedElementId && selectedElementId < 118) {
                      setSelectedElementId(selectedElementId + 1);
                    }
                  } else if (deltaX > 120) {
                    // Fast Swipe Right -> Previous Element
                    setActiveGesture('Swipe Right ➔ Prev Element');
                    lastActionTimeRef.current = now;
                    if (selectedElementId && selectedElementId > 1) {
                      setSelectedElementId(selectedElementId - 1);
                    }
                  } else {
                    setActiveGesture('Pointer Tracking');
                  }
                }

                // Element Dwell Selection
                const elem = document.elementFromPoint(smoothX, smoothY);
                if (elem) {
                  const card = elem.closest('.element');
                  if (card) {
                    const symbol = card.querySelector('.symbol')?.textContent;
                    if (symbol) {
                      const grid = elementsGridData as ElementGridItem[];
                      const found = grid.find((item) => item.symbol === symbol);
                      if (found) {
                        setHoveredElementId(found.number);
                        if (now - lastActionTimeRef.current > 1800) {
                          setSelectedElementId(found.number);
                          window.history.pushState({}, '', `?element=${found.symbol}`);
                          lastActionTimeRef.current = now;
                          setActiveGesture(`Selected ${found.name}`);
                        }
                      }
                    }
                  }
                }
              }

              prevImageData = currentImageData;
            }
          }

          animFrameRef.current = requestAnimationFrame(processFrame);
        };

        animFrameRef.current = requestAnimationFrame(processFrame);
      } catch (err) {
        if (!isSubscribed) return;
        console.warn('[Zperiod Gesture] Camera access failed:', err);
        setCameraError('Camera access denied or device unavailable');
      }
    }

    startCamera();

    return () => {
      isSubscribed = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isGestureEnabled, selectedElementId, setSelectedElementId]);

  if (!isGestureEnabled) return null;

  return (
    <>
      {/* Virtual Gesture Cursor */}
      {cursorPos.x > 0 && (
        <div
          id="gesture-pointer"
          style={{
            position: 'fixed',
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(56, 189, 248, 0.4)',
            border: '2px solid #38bdf8',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.8)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'transform 0.05s linear'
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ffffff',
              margin: '8px auto'
            }}
          />
        </div>
      )}

      {/* Floating Camera HUD Overlay */}
      <div
        className="gesture-hud-card"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '220px',
          background: '#0f172a',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '14px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.15)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700 }}>
            <Hand size={16} color="#38bdf8" />
            <span>Gesture Control</span>
          </div>
          <button
            onClick={() => setIsGestureEnabled(false)}
            aria-label="Stop gesture control"
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '2px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {cameraError ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#f87171' }}>
            <AlertCircle size={14} />
            <span>{cameraError}</span>
          </div>
        ) : (
          <>
            <div style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '10px', overflow: 'hidden', background: '#020617' }}>
              <video
                ref={videoRef}
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <div
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '6px',
                  background: 'rgba(15,23,42,0.8)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#38bdf8'
                }}
              >
                {activeGesture}
              </div>
            </div>

            <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: 1.35 }}>
              • <strong>Point</strong> to move cursor
              <br />
              • <strong>Dwell 1.8s</strong> to select element
              <br />
              • <strong>Swipe Left / Right</strong> for Next / Prev
            </div>
          </>
        )}
      </div>
    </>
  );
};
