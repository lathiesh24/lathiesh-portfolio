export const companyLogos: Record<string, string> = { Corvus: 'corvus.png', 'The Yellow Network': 'yellow-network.png', Klisme: 'klisme.png', Travelfika: 'travelfika.png' };
const wordmarks = new Set(['Klisme', 'The Yellow Network']);
export const isWordmark = (name: string) => wordmarks.has(name);

// Display height of each wordmark relative to its slot (default 0.6).
const wordmarkHeight: Record<string, number> = { 'The Yellow Network': 0.9 };

export function CompanyMark({ name, size, alt = '' }: { name: string; size: number; alt?: string }) {
  const file = companyLogos[name];
  if (file && wordmarks.has(name)) return <img src={`/companies/${file}`} alt={alt} style={{ height: Math.round(size * (wordmarkHeight[name] ?? 0.6)), width: 'auto', maxWidth: 'none' }} loading="lazy" />;
  if (file) return <img src={`/companies/${file}`} alt="" width={size} height={size} loading="lazy" />;
  return <span className="pf-mono" style={{ width: size, height: size, fontSize: size * 0.5 }} aria-hidden="true">{name[0]}</span>;
}
