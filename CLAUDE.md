# NotiControl — CLAUDE.md

Portal de noticias y comunicados para la **Facultad de Lenguas, UNACH** (Tuxtla Gutiérrez, Chiapas).

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| Estilos | Tailwind CSS v4 + tokens CSS custom (iOS design system) |
| Icons | Lucide React + Heroicons |
| Routing | React Router v7 |
| Backend | Node.js + Express 5 |
| Base de datos | MongoDB (local vía Docker `mongo:7`) + Mongoose 8 |
| Animaciones | CSS custom keyframes + animejs (disponible pero poco usado) |

---

## Estructura

```
NotiControl/
├── src/
│   ├── components/
│   │   ├── admin/        # AdminNavbar, Sidebar
│   │   ├── auth/         # ProtectedRoute
│   │   ├── common/       # Navbar, Footer, ThemeToggle
│   │   └── home/         # FeaturedNewsCarousel, InspirationalSection,
│   │                     # NewsSection, EventsSection, SocialSection, BulletinsSection
│   ├── context/
│   │   └── ThemeContext.tsx   # light/dark, persiste en localStorage
│   ├── hooks/
│   │   └── useReveal.ts       # IntersectionObserver fade-in on scroll
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── News.tsx           # /noticias — grid + búsqueda + filtro categoría
│   │   ├── NewsDetail.tsx     # /noticias/:id
│   │   ├── Bulletins.tsx      # /boletines — lista + búsqueda
│   │   ├── Login.tsx
│   │   └── admin/             # Dashboard, News, Events, Bulletins, Gallery, Settings, Trending
│   ├── types/index.ts         # News, User, Category
│   ├── App.tsx                # Rutas públicas + admin
│   ├── App.css                # Solo override #root
│   └── index.css              # Tokens iOS, clases utilitarias globales
├── backend/
│   ├── models/                # News.js, Event.js, Bulletin.js, TrendingTopic.js
│   ├── routes/                # news.js, events.js, bulletins.js, trending.js
│   ├── server.js              # Express + MongoDB URI hardcoded localhost:27017
│   └── seed.js                # Puebla DB con datos de ejemplo (node seed.js)
└── public/
    └── logo unach.png
```

---

## Rutas

| Path | Componente |
|------|-----------|
| `/` | Home |
| `/noticias` | News |
| `/noticias/:id` | NewsDetail |
| `/boletines` | Bulletins |
| `/login` | Login |
| `/admin` | AdminLayout → Dashboard |
| `/admin/noticias` | AdminNews |
| `/admin/eventos` | AdminEvents |
| `/admin/boletines` | AdminBulletins |
| `/admin/galeria` | AdminGallery |
| `/admin/trending` | AdminTrending |
| `/admin/configuracion` | AdminSettings |

---

## API Backend (puerto 5000)

```
GET/POST   /api/news/
GET/PUT/DELETE /api/news/:id

GET/POST   /api/events
GET/PUT/DELETE /api/events/:id

GET/POST   /api/bulletins
GET/PUT/DELETE /api/bulletins/:id

GET/POST   /api/trending
GET/PUT/DELETE /api/trending/:id
```

---

## Base de datos

MongoDB corre en Docker:
```bash
docker start noticontrol-mongo   # arrancar
docker stop noticontrol-mongo    # parar
```

Poblar con datos de ejemplo:
```bash
cd backend && node seed.js
```

URI: `mongodb://localhost:27017/notiControlDB`

---

## Sistema de diseño (iOS)

Archivo maestro: `src/index.css`

### Tokens clave
- `--ios-blue` / `--ios-label` / `--ios-bg` / `--ios-bg-elev` / `--ios-fill`
- Radii: `--r-sm` (10) → `--r-pill` (999)
- Easings: `--ease-out-quart`, `--ease-spring`

### Clases utilitarias
| Clase | Uso |
|-------|-----|
| `.ios-glass` | Navbar/surfaces translúcidas (backdrop-blur) |
| `.ios-card` | Cards con border sutil + shadow suave |
| `.ios-card-hover` | Agrega lift hover a cards |
| `.ios-pill` | Badge/chip inline |
| `.ios-btn` | Botón pill primario (azul) |
| `.ios-btn-secondary` | Botón pill secundario (fill) |
| `.ios-btn-ghost` | Botón transparente |
| `.ios-reveal` | Animación fade+slide entrada CSS |
| `.ios-skeleton` | Shimmer para loading states |
| `.ios-pulse` | Pulse dot animado |
| `.reveal-on-scroll` | Clase base para useReveal hook |
| `.is-visible` | IO la agrega cuando entra en viewport |
| `.ios-large-title` | SF-like display heading |
| `.ios-title` | Heading secundario |

---

## Comandos

```bash
# Frontend (dev)
npm run dev          # puerto 5173

# Frontend (build)
npm run build

# Backend
cd backend && npm start    # puerto 5000, usa nodemon

# DB
mongosh                    # shell MongoDB
docker ps                  # verificar container
```

---

## Estado actual

- Rediseño iOS minimalista completado (Navbar glass, carousel spring, cards, footer)
- Dark mode funcional via ThemeContext
- Páginas públicas: Home, Noticias, Boletines — todas con data real del backend
- Admin panel existente (no rediseñado aún)
- `NewsDetail.tsx` existe pero tiene errores TS preexistentes (vars no usadas)
- `News.tsx` admin y `Settings.tsx` tienen vars TS no usadas — preexistentes, no bloquean dev server
- `backend/seed.js` genera datos de ejemplo listos para usar

---

## Notas para Claude

- **No Next.js** — es Vite. Ignorar sugerencias de `"use client"` del hook de validación.
- Imágenes: usar solo Unsplash o URLs confiables. Evitar dominios de medios locales (se rompen).
- El `ThemeContext` ya maneja `dark`/`light` — agregar clases dark: de Tailwind funciona.
- `useReveal` usa `IntersectionObserver` + clase `.reveal-on-scroll` / `.is-visible`.
- Backend URI hardcodeada en `server.js` — no hay `.env` aún.
- MongoDB en Docker — si el container no corre, el backend falla silenciosamente.
