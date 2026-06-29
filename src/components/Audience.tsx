import { useState } from "react";
import { motion } from "framer-motion";
import { audiences } from "../data/siteData";

export function Audience() {
  const [active, setActive] = useState(0);
  const selected = audiences[active];

  return (
    <section className="audience-section" aria-labelledby="audience-title">
      <div className="audience-visual">
        <motion.img
          key={selected.image}
          src={selected.image}
          alt=""
          width="1400"
          height="933"
          loading="lazy"
          initial={{ opacity: 0.35, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
        />
        <span aria-hidden="true">{selected.index}</span>
      </div>

      <div className="audience-index">
        <p className="eyebrow">Per chi è pensato</p>
        <h2 id="audience-title">Un indice editoriale per chi vive di prenotazioni.</h2>
        <div className="audience-list" role="list">
          {audiences.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={active === index ? "is-active" : ""}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              role="listitem"
            >
              <span>{item.index}</span>
              <strong>{item.title}</strong>
              <em>{item.text}</em>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
