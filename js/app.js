// modal.js
function initImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeModal = document.querySelector('.modal-close');
  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');

  if (!modal || !modalImg) return;

  let imagesList = [];
  let currentIndex = 0;

  // Actualiza la imagen visible en el modal
  function updateModalImage(index) {
    currentIndex = index;
    modalImg.src = imagesList[currentIndex].src;
    modalImg.alt = imagesList[currentIndex].alt;
  }

  // Captura las im谩genes y asigna eventos de clic
  function bindImageEvents() {
    imagesList = Array.from(document.querySelectorAll('.slide img'));

    imagesList.forEach((img, index) => {
      img.addEventListener('click', () => {
        updateModalImage(index);
        modal.classList.add('show');
      });
    });
  }

  bindImageEvents();

  // Navegaci贸n a la imagen anterior
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
    updateModalImage(newIndex);
  });

  // Navegaci贸n a la imagen siguiente
  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % imagesList.length;
    updateModalImage(newIndex);
  });

  // Cerrar al hacer clic en la (X)
  closeModal?.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Cerrar al hacer clic fuera de la imagen
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });

  // Controles con teclado (Escape, Flecha Izquierda, Flecha Derecha)
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('show')) return;

    if (e.key === 'Escape') {
      modal.classList.remove('show');
    } else if (e.key === 'ArrowLeft') {
      const newIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
      updateModalImage(newIndex);
    } else if (e.key === 'ArrowRight') {
      const newIndex = (currentIndex + 1) % imagesList.length;
      updateModalImage(newIndex);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dotsContainer');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  let currentSlide = 0;
  let autoSlideInterval;

  // 1. Crear Puntos Din谩micamente
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);

  });

  initImageModal();

  const dots = document.querySelectorAll('.dot');

  // 2. Funci贸n para Cambiar de Slide
  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    resetAutoSlide();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // 3. Listeners para Botones
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // 4. Cambio Autom谩tico cada 4 segundos
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  startAutoSlide();

  // 5. Men煤 Hamburguesa para M贸vil
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

// ==== ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER) ====
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  
  // Ocultamos las secciones inicialmente con CSS a trav閟 de JS
  sections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(30px)';
    sec.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // 15% de la seccin visible para que se active
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        // Opcional: observer.unobserve(entry.target); si solo quieres que se anime una vez
      }
    });
  }, observerOptions);

  sections.forEach(sec => {
    sectionObserver.observe(sec);
  });
});

// ==== SCROLL SUAVE PERSONALIZADO (CUSTOM SMOOTH SCROLL) ====
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Previene el salto nativo r醦ido del navegador
      
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // Configuracin del scroll
      const navbarHeight = 90; // Altura de tu navbar fijo
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      
      // Tiempo que tarda el scroll (en milisegundos). 1200ms = 1.2 segundos (muy suave)
      const duration = 1200; 
      let start = null;

      // Funcin de aceleracin (Easing curve: easeInOutQuart) 
      // Empieza muy lento, acelera en medio, y frena muy suavemente al final
      function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2 * t * t * t * t + b;
        t -= 2;
        return -c/2 * (t * t * t * t - 2) + b;
      }

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        
        // Calcular la prxima posicin
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    });
  });
});

// ==== MANEJO DEL FORMULARIO CON AJAX ====
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Evita que la pgina cambie de pestaa o recargue
      
      const data = new FormData(form);
      const btn = form.querySelector('.btn-submit');
      const originalBtnText = btn.innerText;
      
      // Cambiamos el texto del botn mientras se enva
      btn.innerText = 'Sending...';
      btn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // El envo fue exitoso
          form.reset(); // Vaca todas las casillas
          statusMsg.style.display = 'block'; // Muestra el mensaje de xito
          
          // Ocultar el mensaje despus de 5 segundos
          setTimeout(() => {
            statusMsg.style.display = 'none';
          }, 5000);
        } else {
          // Hubo un error de parte de Formspree
          alert('Oops! There was a problem submitting your form.');
        }
      } catch (error) {
        alert('Oops! There was a problem submitting your form.');
      }

      // Devolver el botn a la normalidad
      btn.innerText = originalBtnText;
      btn.disabled = false;
    });
  }
});
