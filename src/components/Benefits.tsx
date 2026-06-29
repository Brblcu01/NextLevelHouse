import { motion } from "framer-motion";
import { benefits } from "../data/siteData";

export function Benefits() {
  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <div className="benefits-heading">
        <div>
          <p className="eyebrow">Perché funziona</p>
          <h2 id="benefits-title">Più valore percepito, senza entrare in struttura.</h2>
        </div>
        <p>
          Il servizio migliora la presentazione della struttura partendo dalle fotografie che hai già:
          più atmosfera, più ritmo, più coerenza sui canali dove gli ospiti decidono.
        </p>
      </div>

      <div className="benefit-composition">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.article
              key={benefit.title}
              className={`benefit-statement benefit-statement--${index + 1}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6 }}
            >
              <span>{benefit.marker}</span>
              <Icon aria-hidden="true" size={24} />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
