# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## XXL Hollandse Spellen — checklist vóór livegang
- [ ] Domein invullen in `src/config/site.ts` (`domain`) → canonical + structured data
- [x] E-mailadres ingevuld
- [ ] Activatiemail van FormSubmit in Gmail bevestigen (eenmalig)
- [ ] Foto van pittenzak gooien + foto van Eric & Timo toevoegen (`src/config/site.ts`)
- [ ] Echt logo plaatsen in `src/components/site/Header.tsx` en favicon in `public/`
- [ ] Privacytekst laten controleren (`src/routes/privacy.tsx`)
- [ ] `public/sitemap.xml` maken met het definitieve domein en indienen in Google Search Console

Aanvragen uit het formulier worden opgeslagen in Lovable Cloud → Database → `booking_requests`.
Prijzen, spellen en contactnummers staan centraal in `src/config/site.ts`.
