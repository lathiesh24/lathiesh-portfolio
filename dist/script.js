const cases = {
  corvus: {
    category: 'CORVUS / AGENTS & DATA',
    title: 'From a company name to a cited research report.',
    content: `<p>At Corvus, I architected a multi-step agentic research pipeline for chemical-industry sales intelligence. Tool-using LLM agents research a company’s products, facilities, and operations, producing a report with citations.</p><h3>My contribution</h3><ul><li>Designed the pipeline around parallel stages on Trigger.dev, with execution that can resume after a failure.</li><li>Engineered batch and real-time enrichment and classification over a dataset of approximately 200,000 companies, including entity matching and deduplication.</li><li>Built evaluation harnesses with ground-truth datasets and precision/recall scoring to benchmark model and prompt changes.</li><li>Worked on context management and persisted state in the Claude-based agent harness, and built MCP tools for EPA facility data.</li></ul><h3>Engineering decisions</h3><p>Used prompt caching, models sized to individual stages, and cost telemetry to reduce LLM spend. Monitoring, backfills, data repairs, and job recovery were part of operating the system alongside the full-stack product.</p><h3>Selected stack</h3><p>Vertex AI Gemini, OpenAI, Claude, Exa AI, Trigger.dev, Vercel AI SDK, FastAPI, Neon PostgreSQL, React, TypeScript, Render.</p><p class="case-note">Professional work at Corvus. The diagram is a conceptual overview of the workflow described here.</p>`
  },
  tia: {
    category: 'THE YELLOW NETWORK / RETRIEVAL',
    title: 'Tia: a RAG assistant for TVS Supply Chain Solutions.',
    content: `<p>I co-built Tia from scratch with one other engineer. The assistant answers visitor support questions and captures sales-qualified leads into HubSpot CRM for TVS Supply Chain Solutions.</p><h3>Architecture & retrieval</h3><ul><li>Designed a serverless architecture with AWS Lambda, Pinecone, and AWS Bedrock, including cold-start tuning.</li><li>Combined semantic search and targeted service queries using Reciprocal Rank Fusion.</li><li>Used a fast model to extract metadata filters and a stronger model to generate answers, balancing retrieval quality, cost, and latency.</li></ul><h3>Evaluation</h3><p>Built a 150-query evaluation suite tracking retrieval success, response latency, link relevance, and category coverage. Failing queries guided each round of retrieval improvements.</p><h3>My role</h3><p>Co-development of the assistant, serverless architecture, hybrid retrieval, and retrieval evaluation.</p><a class="text-link" href="https://www.tvsscs.com" target="_blank" rel="noopener noreferrer">Visit TVS SCS <span>↗</span></a><p class="case-note">Professional work delivered through The Yellow Network. The linked destination is the customer’s website.</p>`
  },
  saramsa: {
    category: 'SARAMSA / INDEPENDENT PRODUCT',
    title: 'Turn customer feedback into roadmap priorities.',
    content: `<p>I built and launched Saramsa.ai, an LLM-powered platform that brings customer feedback into a shared workflow and turns it into prioritized roadmap tasks.</p><h3>The workflow</h3><ul><li>Pull feedback from Slack, email, Jira, Azure DevOps, Asana, and Linear.</li><li>Group the feedback into themes with LLMs.</li><li>Turn those themes into prioritized roadmap tasks.</li></ul><h3>What I built</h3><p>The product spans integrations, AI processing, backend services, and the frontend experience.</p><h3>Stack</h3><p>OpenAI, Next.js, FastAPI, Neon PostgreSQL, Azure.</p><a class="text-link" href="https://saramsa.ai" target="_blank" rel="noopener noreferrer">Visit Saramsa.ai <span>↗</span></a>`
  },
  nifo: {
    category: 'THE YELLOW NETWORK / FULL-STACK & AI',
    title: 'Nifo: an AI co-innovation workflow platform.',
    content: `<p>As one of two core developers, I co-built Nifo end to end, working directly with the founder at The Yellow Network.</p><h3>Product engineering</h3><p>Built across a Django and PostgreSQL backend and a Next.js/TypeScript frontend, including secure authentication and per-user access control.</p><h3>AI workflows</h3><p>Developed RAG-based agents for document generation, enterprise insights, and solution and provider search using LangChain, OpenAI, open-source LLMs, and ThirdAI NeuralDB for semantic indexing and retrieval.</p><h3>Data & deployment</h3><p>Deployed and scaled LLM endpoints on Azure AI Foundry and Azure VMs. Built Selenium scraping and preprocessing pipelines that produced structured, LLM-ready datasets.</p><p class="case-note">Professional work at The Yellow Network.</p>`
  }
};
const dialog = document.getElementById('project-dialog');
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = cases[button.dataset.project];
    document.getElementById('dialog-category').textContent = project.category;
    const title = document.createElement('h2');
    title.id = 'dialog-title';
    title.textContent = project.title;
    const content = document.getElementById('dialog-content');
    content.innerHTML = project.content;
    content.prepend(title);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  });
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
document.getElementById('year').textContent = new Date().getFullYear();
