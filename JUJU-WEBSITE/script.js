const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

// Reveal sections gently as the story progresses.
const observer = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => {
  if (isIntersecting) { target.classList.add('visible'); observer.unobserve(target); }
}), { threshold: 0.14 });
$$('.reveal').forEach((element) => observer.observe(element));

// Music remains opt-in for mobile browsers.
const music = $('#backgroundMusic'); const musicButton = $('#musicToggle');
musicButton.addEventListener('click', async () => {
  if (music.paused) { try { await music.play(); musicButton.classList.add('is-playing'); musicButton.setAttribute('aria-label', 'Pause background music'); musicButton.setAttribute('aria-pressed', 'true'); } catch (_) {} }
  else { music.pause(); musicButton.classList.remove('is-playing'); musicButton.setAttribute('aria-label', 'Play background music'); musicButton.setAttribute('aria-pressed', 'false'); }
});

// Gallery lightbox.
const lightbox = $('#lightbox');
$$('.gallery-item').forEach((item) => item.addEventListener('click', () => {
  const image = $('img', item); $('#lightboxImage').src = image.src; $('#lightboxImage').alt = image.alt; $('#lightboxCaption').textContent = item.dataset.caption; lightbox.showModal();
}));

// Tap-friendly cards: only one message opens at once.
$$('.love-card').forEach((card) => card.addEventListener('click', () => { const willOpen = !card.classList.contains('open'); $$('.love-card.open').forEach((c) => c.classList.remove('open')); card.classList.toggle('open', willOpen); }));

// Envelope and letter.
const envelope = $('#envelope'); const letterModal = $('#letterModal');
envelope.addEventListener('click', () => { envelope.classList.add('open'); envelope.setAttribute('aria-expanded', 'true'); setTimeout(() => letterModal.showModal(), 620); });

// Close modal when clicking the close button or the backdrop.
$$('dialog').forEach((dialog) => { $('.close', dialog).addEventListener('click', () => dialog.close()); dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }); });

// Five taps on the tiny heart reveal an Easter egg.
let heartTaps = 0; let heartTimer;
const revealSecret = () => { heartTaps += 1; clearTimeout(heartTimer); heartTimer = setTimeout(() => heartTaps = 0, 2500); if (heartTaps === 5) { $('#secretMessage').classList.add('show'); heartTaps = 0; } };
$('#secretHeart').addEventListener('click', revealSecret);
$('#secretHeart').addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); revealSecret(); } });
