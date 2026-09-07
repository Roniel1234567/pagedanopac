const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const filterButtons = document.querySelectorAll('.filter-button');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });

    productCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !show);
    });
  });
});

const products = {
  dawsy: {
    name: 'Dawsy Quema grasa', category: 'Naturales', pill: 'pill-natural', image: 'assets/dawsy-capsulas.png',
    description: 'Línea especializada en la pérdida de peso que combina eficacia y control metabólico para acompañar tu bienestar general.',
    detail: 'Fórmula natural de linaza en cápsulas. Disponible en presentaciones de 45, 90 y 100 cápsulas.'
  },
  'dawsy-sachet': {
    name: 'Dawsy Sachet', category: 'Naturales', pill: 'pill-natural', image: 'assets/dawsy-sachet-fresa.png',
    description: 'Una presentación práctica para llevar a cualquier lugar y disfrutar tu rutina de bienestar.',
    detail: 'Disponible en sabores fresa y naranja cada caja contiene 25 sobres.'
  },
'dawsy-fibra': {
    name: 'Dawsy Fibra', category: 'Naturales', pill: 'pill-natural', images: ['assets/Fi130gr2.png', 'assets/Fibra340.png'],
    description: 'Fibra natural en polvo para acompañar la digestión y el control de peso.',
    detail: 'Disponible en sabores manzana, piña, vainilla, fresa y naranja. Presentaciones de 130 g y 340 g.'
  
  },
  'dawsy-slim': {
    name: 'Dawsy Slim', category: 'Cosméticos', pill: 'pill-cosmetico', image: 'assets/dawsy-slim-large.png',
    description: 'Crema adelgazante, demoledora de grasa y anticelulítica para complementar el cuidado corporal.',
    detail: 'Su ficha técnica incluye algas marinas, mentol, extractos vegetales y sales yodadas, además de vitaminas A, C y E.'
  },
  'dawrely-fem': {
    name: 'Dawrely Fem', category: 'Cosméticos', pill: 'pill-cosmetico', image: 'assets/dawrely-fem-large.png',
    description: 'Lavado íntimo con ácido láctico, diseñado para mantener el equilibrio del pH y brindar frescura y bienestar.',
    detail: 'Contiene ácido láctico, mentol cristal y alumbre potásico. Uso externo.'
  },
  'dawrely-straits': {
    name: 'Dawrely Straits', category: 'Cosméticos', pill: 'pill-cosmetico', image: 'assets/dawrely-straits-large.png',
    description: 'Lavado íntimo con alumbre para una mayor sensación de firmeza, limpieza profunda y frescura.',
    detail: 'Contiene alumbre potásico, ácido bórico, mentol cristal y una base limpiadora suave. Uso externo.'
  },
  plopiee: {
    name: "P'lopiee", category: 'Cosméticos', pill: 'pill-cosmetico', image: 'assets/plopiee.png',
    description: 'Crema refrescante que ayuda a aliviar la sensación de cansancio y pesadez en pies y piernas.',
    detail: 'Contiene mentol, castaño de Indias y hamamelis. Aplicar mediante un suave masaje en pies y piernas.'
  },
  'nova-b': {
    name: 'Nova B Forte-K', category: 'Éticos', pill: 'pill-etico', art: 'NOVA B|FORTE-K',
    description: 'Combinación analgésica y antiinflamatoria de diclofenaco potásico con complejo vitamínico B1, B6 y B12.',
    detail: 'Producto del portafolio ético de DANOPAC. Consulta disponibilidad y presentación con un asesor.'
  },
  'stop-grip': {
    name: 'Stop Grip', category: 'Éticos', pill: 'pill-etico', art: 'STOP|GRIP',
    description: 'Línea especializada en el alivio integral de síntomas de gripe, resfriados y congestión nasal.',
    detail: 'El material corporativo presenta formatos jarabe y sachet. Consulta disponibilidad con un asesor.'
  }

};

const modal = document.querySelector('#product-modal');
const modalImage = document.querySelector('#modal-image');
const modalTitle = document.querySelector('#modal-title');
const modalCategory = document.querySelector('#modal-category');
const modalDescription = document.querySelector('#modal-description');
const modalDetail = document.querySelector('#modal-detail');

function openProductModal(key) {
  const product = products[key];
  if (!product || !modal) return;

  modalImage.className = 'modal-product-image';
  if (product.image) {
    modalImage.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
  } else {
    modalImage.classList.add('modal-art');
    const artLines = product.art.split('|').map((line, index) => index === 1 ? `<b>${line}</b>` : line).join('<br>');
    modalImage.innerHTML = `<span>${artLines}</span>`;
  }
  modalCategory.textContent = product.category;
  modalCategory.className = `category-pill ${product.pill}`;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalDetail.textContent = product.detail;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('[data-close-modal]').focus();
}

function closeProductModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.product-detail').forEach((button) => {
  button.addEventListener('click', () => openProductModal(button.dataset.product));
});
document.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeProductModal);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeProductModal();
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const type = formData.get('type');
    const message = formData.get('message');
    const text = `Hola DANOPAC, soy ${name}.%0A%0ATipo de consulta: ${type}.%0ACorreo: ${email}.%0A%0A${message}`;
    window.open(`https://wa.me/18097246440?text=${text}`, '_blank', 'noopener,noreferrer');
    formStatus.textContent = 'Abriendo WhatsApp para enviar tu mensaje...';
    contactForm.reset();
  });
}

document.querySelector('#current-year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
