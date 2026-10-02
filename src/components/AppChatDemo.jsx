import { useCallback, useEffect, useRef, useState } from 'react';
import PhoneMockup from './PhoneMockup';
import Icon, { StatusBar } from './chat-demo/icons';
import LensFilter from './chat-demo/LensFilter';
import { useLiquidGlass } from './chat-demo/liquidGlass';
import { AnswerBlocks, AnswerText, LiveStatus, ToolTrace } from './chat-demo/Answer';
import { HistoryDrawer, ModelGlyph, ModelSheetContent, Sheet, SkillsSheetContent } from './chat-demo/Sheets';
import { CHIP_TO_SCRIPT, MODELS, SCRIPTS, TICKER_MODELS, WELCOME_CARDS } from './chat-demo/data';

/*
 * Интерактивная копия экрана чата P.R.O. (ChatView, тёмная тема) внутри iPhone.
 * Источник истины — приложение: FullApp/P.R.O./Chat.swift, ChatChrome.swift,
 * ChatModelSelection.swift, ChatSkillsSheet.swift, ChatHistoryDrawer.swift,
 * ChatNativeTranscriptView.swift, ChatLiveStatusBubble.swift, Color+PRO.swift,
 * ChatWebAssets/chat.css. Все размеры — в пунктах iOS (экран 402 pt, см. CSS).
 * Ответы заготовлены, сети нет. Первый рендер детерминирован (SSR + гидрация).
 */

const AUTO = MODELS[0];
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ── Пилюля модели с тизером (ModelPillBubble) ──────────────────────────────── */

function ModelPill({ model, teaser, onClick }) {
  const tick = teaser.active ? TICKER_MODELS[teaser.index % TICKER_MODELS.length] : null;
  const pillRef = useRef(null);
  const glass = useLiquidGlass(pillRef);
  return (
    <div className="cd-pill-slot">
      <LensFilter w={glass.w} h={glass.h} lensUrl={glass.lensUrl} />
      <button
        ref={pillRef}
        type="button"
        className={`cd-pill ${teaser.active ? 'is-active' : ''} ${glass.lensUrl ? 'has-lens' : ''} ${glass.specUrl ? 'has-spec' : ''}`}
        onClick={onClick}
        aria-haspopup="dialog"
      >
        {glass.specUrl && (
          <span className="cd-pill-spec" style={{ backgroundImage: `url(${glass.specUrl})` }} aria-hidden="true" />
        )}
        <span className="cd-pill-main">
          <ModelGlyph model={model} size="sm" />
          <span className="cd-pill-copy">
            {/* Имя кнопки — её видимый текст («MODEL Auto») + скрытое пояснение:
                так оно совпадает с тем, что видно (WCAG label-in-name). */}
            <span className="cd-pill-cap">MODEL</span>{' '}
            <span className="cd-pill-label">{model.label}</span>
            <span className="sr-only">, change model</span>
          </span>
        </span>
        {tick ? (
          <>
            <span className="cd-pill-sep" aria-hidden="true" />
            <span className="cd-ticker" aria-hidden="true">
              <span className="cd-ticker-row" key={teaser.index}>
                <ModelGlyph model={tick} size="xs" />
                <span>{tick.label}</span>
              </span>
            </span>
          </>
        ) : (
          <Icon name="chevronDown" className="cd-pill-chev" />
        )}
      </button>
    </div>
  );
}

/* ── Приветствие (ChatWelcomeView) ─────────────────────────────────────────── */

