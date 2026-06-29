import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "../data/siteData";

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-heading">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-title">Domande essenziali, risposte senza rumore.</h2>
      </div>

      <div className="faq-list">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-button-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <article key={item.question} className={isOpen ? "is-open" : ""}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.question}
                  <Plus aria-hidden="true" size={20} />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="faq-answer"
                hidden={!isOpen}
              >
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
