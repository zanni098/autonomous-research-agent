import { useState, useEffect, useRef } from 'react';
import './styles.css';

interface Source { title: string; url: string; relevance: number; excerpt: string; }
interface Step { label: string; detail: string; done: boolean; }

const MOCK_SOURCES: Source[] = [
  { title: 'AI Workflow Engineering vs Prompt Engineering', url: 'https://example.com/workflow-eng', relevance: 94, excerpt: 'Workflow engineering encompasses the entire pipeline: data preprocessing, prompt design, output validation, and feedback loops.' },
  { title: 'Building Production AI Systems', url: 'https://example.com/prod-ai', relevance: 88, excerpt: 'Production AI requires structured outputs, error handling, retry logic, and human-in-the-loop checkpoints.' },
  { title: 'The Rise of Agentic Architectures', url: 'https://example.com/agentic', relevance: 85, excerpt: 'Agent systems decompose tasks into planning, execution, and reflection phases with tool-use capabilities.' },
  { title: 'Evaluation-Driven AI Development', url: 'https://example.com/eval', relevance: 79, excerpt: 'Systematic evaluation with rubrics and test suites is what separates prototypes from production AI.' },
  { title: 'Prompt Engineering Best Practices 2026', url: 'https://example.com/prompts', relevance: 72, excerpt: 'While prompts matter, the surrounding infrastructure — caching, routing, fallbacks — determines real-world reliability.' },
];

const REPORT = `## AI Workflow Engineering vs Prompt Engineering

**Key Finding:** AI workflow engineering is prompt design *plus* integrations, controls, memory, and measurement.

### Core Differences

1. **Scope**: Prompt engineering optimizes individual LLM calls. Workflow engineering designs the entire pipeline from input to verified output.

2. **Infrastructure**: Workflows require data preprocessing, structured output validation, error handling, retry logic, and feedback loops [1][2].

3. **Evaluation**: Production workflows use systematic evaluation with rubrics and test suites, not just "does it look right?" [4].

4. **Architecture**: Modern AI workflows use agentic patterns — planning, execution, reflection, and tool-use — not single-shot prompts [3].

5. **Reliability**: The surrounding infrastructure (caching, routing, fallbacks) determines real-world reliability more than prompt text alone [5].

### Conclusion

Workflow engineering is the production discipline that prompt engineering is a subset of. It adds integration design, quality controls, persistent memory, and measurement to the foundation of good prompt writing.

### Sources
[1] AI Workflow Engineering vs Prompt Engineering (94% relevance)
[2] Building Production AI Systems (88% relevance)
[3] The Rise of Agentic Architectures (85% relevance)
[4] Evaluation-Driven AI Development (79% relevance)
[5] Prompt Engineering Best Practices 2026 (72% relevance)`;

export default function App() {
  const [question, setQuestion] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [report, setReport] = useState('');
  const [reflection, setReflection] = useState('');
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const pipeline: { label: string; detail: string }[] = [
    { label: 'Planning sub-questions', detail: 'Decomposing query into 3 research tracks…' },
    { label: 'Searching sources', detail: 'Querying Tavily/Serper with optimized queries…' },
    { label: 'Reading & extracting', detail: 'Parsing 5 source documents…' },
    { label: 'Scoring relevance', detail: 'Ranking sources by topical match…' },
    { label: 'Reflecting on gaps', detail: 'Checking for missing evidence…' },
    { label: 'Synthesizing report', detail: 'Writing cited research report…' },
  ];

  function run() {
    const q = question.trim() || 'What makes AI workflow engineering different from normal prompt engineering?';
    if (!question.trim()) setQuestion(q);
    setSteps(pipeline.map(p => ({ ...p, done: false }))); setSources([]); setReport(''); setReflection(''); setRunning(true);
    timers.current = [];
    pipeline.forEach((_, i) => {
      timers.current.push(setTimeout(() => {
        setSteps(prev => prev.map((s, j) => j <= i ? { ...s, done: true } : s));
        if (i === 2) setSources(MOCK_SOURCES);
        if (i === 4) setReflection('Need one more source on operational evaluation before final synthesis. Running additional search…');
        if (i === pipeline.length - 1) { setReport(REPORT); setRunning(false); }
      }, (i + 1) * 900));
    });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060d18', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #1264a3, #d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🔬</div>
        <span style={{ fontWeight: 700, fontSize: 18 }}>Autonomous Research Agent</span>
      </header>
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask a research question…" style={{ flex: 1, background: '#111827', border: '1px solid #1e293b', borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', fontSize: 14 }} />
          <button onClick={run} disabled={running} style={{ padding: '12px 24px', background: running ? '#334155' : 'linear-gradient(135deg, #1264a3, #1d4ed8)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: running ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}>
            {running ? 'Researching…' : '🔬 Run Research Loop'}
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
          <div>
            {steps.length > 0 && (
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 14, color: '#94a3b8' }}>Pipeline</h3>
                {steps.map((s, i) => (
                  <div key={i} style={{ padding: '6px 0', opacity: s.done ? 1 : 0.3, fontSize: 13 }}>
                    {s.done ? '✅' : '⬜'} {s.label}
                    {s.done && <div style={{ fontSize: 11, color: '#64748b', marginLeft: 22 }}>{s.detail}</div>}
                  </div>
                ))}
              </div>
            )}
            {reflection && (
              <div style={{ background: '#1a1a0a', border: '1px solid #854d0e', borderRadius: 10, padding: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#eab308', marginBottom: 6 }}>🤔 Reflection</div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>{reflection}</p>
              </div>
            )}
            {sources.length > 0 && (
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 10, padding: 16 }}>
                <h3 style={{ margin: '0 0 12px', fontSize: 14, color: '#94a3b8' }}>Sources ({sources.length})</h3>
                {sources.map((s, i) => (
                  <div key={i} style={{ padding: '8px 0', borderBottom: i < sources.length - 1 ? '1px solid #1e293b' : 'none' }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>[{i + 1}] {s.title}</div>
                    <div style={{ fontSize: 11, color: s.relevance >= 85 ? '#22c55e' : '#f59e0b' }}>Relevance: {s.relevance}%</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {report ? (
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 12, padding: 24 }}>
                <h2 style={{ margin: '0 0 16px', fontSize: 16, color: '#94a3b8' }}>📄 Research Report</h2>
                <div style={{ fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{report}</div>
              </div>
            ) : (
              <div style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 12, padding: 24, textAlign: 'center', color: '#475569', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {running ? 'Research in progress…' : 'Enter a question to start the research loop.'}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
