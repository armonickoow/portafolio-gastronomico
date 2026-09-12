// modal.js
export function initImageModal() {
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

  // Captura las imágenes y asigna eventos de clic
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

  // Navegación a la imagen anterior
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
    updateModalImage(newIndex);
  });

  // Navegación a la imagen siguiente
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