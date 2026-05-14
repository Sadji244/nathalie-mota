document.addEventListener('DOMContentLoaded', function() {

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxTitle = lightbox.querySelector('.lightbox__title');
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    const lightboxPrev = lightbox.querySelector('.lightbox__prev');
    const lightboxNext = lightbox.querySelector('.lightbox__next');

    let currentIndex = 0;
    let photos = [];

    // ── Collecter toutes les photos de la page ──
    function collectPhotos() {
    photos = [];
    document.querySelectorAll('[data-lightbox]').forEach(function(btn, index) {
        // Éviter les doublons d'écouteurs
        if (btn.dataset.lightboxBound) return;
        btn.dataset.lightboxBound = 'true';

        photos.push({
            src      : btn.dataset.src,
            title    : btn.dataset.title || '',
            category : btn.dataset.category || '',
            index    : index,
        });

        btn.addEventListener('click', function() {
            // Recalculer l'index au moment du clic
            const allBtns = Array.from(document.querySelectorAll('[data-lightbox]'));
            const i = allBtns.indexOf(btn);
            // Rebuilder photos au moment du clic
            photos = allBtns.map(b => ({
                src      : b.dataset.src,
                title    : b.dataset.title || '',
                ref      : b.dataset.ref || '',
                category : b.dataset.category || '',
            }));
            openLightbox(i);
        });
    });
}

    // ── Ouvrir ──
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    // ── Mettre à jour l'image et le titre ──
    function updateLightbox() {
    const photo = photos[currentIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.title;
    lightboxTitle.textContent = photo.ref || photo.title;

    // Catégorie
    const lightboxCategory = lightbox.querySelector('.lightbox__category');
    if (lightboxCategory) lightboxCategory.textContent = photo.category || '';

    // Flèches
    lightboxPrev.style.opacity = currentIndex > 0 ? '1' : '0.2';
    lightboxPrev.style.pointerEvents = currentIndex > 0 ? 'all' : 'none';
    lightboxNext.style.opacity = currentIndex < photos.length - 1 ? '1' : '0.2';
    lightboxNext.style.pointerEvents = currentIndex < photos.length - 1 ? 'all' : 'none';
}

    

    // ── Fermer ──
    function closeLightbox() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    // ── Navigation ──
    lightboxPrev.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightbox();
        }
    });

    lightboxNext.addEventListener('click', function() {
        if (currentIndex < photos.length - 1) {
            currentIndex++;
            updateLightbox();
        }
    });

    // ── Fermer ──
    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    });

    // ── Init ──
    collectPhotos();

    // Recollecte après chargement AJAX (filtres/load more)
    document.addEventListener('photosLoaded', collectPhotos);

});