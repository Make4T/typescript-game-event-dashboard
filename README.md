# EventScope - TypeScript Game Event Dashboard

A portfolio-ready React and TypeScript dashboard for exploring game-session telemetry. The UI models typed event data, event-category filtering, player filtering, search and live-style operational metrics without relying on a backend.

## Demonstrates

- TypeScript domain types for telemetry events and player summaries
- Derived data and filtering with `useMemo`
- Responsive React UI with accessible labels and semantic tables
- Dashboard composition, activity visualization and event-category distribution
- A realistic game-operations interface built with no charting dependency

## Interaction model

```text
Typed telemetry event fixture
        │
        ├── Event-category filter
        ├── Player filter
        └── Text search
                │
                ▼
         useMemo-derived event stream
                │
                ▼
      Responsive operations dashboard
```

The visible event table is derived from one typed source of truth. Changing a filter or search query recalculates only the visible stream, keeping the UI logic explicit and easy to replace with a real telemetry API later.

## Dashboard areas

| Area | Purpose |
| --- | --- |
| Session overview | Current session context, region and health indicators |
| Key metrics | Event, objective, latency and session-health summaries |
| Activity pulse | Lightweight CSS activity visualization without a chart library |
| Event mix | Category distribution derived from typed events |
| Event stream | Filterable and searchable operational event table |
| Player overview | Cohort summary and player-scoped event filtering |

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

## Validate

```powershell
npm.cmd run build
npm.cmd run lint
```

## What this project demonstrates

- TypeScript unions and object types for a game telemetry domain
- React state and `useMemo` for derived filtering instead of duplicated data
- Responsive dashboard composition with semantic labels and table roles
- Presenting game operations data clearly without external charting dependencies
