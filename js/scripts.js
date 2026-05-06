document.addEventListener('DOMContentLoaded', function () {

    const overlay = document.querySelector('.modal-overlay');
    const btnClose = document.querySelector('.modal-close');
    const contactLinks = document.querySelectorAll('a[href="#contact"]');

    // Ouvrir via lien Contact
    contactLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            overlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermer via ✕
    btnClose.addEventListener('click', function() {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
    });

    // Fermer en cliquant sur l'overlay
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });

    // Fermer avec Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            overlay.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });

    // Ouvrir modale depuis bouton contact single page
document.querySelectorAll('[data-open-modal]').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const ref = btn.dataset.photoRef || '';
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        const refField = overlay.querySelector('input[name="photo-ref"]');
        if (refField && ref) refField.value = ref;
    });
});

});