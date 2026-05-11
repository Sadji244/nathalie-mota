document.addEventListener('DOMContentLoaded', function() {

    const grid = document.getElementById('photo-grid-list');
    const btnLoadMore = document.getElementById('btn-load-more');

    if (!grid) return;

    let currentPage = 1;
    let currentCategory = '';
    let currentFormat = '';
    let currentOrder = 'desc';
    const perPage = 8;
    let totalPages = 1;

    let photosIndex = []; // IMPORTANT : index global stable

    // ── CUSTOM SELECT ──
    function initCustomSelect(selectEl, onChange) {
        if (!selectEl) return;

        const trigger = selectEl.querySelector('.custom-select__trigger span');
        const options = selectEl.querySelector('.custom-select__options');

        selectEl.querySelector('.custom-select__trigger').addEventListener('click', function() {
            document.querySelectorAll('.custom-select').forEach(s => {
                if (s !== selectEl) s.classList.remove('is-open');
            });
            selectEl.classList.toggle('is-open');
        });

        options.addEventListener('click', function(e) {
            const opt = e.target.closest('.custom-select__option');
            if (!opt) return;

            options.querySelectorAll('.custom-select__option')
                .forEach(o => o.classList.remove('selected'));

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

                terms.forEach(term => {
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

                terms.forEach(term => {
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

    // ── CREATE BLOCK ──
    function createPhotoBlock(photo) {

        const img   = photo.square_thumbnail || '';
        const full  = photo.full_image || '';
        const link  = photo.photo_link || '#';
        const title = photo.title ? photo.title.rendered : '';
        const category = photo.photo_category || '';

        const id = photo.id; // IMPORTANT

        photosIndex.push({
            id,
            src: full,
            title
        });

        return `
            <div class="photo-block">
    <div class="photo-block__img-wrap">

        <img src="${img}" alt="${title}" loading="lazy" />

        <div class="photo-block__overlay">

            <!-- CENTRE (infos) -->
            <a href="${link}"
               class="photo-block__btn photo-block__btn--center"
               title="Voir les infos">

                <svg viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>

            </a>

            <!-- HAUT DROITE (lightbox) -->
            <button
                class="photo-block__btn photo-block__btn--topright"
                data-lightbox
                data-id="${id}"
                data-src="${full}"
                data-title="${title}"
                data-category="${category}"
                title="Plein écran"
            >
                <svg viewBox="0 0 24 24">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
            </button>

        </div>
    </div>
</div>
        `;
    }

    // ── LOAD PHOTOS ──
    function loadPhotos(reset) {

        if (reset) {
            currentPage = 1;
            grid.innerHTML = '';
            photosIndex = []; // RESET INDEX
        }

        fetch(buildApiUrl(currentPage))
            .then(r => {

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
            .then(photos => {

                if (!Array.isArray(photos)) return;

                photos.forEach(photo => {
                    grid.insertAdjacentHTML('beforeend', createPhotoBlock(photo));
                });

                document.dispatchEvent(new Event('photosLoaded'));
            });
    }

    // ── LOAD MORE ──
    btnLoadMore.addEventListener('click', function() {
        currentPage++;
        loadPhotos(false);
    });

    // ── SELECTS ──
    initCustomSelect(
        document.getElementById('filter-category'),
        val => { currentCategory = val; loadPhotos(true); }
    );

    initCustomSelect(
        document.getElementById('filter-format'),
        val => { currentFormat = val; loadPhotos(true); }
    );

    initCustomSelect(
        document.getElementById('filter-order'),
        val => { currentOrder = val; loadPhotos(true); }
    );

    // ── INIT ──
    loadTaxonomies();

    document.dispatchEvent(new Event('photosLoaded'));
});