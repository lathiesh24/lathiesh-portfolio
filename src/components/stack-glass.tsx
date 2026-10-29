'use client';
import { useEffect, useRef, useState } from 'react';
import { X, Plus, MousePointerClick } from 'lucide-react';
import { brandIcon } from '@/lib/brand-icons';

function symbol(name: string) {
  const words = name.split(/[\s/.\-]+/).filter(Boolean);
  if (words.length === 1) return words[0].length <= 3 ? words[0] : words[0][0].toUpperCase() + words[0][1].toLowerCase();
  return words[0][0].toUpperCase() + words[words.length - 1][0].toLowerCase();
}

const aliases: Record<string, string[]> = {
  'Vertex AI Gemini': ['Gemini'],
  'Google Maps / Places': ['Google Maps/Places', 'Google Maps'],
  'Neon PostgreSQL': ['Neon'],
};
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
// Claude must not match "Claude Code", which is a different tool.
const source = (name: string) => (name === 'Claude' ? 'Claude(?! Code)' : [name, ...(aliases[name] ?? [])].sort((a, b) => b.length - a.length).map(escape).join('|'));
const matcher = (name: string) => new RegExp(`(?<![\\w])(${source(name)})(?![\\w])`, 'i');

function Marked({ text, name }: { text: string; name: string }) {
  return <>{text.split(matcher(name)).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}</>;
}

type Active = { name: string; group: string };

export default function StackGlass({ groups, company, contributions, notes }: { groups: { label: string; items: string[] }[]; company: string; contributions: string[]; notes: Partial<Record<string, string>> }) {
  const [active, setActive] = useState<Active | null>(null);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = previous; };
  }, [open]);

  const tilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    const tile = e.currentTarget.querySelector<HTMLElement>('.sg-tile');
    if (!tile) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tile.style.setProperty('--ry', `${(x * 46).toFixed(1)}deg`);
    tile.style.setProperty('--rx', `${(-y * 46).toFixed(1)}deg`);
  };
  const reset = (e: React.PointerEvent<HTMLButtonElement>) => {
    const tile = e.currentTarget.querySelector<HTMLElement>('.sg-tile');
    tile?.style.setProperty('--ry', '0deg');
    tile?.style.setProperty('--rx', '0deg');
  };

  const panelTilt = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    panel.current?.style.setProperty('--ay', `${(x * 12).toFixed(2)}deg`);
    panel.current?.style.setProperty('--ax', `${(-y * 9).toFixed(2)}deg`);
  };
  const panelReset = () => {
    panel.current?.style.setProperty('--ax', '0deg');
    panel.current?.style.setProperty('--ay', '0deg');
  };

  const choose = (name: string, group: string) => { setActive({ name, group }); setOpen(true); };
  const icon = active ? brandIcon(active.name) : undefined;
  const hits = active ? contributions.filter(c => matcher(active.name).test(c)) : [];
  const note = active ? notes[active.name] : undefined;

  return (
    <div className="sg" role="group" aria-label={`Tools used at ${company}`}>
      <p className="sg-hint"><MousePointerClick size={16} aria-hidden="true" />Click or tap any tool to see how I used it</p>
      {groups.map((g, gi) => (
        <div className="sg-row" key={g.label}>
          <p className="sg-label">{g.label}</p>
          <div className="sg-tiles">
            {g.items.map((name, i) => {
              const src = brandIcon(name);
              return (
                <button type="button" className="sg-item" key={name} onClick={() => choose(name, g.label)} onPointerMove={tilt} onPointerLeave={reset} aria-label={`${name}: how I used it at ${company}`}>
                  <span className={`sg-tile s${(gi + i) % 3}${(gi + i) % 2 ? ' l' : ''}`}>
                    <span className="sg-shape" aria-hidden="true" />
                    <span className="sg-glass">
                      {src ? <img src={src} alt="" width="36" height="36" /> : <b>{symbol(name)}</b>}
                      <span className="sg-plus" aria-hidden="true" style={{ animationDelay: `${(gi * 7 + i) * 0.12}s` }}><Plus size={13} strokeWidth={2.6} /></span>
                    </span>
                    <i className="sg-spark" aria-hidden="true" />
                  </span>
                  <span className="sg-name">{name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className={`sg-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`sg-drawer${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open} aria-label={active ? `How I used ${active.name}` : 'Tool details'} onPointerMove={panelTilt} onPointerLeave={panelReset}>
        <div className="sg-3d">
          <div className="sg-tilt" ref={panel}>
            <span className="sg-plate p3" aria-hidden="true" />
            <span className="sg-plate p2" aria-hidden="true" />
            <div className="sg-panel">
              <button type="button" className="sg-close" onClick={() => setOpen(false)} aria-label="Close" tabIndex={open ? 0 : -1}><X size={18} /></button>
              {active && (
                <>
                  <div className="sg-d-head">
                    <div className="sg-d-3dicon">
                      <span className="sg-tile s1">
                        <span className="sg-shape" aria-hidden="true" />
                        <span className="sg-glass">{icon ? <img src={icon} alt="" width="36" height="36" /> : <b>{symbol(active.name)}</b>}</span>
                        <i className="sg-spark" aria-hidden="true" />
                      </span>
                    </div>
                    <div>
                      <p className="sg-d-group">{active.group}</p>
                      <h3>{active.name}</h3>
                    </div>
                  </div>
                  <div className="sg-d-scroll">
                    <p className="sg-d-kicker">How it's used at {company}</p>
                    {note
                      ? <p className="sg-d-note">{note}</p>
                      : hits.length > 0
                        ? hits.map(h => <p className="sg-d-card" key={h}><Marked text={h} name={active.name} /></p>)
                        : <p className="sg-d-empty">No specific note for {active.name} yet. It is part of the {active.group.toLowerCase()} stack at {company}.</p>}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
