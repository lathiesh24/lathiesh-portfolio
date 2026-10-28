'use client';

import dynamic from 'next/dynamic';
import { AnimatePresence, motion, MotionConfig, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Copy, Cpu, Database, ExternalLink, Layers3, Menu, Pause, Play, Plus, Rotate3D, ScanLine, Terminal, X } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { projects, experience, type Project } from '@/lib/projects';

const SystemScene = dynamic(() => import('./system-scene'), { ssr: false, loading: () => <div className="scene-loading"><div className="loading-orbit" /><span>INITIALIZING SYSTEM MAP</span></div> });
const EMAIL = 'lathieshmahendran24@gmail.com';
const accentStyle = (color: string) => ({ '--project-color': color }) as CSSProperties;

function Github({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-4 1.2-4-2-5-2.5M15 22v-3.9c.1-1-.3-1.7-.8-2.1 2.8-.3 5.8-1.4 5.8-6a4.7 4.7 0 0 0-1.3-3.3c.2-.7.6-2.1-.1-3.7 0 0-1.1-.4-3.6 1.3a12.8 12.8 0 0 0-6 0C6.5 2.6 5.4 3 5.4 3c-.7 1.6-.3 3-.1 3.7A4.7 4.7 0 0 0 4 10c0 4.6 3 5.7 5.8 6-.5.4-.9 1.1-.8 2.1V22" /></svg>;
}
function Linkedin({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M11 17v-7m0 3a3 3 0 0 1 6 0v4" /><circle cx="7" cy="7" r=".6" fill="currentColor" /></svg>;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ y: reduced ? 0 : 24 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function ProjectVisual({ id }: { id: string }) {
  if (id === 'corvus') return <div className="research-art" aria-label="Conceptual parallel research workflow"><div className="art-caption"><ScanLine size={13} /> RESEARCH ORCHESTRATION <span>CONCEPTUAL VIEW</span></div><div className="research-input"><span className="small-square" /> Company name <span>→</span></div><div className="branch-trunk" /><div className="agent-row">{['Products', 'Facilities', 'Operations'].map((label, i) => <div key={label}><Cpu size={17} /><strong>{label}</strong><span>RESEARCH AGENT / 0{i + 1}</span></div>)}</div><div className="branch-trunk bottom" /><div className="research-output"><Layers3 size={18} /><div>Cited company report<span>Sources · Synthesis · Structured output</span></div><Check size={15} /></div></div>;
  if (id === 'tia') return <div className="retrieval-art" aria-label="Conceptual hybrid retrieval workflow"><span className="art-overline">HYBRID RETRIEVAL / CONCEPTUAL VIEW</span><div className="query-box"><span>Q</span> Visitor question <ArrowRight size={15} /></div><div className="retrieval-lanes"><div><span>SEMANTIC</span><i /><i /><i /></div><div><span>TARGETED</span><i /><i /><i /></div></div><div className="fusion-box"><span>RRF</span> Reciprocal Rank Fusion <Layers3 size={17} /></div><span className="answer-label">↓ &nbsp; GROUNDED ANSWER + HUBSPOT</span></div>;
  if (id === 'saramsa') return <div className="feedback-art" aria-label="Illustration of feedback themes becoming roadmap tasks"><div className="source-row"><span>Slack</span><span>Jira</span><span>Linear</span><span>+3</span></div><div className="feedback-lines"><i /><i /><i /></div><div className="roadmap-card"><div><span className="small-square" /> Feedback → roadmap <span className="illustration-tag">ILLUSTRATION</span></div><p><span>01</span> Collect feedback <Check size={13} /></p><p><span>02</span> Identify shared themes <Check size={13} /></p><p><span>03</span> Prioritize roadmap tasks <ArrowRight size={13} /></p></div></div>;
  return <div className="nifo-art" aria-label="Nifo architecture layers"><div className="layer-card layer-back"><Database size={18} /><span>DATA & SEMANTIC INDEX</span></div><div className="layer-card layer-middle"><Cpu size={18} /><span>RAG AGENTS</span></div><div className="layer-card layer-front"><Code2 size={18} /><span>PRODUCT WORKFLOWS</span></div><span className="nifo-caption">NEXT.JS / DJANGO / POSTGRESQL</span></div>;
}

function CaseStudy({ project, close }: { project: Project | null; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!project) return;
    const element = dialog.current;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = ''; };
  }, [project]);
  if (!project) return null;
  return <dialog ref={dialog} className="case-dialog" style={accentStyle(project.color)} aria-labelledby="case-title" onCancel={close} onClick={event => { if (event.target === dialog.current) { const r = dialog.current.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close(); } }}>
    <div className="case-top"><span className="mono">PROJECT {project.number} / {project.label}</span><button className="icon-button" onClick={close} aria-label="Close case study"><X size={20} /></button></div>
    <div className="case-body"><span className="case-company">{project.company}</span><h2 id="case-title">{project.name}<span>.</span></h2><p className="case-intro">{project.description}</p>
      <div className="case-metrics">{project.metrics.map(metric => <div key={metric.value}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
      <section><h3>My contribution</h3><p>{project.role}</p></section>
      <section><h3>The system</h3><div className="case-flow">{project.steps.map((step, i) => <div key={step}><span>0{i + 1}</span>{step}{i < 3 && <ArrowRight size={15} />}</div>)}</div><span className="flow-note">Conceptual architecture based on my work on the product.</span></section>
      <section><h3>Engineering decisions</h3><div className="decision-list">{project.decisions.map((decision, i) => <article key={decision.title}><span>0{i + 1}</span><div><h4>{decision.title}</h4><p>{decision.text}</p></div></article>)}</div></section>
      <section><h3>{project.id === 'corvus' || project.id === 'tia' ? 'Evaluation & operation' : 'Delivery'}</h3><p>{project.evaluation}</p></section>
      <div className="case-bottom"><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{project.link && <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel}<ExternalLink size={15} /></a>}</div>
    </div>
  </dialog>;
}

