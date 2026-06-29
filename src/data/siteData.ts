import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Film, Frame, Images, Send, Smartphone, TimerReset } from "lucide-react";

export type PackageId = "wide" | "combo" | "shorts";

export type Package = {
  id: PackageId;
  name: string;
  badge?: string;
  launchPrice: string;
  standardPrice: string;
  description: string;
  includes?: string[];
  cta: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

export const media = {
  hero:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=82",
  heroMobile:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82",
  before:
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
  after:
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=82",
  process:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
  host:
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
  manager:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
  hotel:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
  final:
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=82",
};

export const trustDetails = [
  { label: "Metodo", value: "100% da remoto" },
  { label: "Delivery", value: "48 ore" },
  { label: "Output", value: "16:9 + 9:16" },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Invia le foto",
    text: "Utilizziamo le immagini che hai già, senza organizzare sopralluoghi o appuntamenti.",
    icon: Images,
  },
  {
    number: "02",
    title: "Creiamo il video",
    text: "Trasformiamo le fotografie in una presentazione dinamica, emozionale e professionale.",
    icon: Film,
  },
  {
    number: "03",
    title: "Ricevi i contenuti",
    text: "Ricevi formati orizzontali e verticali pronti per annunci, sito web e social.",
    icon: Send,
  },
];

export const benefits = [
  {
    title: "100% da remoto",
    text: "Utilizziamo le fotografie già disponibili. Nessun sopralluogo e nessuna interruzione dell'attività.",
    marker: "REMOTE / 00",
    icon: TimerReset,
  },
  {
    title: "Più valore percepito",
    text: "Il movimento, il montaggio e la componente emozionale aiutano la struttura a distinguersi dalle fotografie statiche.",
    marker: "VALUE / 01",
    icon: ArrowUpRight,
  },
  {
    title: "Pronti per i social",
    text: "Ricevi contenuti verticali progettati per Instagram Reels, TikTok e campagne social.",
    marker: "SOCIAL / 02",
    icon: Smartphone,
  },
  {
    title: "Immagine più professionale",
    text: "Presenta la struttura con una comunicazione moderna e coerente su tutti i canali.",
    marker: "BRAND / 03",
    icon: Frame,
  },
];

export const audiences = [
  {
    title: "Host Airbnb",
    text: "Valorizza il tuo alloggio con contenuti più emozionali e professionali.",
    image: media.host,
    index: "I",
  },
  {
    title: "Property Manager",
    text: "Crea una comunicazione coerente e scalabile per più immobili.",
    image: media.manager,
    index: "II",
  },
  {
    title: "Boutique Hotel e B&B",
    text: "Racconta camere, ambienti e atmosfera attraverso contenuti pensati per il web e i social.",
    image: media.hotel,
    index: "III",
  },
];

export const packages: Package[] = [
  {
    id: "wide",
    name: "Video Cinematografico 16:9",
    launchPrice: "€149",
    standardPrice: "€249",
    description: "Ottimizzato per annunci, sito web e presentazioni della struttura.",
    cta: "Scegli Video 16:9",
  },
  {
    id: "combo",
    name: "Combo Total Marketing",
    badge: "Più scelto",
    launchPrice: "€199",
    standardPrice: "€349",
    includes: ["1 video orizzontale 16:9", "3 video verticali 9:16"],
    description: "La soluzione completa per annunci e promozione social.",
    cta: "Scegli la Combo",
  },
  {
    id: "shorts",
    name: "Social Shorts 9:16",
    launchPrice: "€99",
    standardPrice: "€149",
    includes: ["3 video verticali"],
    description: "Contenuti pronti per Instagram Reels e TikTok.",
    cta: "Scegli Social Shorts",
  },
];

export const faqs = [
  {
    question: "Devo organizzare un sopralluogo?",
    answer:
      "No. Il servizio è costruito per lavorare sulle fotografie che hai già, senza visite in struttura e senza appuntamenti.",
  },
  {
    question: "Quali fotografie devo inviare?",
    answer:
      "Sono ideali immagini luminose degli ambienti principali, dettagli distintivi, esterni, vista e aree comuni. Ti guideremo nella selezione prima della lavorazione.",
  },
  {
    question: "Posso utilizzare i video sui social?",
    answer:
      "Sì. Puoi richiedere formati verticali pronti per Instagram Reels, TikTok e campagne social.",
  },
  {
    question: "Quanto tempo richiede la consegna?",
    answer:
      "La consegna standard è entro 48 ore dalla ricezione del materiale fotografico e delle informazioni necessarie.",
  },
  {
    question: "Posso chiedere modifiche?",
    answer:
      "Sì. Dopo la prima consegna puoi indicare eventuali rifiniture su ritmo, testi o dettagli visivi.",
  },
  {
    question: "Come riceverò i file?",
    answer:
      "Riceverai un link per scaricare i file finali nei formati concordati, pronti da caricare sui tuoi canali.",
  },
];
