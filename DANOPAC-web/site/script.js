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

/* ============================================
   FILTRO DE PRODUCTOS — con animación escalonada
   ============================================ */
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

    let visibleIndex = 0;

    productCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;

      // Quita cualquier animación previa para poder relanzarla
      card.classList.remove('is-filtering-in');

      if (show) {
        card.classList.remove('is-hidden');
        // Forzamos un pequeño reflow para poder reiniciar la animación
        void card.offsetWidth;
        card.style.animationDelay = `${visibleIndex * 60}ms`;
        card.classList.add('is-filtering-in');
        visibleIndex += 1;
      } else {
        card.classList.add('is-hidden');
        card.style.animationDelay = '';
      }
    });
  });
});

/* ============================================
   TILT 3D AL PASAR EL MOUSE SOBRE LAS TARJETAS
   ============================================ */
const TILT_MAX_DEG = 7;

productCards.forEach((card) => {
  card.style.transformStyle = 'preserve-3d';
  card.style.willChange = 'transform';

  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * TILT_MAX_DEG;
    const rotateX = -((y - centerY) / centerY) * TILT_MAX_DEG;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.015)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
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
    detail: 'Incluye algas marinas, mentol, extractos vegetales y sales yodadas, además de vitaminas A, C y E.'
  },
  'dawrely-fem': {
    name: 'Dawrely Fem', category: 'Cosméticos', pill: 'pill-cosmetico', image: 'assets/dawrely-fem-large.png',
    description: 'Lavado íntimo con ácido láctico, diseñado para mantener el equilibrio del pH y brindar frescura y bienestar.',
    detail: 'Contiene ácido láctico y mentol cristal. Uso externo.'
  },
  'dawrely-straits': {
    name: 'Dawrely Straits', category: 'Cosméticos', pill: 'pill-cosmetico', image: 'assets/dawrely-straits-large.png',
    description: 'Lavado íntimo con alumbre para una mayor sensación de firmeza, limpieza profunda, frescura y efecto astringente.',
    detail: 'Contiene alumbre potásico, mentol cristal y una base limpiadora suave. Uso externo.'
  },
  plopiee: {
    name: "P'lopiee", category: 'Cosméticos', pill: 'pill-cosmetico', image: 'assets/Plopiee3.png',
    description: 'Crema refrescante que ayuda a aliviar la sensación de cansancio y pesadez en pies y piernas.',
    detail: 'Contiene mentol, castaño de Indias y hamamelis. Aplicar mediante un suave masaje en pies y piernas.'
  },
'nova-b': {
    name: 'Nova B Forte-K', category: 'Éticos', pill: 'pill-etico', image: 'assets/Novabfortekfoto.png',
    description: 'Combinación analgésica y antiinflamatoria de diclofenaco potásico con complejo vitamínico B1, B6 y B12.',
    detail: 'Ayuda a tratar artritis, dolor de codo, cuello, espalda, rodilla, pantorrilla y hombros. Consultar con un médico si el dolor persiste.'
  },
  
  'stop-grip': {
    name: 'Stop Grip', category: 'Éticos', pill: 'pill-etico', images: ['assets/STOPGRIPJARABE.png', 'assets/Stopgripcap.png'],
    description: 'Línea especializada en el alivio integral de síntomas de gripe, resfriados y congestión nasal.',
    detail: 'Disponible en sus dos presentaciones járabe y sachet. Si los sintomas de la gripe persisten consulte con su doctor de confianza.'
  },
  geltrafem: {
    name: 'Geltrafem', category: 'Éticos', pill: 'pill-etico', image: 'assets/GeltraFemfoto2.png',
    description: 'Ácido mefenámico en sachet, formulado para el alivio del dolor menstrual y otros dolores leves a moderados.',
    detail: 'Presentación en sachet de fácil administración. Si el dolor persiste o se agrava, consulte con su doctor de confianza.'
  },
  'dawsy-fat': {
    name: 'Dawsy F', category: 'Éticos', pill: 'pill-etico', image: 'assets/DawsyFfoto.png',
    description: 'Orlistat, indicado para reducir la absorción de grasa como parte de un plan integral de control de peso.',
    detail: 'Recomendado junto a una dieta baja en grasas. Consulte con su doctor de confianza antes de iniciar el tratamiento.'
  },
  tiktan: {
    name: 'Tiktan', category: 'Éticos', pill: 'pill-etico', image: 'assets/Tiktanfoto.png',
    description: 'Sildenafil, tratamiento indicado para la disfunción eréctil masculina.',
    detail: 'Consulte con su doctor de confianza en caso de efectos secundarios y suspender el uso inmendiato del medicamento.'
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
if (product.images) {
  modalImage.innerHTML = product.images
    .map((src) => `<img src="${src}" alt="${product.name}">`)
    .join('');
} else if (product.image) {
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
    window.open(`https://wa.me/18495717606?text=${text}`, '_blank', 'noopener,noreferrer');
    formStatus.textContent = 'Abriendo WhatsApp para enviar tu mensaje...';
    contactForm.reset();
  });
}

document.querySelector('#current-year').textContent = new Date().getFullYear();

/* ============================================
   REVEAL AL HACER SCROLL — con stagger automático
   ============================================ */
const revealItems = document.querySelectorAll('.reveal');

// Aplica un pequeño retraso extra según la posición dentro de su contenedor,
// para que grupos de elementos (como el product-grid) entren en cascada.
document.querySelectorAll('.product-grid, .essence-values, .contact-list').forEach((group) => {
  Array.from(group.children).forEach((child, index) => {
    child.style.transitionDelay = `${index * 70}ms`;
  });
});

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
