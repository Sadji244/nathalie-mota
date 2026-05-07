document.addEventListener('DOMContentLoaded', function () {

    // ── MODALE ──
    const overlay = document.querySelector('.modal-overlay');
    const btnClose = document.querySelector('.modal-close');
    const contactLinks = document.querySelectorAll('a[href="#contact"]');

    if (overlay) {

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

        // Ouvrir depuis bouton contact single page avec préfill
        document.querySelectorAll('[data-open-modal]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const ref = btn.dataset.photoRef || '';
                overlay.classList.add('is-open');
                document.body.style.overflow = 'hidden';
                const refField = overlay.querySelector('input[name="photo-ref"]');
                if (refField && ref) refField.value = ref;
            });
        });

    }

    // ── BURGER MENU ──
    const burger = document.getElementById('burger');
    const burgerClose = document.getElementById('burger-close');
    const fullscreenMenu = document.getElementById('fullscreen-menu');

    if (burger && fullscreenMenu) {

        burger.addEventListener('click', function() {
            fullscreenMenu.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });

        burgerClose.addEventListener('click', function() {
            fullscreenMenu.classList.remove('is-open');
            document.body.style.overflow = '';
        });

    }

    // ── FERMER TOUT AVEC ÉCHAP ──
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (overlay) {
                overlay.classList.remove('is-open');
            }
            if (fullscreenMenu) {
                fullscreenMenu.classList.remove('is-open');
            }
            document.body.style.overflow = '';
        }
    });

});