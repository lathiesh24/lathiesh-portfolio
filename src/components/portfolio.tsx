'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X } from 'lucide-react';
import { profile, experience } from '@/lib/profile';
import { projects } from '@/lib/projects';
import { ProjectVisual } from './project-visual';
import './portfolio.css';

const { email, github, linkedin } = profile.contact;
const nav = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

const companyLogos: Record<string, string> = { Corvus: 'corvus.png', 'The Yellow Network': 'yellow.png', Travelfika: 'travelfika.png' };
const skillIcons: Record<string, string> = { Python: 'python', JavaScript: 'js', TypeScript: 'ts', React: 'react', 'Next.js': 'nextjs', 'Tailwind CSS': 'tailwind', 'Node.js': 'nodejs', Express: 'express', FastAPI: 'fastapi', Django: 'django', 'Neon (PostgreSQL)': 'postgres', MongoDB: 'mongodb', Pinecone: 'pinecone', 'OpenAI API': 'openai', 'Anthropic Claude API': 'claude', 'Google Vertex AI (Gemini)': 'gemini', LangChain: 'langchain', 'AWS Bedrock': 'aws', 'AWS Lambda': 'aws', Azure: 'azure', 'GitHub Actions': 'github', Grafana: 'grafana' };

const process = [
  { n: '01', title: 'Understand the data', text: 'Start from the real data and the real question, before choosing a model.' },
  { n: '02', title: 'Build and evaluate', text: 'Agents and retrieval with ground-truth evaluation, so changes are measured.' },
  { n: '03', title: 'Ship and monitor', text: 'Production product work, with monitoring and fixes once people use it.' },
];

