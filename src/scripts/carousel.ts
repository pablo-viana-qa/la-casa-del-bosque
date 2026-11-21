/*
  Carrusel de fotos con fundido.
  Marcado:
    [data-carousel]                       contenedor (data-interval en ms, 0 = sin avance automático)
      [data-slide]                        cada foto
      [data-prev] / [data-next]           flechas
      [data-go="n"]                       miniaturas o puntos
      [data-toggle]                       pausa / reproducir
      [data-count]                        "3 / 10"
  Teclado: flechas izquierda/derecha cuando el carrusel está en pantalla.
  Touch: deslizar.
*/

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setup(root: HTMLElement) {
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));
  const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-go]'));
  const count = root.querySelector<HTMLElement>('[data-count]');
  const toggle = root.querySelector<HTMLButtonElement>('[data-toggle]');
  const interval = Number(root.dataset.interval || 0);
  let i = 0;
  let timer: number | undefined;
  let playing = interval > 0 && !reduce;
  let hovering = false;
  let visible = false;

  const show = (n: number) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      const on = k === i;
      s.toggleAttribute('data-active', on);
      s.setAttribute('aria-hidden', String(!on));
    });
    dots.forEach((d) => {
      const on = Number(d.dataset.go) === i;
      d.toggleAttribute('data-active', on);
      d.setAttribute('aria-current', on ? 'true' : 'false');
    });
    if (count) count.textContent = `${i + 1} / ${slides.length}`;
    // precarga la siguiente
    slides[(i + 1) % slides.length]?.querySelector('img')?.setAttribute('loading', 'eager');
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = undefined;
  };
  const start = () => {
    stop();
    if (playing && !hovering && visible) timer = window.setInterval(() => show(i + 1), interval);
  };
  const go = (n: number) => {
    show(n);
    start();
  };
  const setPlaying = (p: boolean) => {
    playing = p;
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(!p));
      toggle.setAttribute('aria-label', p ? 'Pausar fotos' : 'Reproducir fotos');
      toggle.dataset.state = p ? 'playing' : 'paused';
    }
    start();
  };

  root.querySelector('[data-prev]')?.addEventListener('click', () => go(i - 1));
  root.querySelector('[data-next]')?.addEventListener('click', () => go(i + 1));
  dots.forEach((d) => d.addEventListener('click', () => go(Number(d.dataset.go))));
  toggle?.addEventListener('click', () => setPlaying(!playing));

  root.addEventListener('pointerenter', (e) => {
    if ((e as PointerEvent).pointerType === 'mouse') {
      hovering = true;
      stop();
    }
  });
  root.addEventListener('pointerleave', () => {
    hovering = false;
    start();
  });

  // flechas del teclado mientras el carrusel está en pantalla
  document.addEventListener('keydown', (e) => {
    if (!visible || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target;
    if (t instanceof Element && t.closest('input, textarea, select, [contenteditable], dialog')) return;
    if (e.key === 'ArrowRight') { go(i + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { go(i - 1); e.preventDefault(); }
  });

  // deslizar
  let x0: number | null = null;
  root.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
  root.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) go(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  // solo avanza (y escucha el teclado) cuando está a la vista
  new IntersectionObserver(
    ([entry]) => {
      visible = entry.intersectionRatio >= 0.5;
      visible ? start() : stop();
    },
    { threshold: [0, 0.5, 1] },
  ).observe(root);

  show(0);
  setPlaying(playing);
}

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(setup);
