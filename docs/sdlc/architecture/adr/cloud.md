<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-10

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because A browser-only app is cheapest and fastest served as static files from S3 behind CloudFront's global CDN, putting assets on India edge locations for quick mobile loads (NFR-005). With no server-side personal data, DPDP data-residency concerns do not bite.

## Consequences

Standard CDN costs are minimal for static serving; the provisioned API/DB add small fixed cost without functional benefit in the MVP.
<!-- sdlc:auto:end adr -->