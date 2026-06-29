import { FormEvent, useMemo, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { media, packages, type PackageId } from "../data/siteData";
import { MagneticButton } from "./ui/MagneticButton";

type LeadFormProps = {
  selectedPackage: PackageId;
};

type FormState = {
  property: string;
  email: string;
  phone: string;
  website: string;
};

const initialForm: FormState = {
  property: "",
  email: "",
  phone: "",
  website: "",
};

export function LeadForm({ selectedPackage }: LeadFormProps) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const packageName = useMemo(
    () => packages.find((item) => item.id === selectedPackage)?.name ?? "Combo Total Marketing",
    [selectedPackage],
  );

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "idle") setStatus("idle");
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.property.trim()) nextErrors.property = "Inserisci il nome della struttura.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Inserisci un indirizzo email valido.";
    }
    if (form.phone.trim().length < 7) nextErrors.phone = "Inserisci un recapito valido.";
    if (form.website.trim()) nextErrors.website = "Campo non valido.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setStatus("success");
    setForm(initialForm);
  };

  return (
    <section className="lead-section" id="richiesta" aria-labelledby="lead-title">
      <div className="lead-backdrop" aria-hidden="true">
        <img
          src={media.final}
          alt=""
          width="1600"
          height="1067"
          loading="lazy"
        />
      </div>

      <div className="lead-grid">
        <div className="lead-copy">
          <p className="eyebrow">Scena finale</p>
          <h2 id="lead-title">Guarda come potrebbe apparire la tua struttura.</h2>
          <p>Inviaci i tuoi contatti e richiedi una prima anteprima senza impegno.</p>
          <dl>
            <div>
              <dt>Pacchetto</dt>
              <dd>{packageName}</dd>
            </div>
            <div>
              <dt>Consegna</dt>
              <dd>Entro 48 ore</dd>
            </div>
          </dl>
        </div>

        <form className="lead-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="property">Nome del tuo BNB / Struttura</label>
            <input
              id="property"
              name="property"
              value={form.property}
              onChange={(event) => updateField("property", event.target.value)}
              aria-invalid={Boolean(errors.property)}
              aria-describedby={errors.property ? "property-error" : undefined}
              autoComplete="organization"
            />
            {errors.property && <p id="property-error">{errors.property}</p>}
          </div>

          <div className="form-row">
            <label htmlFor="email">La tua Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              autoComplete="email"
            />
            {errors.email && <p id="email-error">{errors.email}</p>}
          </div>

          <div className="form-row">
            <label htmlFor="phone">Il tuo Recapito (Telefono/WhatsApp)</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              autoComplete="tel"
            />
            {errors.phone && <p id="phone-error">{errors.phone}</p>}
          </div>

          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Sito web</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
            />
          </div>

          <input type="hidden" name="package" value={packageName} />

          <MagneticButton type="submit" disabled={status === "loading"}>
            {status === "loading" && <LoaderCircle className="spin" aria-hidden="true" size={18} />}
            Invia e richiedi l'anteprima gratis
          </MagneticButton>

          <p className="microcopy">I dati verranno utilizzati esclusivamente per elaborare la tua richiesta.</p>
          <div className="form-status" aria-live="polite" role="status">
            {status === "success" &&
              "Grazie! La tua richiesta è stata inviata. Ti contatteremo a breve per preparare la tua anteprima."}
            {status === "error" && "Controlla i campi evidenziati e riprova."}
          </div>
        </form>
      </div>
    </section>
  );
}
