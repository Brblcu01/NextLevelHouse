import { Check } from "lucide-react";
import { packages, type PackageId } from "../data/siteData";
import { MagneticButton } from "./ui/MagneticButton";

type PricingProps = {
  selectedPackage: PackageId;
  onSelectPackage: (id: PackageId) => void;
};

export function Pricing({ selectedPackage, onSelectPackage }: PricingProps) {
  const selected = packages.find((item) => item.id === selectedPackage) ?? packages[1];

  const handleSelect = (id: PackageId) => {
    onSelectPackage(id);
    document.getElementById("richiesta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="pricing-section" id="pacchetti" aria-labelledby="pricing-title">
      <div className="pricing-intro">
        <div>
          <p className="eyebrow">Pacchetti</p>
          <h2 id="pricing-title">Tre formati, una sola direzione: più presenza online.</h2>
        </div>
        <p>
          Parti dal formato più utile alla tua struttura. La scelta viene salvata nella richiesta,
          così possiamo preparare l'anteprima sul pacchetto corretto.
        </p>
      </div>

      <div className="pricing-ledger">
        <aside className="pricing-preview" aria-live="polite">
          {selected.badge && <span className="pricing-badge">{selected.badge}</span>}
          <small>Pacchetto selezionato</small>
          <h3>{selected.name}</h3>
          <div className="price-lockup">
            <span>{selected.launchPrice}</span>
            <del>{selected.standardPrice}</del>
          </div>
          <p>{selected.description}</p>
          <MagneticButton href="#richiesta">Vai alla richiesta</MagneticButton>
        </aside>

        <div className="pricing-rows">
          {packages.map((item, index) => (
            <article
              key={item.id}
              className={`pricing-row ${selectedPackage === item.id ? "is-selected" : ""}`}
            >
              <button type="button" onClick={() => handleSelect(item.id)}>
                <span className="pricing-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="pricing-name">
                  {item.badge && <em>{item.badge}</em>}
                  <strong>{item.name}</strong>
                  <small>{item.description}</small>
                </span>
                <span className="pricing-includes">
                  {(item.includes ?? ["1 video orizzontale 16:9"]).map((include) => (
                    <span key={include}>
                      <Check aria-hidden="true" size={15} />
                      {include}
                    </span>
                  ))}
                </span>
                <span className="pricing-price">
                  <strong>{item.launchPrice}</strong>
                  <del>{item.standardPrice}</del>
                </span>
                <span className="pricing-action">{item.cta}</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
