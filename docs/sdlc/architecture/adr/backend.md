<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-10

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Express
- Spring Boot

## Decision Outcome

Chosen option: FastAPI 0.115, because Provisioned to match the approved stack. In this design it exposes only a health endpoint and handles no note or personal data, keeping the app outside DPDP server-side obligations while leaving a clean home for an optional future sync API.

## Consequences

Carries no functional load today; it is deliberately minimal to avoid introducing server-side personal data.
<!-- sdlc:auto:end adr -->