function Welcome({ onPick }) {
  return (
    <div className="cd-welcome">
      <div className="cd-greet">
        <h3>Hi! I&apos;m your AI coach</h3>
        <p>I read your Apple Health workouts, suggest a plan and answer questions about form, nutrition and recovery.</p>
      </div>
      <p className="cd-micro">WHERE DO WE START?</p>
      <div className="cd-grid">
        {WELCOME_CARDS.map((c) => (
          <button key={c.title} type="button" className="cd-card" onClick={() => onPick(c.script)}>
            <span className={`cd-card-icon fg-${c.color}`}>
              <Icon name={c.icon} />
            </span>
            <span className="cd-card-title">{c.title}</span>
            <span className="cd-card-desc">{c.desc}</span>
          </button>
        ))}
      </div>
      <p className="cd-disclaimer">
        <Icon name="info" />
        <span>AI can make mistakes. Not a substitute for medical advice.</span>
      </p>
    </div>
  );
}

/* ── Сообщения ─────────────────────────────────────────────────────────────── */

function AssistantMessage({ msg, onTyped }) {
  const script = SCRIPTS[msg.script];
  const [extras, setExtras] = useState(!msg.animate);
  const hasBlocks = script.blocks.length > 0;
  return (
    <div className="cd-assistant">
      <ToolTrace tools={script.tools} />
      <AnswerText
        markdown={script.text}
        animate={msg.animate}
        onFinished={() => {
          setExtras(true);
          onTyped?.();
        }}
      />
      {hasBlocks && extras && (
        <div className={msg.animate ? 'cd-fade-in' : ''}>
          <AnswerBlocks blocks={script.blocks} />
        </div>
      )}
    </div>
  );
}

/* ── iOS-подобный индикатор прокрутки (вместо десктопных скроллбаров) ──────── */

function useScrollIndicator(ref) {
  const [ind, setInd] = useState({ top: 0, height: 0, visible: false });
  const hide = useRef(null);
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight, clientWidth } = el;
    if (scrollHeight <= clientHeight + 1) return;
    // Дорожка индикатора начинается под шапкой (121 pt из 402 pt ширины экрана).
    const inset = (clientWidth / 402) * 121;
    const track = clientHeight - inset - 3;
    const h = Math.max(28, (clientHeight / scrollHeight) * track);
    const top = (scrollTop / (scrollHeight - clientHeight)) * (track - h);
    setInd({ top, height: h, visible: true });
    clearTimeout(hide.current);
    hide.current = setTimeout(() => setInd((s) => ({ ...s, visible: false })), 700);
  }, [ref]);
  useEffect(() => () => clearTimeout(hide.current), []);
  return [ind, update];
}

/* ── Основной компонент ────────────────────────────────────────────────────── */

let uid = 0;

