# Ghostline prototype

Ghostline is a mobile-first, installable web prototype for profile-free anonymous conversations.

## Included

- Device-local anonymous identity generation and rotation
- One-use secret invitation link flow
- Responsive one-to-one conversation experience
- Local message persistence and simulated anonymous replies
- Disappearing-message preference
- Report, block, and confirmed removal flows
- Offline application shell through a service worker
- Installable PWA manifest
- Keyboard, reduced-motion, focus, and touch-target support

## Run locally

From this folder:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Deployment

This repository is configured for a static Vercel deployment through `vercel.json`. Vercel serves `index.html` and the PWA assets directly from the repository root.

The service worker requires HTTP or HTTPS; opening `index.html` directly still runs the interface, but offline installation will not be enabled.

## Product boundary

This is a working frontend prototype. It intentionally labels itself **Local prototype** and does not claim end-to-end encryption. Production launch still requires a real-time backend, audited encryption implementation, push notification infrastructure, abuse operations, legal/privacy review, and app-store packaging.

Links generated while the app is running at `127.0.0.1` or `localhost` cannot be opened from another device. Those hostnames always refer to the device opening the link. Public invitations require both a public HTTPS deployment and the real-time messaging backend.

## Important files

- `index.html` — application screens and accessible modal flows
- `styles.css` — responsive visual system
- `app.js` — local identity, navigation, chat, and safety interactions
- `manifest.webmanifest` and `sw.js` — installable/offline web application shell
- `DESIGN.md` — durable visual direction and tokens
- `UX-CONTRACT.md` — interaction, safety, and accessibility behavior
