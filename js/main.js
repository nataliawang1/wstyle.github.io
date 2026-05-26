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

  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Cerrar imagen">×</button>
      <img class="lightbox-image" src="${imageSrc}" alt="${imageAlt}">
    </div>
  `;

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target.classList.contains('lightbox-close')) {
      overlay.remove();
    }
  });

  document.body.appendChild(overlay);

  document.addEventListener('keydown', function onKeyDown(event) {
    if (event.key === 'Escape') {
      overlay.remove();
      document.removeEventListener('keydown', onKeyDown);
    }
  });
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
