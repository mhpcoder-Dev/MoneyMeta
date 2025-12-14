# Moneymeta — Project Requirements

Website: moneymeta.app

## Overview

Moneymeta aggregates live government auctions and surplus sales from international open-data sources. The site must be responsive (desktop, tablet, mobile), ad-ready, and automated wherever feasible. The owner must retain admin access to hosting and related services.

The product includes a homepage widget listing active items only and, when sources provide such signals, a separate page for potential/future items (clearly labeled as upcoming, not active).

## Core Requirements

- Single homepage widget that auto-updates and displays only current (active) items for sale/auction.
- Widget grouping: by country/region, then by asset priority: 1) Land/buildings, 2) Trailers, 3) Cars, 4) Motorcycles, 5) Bikes.
- Each country heading shows the location first, followed by active item cards.
- Item card features: title, short description, location, auction/sale dates, external link to original listing, per-item comments, and a shareable deep link to the card on Moneymeta.

## Data Sources & Integration

- Primary US feed: GSA Auctions API (requires api.data.gov API key). Endpoint: `https://api.gsa.gov/assets/gsaauctions/v2/auctions?api_key=YOUR_KEY`.
- Additional sources: UK (Register of Surplus Land), Canada (GCSurplus), EU/TED, Australia, India portals, and other national open-data portals. Most non-US sources require attribution per their licenses.
- Widgets must only show currently active listings (no past items). If a source cannot reliably provide current-only data, document the limitation and a fallback strategy.
- Use only official APIs/feeds/downloads permitted by the source; no AI-based scraping.

## Item & UX Details

- Each item card must include a visible link/button that opens the original auction/sale page.
- Per-item comment section (persisted via the chosen platform’s CMS/DB capabilities) and social/share button to copy or open a deep link to the item card.
- Provide global search and filters (by keyword, country, asset type). If the hosting/platform has a built-in search, document configuration steps.

## Admin, Hosting & Accounts

- Owner must be admin on any platform used (Google Sites, Webflow, Netlify, hosting provider, ad platforms). Document required account-creation steps and any owner actions (e.g., API signup, ad billing acceptance).

## Ads

- Site must support ad placements. Provide step-by-step instructions for ad account setup and managing placements. Note any owner actions required (billing, verification, ad policy acceptance).

## Legal & Attribution

- Respect each data source license. Add attribution for non-US datasets where required (visible per item or on a central Attributions page).
- US federal data is generally public domain; recommend noting the source for transparency.

## Edge Cases & Notes

- If a data feed is unreliable or disallows scraping, document the issue and propose an alternative (official API, scheduled import with permission, or manual import). See FR-017 and FR-018.
- Prioritize the US feed integration first if scope/time is limited.

## Deliverables

1. README with setup and deployment steps.
2. Deployed site with owner as admin.
3.Instructions for ad account integration and management.
4.Source copies of any documents uploaded to external services.




## Personas

- Visitor/Buyer: Browses active government auctions and surplus items, searches by keyword/country/asset, opens source listings, shares items, and comments.
- Site Owner/Admin: Manages hosting and ads, supplies API keys, reviews attribution, moderates comments, and verifies data freshness.

## User stories (for client review)

- As a visitor, I want to see only current/active items so I don’t waste time on expired auctions.
- As a visitor, I want items grouped by country with a clear location heading so I can scan by region.
- As a visitor, I want land/buildings first, then trailers, cars, motorcycles, and bikes so high-value assets are prioritized.
- As a visitor, I want a search bar and filters so I can quickly find “land in United States,” etc.
- As a visitor, I want to open the original auction link from each item card to verify details and bid.
- As a visitor, I want a shareable link that jumps directly to an item’s card to send it to others.
- As a visitor, I want to add comments on an item to discuss it with others.
- As the owner, I want the site to auto-update from official APIs/datasets without scraping so maintenance is minimal and compliant.
- As the owner, I want to place ads and manage them with clear instructions.
- As the owner, I want admin access to all platforms used (hosting, CI/CD, ad network) and copies of any externally hosted documents.

## Functional requirements (FR)

