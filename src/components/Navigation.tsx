import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

const links = [
  { href: "#trasformazione", label: "Trasformazione" },
  { href: "#processo", label: "Processo" },
  { href: "#pacchetti", label: "Pacchetti" },
  { href: "#richiesta", label: "Richiesta" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="brand-lockup" href="#top" aria-label="Next Level House home">
        <span>NLH</span>
        <strong>Next Level House</strong>
      </a>

      <nav className="desktop-nav" aria-label="Navigazione principale">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <MagneticButton href="#richiesta" className="nav-cta">
        Anteprima
      </MagneticButton>

      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Chiudi menu" : "Apri menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>

      <div className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} id="mobile-menu">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <MagneticButton href="#richiesta" onClick={() => setOpen(false)}>
          Richiedi un'anteprima
        </MagneticButton>
      </div>
    </header>
  );
}