export default function AppChatDemo({ className = '' }) {
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(null); // { tool, fallback } пока «агент думает»
  const [chips, setChips] = useState([]);
  const [modelId, setModelId] = useState('auto');
  const [sheet, setSheet] = useState(null); // 'model' | 'skills' | null
  const [drawer, setDrawer] = useState(false);
  // Листы и панель истории монтируем только в браузере: в пререндеренный HTML
  // они не попадают (для ботов это ~400 слов интерфейсного шума — список
  // моделей, цены, история чатов), а CSS-анимация открытия сохраняется,
  // потому что к моменту первого нажатия они уже в DOM.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [convId, setConvId] = useState(null);
  const [input, setInput] = useState('');
  const [touch, setTouch] = useState(false);
  const [teaser, setTeaser] = useState({ active: false, index: 0 });

  const rootRef = useRef(null);
  const startedRef = useRef(false); // пользователь уже начал диалог — тизер не нужен
  const scrollRef = useRef(null);
  const timers = useRef([]);
  const teaserTimers = useRef([]);
  const [ind, onScroll] = useScrollIndicator(scrollRef);

  const model = MODELS.find((m) => m.id === modelId) || AUTO;

  const later = (fn, ms, bag = timers) => {
    const t = setTimeout(fn, ms);
    bag.current.push(t);
  };
  const clearAll = (bag = timers) => {
    bag.current.forEach(clearTimeout);
    bag.current = [];
  };

  useEffect(
    () => () => {
      clearAll();
      clearAll(teaserTimers);
    },
    [],
  );

  // На тач-устройствах поле ввода только открывает навыки: iOS Safari увеличивает
  // страницу при фокусе на поле с мелким шрифтом, а шрифт тут в масштабе телефона.
  useEffect(() => {
    setTouch(window.matchMedia?.('(pointer: coarse)').matches ?? false);
  }, []);

  /* Тизер моделей в пилюле: при первом показе и на новом чате, только для Auto. */
  const playTeaser = useCallback(() => {
    clearAll(teaserTimers);
    setTeaser({ active: false, index: 0 });
    if (reduceMotion()) return;
    const n = Math.min(TICKER_MODELS.length, 8);
    later(() => setTeaser({ active: true, index: 0 }), 700, teaserTimers);
    for (let i = 1; i < n; i++) later(() => setTeaser({ active: true, index: i }), 700 + i * 900, teaserTimers);
    later(() => setTeaser({ active: false, index: 0 }), 700 + n * 900, teaserTimers);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!startedRef.current) playTeaser();
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [playTeaser]);

  const scrollToBottom = (smooth = true) => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: smooth && !reduceMotion() ? 'smooth' : 'auto' });
    });
  };

  /** Ход: сообщение пользователя → живой статус с тулами → ответ. */
  const run = (scriptId, userText) => {
    const script = SCRIPTS[scriptId];
    if (!script || busy) return;
    startedRef.current = true;
    clearAll();
    clearAll(teaserTimers);
    setTeaser({ active: false, index: 0 });
    setChips([]);
    setMessages((m) => [...m, { id: ++uid, role: 'user', text: userText || script.prompt }]);
    scrollToBottom();

    const fast = reduceMotion();
    let t = fast ? 200 : 650;
    if (script.loading) {
      setBusy({ tool: null, fallback: script.loading });
      t += fast ? 300 : 1900;
    } else {
      setBusy({ tool: null, fallback: '' });
      script.tools.forEach((tool) => {
        later(() => setBusy({ tool, fallback: '' }), t);
        t += fast ? 250 : 1150;
      });
    }
    later(() => {
      setBusy(null);
      setMessages((m) => [...m, { id: ++uid, role: 'assistant', script: scriptId, animate: true }]);
      setChips(script.chips);
    }, t);
  };

  const pickScript = (id) => {
    setSheet(null);
    // Как в приложении: навык отправляется после закрытия листа.
    later(() => run(id), sheet ? 380 : 0);
  };

  const send = () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    const match = Object.entries(CHIP_TO_SCRIPT).find(([k]) => k.toLowerCase() === text.toLowerCase());
    run(match ? match[1] : 'freeform', text);
  };

  const newChat = () => {
    clearAll();
    setBusy(null);
    setMessages([]);
    setChips([]);
    setConvId(null);
    setDrawer(false);
    startedRef.current = false;
    if (modelId === 'auto') later(playTeaser, 300);
  };

  const openConversation = (h) => {
    clearAll();
    setBusy(null);
    const s = SCRIPTS[h.script];
    setMessages([
      { id: ++uid, role: 'user', text: s.prompt },
      { id: ++uid, role: 'assistant', script: h.script, animate: false },
    ]);
    setChips(s.chips);
    setConvId(h.id);
    setDrawer(false);
    startedRef.current = true;
    clearAll(teaserTimers);
    setTeaser({ active: false, index: 0 });
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
  };

  const empty = messages.length === 0 && !busy;
  const lastIsAssistant = messages.length > 0 && messages[messages.length - 1].role === 'assistant';
  const canSend = !busy && input.trim().length > 0;

  return (
    <div className={className} ref={rootRef}>
      <PhoneMockup>
        <div className="cd-screen">
        <div className={`cd-root ${sheet === 'model' ? 'is-receded' : ''}`}>
          <div className={`cd-app ${drawer ? 'is-shifted' : ''}`}>
            <header className="cd-header">
              <div className="cd-header-side">
                <button type="button" className="cd-ghost" aria-label="Close chat" onClick={newChat}>
                  <Icon name="close" />
                </button>
              </div>
              <ModelPill
                model={model}
                teaser={modelId === 'auto' ? teaser : { active: false, index: 0 }}
                onClick={() => {
                  clearAll(teaserTimers);
                  setTeaser({ active: false, index: 0 });
                  setSheet('model');
                }}
              />
              <div className="cd-header-side is-right">
                <button
                  type="button"
                  className="cd-ghost"
                  aria-label="Chat history"
                  aria-expanded={drawer}
                  onClick={() => setDrawer((v) => !v)}
                >
                  <Icon name="menu" />
                </button>
              </div>
            </header>

            <div className="cd-scroll-wrap">
              <div ref={scrollRef} className="cd-scroll cd-noscrollbar" onScroll={onScroll}>
                {empty ? (
                  <Welcome onPick={(id) => run(id)} />
                ) : (
                  <div className="cd-transcript" aria-live="polite">
                    {messages.map((m) =>
                      m.role === 'user' ? (
                        <div key={m.id} className="cd-user-row">
                          <div className="cd-user">{m.text}</div>
                        </div>
                      ) : (
                        <AssistantMessage key={m.id} msg={m} />
                      ),
                    )}
                    {busy && <LiveStatus tool={busy.tool} fallback={busy.fallback} />}
                  </div>
                )}
              </div>
              <span
                className={`cd-indicator ${ind.visible ? 'is-visible' : ''}`}
                style={{ transform: `translateY(${ind.top}px)`, height: ind.height }}
                aria-hidden="true"
              />
            </div>

            <form
              className="cd-composer"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <button type="button" className="cd-plus" aria-label="Skills" onClick={() => setSheet('skills')}>
                <Icon name="plus" />
              </button>
              <label className="cd-field">
                <span className="cd-sr">Message</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about training, nutrition, goals…"
                  readOnly={touch}
                  onClick={touch ? () => setSheet('skills') : undefined}
                  autoComplete="off"
                  enterKeyHint="send"
                />
              </label>
              <button type="submit" className={`cd-send ${canSend ? 'is-on' : ''}`} aria-label="Send" disabled={!canSend}>
                <span className="cd-shimmer" aria-hidden="true" />
                <Icon name="arrowUp" />
              </button>
            </form>

            {!busy && lastIsAssistant && chips.length > 0 && (
              <div className="cd-chips cd-noscrollbar">
                {chips.map((c) => (
                  <button key={c} type="button" className="cd-chip" onClick={() => run(CHIP_TO_SCRIPT[c] || 'freeform', c)}>
                    {c}
                  </button>
                ))}
              </div>
            )}

            <div className={`cd-drawer-scrim ${drawer ? 'is-open' : ''}`} onClick={() => setDrawer(false)} aria-hidden="true" />
          </div>

          {mounted && (
            <HistoryDrawer
              open={drawer}
              currentId={convId}
              onSelect={openConversation}
              onNewChat={newChat}
              onClose={() => setDrawer(false)}
            />
          )}
        </div>

        {mounted && (
          <>
            <Sheet open={sheet === 'model'} label="Choose a model" onClose={() => setSheet(null)}>
              <ModelSheetContent
                open={sheet === 'model'}
                selectedId={modelId}
                onPick={(m) => {
                  setModelId(m.id);
                  setSheet(null);
                }}
              />
            </Sheet>
            <Sheet open={sheet === 'skills'} detent="medium" label="Skills" onClose={() => setSheet(null)}>
              <SkillsSheetContent onPick={pickScript} />
            </Sheet>
          </>
        )}
        <StatusBar />
        <span className="cd-home" aria-hidden="true" />
        </div>
      </PhoneMockup>
    </div>
  );
}
