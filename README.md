# gianpc.com

Portfolio personal orientado a backend y cloud, construido como sitio estatico y desplegado en AWS.

## Stack

- Next.js 16 (App Router, `output: "export"`)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- ESLint (config de Next.js)
- npm workspaces (monorepo)

## Arquitectura de despliegue

- DNS: Cloudflare
- Hosting estatico: Amazon S3 (`gianpc.com`)
- CDN y TLS: Amazon CloudFront + ACM (us-east-1)
- Acceso seguro a S3: Origin Access Control (OAC)
- Reescritura de rutas estaticas: CloudFront Function (`/ruta` -> `/ruta/index.html`)
- CI/CD: GitHub Actions con rol de despliegue en AWS
- Datos del card de costos: Lambda + Cost Explorer + JSON en S3 (`/aws/costs/latest.json`)

## Secciones actuales

- Navbar (tema + idioma)
- Hero principal
- Card de control de costos AWS (datos reales desde JSON generado por Lambda)
- Proyectos backend (cards con enlace a repositorios)
- Footer con enlaces de contacto

## Estructura del proyecto

```text
portfolio/
├── apps/
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   └── features/
│       └── public/
├── infra/
│   ├── terraform/           # S3 + CloudFront + ACM + politicas
│   └── lambda/cost-card/    # Lambda que genera latest.json de costos
└── package.json
```

## Comandos locales

Ejecutar desde la raiz del repo:

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
```

## Deploy

El deploy a produccion se ejecuta con GitHub Actions en push a `main`:

1. Build estatico de `apps/web`
2. `aws s3 sync` al bucket
3. Invalidation de CloudFront

Variables usadas por workflow:

- `AWS_ROLE_ARN`
- `AWS_REGION`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID`
