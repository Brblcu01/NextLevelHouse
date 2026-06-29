import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { media } from "../data/siteData";
import { SectionLabel } from "./ui/SectionLabel";

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export function Transformation() {
  const [position, setPosition] = useState(54);
  const [playing, setPlaying] = useState(true);
  const frameRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const bounds = frame.getBoundingClientRect();
    setPosition(clamp(((clientX - bounds.left) / bounds.width) * 100));
  };

  return (
    <section className="transformation-section" id="trasformazione">
      <SectionLabel eyebrow="Prima / Dopo" title="Una fotografia entra in scena." />

      <div className="transformation-frame-wrap">
        <div
          className="comparison-frame"
          ref={frameRef}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            updateFromClientX(event.clientX);
          }}
          onPointerMove={(event) => {
            if (event.buttons !== 1) return;
            updateFromClientX(event.clientX);
          }}
        >
          <img
            className="comparison-image comparison-image--before"
            src={media.before}
            alt="Foto originale di un soggiorno prima del trattamento video"
            width="1600"
            height="1067"
            loading="lazy"
          />
          <div className="comparison-reveal" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
            <motion.img
              className="comparison-image comparison-image--after"
              src={media.after}
              alt="Fotogramma cinematografico dello stesso ambiente con luce e atmosfera valorizzate"
              width="1600"
              height="1067"
              loading="lazy"
              animate={playing ? { scale: [1, 1.035, 1] } : { scale: 1 }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <input
            className="comparison-range"
            type="range"
            min="0"
            max="100"
            value={position}
            aria-label="Controlla il confronto tra foto originale e video cinematografico"
            onChange={(event) => setPosition(Number(event.target.value))}
          />
          <div className="comparison-handle" style={{ left: `${position}%` }} aria-hidden="true" />

          <div className="comparison-label comparison-label--before">Foto originale</div>
          <div className="comparison-label comparison-label--after">Video cinematografico</div>
          <div className="timeline-strip" aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => (
              <span key={index} className={index < position / 6.25 ? "is-active" : ""} />
            ))}
          </div>
        </div>

        <aside className="transformation-panel">
          <span>00:07:14</span>
          <h3>Da archivio fotografico a sequenza pronta per la pubblicazione.</h3>
          <p>
            Il confronto è controllabile con mouse, touch e tastiera. La composizione mantiene la
            foto riconoscibile, ma la porta dentro un ritmo più narrativo.
          </p>
          <button
            type="button"
            className="transport-control"
            onClick={() => setPlaying((value) => !value)}
            aria-pressed={playing}
          >
            {playing ? <Pause aria-hidden="true" size={16} /> : <Play aria-hidden="true" size={16} />}
            {playing ? "Pausa movimento" : "Riprendi movimento"}
          </button>
        </aside>
      </div>
    </section>
  );
}
