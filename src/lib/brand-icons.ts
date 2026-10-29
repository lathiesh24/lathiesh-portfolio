// Backgroundless brand marks in /public/skills/brands: simple-icons glyphs (.svg, tinted in the brand colour)
// and official-site favicons (.png) for brands simple-icons does not carry.
const icons: Record<string, string> = {
  OpenAI: 'openai.svg', 'OpenAI API': 'openai.svg', Codex: 'openai.svg',
  Claude: 'claude.svg', 'Claude Code': 'claude.svg', 'Anthropic Claude API': 'claude.svg',
  'Vertex AI Gemini': 'googlegemini.svg', 'Google Vertex AI (Gemini)': 'googlegemini.svg',
  Python: 'python.svg', FastAPI: 'fastapi.svg', Django: 'django.svg', React: 'react.svg', TypeScript: 'typescript.svg',
  'Next.js': 'nextdotjs.svg', 'Tailwind CSS': 'tailwindcss.svg', 'Node.js': 'nodedotjs.svg', Express: 'express.svg',
  'TanStack Query': 'reactquery.svg', 'Plate.js': 'platejs.png',
  Grafana: 'grafana.svg', Slack: 'slack.svg', Render: 'render.svg', 'Trigger.dev': 'triggerdev.png',
  'Neon PostgreSQL': 'neon.svg', 'Neon (PostgreSQL)': 'neon.svg', PostgreSQL: 'postgresql.svg', MongoDB: 'mongodb.svg', Pinecone: 'pinecone.png',
  'AWS Lambda': 'amazonaws.svg', 'AWS Bedrock': 'amazonaws.svg', Azure: 'microsoftazure.svg',
  'GitHub Actions': 'githubactions.svg', Pytest: 'pytest.svg', Vitest: 'vitest.svg',
  LangChain: 'langchain.svg', 'Vercel AI SDK': 'vercel.svg', MCP: 'modelcontextprotocol.svg',
  'Google Maps / Places': 'googlemaps.svg', 'Google Maps / Places / Geocoding': 'googlemaps.svg',
  'HubSpot CRM': 'hubspot.svg', Twilio: 'twilio.svg', Bitbucket: 'bitbucket.svg', 'Facebook Conversions API': 'meta.svg',
  'Exa AI': 'exa.png', Crustdata: 'crustdata.png', Olostep: 'olostep.png', 'Parallel AI': 'parallel.png', PropelAuth: 'propelauth.png',
  Riveter: 'riveter.png', 'ThirdAI NeuralDB': 'thirdai.png', GoHighLevel: 'gohighlevel.png', LeadsHook: 'leadshook.png', Pipedream: 'pipedream.png',
  EmailOversight: 'emailoversight.png', Melissa: 'melissa.png', 'Hotelbeds API': 'hotelbeds.png', 'Sabre API': 'sabre.png',
};

export const brandIcon = (name: string): string | undefined => (icons[name] ? `/skills/brands/${icons[name]}` : undefined);
