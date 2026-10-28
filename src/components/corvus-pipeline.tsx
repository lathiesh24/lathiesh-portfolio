const sources = ['Crustdata', 'Exa AI', 'Olostep', 'Riveter', 'EPA via MCP'];
const models = ['Vertex AI Gemini', 'OpenAI', 'Claude'];

const lanes = [
  { label: 'Evaluation', items: ['Ground-truth datasets', 'Precision / recall'] },
  { label: 'Monitoring', items: ['Grafana', 'Slack'] },
  { label: 'Product', items: ['FastAPI', 'Neon PostgreSQL', 'React / TypeScript', 'Render'] },
];

export default function CorvusPipeline() {
  return (
    <figure className="pd" aria-label="Corvus pipeline: company name, data sources, research agents on Trigger.dev, cited report, with evaluation, monitoring and product layers underneath">
      <div className="pd-flow">
        <div className="pd-node pd-in">
          <span>Input</span>
          <b>Company name</b>
        </div>
        <i className="pd-arrow" aria-hidden="true" />
        <div className="pd-node">
          <span>Data sources</span>
          <ul>{sources.map(s => <li key={s}>{s}</li>)}</ul>
        </div>
        <i className="pd-arrow" aria-hidden="true" />
        <div className="pd-node pd-agents">
          <span>Research agents · Trigger.dev</span>
          <p>Tool-using agents. Stages run in parallel and resume after a failure.</p>
          <ul>{models.map(m => <li key={m}>{m}</li>)}</ul>
        </div>
        <i className="pd-arrow" aria-hidden="true" />
        <div className="pd-node pd-out">
          <span>Output</span>
          <b>Cited report</b>
          <p>Products, facilities and operations.</p>
        </div>
      </div>
      <div className="pd-lanes">
        {lanes.map(l => (
          <div key={l.label}>
            <span>{l.label}</span>
            <ul>{l.items.map(i => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </figure>
  );
}
