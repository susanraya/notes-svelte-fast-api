<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-11-10

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Included to satisfy the approved stack. Every note lives in the user's browser, so PostgreSQL sits essentially empty here; it is the standard, solid home should optional cross-device sync be added later.

## Consequences

Runs with no stored data in the MVP, an accepted cost of honouring the stack; keeping it empty is what keeps DPDP residency/breach duties out of play.
<!-- sdlc:auto:end adr -->