// modal.js
export function initImageModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeModal = document.querySelector('.modal-close');

  if (!modal || !modalImg || !closeModal) return;

  // Abrir modal al hacer clic en cualquier imagen de los slides
  document.querySelectorAll('.slide img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add('show');
    });
  });

  // Cerrar al hacer clic en la (X)
  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Cerrar al hacer clic en el fondo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
    }
  });
}