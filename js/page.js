//document.addEventListener('DOMContentLoaded', function() {

    const grid = document.getElementById('photo-grid-list');
    const btnLoadMore = document.getElementById('btn-load-more');

    //if (!grid) return;

    let currentPage = 1;
    let currentCategory = '';
    let currentFormat = '';
    let currentOrder = 'desc';
    const perPage = 8;
    let isFiltering = false;
    let totalPages = 1;

    // ── CUSTOM SELECT ──
    function initCustomSelect(selectEl, onChange) {
        if (!selectEl) return;
        const trigger = selectEl.querySelector('.custom-select__trigger span');
        const options = selectEl.querySelector('.custom-select__options');

        selectEl.querySelector('.custom-select__trigger').addEventListener('click', function() {
            document.querySelectorAll('.custom-select').forEach(function(s) {
                if (s !== selectEl) s.classList.remove('is-open');
            });
            selectEl.classList.toggle('is-open');
        });

        options.addEventListener('click', function(e) {
            const opt = e.target.closest('.custom-select__option');
            if (!opt) return;
            options.querySelectorAll('.custom-select__option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            trigger.textContent = opt.textContent;
            selectEl.classList.remove('is-open');
            onChange(opt.dataset.value);
        });
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-select')) {
            document.querySelectorAll('.custom-select').forEach(s => s.classList.remove('is-open'));
        }
    });

    // ── TAXONOMIES ──
    function loadTaxonomies() {
        fetch(NM.apiUrl + 'event_categories?per_page=100')
            .then(r => r.json())
            .then(terms => {
                const options = document.querySelector('#filter-category .custom-select__options');
                if (!options || !Array.isArray(terms)) return;
                options.innerHTML = '<div class="custom-select__option selected" data-value="">Catégories</div>';
                terms.forEach(function(term) {
                    options.insertAdjacentHTML('beforeend',
                        `<div class="custom-select__option" data-value="${term.slug}">${term.name}</div>`
                    );
                });
            });

        fetch(NM.apiUrl + 'photo_formats?per_page=100')
            .then(r => r.json())
            .then(terms => {
                const options = document.querySelector('#filter-format .custom-select__options');
                if (!options || !Array.isArray(terms)) return;
                options.innerHTML = '<div class="custom-select__option selected" data-value="">Formats</div>';
                terms.forEach(function(term) {
                    options.insertAdjacentHTML('beforeend',
                        `<div class="custom-select__option" data-value="${term.slug}">${term.name}</div>`
                    );
                });
            });
    }

    // ── API URL ──
    function buildApiUrl(page) {
        let url = NM.apiUrl + 'photos?per_page=' + perPage + '&page=' + page;
        url += '&order=' + currentOrder;
        if (currentCategory) url += '&event_category=' + currentCategory;
        if (currentFormat) url += '&photo_format=' + currentFormat;
        return url;
    }

    // ── PHOTO BLOCK ──
    function createPhotoBlock(photo) {
        const img = photo.square_thumbnail || '';
        const full = photo.full_image || '';
        const link = photo.photo_link || '#';
        const title = photo.title ? photo.title.rendered : '';

        return `
            <div class="photo-block">
                <div class="photo-block__img-wrap">
                    <img src="${img}" alt="${title}" loading="lazy" />
                    <div class="photo-block__overlay">
                        <a href="${link}" class="photo-block__btn" title="Voir les infos">
                            <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </a>
                        <button class="photo-block__btn" data-lightbox data-src="${full}" title="Plein écran">
                            <svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ── CHARGER PHOTOS ──
    function loadPhotos(reset) {
        if (reset) {
            currentPage = 1;
            grid.innerHTML = '';
            isFiltering = true;
        }

        fetch(buildApiUrl(currentPage))
            .then(function(r) {
                totalPages = parseInt(r.headers.get('X-WP-TotalPages')) || 1;
                if (currentPage >= totalPages) {
                    btnLoadMore.disabled = true;
                    btnLoadMore.textContent = 'Toutes les photos sont affichées';
                } else {
                    btnLoadMore.disabled = false;
                    btnLoadMore.textContent = 'Charger plus';
                }
                return r.json();
            })
            .then(function(photos) {
                if (!Array.isArray(photos)) return;
                photos.forEach(function(photo) {
                    grid.insertAdjacentHTML('beforeend', createPhotoBlock(photo));
                });
                initLightbox();
            });
    }

    // ── LIGHTBOX ──
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox__inner">
            <button class="lightbox__close">&times;</button>
            <img class="lightbox__img" src="" alt="" />
        </div>
    `;
    document.body.appendChild(lightbox);

    function initLightbox() {
        document.querySelectorAll('[data-lightbox]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                lightbox.querySelector('.lightbox__img').src = btn.dataset.src;
                lightbox.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    lightbox.querySelector('.lightbox__close').addEventListener('click', function() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });

    // ── LOAD MORE ──
    btnLoadMore.addEventListener('click', function() {
        if (!isFiltering) {
            isFiltering = true;
            currentPage = 1;
            grid.innerHTML = '';
        }
        currentPage++;
        loadPhotos(false);
    });

    // ── INIT CUSTOM SELECTS ──
    initCustomSelect(
        document.getElementById('filter-category'),
        function(val) { currentCategory = val; loadPhotos(true); }
    );

    initCustomSelect(
        document.getElementById('filter-format'),
        function(val) { currentFormat = val; loadPhotos(true); }
    );

    initCustomSelect(
        document.getElementById('filter-order'),
        function(val) { currentOrder = val; loadPhotos(true); }
    );

    // ── INIT ──
    loadTaxonomies();
    // Photos initiales chargées en PHP

//});