# PRODUCTION_AUDIT.md

## Overview
This document captures the audit of the Zperiod codebase as we transition from a development prototype to a production‑ready application.

## Issues Classification
We will categorize findings into **Critical**, **High**, **Medium**, and **Low** severity levels. Each entry includes:
- **Location** – file path and line numbers (if applicable)
- **Description** – what the issue is
- **Impact** – why it matters for production
- **Recommendation** – how to fix or mitigate

---

### Critical
- **Build Failure on Production** – Ensure `npm run build` succeeds without TypeScript errors or missing assets.
- **WebGL Initialization Errors** – Missing fallback when WebGL is unavailable.
- **Routing Fallback** – Vite SPA must serve `index.html` for unknown routes in production.
- **Error Boundaries** – Uncaught errors in 3D or tools crash the whole app.
- **Security: XSS via `dangerouslySetInnerHTML`** – Search results and element data must be sanitized.

### High
- **Unused / Duplicate Dependencies** – `lucide-react` imported but not fully utilized; potential dead code.
- **Console Logging & Debug Statements** – Remove all `console.log`/`debugger` from production code.
- **Hard‑coded URLs / Paths** – Assets referenced via absolute paths may break in production.
- **Performance: Large CSS (`index.css` ~450KB)** – Consider extracting only required styles.
- **Memory Leaks in 3D Views** – Ensure `ResizeObserver`, event listeners, and animation frames are fully cleaned up.

### Medium
- **Accessibility Gaps** – Missing ARIA labels on custom buttons, focus outlines.
- **Responsive Edge Cases** – Small viewports (<480px) still show overflow in modals.
- **LocalStorage Error Handling** – Corrupted JSON should not crash the app.
- **TypeScript `any` Usage** – Several `any` types in state/store and component props.
- **Duplicate CSS Rules** – Global and responsive overrides conflict.

### Low
- **Unused Components** – Potential stale component files (e.g., old test utilities).
- **Styling `!important` Abuse** – Review overrides that use `!important`.
- **Minor UI Inconsistencies** – Button spacing in toolbar on mobile.
- **Redundant Imports** – Import of `./responsive.css` already handled in `main.tsx`.
- **Missing `lang` attribute** – `<html>` tag lacks language declaration.

---

## Next Steps
1. Run a clean production build (`npm run build`).
2. Fix TypeScript errors and replace `any` types.
3. Implement error boundaries around major feature modules.
4. Add WebGL fallback UI.
5. Harden 3D cleanup logic (event listeners, observers, disposals).
6. Audit dependencies and prune unused packages.
7. Add accessibility attributes and keyboard navigation support.
8. Optimize CSS bundle and remove dead styles.
9. Create `.env.example` and ensure no secrets are committed.
10. Write unit tests for core chemistry logic and integration tests for routing.
11. Update README and add production checklist.

We will now begin addressing the **Critical** items, starting with the production build.
