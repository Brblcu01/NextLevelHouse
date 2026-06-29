type SectionLabelProps = {
  eyebrow: string;
  title: string;
  align?: "start" | "end";
};

export function SectionLabel({ eyebrow, title, align = "start" }: SectionLabelProps) {
  return (
    <div className={`section-label ${align === "end" ? "section-label--end" : ""}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}
