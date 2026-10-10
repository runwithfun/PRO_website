export default function AssistantIcon({ name, className = '' }) {
  const file = { ChatGPT: 'openai', Claude: 'anthropic', Codex: 'openai', Grok: 'grok', DeepSeek: 'deepseek', Perplexity: 'perplexity', Qwen: 'qwen', Mistral: 'mistral' }[name];
  return <span className={`assistant-icon assistant-icon-${name.toLowerCase()} ${className}`}>
    <img src={`/chat-logos/${file}.svg`} width="32" height="32" alt="" />
    {name === 'Codex' && <span className="codex-corner" aria-hidden="true">›_</span>}
  </span>;
}
