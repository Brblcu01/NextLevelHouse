import { motion } from "framer-motion";
import { media, processSteps } from "../data/siteData";
import { SectionLabel } from "./ui/SectionLabel";

export function Process() {
  return (
    <section className="process-section" id="processo">
      <SectionLabel eyebrow="Processo" title="Una produzione senza entrare in struttura." align="end" />

      <div className="process-stage">
        <img
          src={media.process}
          alt="Dettaglio architettonico caldo di una casa vacanza"
          width="1400"
          height="933"
          loading="lazy"
        />
        <div className="process-line" aria-hidden="true" />
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.article
              key={step.number}
              className={`process-step process-step--${index + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
            >
              <span>{step.number}</span>
              <Icon aria-hidden="true" size={22} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
