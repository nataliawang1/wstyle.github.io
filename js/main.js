const navLinks = document.querySelectorAll('nav a');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');

    if (href && href.startsWith('#')) {
      event.preventDefault();

      const targetId = href.slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

function openLightbox(imageSrc, imageAlt) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', imageAlt || 'Imagen ampliada');

  const content = document.createElement('div');
  content.className = 'lightbox-content';

  const closeButton = document.createElement('button');
  closeButton.className = 'lightbox-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Cerrar imagen');
  closeButton.textContent = '×';

  const image = document.createElement('img');
  image.className = 'lightbox-image';
  image.src = imageSrc;
  image.alt = imageAlt || 'Imagen ampliada';

  content.append(closeButton, image);
  overlay.appendChild(content);

  const previousOverflow = document.body.style.overflow;
  const previouslyFocused = document.activeElement;

  function closeLightbox() {
    overlay.remove();
    document.body.style.overflow = previousOverflow;
    document.removeEventListener('keydown', onKeyDown);

    if (previouslyFocused instanceof HTMLElement) {
      previouslyFocused.focus();
    }
  }

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target === closeButton) {
      closeLightbox();
    }
  });

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  closeButton.focus();

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  }

  document.addEventListener('keydown', onKeyDown);
}

const gallery = document.querySelector('.galeria-grid');

if (gallery) {
  gallery.addEventListener('click', (event) => {
    const image = event.target.closest('img');
    if (image) {
      openLightbox(image.src, image.alt || 'Imagen ampliada');
    }
  });
}
