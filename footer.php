<footer class="site-footer">

    <a href="<?php echo esc_url( home_url('/mentions-legales/') ); ?>">
    <span>Mentions légales</span>
    </a>

    <a href="<?php echo esc_url( home_url('/vie-privee/') ); ?>">
    <span>Vie privée</span>
    </a>

    <span>Tous droits réservés</span>
</footer>

<?php get_template_part('template-parts/modal-contact'); ?>

<!-- LIGHTBOX -->
<div class="lightbox" id="lightbox">
    <div class="lightbox__inner">

        <button class="lightbox__close" aria-label="Fermer">&times;</button>

        <div class="lightbox__content">
            <button class="lightbox__prev" aria-label="Précédent">
                <img src="<?php echo get_template_directory_uri(); ?>/img/arrow-prev.png" alt="" />
                <span>Précédent</span>
            </button>

            <img class="lightbox__img" src="" alt="" />

            <button class="lightbox__next" aria-label="Suivant">
                <span>Suivant</span>
                <img src="<?php echo get_template_directory_uri(); ?>/img/arrow-next.png" alt="" />
            </button>
        </div>

        <div class="lightbox__bar">
            <p class="lightbox__title"></p>
            <p class="lightbox__category"></p>
        </div>

    </div>
</div>

<?php wp_footer(); ?>
</body>
</html>