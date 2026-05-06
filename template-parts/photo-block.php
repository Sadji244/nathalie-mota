<?php
$ref = get_post_meta( get_the_ID(), 'photo_ref', true );
?>

<div class="photo-block">

    <div class="photo-block__img-wrap">
        <?php if ( has_post_thumbnail() ) : ?>
            <?php the_post_thumbnail('photo-square'); ?>
        <?php endif; ?>

        <div class="photo-block__overlay">
            <!-- Icône œil → page infos -->
            <a href="<?php the_permalink(); ?>" class="photo-block__btn" title="Voir les infos">
                <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </a>
            <!-- Icône plein écran → lightbox -->
            <button
                class="photo-block__btn"
                data-lightbox
                data-src="<?php echo esc_url( get_the_post_thumbnail_url(get_the_ID(), 'full') ); ?>"
                title="Plein écran"
            >
                <svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            </button>
        </div>
    </div>

</div>