function ToolDeck({ groups, company }: { groups: { label: string; items: string[] }[]; company: string }) {
  return (
    <div className="pf-tools" role="group" aria-label={`Tools used at ${company}`}>
      <span className="pf-tools-title">Tools</span>
      <div className="pf-tools-deck">
        {groups.map((g, i) => (
          <div className="pf-tool-card" key={g.label} style={{ '--i': i } as React.CSSProperties}>
            <h4>{g.label}</h4>
            <ul>{g.items.map(t => <li key={t}>{t}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const kinds: Record<string, string> = {
  corvus: 'Agentic research platform',
  tia: 'Production RAG',
  nifo: 'AI workflows and search',
  saramsa: 'AI product',
};
const work = ['corvus', 'tia', 'nifo', 'saramsa'].map(id => projects.find(p => p.id === id)!);

export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [skillGroup, setSkillGroup] = useState('All');
  const visibleSkills = profile.skills.filter(g => skillGroup === 'All' || g.group === skillGroup);

  return (
    <div className="pf">
      <a className="skip-link" href="#about">Skip to content</a>
      <div className="pf-stage">
        <header className="pf-header">
          <a href="#home" className="pf-wordmark" aria-label="Lathiesh home">lm<span>↗</span></a>
          <nav aria-label="Main navigation" className={menu ? 'open' : ''}>
            {nav.map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenu(false)}>{n}</a>)}
          </nav>
          <a className="pf-email" href={`mailto:${email}`}>Get in touch <ArrowUpRight size={15} /></a>
          <button className="pf-menu" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        </header>

        <section className="pf-hero" id="home">
          <span className="pf-pill"><i /> Currently building at Corvus</span>
          <h1>
            <span>Lathiesh Mahendran</span>
            <em>AI &amp; Full-Stack Engineer</em>
          </h1>
          <p className="pf-sub">I build AI agents, retrieval systems, and the full-stack products around them, from the data layer to the product people use.</p>
          <div className="pf-actions">
            <a className="pf-primary" href={`mailto:${email}`}>Email me <ArrowUpRight size={17} /></a>
            <a className="pf-secondary" href="#projects">See my work <ArrowRight size={16} /></a>
            <a className="pf-secondary" href="/Lathiesh_Mahendran_Resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
          </div>
        </section>
      </div>

      <main>
        <section className="pf-logos" aria-label="Where I have worked">
          <span>Where I’ve built</span>
          <ul>{Object.entries(companyLogos).map(([name, file]) => <li key={name}><img src={`/companies/${file}`} alt="" width="28" height="28" /> {name}</li>)}</ul>
        </section>

        <section className="pf-section" id="about">
          <p className="pf-kicker">About</p>
          <h2>Curious by nature. <em>Hands-on by choice.</em></h2>
          <div className="pf-about">
            <p className="pf-lead">{profile.about[0]}</p>
            <div><p>{profile.about[1]}</p><p>{profile.about[2]}</p></div>
          </div>
          <ol className="pf-steps">{process.map(p => <li key={p.n}><span>{p.n}</span><h3>{p.title}</h3><p>{p.text}</p></li>)}</ol>
        </section>

        <section className="pf-section" id="experience">
          <p className="pf-kicker">Experience</p>
          <h2>Where I’ve <em>made things happen.</em></h2>
          <div className="pf-exp">
            {experience.map((role, i) => (
              <article className="pf-exp-row" key={role.company}>
                <div className="pf-exp-date"><span>0{i + 1}</span><p>{role.period}</p>{role.current && <b>NOW</b>}</div>
                <div className="pf-exp-main">
                  <div className="pf-exp-head">
                    {companyLogos[role.company] && <img src={`/companies/${companyLogos[role.company]}`} alt="" width="40" height="40" loading="lazy" />}
                    <h3>{role.company}</h3>
                  </div>
                  <p className="pf-role">{role.role} <span>· {role.kind}</span></p>
                  <p>{role.description}</p>
                  <ul className="pf-bullets">{role.contributions.map(s => <li key={s}>{s}</li>)}</ul>
                </div>
                <div className="pf-exp-side">
                  <span className="pf-exp-loc">{role.location}</span>
                  <ToolDeck groups={role.stackGroups} company={role.company} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pf-section" id="projects">
          <p className="pf-kicker">Selected work</p>
          <h2>Things I’ve <em>built and shipped.</em></h2>
          <div className="pf-projects">
            {work.map((p, i) => (
              <article className="pf-proj" key={p.id}>
                <a className="pf-proj-visual" href={`/projects/${p.id}/`} aria-label={`${p.name} project page`}><ProjectVisual project={p} /></a>
                <div className="pf-proj-text">
                  <span className="pf-proj-index">0{i + 1}</span>
                  <span className="pf-proj-kind">{kinds[p.id]}</span>
                  <h3>{p.name}</h3>
                  <p className="pf-proj-title">{p.title.split('\n').map((l, n) => <span key={n}>{n > 0 && <br />}{l}</span>)}</p>
                  <p className="pf-proj-desc">{p.description}</p>
                  <div className="pf-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                  <a className="pf-know" href={`/projects/${p.id}/`}>Know more <ArrowRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pf-section" id="skills">
          <p className="pf-kicker">Skills</p>
          <h2>The tools <em>behind the work.</em></h2>
          <div className="pf-filters" role="group" aria-label="Filter skills">
            {['All', ...profile.skills.map(g => g.group)].map(g => <button key={g} aria-pressed={skillGroup === g} onClick={() => setSkillGroup(g)}>{g}</button>)}
          </div>
          <div className="pf-skills">
            {visibleSkills.map(group => (
              <div key={group.group}>
                <h3>{group.group}</h3>
                <ul>{group.items.map(item => <li key={item}>{skillIcons[item] && <img src={`/skills/${skillIcons[item]}.svg`} alt="" width="20" height="20" loading="lazy" />}{item}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="pf-contact" id="contact">
          <h2>Have something <em>in mind?</em></h2>
          <a className="pf-primary" href={`mailto:${email}`}>{email} <ArrowUpRight size={17} /></a>
          <div className="pf-links"><a href={github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="/Lathiesh_Mahendran_Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a></div>
        </section>
      </main>

      <footer className="pf-footer"><span>© {new Date().getFullYear()} Lathiesh Mahendran</span><a href="#home">Back to top ↑</a></footer>
    </div>
  );
}
