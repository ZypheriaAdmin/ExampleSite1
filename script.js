// === Fade-in observer ===
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // Reset when off-screen
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el);
});

// === Dust text setup ===
const text = document.getElementById('dust-text');
const letters = text.textContent.trim().split('');
text.innerHTML = letters.map(letter => `<span>${letter}</span>`).join('');
const spans = text.querySelectorAll('span');

let dustEffectActive = false;

// === Observer for dust-text ===
const dustObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      dustEffectActive = true;
    } else {
      dustEffectActive = false;
    }
  });
}, { threshold: 0.2 });

dustObserver.observe(text);

// === Scroll effect for dust-text ===
window.addEventListener('scroll', () => {
  if (!dustEffectActive) return;

  const scrollY = window.scrollY;

  spans.forEach((span, i) => {
    const offset = scrollY / 3 - i * 3;
    const clampedOffset = Math.max(Math.min(offset, 100), 0);

    span.style.transform = `translate(${clampedOffset}px, ${-clampedOffset}px) rotate(${clampedOffset / 5}deg)`;
    span.style.opacity = `${Math.max(1 - clampedOffset / 20, 0)}`;
  });
});
