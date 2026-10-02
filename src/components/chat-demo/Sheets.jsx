import { useEffect, useRef, useState } from 'react';
import Icon, { BrandLogo } from './icons';
import {
  BYOK_PROVIDERS,
  COST_RANK,
  HISTORY,
  MODEL_GROUPS,
  MODELS,
  SCRIPTS,
  SKILL_ACTIONS,
  SKILL_GROUPS,
  SPEED_RANK,
} from './data';

/* ── Лист iOS (.sheet + presentationDragIndicator) ────────────────────────────
   Выезжает снизу, закрывается тапом по затемнению, Esc или свайпом вниз.
   glass — стеклянная поверхность в духе Liquid Glass iOS 26 (лист моделей). */

export function Sheet({ open, detent = 'large', glass = false, label, onClose, children }) {
  const [drag, setDrag] = useState(0);
  const start = useRef(null);
  const panel = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const opener = document.activeElement;
    const node = panel.current;
    const onKey = (e) => e.key === 'Escape' && closeRef.current();
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => node?.focus({ preventScroll: true }), 60);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
      // Фокус возвращаем туда, откуда лист открыли (иначе он остаётся в скрытом листе).
      if (node?.contains(document.activeElement) && opener?.focus) opener.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) setDrag(0);
  }, [open]);

  const onPointerDown = (e) => {
    start.current = { y: e.clientY, h: panel.current?.offsetHeight || 1 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!start.current) return;
    setDrag(Math.max(0, e.clientY - start.current.y));
  };
  const onPointerUp = () => {
    if (!start.current) return;
    const ratio = drag / start.current.h;
    start.current = null;
    if (ratio > 0.22) onClose();
    else setDrag(0);
  };

  return (
    <>
      <div className={`cd-scrim ${glass ? 'cd-scrim-glass' : ''} ${open ? 'is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <div
        ref={panel}
        className={`cd-sheet cd-sheet-${detent} ${glass ? 'cd-glass' : ''} ${open ? 'is-open' : ''} ${drag ? 'is-dragging' : ''}`}
        style={drag ? { transform: `translateY(${drag}px)` } : undefined}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        inert={open ? undefined : true}
        tabIndex={-1}
      >
        <div
          className="cd-sheet-grab"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <span />
        </div>
        {children}
      </div>
    </>
  );
}

/* ── Глиф модели (ModelGlyph) ──────────────────────────────────────────────── */

export function ModelGlyph({ model, size = 'md' }) {
  const fusion = model.level === 'fusion';
  return (
    <span className={`cd-glyph cd-glyph-${size} cd-brand-${fusion ? 'fusion' : model.brand}`} aria-hidden="true">
      {fusion ? (
        <Icon name="sparkles" />
      ) : model.brand === 'none' ? (
        <Icon name={model.level === 'auto' ? 'bolt' : model.level === 'basic' ? 'star' : 'diamond'} />
      ) : (
        <BrandLogo brand={model.brand} />
      )}
    </span>
  );
}

function SpeedMeter({ rank }) {
  return (
    <span className="cd-speed" aria-label={`Speed ${rank} of 3`}>
      {[0, 1, 2].map((i) => (
        <i key={i} className={i < rank ? 'is-on' : ''} />
      ))}
    </span>
  );
}

function CostMeter({ rank }) {
  return (
    <span className="cd-cost" aria-label={`Cost ${rank} of 3`}>
      {[0, 1, 2].map((i) => (
        <b key={i} className={i < rank ? 'is-on' : ''}>
          $
        </b>
      ))}
    </span>
  );
}

function ModelRow({ model, selected, onPick }) {
  const fusion = model.level === 'fusion';
  return (
    <button
      type="button"
      className={`cd-mrow ${selected ? 'is-selected' : ''} ${fusion ? 'is-fusion' : ''}`}
      onClick={() => onPick(model)}
      aria-pressed={selected}
    >
      {fusion && (
        <span className="cd-aurora" aria-hidden="true">
          <i className="a1" />
          <i className="a2" />
          <i className="a3" />
          <i className="a4" />
        </span>
      )}
      <ModelGlyph model={model} size="lg" />
      <span className="cd-mrow-body">
        <span className="cd-mrow-name">
          <span>{model.label}</span>
          {model.id === 'auto' && <span className="cd-badge">DEFAULT</span>}
          {fusion && <span className="cd-badge is-filled">COUNCIL</span>}
        </span>
        <span className="cd-mrow-tag">{model.tagline}</span>
        <span className="cd-mrow-meta">
          <SpeedMeter rank={SPEED_RANK[model.speed]} />
          <CostMeter rank={COST_RANK[model.cost]} />
          {model.strengths.slice(0, 2).map((s) => (
            <span key={s} className="cd-strength">
              {s}
            </span>
          ))}
        </span>
      </span>
      <span className="cd-mrow-trail">
        {selected ? <Icon name="check" className="cd-check" /> : <span className="cd-radio" />}
      </span>
    </button>
  );
}

/* Карточка «ADD API KEY» (BYOKManageSection, свёрнутая): логотипы провайдеров
   сменяются каждые 1.1 с. В демо ключи не вводятся — карточка только для вида. */
function ByokCard({ active }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % BYOK_PROVIDERS.length), 1100);
    return () => clearInterval(id);
  }, [active]);
  const p = BYOK_PROVIDERS[i];
  return (
    <div className="cd-byok">
      <Icon name="key" className="cd-byok-key" />
      <span className="cd-byok-title">ADD API KEY</span>
      <span className="cd-byok-glyph" key={p}>
        <BrandLogo brand={p} />
      </span>
    </div>
  );
}

export function ModelSheetContent({ open, selectedId, onPick }) {
  return (
    <>
      <div className="cd-msheet-head">
        <p className="cd-msheet-title">Choose a model</p>
        <p className="cd-msheet-sub">Switch to fit the task — from fast to most powerful.</p>
      </div>
      <div className="cd-sheet-scroll cd-noscrollbar">
        <div className="cd-msheet-list">
          {MODEL_GROUPS.map((g) => (
            <div key={g.level} className="cd-mgroup-wrap">
              <div className="cd-mgroup">
                <div className="cd-mgroup-head">
                  <span className="cd-mgroup-title">{g.title}</span>
                  <span className="cd-tier">{g.badge.toUpperCase()}</span>
                </div>
                {MODELS.filter((m) => m.level === g.level).map((m) => (
                  <ModelRow key={m.id} model={m} selected={m.id === selectedId} onPick={onPick} />
                ))}
              </div>
              {g.level === 'fusion' && <ByokCard active={open} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Лист навыков «+» (ChatSkillsSheet) ────────────────────────────────────── */

export function SkillsSheetContent({ onPick }) {
  return (
    <>
      <div className="cd-ssheet-head">
        <p className="cd-msheet-title">Skills</p>
        <p className="cd-msheet-sub">Pick a ready-made request to get started.</p>
      </div>
      <div className="cd-sheet-scroll cd-noscrollbar">
        <div className="cd-ssheet-body">
          <p className="cd-section-label">Analysis &amp; plans</p>
          <div className="cd-actions">
            {SKILL_ACTIONS.map((s, i) => (
              <button key={s.title} type="button" className="cd-action" onClick={() => onPick(s.script)}>
                <span className={`cd-action-icon tint-${s.color}`}>
                  <Icon name={s.icon} />
                </span>
                <span className="cd-action-text">
                  <span className="cd-action-title">{s.title}</span>
                  <span className="cd-action-sub">{s.subtitle}</span>
                </span>
                <Icon name="chevronRight" className="cd-action-chev" />
                {i < SKILL_ACTIONS.length - 1 && <span className="cd-action-div" aria-hidden="true" />}
              </button>
            ))}
          </div>

          <p className="cd-section-label cd-section-gap">Quick questions</p>
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="cd-qgroup">
              <p className="cd-qgroup-title">{g.title}</p>
              <div className="cd-qrow cd-noscrollbar">
                {g.skills.map((s) => (
                  <button key={s.title} type="button" className="cd-qchip" onClick={() => onPick(s.script)}>
                    <Icon name={s.icon} className={`fg-${s.color}`} />
                    <span>{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Панель истории (ChatHistoryDrawer) ────────────────────────────────────── */

function preview(script) {
  return SCRIPTS[script].text.replace(/\*\*/g, '').split('\n')[0];
}

export function HistoryDrawer({ open, currentId, onSelect, onNewChat, onClose }) {
  return (
    <aside
      className={`cd-drawer ${open ? 'is-open' : ''}`}
      aria-label="Chats"
      inert={open ? undefined : true}
    >
      <div className="cd-drawer-head">
        <span>Chats</span>
        <button type="button" className="cd-drawer-close" onClick={onClose} aria-label="Close chats">
          <Icon name="chevronRight" />
        </button>
      </div>
      <div className="cd-hr" />
      <button type="button" className="cd-newchat" onClick={onNewChat}>
        <Icon name="compose" />
        <span>New Chat</span>
      </button>
      <div className="cd-hr" />
      <div className="cd-hlist">
        {HISTORY.map((h) => {
          const current = h.id === currentId;
          return (
            <button
              key={h.id}
              type="button"
              className={`cd-hrow ${current ? 'is-current' : ''}`}
              onClick={() => onSelect(h)}
            >
              <span className="cd-hbar" />
              <span className="cd-htext">
                <span className="cd-htitle">{h.title}</span>
                <span className="cd-hprev">{preview(h.script)}</span>
                <span className="cd-hdate">{h.date}</span>
              </span>
              {current && <Icon name="checkmark" className="cd-hcheck" />}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
