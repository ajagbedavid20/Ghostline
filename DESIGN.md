---
version: alpha
colors:
  ink: "#14234a"
  inkDeep: "#0c1734"
  paper: "#f4f6fb"
  paperBright: "#ffffff"
  mist: "#dfe7f7"
  line: "#cbd6eb"
  muted: "#66728c"
  blue: "#315ee8"
  orange: "#ed7a3b"
  moss: "#33705d"
  danger: "#b63b43"
typography:
  display:
    fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, serif'
  body:
    fontFamily: 'Aptos, "Segoe UI", sans-serif'
rounded:
  small: "0.8rem"
  default: "1.25rem"
  large: "2rem"
  pill: "999px"
spacing:
  compact: "0.75rem"
  default: "1rem"
  section: "3rem"
components:
  button:
    minHeight: "3rem"
  touchTarget:
    minSize: "2.75rem"
  dialog:
    maxWidth: "30rem"
---

## Overview

Ghostline should feel like a late-night radio signal rendered on fine stationery: private, quiet, slightly mysterious, but never sinister. It serves people who want to talk without performing a permanent identity. The register is product-first with a restrained brand signature.

The memorable element is the identity signal: concentric, breathing lines around a temporary name. Avoid hacker imagery, neon cyberpunk, surveillance motifs, generic purple gradients, and social-media engagement chrome.

## Colors

Ink blue carries trust and private-space depth. Cobalt identifies primary actions, while orange is reserved for focus and rare expressive accents. Moss green identifies the fictional contact and healthy online state. Danger red appears only for destructive or safety actions.

`styles.css` is the runtime token owner. The YAML values above map one-to-one to the CSS custom properties in `:root`.

## Typography

The display serif makes identities and invitations feel human rather than transactional. Aptos is the practical product face for controls, messages, and metadata. Product copy stays plain, specific, and calm.

## Layout

Mobile is the primary usage scene. The interface starts as a single column at 320px and becomes a two-column welcome or action layout at 768px. Chat remains intentionally narrow on larger screens to preserve conversational intimacy.

## Elevation & Depth

The canvas uses soft ambient color fields. Elevation is reserved for the central identity card, composer, dialogs, menus, and toasts. Ordinary content sections remain flat.

## Shapes

Large surfaces use soft rectangular corners; identities and avatars are circular; primary actions use pill geometry. This contrast represents temporary people moving through stable private rooms.

## Components

Buttons preserve a minimum 48px visual height where space permits and never fall below a 44px target. Dialogs use native modal behavior with app-owned content. The global scrollbar remains visible. Message bubbles use asymmetric corners to establish direction without relying only on color.

## Do's and Don'ts

- Do make privacy limits explicit in ordinary language.
- Do keep user exits and reporting controls reachable from every conversation.
- Do preserve calm, sparse surfaces around dense conversations.
- Don't imply end-to-end encryption in this prototype.
- Don't use follower counts, public profiles, streaks, or popularity signals.
- Don't hide destructive consequences behind vague labels.