- FR-001 Responsive UI supports desktop, tablet, and mobile.
- FR-002 Homepage shows a single, consolidated “Active Listings” widget.
- FR-003 Group items by country/region with a visible heading before the items.
- FR-004 Asset priority within each group: 1) Land/Buildings, 2) Trailers, 3) Cars, 4) Motorcycles, 5) Bikes.
- FR-005 Only current/active items are displayed; past/expired items are excluded.
- FR-006 Each item card includes: title, short description, location, auction/sale dates, and a clear external link/button to the source listing.
- FR-007 Per-item comments are supported and displayed on the item card.
- FR-008 Shareable deep link for every item card that lands the user on that item within the page.
- FR-009 US feed integration via the GSA Auctions API using an api.data.gov key.
- FR-010 Integrate additional sources (UK Register of Surplus Land, Canada GCSurplus, EU/TED, Australia, India, etc.) as available and compliant.
- FR-011 Attribution is presented where required for non‑US datasets (per-item note or central Attributions page).
- FR-012 Search is available on applicable pages (homepage widget and the “future items” page) with keyword and optional filters by country and asset type.
- FR-013 A separate page shows potential/future items when sources provide such data (clearly labeled as upcoming/future, not active).
- FR-014 Owner is admin on all platforms used (Google Sites/Webflow/Netlify/other), with documented steps for account creation and access.
- FR-015 Ads are supported with documented steps for setup and placement; ad slots do not block core content.
- FR-016 Provide repository docs and copies of any documents uploaded to external services.
- FR-017 If a source is down or unreliable, the UI communicates limited data and continues showing other sources; the limitation is documented.
- FR-018 No AI-based scraping; only official APIs/feeds/downloads or permitted methods are used.

## Non-functional requirements (NFR)

- NFR-001 Performance: Aim for initial widget render within ~3 seconds on a typical 4G connection; use caching/pagination where helpful.
- NFR-002 Accessibility: Meet WCAG 2.1 AA for color contrast, keyboard navigation, and ARIA labeling.
- NFR-003 Security: Sanitize user input in comments to prevent XSS; store secrets (API keys) in env/config, not in source control.
- NFR-004 Reliability: Handle source timeouts/errors gracefully and display partial results with notices.
- NFR-005 Maintainability: Configuration (API keys, attribution text) is environment-driven and documented.
- NFR-006 Browser compatibility: Latest Chrome, Edge, Safari, and Firefox; degrade gracefully on older versions.

## Acceptance criteria (sample scenarios)

Feature: Active-only listings
- Given one active and one expired listing from a source
- When the homepage loads
- Then only the active listing is visible and the expired one is not rendered

Feature: Country grouping and asset prioritization
- Given mixed items from the US and UK across several asset types
- When the widget renders
- Then items are grouped under “United States” and “United Kingdom” headings
- And within each group the order is Land/Buildings first, then Trailers, Cars, Motorcycles, Bikes

Feature: External source link
- Given an item card
- When the user clicks “View on Source”
- Then the official listing opens in a new tab/window

Feature: Shareable deep link
- Given an item card with a share icon
- When the user copies the link and opens it
- Then the page loads and scrolls/focuses to that specific item card

Feature: Per-item comments
- Given a signed-in or allowed commenter
- When they post a comment on an item
- Then the comment saves and appears beneath that item
- And dangerous HTML is sanitized

Feature: Search and filters
- Given the search bar
- When the user searches for “land in United States”
- Then results are filtered to land/buildings located in the United States

Feature: Attribution
- Given an item from a non‑US dataset requiring attribution
- When the item is displayed
- Then the required attribution appears on the item or is clearly linked on an Attributions page

Feature: Ads
- Given ad placeholders are configured
- When ads are enabled via the ad network
- Then ads render in the designated areas without obscuring content

## Assumptions and constraints

- The US GSA feed is integrated via api.data.gov with a valid API key provided by the owner.
- Non‑US datasets generally require attribution; final wording/placement is acceptable on a central Attributions page.
- No scraping by AI or automated bots; only official APIs, downloads, or permitted mechanisms.
- Hosting platform is to be confirmed (Google Sites, Webflow, Netlify, etc.); exact implementation details may vary by platform capabilities.

## Dependencies

- api.data.gov API key (GSA Auctions API).
- Access/credentials for hosting and ad network accounts with owner as admin.

## Open questions (for client confirmation)

1. Which hosting platform do you prefer to start with (Google Sites, Webflow, or Netlify/other)?
2. Which ad network should we use (e.g., Google AdSense)? Any initial placement preferences?
3. Should comments require sign-in, and do you want moderation (approve/delete/report)?
4. Any specific countries/datasets to prioritize after the US feed?
5. Do you want per-item attribution badges, or a central Attributions page (with optional per-item source link)?
6. Any analytics/tracking requirements (e.g., Google Analytics) to include at launch?

## Client sign-off checklist

- [ ] Shows only current/active items
- [ ] Grouped by country with location heading
- [ ] Asset order: Land/Buildings, Trailers, Cars, Motorcycles, Bikes
- [ ] Item cards include external source link
- [ ] Shareable deep links to item cards
- [ ] Per-item comments enabled
- [ ] Search available on homepage and future-items page
- [ ] US GSA API integrated (api.data.gov key configured)
- [ ] Attribution shown for non‑US datasets
- [ ] Owner is admin on all platforms
- [ ] Ads configured with clear instructions
- [ ] Docs and external source files provided
