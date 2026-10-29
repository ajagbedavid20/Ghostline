# Ghostline UX contract

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Select/Listbox | Native select | UX-CONTRACT.md and premium-ui.json | Native | Keyboard and browser popup |
| Form | Semantic HTML form with app validation | UX-CONTRACT.md | Composer, report, dialog | Browser flow and inline error |
| Scrollbar | Global application stylesheet | DESIGN.md | Stable chat gutter | Computed visual inspection |
| Toast | Shared `toast()` and `#toastRegion` | UX-CONTRACT.md | Status | Live-region browser flow |
| Destructive action | Native dialog with app-owned confirmation content | UX-CONTRACT.md | Block and remove | Focus, Escape, consequence copy |

## Navigation

- A device without an identity opens the welcome screen.
- Creating an identity moves to the home screen and stores the identity locally.
- Home opens the demo conversation; Back returns to home without deleting messages.
- URL hashes may restore `home` or `chat` only after an identity exists.

## Identity

- Identity creation and rotation require no personal information.
- Rotation immediately replaces the visible random name and initials.
- This prototype does not claim that rotation changes network metadata.

## Conversations

- Sending is disabled for empty or whitespace-only messages.
- Enter sends; Shift+Enter adds a line; IME composition never triggers send.
- The composer grows until its maximum height, then scrolls internally.
- Messages and expiry preference persist only in local storage.
- Offline status is visible without blocking local access.

## Invitation links

- Localhost and file-preview invitation links are labeled as device-local and cannot be copied as if they were public.
- A public origin alone does not imply working delivery; the interface states that the messaging backend is required.
- Production invitation tokens must be server-created, opaque, expiring, and single-use rather than derived from a client-side identity.

## Safety and destructive actions

- Report requires a reason and displays inline validation.
- Blocking and removing a conversation requires an app-owned confirmation dialog.
- The least destructive action receives initial focus.
- Removal clears local demo messages, hides the conversation, and announces success.

## Feedback and overlays

- Toasts use one bottom-right live region, deduplicate by replacement, and disappear after 4.5 seconds.
- Native `<dialog>` owns modal focus containment and Escape behavior; content and actions remain app-owned.
- Conversation options are a single shared popup that closes on outside click.

## Accessibility and responsive behavior

- Target WCAG 2.2 AA with semantic controls, visible focus, and 44px minimum touch targets.
- The mobile layout is canonical. Wider layouts enhance presentation without removing operations.
- Reduced-motion preference removes nonessential movement.
- Every icon-only control has an accessible name.
