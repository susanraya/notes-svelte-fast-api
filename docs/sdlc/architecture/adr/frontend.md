<!-- sdlc:auto:start adr -->
# ADR-0001: Use Svelte 5 for Frontend

Status: Accepted  
Date: 2026-11-10

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- Svelte 5
- React
- Vue

## Decision Outcome

Chosen option: Svelte 5, because Svelte 5 compiles to small, fast vanilla-JS bundles ideal for a static, offline-first SPA that must load quickly on mobile in India and run entirely client-side against local storage. Its runes-based stores back the notes list, search, and checklist state cleanly, and native HTML with ARIA supports WCAG/RPwD accessibility.

## Consequences

Smaller ecosystem than React, but the feature set here (local-storage CRUD, search, export/import) needs little beyond the framework.
<!-- sdlc:auto:end adr -->