# Velmax Technologies

Corporate website for Velmax Technologies, a manufacturer of servo stabilizers, inverter batteries, and online UPS systems. The site presents product families and stores business enquiries.

## Run & Operate

- `artifacts/velmax-site: web` — managed Vite workflow for the website
- `artifacts/api-server: API Server` — managed Express API workflow
- `pnpm --filter @workspace/velmax-site run typecheck` — website TypeScript check
- `PORT=5173 BASE_PATH=/ pnpm --filter @workspace/velmax-site run build` — website production build
- `pnpm --filter @workspace/api-server run typecheck` — API TypeScript check
- `pnpm run typecheck` — typecheck all workspace packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas
- `pnpm --filter @workspace/db run push` — apply development database schema changes
- Required by the API/database: `DATABASE_URL`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Website: React + Vite + TypeScript
- API: Express 5, with OpenAPI-generated Zod validation and React Query hooks
- Database: PostgreSQL + Drizzle ORM
- API builds with esbuild

## Where things live

- `artifacts/velmax-site/src/App.tsx` — single-page website and interactions
- `artifacts/velmax-site/src/site-config.ts` — editable product, company, contact, industry, and credibility content
- `artifacts/velmax-site/src/site.css` — site visual system and responsive rules
- `lib/api-spec/openapi.yaml` — API contract
- `lib/db/src/schema/business-enquiries.ts` — enquiry storage
- `artifacts/api-server/src/routes/enquiries.ts` — enquiry API endpoint

## Architecture decisions

- The website is a presentation-first artifact; form submissions go through the shared API and are saved in PostgreSQL.
- Enquiries are not currently sent by email; configure a delivery service if email notifications are needed.
- Unverified contact details, specifications, industries, certifications, and testimonials remain empty or visibly marked for confirmation.
- The product images are generated concept visuals and must be replaced with approved Velmax photography before launch.

## Product

Visitors can explore Velmax's three power-equipment product families and submit a business enquiry. The site is responsive, supports reduced motion, and uses scroll reveals.

## User preferences

- Keep the site focused on manufacturing and enquiries, not SaaS or ecommerce.
- Do not invent company facts, product specifications, performance claims, industries, certifications, or contact details.

## Gotchas

- Run API codegen after changing `lib/api-spec/openapi.yaml`; the shared API client needs `dom.iterable` in its TypeScript libs for generated `Headers.entries()` usage.
- Use the managed artifact workflow for the website so its required `PORT` and `BASE_PATH` are provided.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
