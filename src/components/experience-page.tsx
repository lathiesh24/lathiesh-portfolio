import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { profile, experience } from '@/lib/profile';
import { slugOf } from '@/lib/slug';
import { CompanyMark, ToolCode, isWordmark } from './company-bits';
import './portfolio.css';

export default function ExperiencePage({ index }: { index: number }) {
  const role = experience[index];
  const next = experience[(index + 1) % experience.length];
  const { email, github, linkedin } = profile.contact;
  return (
    <div className="pf">
      <div className="pf-stage">
        <header className="pf-header">
          <a href="/" className="pf-wordmark" aria-label="Lathiesh home">lm<span>↗</span></a>
          <a className="pp-back" href="/#experience" style={{ marginLeft: 'auto' }}>← All experience</a>
          <a className="pf-email" href={`mailto:${email}`}>Get in touch <ArrowUpRight size={15} /></a>
        </header>
        <section className="pp-hero">
          <div>
            <span className="pp-kind">Experience · 0{index + 1}</span>
            <h1>
              <span className="ep-company">{!isWordmark(role.company) && <CompanyMark name={role.company} size={56} />}{role.company}</span>
              <em>{role.role}</em>
            </h1>
            <p className="pp-company">{role.period} · {role.kind} · {role.location}</p>
            <p className="pp-lede">{role.description}</p>
            {role.links.length > 0 && (
              <p className="pf-worked">Worked on {role.links.map(l => <a key={l.url} href={l.url} target="_blank" rel="noreferrer" aria-label={l.label}>{l.logo ? <img src={`/companies/${l.logo}`} alt={l.label} height="26" /> : l.label} <ArrowUpRight size={13} /></a>)}</p>
            )}
          </div>
          <ToolCode groups={role.stackGroups} company={role.company} />
        </section>
      </div>

      <main>
        <section className="pp-section">
          <p className="pf-kicker">What I did</p>
          <h2>My work <em>there.</em></h2>
          <ol className="pp-built">{role.contributions.map((c, i) => <li key={c}><span>{i + 1}</span><p>{c}</p></li>)}</ol>
        </section>

        <div className="pp-next">
          <a href={`/experience/${slugOf(next.company)}/`}>
            <span>Next role</span>
            <strong>{next.company}</strong>
            <em>{next.role} · {next.period}</em>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </main>

      <footer className="pf-footer">
        <span>© {new Date().getFullYear()} Lathiesh Mahendran</span>
        <span><a href={github} target="_blank" rel="noreferrer">GitHub ↗</a> · <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a> · <a href={`mailto:${email}`}>{email}</a></span>
      </footer>
    </div>
  );
}
