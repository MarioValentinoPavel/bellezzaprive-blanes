/* Bellezza Privé — invitación, salas y tarjeta de socia */
gsap.registerPlugin(ScrollTrigger);
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const WA = 'https://wa.me/34635580387?text=';

/* ---------- hero (se anima al entrar) ---------- */
gsap.set('.hero__title span', { yPercent: 110 });
gsap.set(['.hero .kicker', '.hero__lead', '.hero__actions', '.hero__badge'], { opacity: 0, y: 24 });
function heroIn() {
  const tl = gsap.timeline();
  tl.to('.hero__title span', { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: .12 })
    .fromTo('.hero__media', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.inOut' }, 0)
    .to('.hero__media img', { scale: 1, duration: 2.4, ease: 'expo.out' }, .2)
    .to(['.hero .kicker', '.hero__lead', '.hero__actions', '.hero__badge'], { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: .1 }, .5);
}

/* ---------- invitación: romper el sello ---------- */
(function invite() {
  const inv = $('#invite');
  let opened = false;
  function done() {
    inv.remove();
    document.body.classList.remove('is-locked');
    heroIn();
    ScrollTrigger.refresh();
  }
  function open() {
    if (opened) return; opened = true;
    const tl = gsap.timeline({ onComplete: done });
    tl.to('.invite__hint, .invite__skip, .invite__top', { opacity: 0, duration: .3 })
      .to('.env__half--l', { x: -40, y: 60, rotation: -35, opacity: 0, duration: .9, ease: 'power2.in' }, 0)
      .to('.env__half--r', { x: 40, y: 70, rotation: 30, opacity: 0, duration: .9, ease: 'power2.in' }, 0)
      .to('.env__seal', { opacity: 0, duration: .5 }, .5)
      .to('#envFlap', { rotationX: 180, duration: .9, ease: 'power3.inOut' }, .25)
      .set('#envFlap', { zIndex: 1 }, .7)
      .to('#envCard', { yPercent: -62, duration: 1, ease: 'power3.inOut' }, .95)
      .set('#envCard', { zIndex: 6 })
      .to(['.env__back', '.env__pocket', '#envFlap'], { y: 260, opacity: 0, duration: .8, ease: 'power2.in' }, 1.9)
      .to('#envCard', { yPercent: 0, scale: () => Math.max(innerWidth / $('#envCard').offsetWidth, innerHeight / $('#envCard').offsetHeight) * 1.15, duration: 1.1, ease: 'expo.inOut' }, 2)
      .to('#invite', { opacity: 0, duration: .6 }, 2.8);
  }
  $('#seal').addEventListener('click', open);
  $('#skip').addEventListener('click', () => { opened = true; gsap.to(inv, { opacity: 0, duration: .5, onComplete: done }); });
  addEventListener('keydown', e => { if (!opened && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(); } });
  gsap.from('.env', { y: 60, opacity: 0, rotationX: 20, duration: 1.4, ease: 'expo.out' });
})();

/* ---------- nav ---------- */
ScrollTrigger.create({ start: 60, onUpdate: s => $('.nav').classList.toggle('is-solid', s.scroll() > 60) });

/* ---------- salas ---------- */
const ROOMS = {
  laser: {
    num: 'Sala Nº 01', title: 'Láser', img: 'assets/ig/p06.jpg',
    lead: 'Depilación con sistema SHR: tecnología de última generación, eficaz y prácticamente indolora, apta para todos los tipos de piel. El vello tratado no vuelve.',
    head: ['Tratamiento', 'Precio'],
    rows: [['Cualquier zona<small>primera sesión, nuevas clientas</small>', '8€'], ['Bonos de 6 y 12 sesiones<small>compartibles y regalables</small>', '−30%'], ['Zonas combinadas<small>valoración gratuita en cabina</small>', 'consultar']]
  },
  rostro: {
    num: 'Sala Nº 02', title: 'Rostro', img: 'assets/web/w14.jpeg',
    lead: 'Limpiezas profundas, peelings, radiofrecuencia y fotorrejuvenecimiento. Te asesoramos según tu piel y tu objetivo.',
    head: ['Tratamiento', '1 sesión', 'Bono'],
    rows: [['Higiene Hidralift', '75€', '3 · 175€'], ['Dermapen', '65€', '3 · 175€'], ['Fotorrejuvenecimiento facial', '75€', '3 · 175€'], ['Peeling Skinderma', '65€', '—'], ['Radiofrecuencia facial', '50€', '6 · 250€'], ['Mesoterapia virtual', '55€', '—'], ['Limpieza facial Basix', '55€', '—'], ['Diatermia facial<small>efecto rejuvenecedor</small>', '55€', '3 · 140€'], ['Tratamiento manual específico<small>Glow · Oxígeno · Balance · HY</small>', '80€', '—']]
  },
  cuerpo: {
    num: 'Sala Nº 03', title: 'Cuerpo', img: 'assets/ig/p03.jpg',
    lead: 'Diatermia, cavitación, ultrasonido y presoterapia para flacidez, celulitis y retención. Cada protocolo se diseña para ti.',
    head: ['Tratamiento', '1 sesión', 'Bono'],
    rows: [['Presoterapia', '25€', '120€'], ['Diatermia corporal', '69€', '150€'], ['Diatermia + presoterapia<small>30 + 30 min</small>', '65€', '160€ · 299€'], ['Cavitación + presoterapia', '60€', '150€'], ['Ultrasonido', '55€', '140€'], ['Masaje localizado<small>anticelulítico · reafirmante · drenante</small>', '70€', '170€'], ['Aparatología + presoterapia', '75€', '—']]
  },
  manos: {
    num: 'Sala Nº 04', title: 'Manos', img: 'assets/web/w17.jpeg',
    lead: 'Manicura, uñas y cuidado de manos con el mismo mimo que el resto del club. Perfecta para completar tu visita.',
    head: ['Servicio', 'Precio'],
    rows: [['Manicura', 'consultar'], ['Uñas semipermanentes', 'consultar'], ['Cuidado de manos', 'consultar']]
  }
};
(function rooms() {
  const room = $('#room');
  let lastFocus;
  function openRoom(key, fromEl) {
    const r = ROOMS[key];
    lastFocus = fromEl;
    $('#roomNum').textContent = r.num;
    $('#roomTitle').textContent = r.title;
    $('#roomLead').textContent = r.lead;
    $('#roomImg').src = r.img; $('#roomImg').alt = 'Sala ' + r.title;
    $('#roomMenu').innerHTML = `<tr>${r.head.map(h => `<th>${h}</th>`).join('')}</tr>` + r.rows.map(row => `<tr>${row.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
    $('#roomCta').href = WA + encodeURIComponent(`Hola Bellezza Privé, quiero reservar en la sala ${r.title}.`);
    room.hidden = false;
    document.body.classList.add('is-locked');
    gsap.fromTo(room, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(150% at 50% 50%)', duration: 1.1, ease: 'expo.inOut' });
    gsap.fromTo('.room__body > *', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: .06, duration: .9, delay: .45, ease: 'power3.out' });
    $('#roomClose').focus();
  }
  function close() {
    gsap.to(room, { clipPath: 'circle(0% at 50% 50%)', duration: .7, ease: 'expo.in', onComplete: () => { room.hidden = true; document.body.classList.remove('is-locked'); lastFocus && lastFocus.focus(); } });
  }
  $$('.door').forEach(d => d.addEventListener('click', () => openRoom(d.dataset.room, d)));
  $('#roomClose').addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape' && !room.hidden) close(); });
})();

/* ---------- tarjeta de socia ---------- */
(function member() {
  const card = $('#card'), input = $('#memberName'), name = $('#cardName'), cta = $('#memberCta');
  $('#cardYear').textContent = new Date().getFullYear();
  const update = () => {
    const v = input.value.trim();
    name.textContent = v || 'Tu nombre aquí';
    cta.href = WA + encodeURIComponent(v ? `Hola, soy ${v}. Quiero reservar mi primera cita como socia de Bellezza Privé.` : 'Hola Bellezza Privé, quiero reservar una cita.');
  };
  input.addEventListener('input', update); update();
  const stage = $('.member__stage');
  stage.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `rotateY(${px * 22}deg) rotateX(${-py * 18}deg)`;
    card.style.setProperty('--a', `${px * 180}deg`);
    card.style.setProperty('--sx', `${px * 60}%`);
  });
  stage.addEventListener('pointerleave', () => { card.style.transform = ''; });
  // giro suave en móvil
  let t = 0;
  gsap.ticker.add(() => { if (!matchMedia('(hover:hover)').matches) { t += .01; card.style.setProperty('--a', `${Math.sin(t) * 120}deg`); card.style.setProperty('--sx', `${Math.sin(t) * 40}%`); } });
})();

/* ---------- reveals ---------- */
$$('.head, .perk, .note, .visit__info, .visit__img, .member__copy, .member__stage').forEach(el => {
  gsap.from(el, { y: 60, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
});
gsap.from('.door', { y: 80, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: .12, scrollTrigger: { trigger: '.doors', start: 'top 85%' } });
