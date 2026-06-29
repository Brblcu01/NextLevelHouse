import { motion, useMotionValue, useSpring } from "framer-motion";
import { Play, ScanLine } from "lucide-react";
import { media, trustDetails } from "../data/siteData";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { MagneticButton } from "./ui/MagneticButton";

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const smoothX = useSpring(x, { stiffness: 80, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 24 });

  return (
    <section
      className="hero-section"
      id="top"
      onPointerMove={(event) => {
        if (prefersReducedMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - bounds.left) / bounds.width) * 100);
        y.set(((event.clientY - bounds.top) / bounds.height) * 100);
      }}
    >
      <motion.div
        className="hero-spotlight"
        style={{
          "--spotlight-x": smoothX,
          "--spotlight-y": smoothY,
        } as React.CSSProperties}
        aria-hidden="true"
      />

      <div className="vertical-brand" aria-hidden="true">
        Hospitality film service
      </div>

      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={prefersReducedMotion ? false : { y: 32, opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">NEXT LEVEL HOUSE / 48H DELIVERY</p>
          <h1 className="hero-title">
            <span>Trasformiamo le foto</span>
            <span>della tua struttura</span>
            <span>
              in un video <em>cinematografico.</em>
            </span>
          </h1>
        </motion.div>

        <motion.figure
          className="hero-media"
          initial={prefersReducedMotion ? false : { clipPath: "inset(18% 0 18% 0)" }}
          animate={prefersReducedMotion ? undefined : { clipPath: "inset(0% 0 0% 0)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <img
            src={media.hero}
            alt="Interno elegante di una struttura ricettiva valorizzata da luce calda"
            width="1800"
            height="1200"
            fetchPriority="high"
          />
          <figcaption>
            <ScanLine aria-hidden="true" size={16} />
            FRAME 01 / 16:9 MASTER
          </figcaption>
        </motion.figure>

        <div className="hero-note">
          <p>
            Senza sopralluoghi, senza troupe e senza interrompere l'attività. Ricevi contenuti
            pronti per annunci, sito web e social in 48 ore.
          </p>
          <div className="hero-actions">
            <MagneticButton href="#richiesta">Richiedi un'anteprima</MagneticButton>
            <MagneticButton href="#trasformazione" variant="ghost">
              <Play aria-hidden="true" size={16} />
              Guarda la trasformazione
            </MagneticButton>
          </div>
        </div>

        <div className="hero-phone" aria-label="Anteprima formato verticale">
          <img
            src={media.heroMobile}
            alt="Camera luminosa in formato verticale per contenuti social"
            width="900"
            height="1350"
          />
          <span>9:16 / social cut</span>
        </div>

        <dl className="hero-meta" aria-label="Dettagli servizio">
          {trustDetails.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
