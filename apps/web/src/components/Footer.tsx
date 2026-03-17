export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <div className="container-shell footer-inner">
        <div className="footer-brand">
          <span className="mono">© {year} gianpc.com</span>
          <p>gianpc</p>
        </div>

        <div className="footer-icons" aria-label="Redes y contacto">
          <a href="https://www.linkedin.com/in/gian-pc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/gian-pc" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href="mailto:gpaucarcortez@gmail.com" aria-label="Email">
            <MailIcon />
          </a>
          <a href="/CV_GianPaucarCortez.pdf" download aria-label="Descargar CV">
            <DownloadIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.5 0-.24-.01-1.03-.02-1.87-2.78.62-3.37-1.2-3.37-1.2-.45-1.2-1.11-1.52-1.11-1.52-.91-.62.07-.61.07-.61 1 .07 1.54 1.05 1.54 1.05.89 1.58 2.34 1.12 2.92.85.09-.66.35-1.12.64-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.38-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 6.89c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.54 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.31.68.94.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.24C22 6.59 17.52 2 12 2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V19h3.38zM5.24 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94M20.44 12.58c0-3.16-1.69-4.64-3.95-4.64-1.82 0-2.64 1-3.1 1.71V8.5H10V19h3.38v-5.2c0-1.37.26-2.7 1.96-2.7 1.68 0 1.7 1.57 1.7 2.8V19h3.4z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
