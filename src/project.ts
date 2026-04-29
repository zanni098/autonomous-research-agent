export const project = {
  "slug": "autonomous-research-agent",
  "name": "Autonomous Research Agent",
  "tagline": "A planning, search, reflection, and synthesis loop for cited research reports.",
  "accent": "#1264a3",
  "secondary": "#d97706",
  "persona": "operators who need sourced answers without babysitting every search",
  "repoPitch": "Research workflow that decomposes questions, searches, reads sources, reflects on evidence gaps, and produces cited reports.",
  "roleFit": "Shows tool-use planning, web search integration, retrieval discipline, reflection loops, and citation-aware synthesis.",
  "inputLabel": "Ask a research question",
  "sampleInput": "What makes AI workflow engineering different from normal prompt engineering?",
  "cta": "Run research loop",
  "stages": [
    "Plan sub-questions",
    "Search with Tavily or Serper",
    "Extract page content",
    "Score source relevance",
    "Reflect on missing evidence",
    "Synthesize a cited report"
  ],
  "outputs": [
    {
      "label": "Plan",
      "text": "Separate workflow architecture, prompt quality, data prep, and evaluation into search tracks."
    },
    {
      "label": "Reflection",
      "text": "Need one source about operational evaluation before final synthesis."
    },
    {
      "label": "Report",
      "text": "AI workflow engineering is prompt design plus integrations, controls, memory, and measurement."
    }
  ],
  "stack": [
    "TypeScript",
    "Search API adapter",
    "HTML extraction",
    "Reflection loop",
    "Citation renderer"
  ],
  "architecture": "Question -> planner -> search adapter -> reader -> evidence table -> reflection gate -> report writer"
} as const;
