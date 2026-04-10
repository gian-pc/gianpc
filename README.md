# gianpc.com

Portfolio personal orientado a backend y cloud, con frontend estatico en Next.js y servicios serverless en AWS para integraciones puntuales.

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
- Formulario de contacto: API Gateway + Lambda + Amazon SES

## Arquitectura del proyecto

El repositorio esta organizado como un monorepo ligero con dos dominios principales:

- `apps/web`: aplicacion frontend en Next.js 16 con App Router y export estatico.
- `infra/`: definicion de infraestructura y funciones Lambda que soportan datos y contacto.

### Capas

- `src/app`: capa de entrada de Next.js. Define `layout.tsx`, metadata SEO y la composicion de la pagina principal.
- `src/components`: componentes compartidos de layout como `Navbar` y `Footer`.
- `src/features`: modulos por dominio funcional. Actualmente separa `home`, `theme` e `i18n`.
- `public`: assets estaticos, imagenes de proyectos, CV y recursos usados por la UI.
- `infra/terraform`: infraestructura declarativa para hosting, CDN, certificados, API HTTP y permisos IAM.
- `infra/lambda`: logica serverless desacoplada del frontend.

### Responsabilidades por modulo

- `ThemeProvider`: maneja el tema claro/oscuro en cliente.
- `LanguageProvider`: centraliza el idioma (`es`/`en`) y permite reutilizar copy bilingue.
- `home/*`: compone la landing por secciones (`Hero`, `Projects`, `ContactSection`) y encapsula widgets visuales o de datos.
- `cost-card` Lambda: consulta AWS Cost Explorer, calcula resumen mensual y publica `latest.json` en S3 para que el frontend lo consuma.
- `contact-form` Lambda: recibe el formulario desde API Gateway, valida datos basicos y envia el correo con SES.

### Flujo de arquitectura

```text
                         +----------------------+
                         | Usuario / Navegador  |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         |   Cloudflare (DNS)   |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | CloudFront + ACM/OAC |
                         +-----+-----------+----+
                               |           |
                               |           |
                               v           v
                  +------------------+   +----------------------+
                  | S3 static site   |   | /aws/costs/latest    |
                  | Next.js export   |   | JSON consumido por   |
                  | HTML/CSS/JS/img  |   | el frontend          |
                  +--------+---------+   +----------^-----------+
                           |                        |
                           |                        |
                           |              +---------+----------+
                           |              | Lambda cost-card   |
                           |              | consulta costos AWS|
                           |              +---------+----------+
                           |                        |
                           |                        v
                           |              +--------------------+
                           |              | AWS Cost Explorer  |
                           |              +--------------------+
                           |
                           |  POST contacto
                           v
                  +----------------------+
                  | API Gateway HTTP API |
                  +----------+-----------+
                             |
                             v
                  +----------------------+
                  | Lambda contact-form  |
                  +----------+-----------+
                             |
                             v
                  +----------------------+
                  | Amazon SES / Email   |
                  +----------------------+
```

### Decision arquitectonica

- El frontend permanece simple y barato de operar porque se exporta como sitio estatico.
- Las capacidades dinamicas se resuelven fuera de Next.js con Lambdas especializadas.
- La separacion `components` vs `features` evita mezclar layout global con logica de negocio o secciones del home.
- Terraform concentra la infraestructura para que despliegue, permisos y endpoints queden versionados junto al codigo.

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
│       │   ├── app/                 # layout, metadata y rutas
│       │   ├── components/          # layout compartido
│       │   └── features/            # modulos home, theme e i18n
│       └── public/
├── infra/
│   ├── terraform/           # hosting, CDN, API Gateway, SES, IAM y Lambdas
│   └── lambda/
│       ├── cost-card/       # genera latest.json de costos
│       └── contact-form/    # envia mensajes del formulario por SES
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
