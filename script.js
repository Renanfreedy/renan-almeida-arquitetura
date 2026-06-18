// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    mobileMenu.hidden = open;
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });
}

// ===== PROJECT PREVIEW (hover/focus shows image, click goes to galeria) =====
const preview = document.querySelector('#projectPreview');
const caption = document.querySelector('#projectCaption');
const previewFig = document.querySelector('.project-preview');
const previewLink = document.querySelector('#projectPreviewLink');

document.querySelectorAll('.project-row').forEach(row => {
  const updatePreview = () => {
    if (!preview) return;
    const next = row.dataset.img;
    const title = row.dataset.title || '';
    if (preview.getAttribute('src') !== next) {
      preview.style.opacity = '0.1';
      setTimeout(() => {
        preview.src = next;
        preview.alt = title;
        if (caption) caption.textContent = title;
        if (previewLink) previewLink.setAttribute('aria-label', `Abrir galeria geral de projetos — ${title}`);
        preview.style.opacity = '1';
        preview.style.transition = 'opacity .4s ease';
      }, 150);
    }
    if (previewFig) previewFig.classList.add('active');
  };
  row.addEventListener('mouseenter', updatePreview);
  row.addEventListener('focus', updatePreview);
  // Click goes to galeria.html (natural <a> behavior)
});

// ===== CAROUSEL =====
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && prevBtn && nextBtn) {
  const getScrollAmount = () => {
    const card = track.querySelector('.carousel-card');
    return card ? card.offsetWidth + 3 : 600;
  };
  nextBtn.addEventListener('click', () => { track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' }); });
  prevBtn.addEventListener('click', () => { track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' }); });

  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; track.style.cursor = 'grabbing'; });
  track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mouseup', () => { isDown = false; track.style.cursor = 'grab'; });
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });
}

// ===== SCROLL REVEAL =====
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.rail-nav a');
if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--ink)' : '';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));
}

// ===== YEAR =====
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
