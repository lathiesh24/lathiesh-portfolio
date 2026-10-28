import type { Project } from '@/lib/projects';

function CorvusMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span>Research report</span></div>
      <div className="mock-stages"><b className="done">Input</b><b className="done">Research</b><b className="run">Synthesis</b><b>Report</b></div>
      <div className="mock-title">Example Chemicals Inc.</div>
      {['Products', 'Facilities', 'Operations'].map((s, i) => (
        <div className="mock-result" key={s}><b>{s}</b><div className="mock-lines"><em style={{ width: `${90 - i * 12}%` }} /><em style={{ width: `${68 - i * 6}%` }} /></div></div>
      ))}
    </div>
  );
}

function TiaMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span>Assistant</span></div>
      <div className="bubble you">What services do you offer for cold-chain?</div>
      <div className="bubble bot">We support temperature-controlled logistics across…<span className="chip">Learn more ↗</span></div>
      <div className="bubble you short">Can someone contact me?</div>
      <div className="mock-lead">Lead sent to CRM</div>
    </div>
  );
}

function NifoMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span>Search and generate</span></div>
      <div className="mock-search">Find solution providers…</div>
      {['Provider A', 'Provider B', 'Provider C'].map((p, i) => (
        <div className="mock-result" key={p}><b>{p}</b><div className="mock-lines"><em style={{ width: `${86 - i * 14}%` }} /><em style={{ width: `${60 - i * 8}%` }} /></div></div>
      ))}
      <div className="mock-lead">Generate document</div>
    </div>
  );
}

function SaramsaMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span>Feedback to roadmap</span></div>
      <div className="mock-chips">{['Slack', 'Email', 'Jira', 'Linear'].map(c => <span key={c}>{c}</span>)}</div>
      <div className="mock-themes">{[78, 56, 38].map((w, i) => <div key={i}><span>Theme {i + 1}</span><em style={{ width: `${w}%` }} /></div>)}</div>
      <div className="mock-tasks">{[0, 1, 2].map(i => <div key={i}><b />Prioritized task</div>)}</div>
    </div>
  );
}

const fronts: Record<string, React.ReactNode> = {
  corvus: <CorvusMock />,
  tia: <TiaMock />,
  nifo: <NifoMock />,
  saramsa: <SaramsaMock />,
};

function Ghost({ label }: { label: string }) {
  return (
    <div className="mock ghost" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span>{label}</span></div>
      <div className="ghost-lines"><em /><em /><em /><em /></div>
    </div>
  );
}

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`pf-3d v-${project.id}`}>
      <div className="pf-3d-inner">
        <div className="pf-layer l3"><Ghost label={project.steps[1]} /></div>
        <div className="pf-layer l2"><Ghost label={project.steps[2]} /></div>
        <div className="pf-layer l1">{fronts[project.id]}</div>
      </div>
    </div>
  );
}
