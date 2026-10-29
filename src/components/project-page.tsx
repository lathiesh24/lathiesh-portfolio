import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { profile, experience } from '@/lib/profile';
import type { Project } from '@/lib/projects';
import { ProjectVisual } from './project-visual';
import CorvusPipeline from './corvus-pipeline';
import StackGlass from './stack-glass';
import './portfolio.css';

const kinds: Record<string, string> = {
  corvus: 'Agentic research platform',
  tia: 'Production RAG',
  nifo: 'AI workflows and search',
  saramsa: 'AI product',
};

export default function ProjectPage({ project, next }: { project: Project; next: Project }) {
  const [first, ...rest] = project.title.split('\n');
  const { email, github, linkedin } = profile.contact;
  // Corvus is the same stack as the Corvus job, so it reuses that job's groups and per-tool notes.
  const corvus = project.id === 'corvus';
  const groups = corvus ? experience[0].stackGroups : [{ label: 'Tools and services', items: project.stack ?? [] }];
  const notes = corvus ? experience[0].toolNotes : {};
  return (
    <div className="pf">
      <div className="pf-stage">
        <header className="pf-header">
          <a href="/" className="pf-wordmark" aria-label="Lathiesh home">lm<span>↗</span></a>
          <a className="pp-back" href="/#projects" style={{ marginLeft: 'auto' }}>← All work</a>
          <a className="pf-email" href="/#contact">Get in touch <ArrowUpRight size={15} /></a>
        </header>
        <section className="pp-hero">
          <div>
            <span className="pp-kind">{kinds[project.id]}</span>
            <h1><span>{first}</span><em>{rest.join(' ')}</em></h1>
            <p className="pp-company">{project.company}</p>
            <p className="pp-lede">{project.plain ?? project.description}</p>
            {project.link && <a className="pf-primary" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight size={17} /></a>}
          </div>
          <ProjectVisual project={project} />
        </section>
      </div>

      <main>
        <section className="pp-section">
          <p className="pf-kicker">Why it exists</p>
          <h2>The problem it <em>solves.</em></h2>
          <p className="pp-problem">{project.problem}</p>
        </section>

        <section className="pp-section">
          <p className="pf-kicker">How it works</p>
          <h2>Four steps, <em>start to finish.</em></h2>
          <ol className="pp-flow">{project.steps.map((s, i) => <li key={s}><span>0{i + 1}</span><b>{s}</b>{project.stepNotes?.[i] && <p>{project.stepNotes[i]}</p>}</li>)}</ol>
          {project.id === 'corvus' && <CorvusPipeline />}
        </section>

        <section className="pp-section">
          <p className="pf-kicker">What I built</p>
          <h2>My part <em>in it.</em></h2>
          <ol className="pp-built">{project.contributions?.map((c, i) => <li key={c}><span>{i + 1}</span><p>{c}</p></li>)}</ol>
        </section>

        <section className="pp-section">
          <p className="pf-kicker">Decisions</p>
          <h2>Choices that <em>shaped it.</em></h2>
          <div className="pp-decisions">{project.decisions.map(d => <div key={d.title}><h3>{d.title}</h3><p>{d.text}</p></div>)}</div>
        </section>

        <section className="pp-section">
          <p className="pf-kicker">Technology</p>
          <h2>Built <em>with.</em></h2>
          <div className="pp-stack-glass"><StackGlass groups={groups} company={project.name} contributions={project.contributions ?? []} notes={notes} /></div>
        </section>

        <div className="pp-next">
          <a href={`/projects/${next.id}/`}>
            <span>Next project</span>
            <strong>{next.name}</strong>
            <em>{next.title.replace('\n', ' ')}</em>
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </main>

      <footer className="pf-footer">
        <span>© {new Date().getFullYear()} Lathiesh Mahendran</span>
        <span><a href={github} target="_blank" rel="noreferrer">GitHub ↗</a> · <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a> · <a href="/#contact">{email}</a></span>
      </footer>
    </div>
  );
}
