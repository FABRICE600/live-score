# Advanced feature readiness classification

## Summary

The project now includes a staged implementation plan for advanced sports features. This repository supports the following readiness levels:

- READY: Works with the current app architecture and local data layer.
- NEEDS API: Requires a licensed sports API or news provider.
- NEEDS DATABASE: Requires a Supabase migration or user data model.
- NEEDS AUTH: Requires authenticated access and protected routes.
- NEEDS ADMIN: Requires secure administrator-only access.
- NEEDS EXTERNAL SERVICE: Requires additional infrastructure, such as browser push, email, or deployment services.
- NOT AVAILABLE: Cannot be implemented reliably without a provider or explicit legal access.

## Module classification

| Module | Overview | Status |
| --- | --- | --- |
| A: Live Match Centre | Timeline, live updates, score tracker, comments, VAR state | READY for UI shell; NEEDS API for live production data |
| B: Advanced Football Features | H2H, player stats, squads, forms | NEEDS API |
| C: Multi-sport support | Basketball, tennis, cricket, esports | NEEDS API |
| D: Competitions and tournaments | Competition directory and brackets | NEEDS API |
| E: Search and discovery | Global search, filters, suggestions | READY with local search layer; NEEDS API for provider-wide indexing |
| F: Personalization | Favourite sports, dashboard widgets, watchlist | READY for local persistence |
| G: Notifications and alerts | Browser push, reminders, history | NEEDS AUTH + NEEDS EXTERNAL SERVICE |
| H: Player and team analytics | xG, xA, comparison dashboards | NEEDS API |
| I: AI-powered features | Match summaries and explanations | NEEDS API and clearly labelled generated analysis |
| J: News and media | Personalized feed, filters, bookmarks | NEEDS API |
| K: Social and community | Profiles, discussion, moderation | NEEDS AUTH + NEEDS DATABASE |
| L: Predictions and fantasy | Forecast tools and fantasy points | NEEDS API + NEEDS DATABASE |
| M: Administration | Admin dashboard, moderation, audit logs | NEEDS AUTH + NEEDS ADMIN + NEEDS DATABASE |
| N: Security and data management | RLS, backups, export, deletion | READY for table design; NEEDS AUTH + NEEDS DATABASE |
| O: Mobile, accessibility, PWA | Installability and offline caching | READY for progressive enhancement; NEEDS EXTERNAL SERVICE for production PWA build |
| P: Internationalization | English, French, Spanish, Kinyarwanda, Arabic, etc. | READY for UI strings; NEEDS translation workflow |
| Q: Advanced analytics and reporting | Charts and downloadable reports | READY for UI mockups; NEEDS API |
| R: Stadium and fixtures calendar | Stadium pages and schedules | NEEDS API |
| S: Advanced API and developer features | Fallback providers, retries, cache health | READY for service-layer patterns; NEEDS EXTERNAL SERVICE |
| T: QA and production readiness | CI/CD, tests, monitoring | READY for project structure; NEEDS GITHUB ACTIONS and deployment access |

## Implemented in this phase

- Live match centre UI shell
- Search and discovery panel
- Personalized dashboard widgets
- Local persistence-friendly state scaffolding
- LLM-friendly classification and roadmap documentation

## Unimplemented and blocked by infrastructure

Any feature that requires provider data, authenticated user accounts, admin policies, or external infrastructure remains intentionally marked as not complete until the corresponding SDK, API, and permission layer is available.