export default function Portfolio() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);
  const [menu, setMenu] = useState(false);
  const [copyState, setCopyState] = useState('Copy email');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const project = projects[selected];
  async function copyEmail() {
    try { await navigator.clipboard.writeText(EMAIL); setCopyState('Copied'); }
    catch { setCopyState('Use the email link'); }
    window.setTimeout(() => setCopyState('Copy email'), 2500);
  }

  return <MotionConfig reducedMotion="user"><div className="portfolio">
    <a className="skip-link" href="#main">Skip to content</a>
    <motion.div className="scroll-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} />
    <header className="header"><div className="shell header-inner"><a href="#" className="brand" aria-label="Lathiesh Mahendran home"><span className="brand-mark">l<span>m</span><i /></span><span className="brand-text">LATHIESH<br /><span>MAHENDRAN</span></span></a><nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Selected work <span>04</span></a><a href="#experience">Experience</a><a href="#about">About</a></nav><a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={16} /></a><button className="mobile-menu icon-button" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)}>{menu ? <X size={21} /> : <Menu size={21} />}</button></div>{menu && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{['Work', 'Experience', 'About', 'Contact'].map(name => <a key={name} href={`#${name.toLowerCase()}`} onClick={() => setMenu(false)}>{name}<ArrowUpRight size={17} /></a>)}</nav>}</header>
    <main id="main">
      <section className="hero shell">
        <div className="hero-copy"><motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="status-label"><span className="status-dot" /> BUILDING AT CORVUS <span className="status-separator">/</span> BASED IN INDIA</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .08, ease: [.22, 1, .36, 1] }}>Lathiesh<br /><span>Mahendran</span><span className="name-period">.</span></motion.h1>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .2 }}><div className="hero-role"><span className="role-line" /> AI & FULL-STACK ENGINEER</div><p className="hero-description">I build the whole thing.<br /><span>The data. The agents. The product.</span></p><p className="hero-subtext">From a research pipeline to the interface people use.<br className="desktop-break" /> Three years of making AI work outside the demo.</p><div className="hero-actions"><a className="primary-button" href="#work">Explore my work <ArrowDown size={17} /></a><a className="github-link" href="https://github.com/lathiesh24" target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={13} /></a></div></motion.div>
          <div className="hero-footnote mono"><span>01 — ENGINEER</span><span>02 — BUILDER</span><span>03 — PROBLEM SOLVER</span></div>
        </div>
        <div className="hero-system" style={accentStyle(project.color)}><div className="system-frame-corner corner-tl" /><div className="system-frame-corner corner-br" /><div className="system-topline mono"><span><span className="tiny-cross">+</span> EXPLORE THE SYSTEMS</span><button className="scene-pause" onClick={() => setPaused(!paused)} aria-label={paused ? 'Resume 3D motion' : 'Pause 3D motion'} aria-pressed={paused}>{paused || reduced ? <Play size={12} /> : <Pause size={12} />}<span>{paused || reduced ? 'STILL' : 'MOTION'}</span></button></div>
          <SystemScene selected={selected} onSelect={setSelected} paused={paused || Boolean(reduced)} />
          <div className="scene-help mono"><Rotate3D size={13} /> DRAG TO ROTATE · SELECT A NODE</div>
          <div className="system-projects" role="group" aria-label="Explore a project">{projects.map((p, i) => <button key={p.id} onClick={() => setSelected(i)} aria-pressed={selected === i} className={selected === i ? 'active' : ''}><span>0{i + 1}</span>{p.name}</button>)}</div>
          <AnimatePresence mode="wait"><motion.button key={project.id} className="system-inspector" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .18 }} onClick={() => setCaseStudy(project)}><span className="inspector-icon"><Cpu size={19} /></span><div><span className="mono">{project.label}</span><strong>{project.name}<span>Explore the architecture</span></strong></div><ArrowUpRight size={19} /></motion.button></AnimatePresence>
        </div>
      </section>
      <section className="signal-strip shell" aria-label="Selected experience"><div><strong>3<span>+</span></strong><p>YEARS AT<br />EARLY-STAGE STARTUPS</p></div><div><strong>~200<span>K</span></strong><p>COMPANIES IN<br />ENRICHMENT PIPELINES</p></div><div><strong>150</strong><p>QUERIES IN TIA’S<br />EVALUATION SUITE</p></div><a href="#work" className="strip-link"><span>REAL SYSTEMS.<br />REAL CONSTRAINTS.</span><ArrowDown size={21} /></a></section>

      <section id="work" className="work-section shell section-space"><Reveal className="section-head"><div><div className="section-kicker"><span>01 / SELECTED WORK</span><i /></div><h2>Less theory.<br /><span>More shipped.</span></h2></div><p>A few systems I’ve built and co-built.<br />Open a project to see how it works<br />and where I contributed.</p></Reveal>
        <div className="project-grid">{projects.map((p, i) => <Reveal key={p.id} className={`project-reveal project-${p.id}`}><article className="project-card" style={accentStyle(p.color)}><div className="card-top"><span className="project-number">/{p.number}</span><span className="mono">{p.label}</span><button className="project-arrow" aria-label={`Open ${p.name} case study`} onClick={() => setCaseStudy(p)}><ArrowUpRight size={20} /></button></div><div className="card-art"><ProjectVisual id={p.id} /></div><div className="card-content"><span className="card-company">{p.company}</span><h3>{p.name}<span> / </span><span className="card-title">{p.title.split('\n')[0]}</span></h3><p>{p.description}</p><div className="card-bottom"><div className="tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="case-link" onClick={() => setCaseStudy(p)}>Case study <ArrowUpRight size={15} /></button></div></div></article></Reveal>)}</div>
      </section>

      <section className="engineering-section"><div className="shell engineering-inner"><Reveal className="engineering-copy"><div className="section-kicker"><span>02 / ENGINEERING INSTINCTS</span><i /></div><h2>The interesting part<br />is <span>making it hold up.</span></h2><p>A good answer is a start. A useful system also needs the right data, sensible model choices, observable failures, and a product people can actually use.</p><div className="engineering-signature"><Terminal size={16} /><span>architecture → evaluation → production</span></div></Reveal><div className="principle-list">{[{ icon: Database, title: 'Start below the prompt.', text: 'Entity matching. Deduplication. Metadata filters. Retrieval quality starts with the data underneath it.' }, { icon: ScanLine, title: 'Measure before changing.', text: 'Ground-truth datasets and evaluation suites make model, prompt, and retrieval changes comparable.' }, { icon: Layers3, title: 'Own the last mile.', text: 'Resumable jobs, cost telemetry, monitoring, and the interface. Shipping means following the system all the way through.' }].map((item, i) => <Reveal key={item.title}><article><span className="principle-icon"><item.icon size={20} /></span><div><span className="mono">0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div></article></Reveal>)}</div></div></section>

      <section id="experience" className="shell section-space"><Reveal className="section-head"><div><div className="section-kicker"><span>03 / THE JOURNEY</span><i /></div><h2>Small teams.<br /><span>A lot of ownership.</span></h2></div><p>From early web development to<br />production AI systems. Always building.</p></Reveal><div className="experience-list">{experience.map((item, i) => <Reveal key={item.company}><details className="experience-item" open={i === 0}><summary><span className="experience-period mono">{item.period}{item.current && <span className="current-tag">NOW</span>}</span><div className="experience-name"><h3>{item.company}</h3><span>{item.role}</span></div><span className="experience-kind">{item.kind}</span><Plus size={20} className="experience-plus" /></summary><div className="experience-detail"><span>{item.location}</span><p>{item.description}</p>{item.phases && <div className="role-phases">{item.phases.map(phase => <span key={phase}>{phase}</span>)}</div>}</div></details></Reveal>)}</div></section>

      <section id="about" className="shell about-section"><Reveal className="about-copy"><div className="section-kicker"><span>04 / BEHIND THE SYSTEMS</span><i /></div><h2>Curious by default.<br /><span>Hands-on by choice.</span></h2><p>I’m Lathiesh, based in Coimbatore, India. I like working close to the problem, with the freedom to think through the architecture and the responsibility to make it work.</p><p>My work moves between AI engineering and full-stack development. I’m as interested in a retrieval failure or a messy dataset as I am in the product experience on the other side.</p><div className="education"><span className="mono">EDUCATION / 2020–2024</span><strong>Government College of Technology,<br />Coimbatore</strong></div></Reveal><Reveal className="toolbox"><div className="toolbox-header"><Code2 size={17} /><span className="mono">TOOLS I BUILD WITH</span><span className="toolbox-dot" /></div>{[{ label: 'INTELLIGENCE', tools: ['Claude', 'OpenAI', 'Gemini', 'Bedrock', 'LangChain', 'MCP'] }, { label: 'DATA & BACKEND', tools: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Pinecone'] }, { label: 'PRODUCT', tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] }, { label: 'OPERATIONS', tools: ['AWS Lambda', 'Trigger.dev', 'Azure', 'Grafana', 'Pytest'] }].map(group => <div className="tool-group" key={group.label}><span className="mono">{group.label}</span><div>{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div>)}</Reveal></section>

      <section className="shell writing-section"><a href="https://www.linkedin.com/pulse/fast-swaps-predictable-costs-cosmos-db-ttl-lathiesh-mahendran-z0koc" target="_blank" rel="noopener noreferrer" className="writing-link"><div className="writing-symbol"><span>{'{ }'}</span></div><div><span className="mono">ENGINEERING NOTES / SEP 2025</span><h3>Fast Swaps, Predictable Costs:<br />Cosmos DB with TTL</h3><p>Batch visibility, retention, and the decisions behind a data pipeline.</p></div><ArrowUpRight size={28} /></a></section>

      <section id="contact" className="contact-section"><div className="contact-grid" aria-hidden="true" /><div className="shell contact-inner"><Reveal><div className="section-kicker"><span>GOOD WORK STARTS WITH A CONVERSATION.</span></div><h2>What are<br />you <span>building?</span><ArrowUpRight className="contact-arrow" /></h2><div className="contact-actions"><a className="primary-button" href={`mailto:${EMAIL}`}>Let’s talk <ArrowUpRight size={18} /></a><button className="copy-button" onClick={copyEmail}>{copyState === 'Copied' ? <Check size={16} /> : <Copy size={16} />}<span aria-live="polite">{copyState}</span></button></div><a href={`mailto:${EMAIL}`} className="contact-email">{EMAIL}</a></Reveal><div className="contact-side"><span className="mono">FIND ME ELSEWHERE</span><a href="https://github.com/lathiesh24" target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={16} /></a><a href="https://www.linkedin.com/in/lathiesh-mahendran/" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={16} /></a><span className="contact-location">Coimbatore, India<br />Working across time zones.</span></div></div></section>
    </main><footer className="shell footer"><span>© {new Date().getFullYear()} Lathiesh Mahendran</span><span className="footer-stack">NEXT.JS × THREE.JS × MOTION</span><a href="#">Back to top <ArrowUpRight size={13} /></a></footer>
    <CaseStudy project={caseStudy} close={() => setCaseStudy(null)} />
  </div></MotionConfig>;
}
