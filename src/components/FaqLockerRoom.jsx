import React, { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const jokes = [
  {
    setup: 'I told my Apple Watch I was going for a run.',
    punchline: 'It asked if I was sure. Three times.',
  },
  {
    setup: 'My rest day plan:',
    punchline: 'Aggressive stretching between naps.',
  },
  {
    setup: 'Why did the scarecrow win an award?',
    punchline: 'Outstanding field performance.',
  },
  {
    setup: 'Running late is my cardio.',
    punchline: 'Unfortunately it does not sync to Apple Health.',
  },
  {
    setup: 'My coach said listen to your body.',
    punchline: 'My body said pizza. We are in mediation.',
  },
  {
    setup: 'I do not always track my workout.',
    punchline: 'But when I do, I check the stats twelve times before showering.',
  },
  {
    setup: 'What is a runner\'s favourite type of music?',
    punchline: 'Tempo. Obviously.',
  },
  {
    setup: 'Leg day skipped me.',
    punchline: 'I did not argue.',
  },
];

export default function FaqLockerRoom() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const { ref, visible } = useReveal();
  const joke = jokes[index];

  const nextJoke = () => {
    setRevealed(false);
    setIndex((prev) => {
      let next = Math.floor(Math.random() * jokes.length);
      while (next === prev && jokes.length > 1) next = Math.floor(Math.random() * jokes.length);
      return next;
    });
  };

  return (
    <section ref={ref} className="border-t border-white/5 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className={`text-center transition duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-pink">Locker room</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Rest-day reading material
          </h2>
          <p className="mt-3 text-gray-500">Groan-worthy. Zero FTP gains guaranteed.</p>
        </div>

        <div
          className={`pro-grid relative mt-10 rounded-3xl border border-white/8 bg-[#0a0a0a] p-8 text-center transition duration-700 delay-100 sm:p-10 ${
            visible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'
          }`}
        >
          <p className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl">{joke.setup}</p>

          {revealed ? (
            <p className="mt-5 font-serif text-2xl italic text-brand-pink-soft animate-slide-up sm:text-3xl">
              {joke.punchline}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="pro-chip mx-auto mt-6 rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              Reveal punchline
            </button>
          )}

          {revealed && (
            <button
              type="button"
              onClick={nextJoke}
              className="mx-auto mt-8 block text-sm font-semibold text-gray-500 transition hover:text-brand-pink"
            >
              Next joke →
            </button>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          {index + 1} of {jokes.length} — humour not validated by sports science
        </p>
      </div>
    </section>
  );
}
