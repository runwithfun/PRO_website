export default function AssistantIcon({ name, className = '' }) {
  const file = { ChatGPT: 'openai', Claude: 'anthropic', Codex: 'openai', Grok: 'grok', 'Grok Bot': 'grok', DeepSeek: 'deepseek', Perplexity: 'perplexity', Gemini: 'gemini', Qwen: 'qwen', Mistral: 'mistral', Manus: 'manus', 'Cherry Studio': 'cherrystudio', Superhuman: 'superhuman', Cursor: 'cursor' }[name];
  return <span className={`assistant-icon assistant-icon-${name.toLowerCase().replace(/\s+/g, '-')} ${className}`}>
    <img src={`/chat-logos/${file}.svg`} width="32" height="32" alt="" />
    {name === 'Codex' && <span className="codex-corner" aria-hidden="true">›_</span>}
  </span>;
}
