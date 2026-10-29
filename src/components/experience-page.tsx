import { ArrowUpRight, ArrowRight, CalendarDays, Briefcase, MapPin } from 'lucide-react';
import { profile, experience } from '@/lib/profile';
import { slugOf } from '@/lib/slug';
import { CompanyMark, isWordmark } from './company-bits';
import StackGlass from './stack-glass';
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
        <section className="pp-hero ep-hero">
          <div>
            <span className="pp-kind">Experience · 0{index + 1}</span>
            <h1>
              <span className="ep-company">{!isWordmark(role.company) && <CompanyMark name={role.company} size={56} />}{role.company}</span>
              <em>{role.role}</em>
            </h1>
            <p className="pp-lede">{role.description}</p>
            <ul className="ep-chips" aria-label="Role facts">
              <li><CalendarDays size={15} aria-hidden="true" /><span>{role.period}</span></li>
              <li><Briefcase size={15} aria-hidden="true" /><span>{role.kind}</span></li>
              <li><MapPin size={15} aria-hidden="true" /><span>{role.location}</span></li>
              {role.links.map(l => (
                <li key={l.url} className="ep-chip-link">
                  <a href={l.url} target="_blank" rel="noreferrer" aria-label={`Worked on ${l.label}`}>
                    <span>Worked on</span>{l.logo ? <img src={`/companies/${l.logo}`} alt="" height="18" /> : l.label}<ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <main>
        <section className="pp-section">
          <p className="pf-kicker">The stack</p>
          <h2>Tools I <em>used.</em></h2>
          <div className="pp-stack-glass"><StackGlass groups={role.stackGroups} company={role.company} contributions={role.contributions} notes={role.toolNotes} /></div>
        </section>

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
