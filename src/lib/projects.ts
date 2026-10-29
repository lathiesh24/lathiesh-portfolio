import { caseStudyContent } from './profile';
export { experience } from './profile';

export type Project = {
  id: string; number: string; name: string; label: string; title: string;
  description: string; company: string; color: string; tags: string[];
  metrics: { value: string; label: string }[];
  steps: string[]; role: string; decisions: { title: string; text: string }[];
  evaluation: string; link?: string; linkLabel?: string;
  problem?: string; contributions?: string[]; stack?: string[];
  plain?: string; stepNotes?: string[];
};

const projectDesigns: Project[] = [
  {
    id: 'corvus', number: '01', name: 'Corvus', label: 'AGENTIC RESEARCH',
    title: 'A company name in.\nCited intelligence out.',
    description: 'Multi-step research agents that turn a company name into a cited report on its products, facilities, and operations.',
    company: 'Professional work · Corvus', color: '#c3f870',
    tags: ['Agents', 'Tool calling', 'Data pipelines'],
    metrics: [{ value: '~200K', label: 'companies in enrichment pipelines' }, { value: 'Parallel', label: 'resumable research stages' }],
    steps: ['Company input', 'Parallel research', 'Synthesis', 'Cited report'],
    plain: 'Corvus helps salespeople in the chemical industry research companies. You give it a company name, and it gathers what is known about the company’s products, facilities and operations into one report, with the sources cited.',
    stepNotes: [
      'You give it a company name.',
      'AI agents research the company in parallel, and can pick up where they left off if something fails.',
      'The findings are brought together into one clear picture.',
      'A report on the company’s products, facilities and operations, with each claim linked to its source.',
    ],
    role: 'Architected the multi-step research pipeline, engineered enrichment and classification, built evaluation harnesses, and shipped supporting full-stack product features.',
    decisions: [
      { title: 'Recover at the stage level', text: 'Tool-using agents run in parallel on Trigger.dev. Stages can pick up where they left off after a failure instead of repeating the entire research process.' },
      { title: 'Match the model to the task', text: 'The pipeline uses Vertex AI Gemini, OpenAI, Claude, and Exa AI. Prompt caching, right-sized models, and cost telemetry help reduce LLM spend.' },
      { title: 'Build the data layer too', text: 'Batch and real-time enrichment cover a dataset of approximately 200,000 companies, including entity matching and deduplication. MCP tools provide research agents with EPA facility data.' },
      { title: 'Operate it, not just build it', text: 'Slack and Grafana monitoring across services and pipelines brought production error alerts to zero, with the issues it surfaced fixed through backfills, data repairs and job recovery.' },
    ],
    evaluation: 'Ground-truth datasets and precision/recall scoring benchmark model and prompt changes before production. Monitoring, data repairs, backfills, and job recovery support daily operations.',
  },
  {
    id: 'tia', number: '02', name: 'Tia', label: 'PRODUCTION RAG',
    title: 'Better retrieval.\nMore useful answers.',
    description: 'A customer-facing RAG assistant for TVS Supply Chain Solutions, connecting visitor support with lead capture in HubSpot.',
    company: 'Professional work · The Yellow Network', color: '#86b9ff',
    tags: ['Hybrid search', 'Pinecone', 'AWS Bedrock'],
    metrics: [{ value: '150', label: 'queries in the evaluation suite' }, { value: '2', label: 'engineers building from scratch' }],
    steps: ['Visitor question', 'Hybrid retrieval', 'Rank fusion', 'Answer + CRM'],
    plain: 'Tia is a chat assistant on the TVS Supply Chain Solutions website. It answers visitors’ questions about the company’s services and passes sales enquiries on to the sales team.',
    stepNotes: [
      'A visitor asks a question on the website.',
      'The assistant searches the company’s content in two ways at once: by meaning, and by specific service.',
      'The two sets of results are merged into one ranked list, so the best answers come first.',
      'A model writes the answer, and sales enquiries are sent to the sales team in HubSpot.',
    ],
    role: 'Co-built Tia from scratch with one other engineer. Designed the serverless architecture, hybrid retrieval, and retrieval evaluation suite.',
    decisions: [
      { title: 'Combine retrieval strategies', text: 'Semantic search and targeted service queries are merged through Reciprocal Rank Fusion, bringing together complementary retrieval results.' },
      { title: 'Separate filtering from answering', text: 'A fast model extracts Pinecone metadata filters; a stronger model generates the answer. This keeps model choice specific to each stage.' },
      { title: 'Connect the assistant to the business', text: 'AWS Lambda, Pinecone, and AWS Bedrock power the assistant, with cold-start tuning. Sales-qualified leads flow into HubSpot CRM.' },
    ],
    evaluation: 'A 150-query suite tracks success rate, response latency, link relevance, and category coverage. Failing queries guide each round of retrieval improvements.',
    link: 'https://www.tvsscs.com', linkLabel: 'Visit TVS SCS',
  },
  {
    id: 'saramsa', number: '03', name: 'Saramsa', label: 'AI PRODUCT DEVELOPMENT',
    title: 'Customer feedback.\nProduct direction.',
    description: 'An AI platform that brings scattered feedback together, groups it into themes, and turns it into prioritized roadmap tasks.',
    company: 'Built and launched · Saramsa.ai', color: '#c2a2ff',
    tags: ['OpenAI', 'Next.js', 'FastAPI'],
    metrics: [{ value: '6', label: 'feedback sources integrated' }, { value: 'End to end', label: 'product ownership' }],
    steps: ['Feedback sources', 'LLM processing', 'Shared themes', 'Roadmap tasks'],
    plain: 'Saramsa collects customer feedback from the tools teams already use, groups it into themes, and turns those themes into prioritized tasks for the product roadmap.',
    stepNotes: [
      'Feedback is pulled in from Slack, email, Jira, Azure DevOps, Asana and Linear.',
      'An AI model reads through it.',
      'Similar feedback is grouped into shared themes.',
      'The themes become prioritized tasks for the roadmap.',
    ],
    role: 'Built and launched Saramsa.ai across integrations, LLM processing, backend services, and the frontend product experience.',
    decisions: [
      { title: 'Meet feedback where it lives', text: 'The platform pulls feedback from Slack, email, Jira, Azure DevOps, Asana, and Linear.' },
      { title: 'Turn messages into themes', text: 'LLM processing groups customer feedback into themes that can inform product priorities.' },
      { title: 'Carry the output into planning', text: 'Themes become prioritized roadmap tasks. The stack combines OpenAI, Next.js, FastAPI, Neon PostgreSQL, and Azure.' },
    ],
    evaluation: 'Delivered a connected workflow from feedback collection to synthesis and prioritization, backed by OpenAI, Next.js, FastAPI, Neon PostgreSQL, and Azure.',
    link: 'https://saramsa.ai', linkLabel: 'Visit Saramsa.ai',
  },
  {
    id: 'nifo', number: '04', name: 'Nifo', label: 'FULL-STACK + AI',
    title: 'Co-innovation,\nfrom the ground up.',
    description: 'An AI workflow platform for document generation, enterprise insights, and solution and provider search.',
    company: 'Professional work · The Yellow Network', color: '#f5b67b',
    tags: ['Django', 'LangChain', 'Next.js'],
    metrics: [{ value: '2', label: 'core developers' }, { value: 'RAG', label: 'document and search workflows' }],
    steps: ['Structured data', 'Semantic index', 'RAG agents', 'Product workflows'],
    plain: 'Nifo is an AI platform for finding solutions and providers, getting insights on enterprises, and generating documents. Each person signs in to their own secure space.',
    stepNotes: [
      'Information about companies and providers is collected and cleaned into datasets a model can use.',
      'That information is indexed, so it can be searched by meaning and not only by keywords.',
      'AI agents use the index to answer questions and draft documents.',
      'People use all of this through the platform, with secure access for each user.',
    ],
    role: 'Co-built Nifo end to end as one of two core developers, working directly with the founder.',
    decisions: [
      { title: 'Build across the product', text: 'A Django and PostgreSQL backend supports a Next.js/TypeScript frontend, with secure authentication and per-user access control.' },
      { title: 'Give agents a retrieval layer', text: 'LangChain, OpenAI, and open-source LLMs power RAG agents, with ThirdAI NeuralDB for semantic indexing and retrieval.' },
      { title: 'Own data and deployment', text: 'Selenium scraping and preprocessing pipelines produce LLM-ready datasets. LLM endpoints run on Azure AI Foundry and Azure VMs.' },
    ],
    evaluation: 'Work covered the product, retrieval workflows, data preparation, and deployed model endpoints.',
  },
];

export const workOrder = ['corvus', 'tia', 'nifo', 'saramsa'];

export const projects: Project[] =projectDesigns.map(project => ({ ...project, ...caseStudyContent[project.id] }));
