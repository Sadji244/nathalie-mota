<footer class="site-footer">
    <?php
    $mentions   = get_page_by_path('mentions-legales');
    $vie_privee = get_page_by_path('vie-privee');
    ?>

    <?php if ( $mentions ) : ?>
        <a href="<?php echo esc_url( get_permalink($mentions) ); ?>">Mentions légales</a>
    <?php endif; ?>

    <?php if ( $vie_privee ) : ?>
        <a href="<?php echo esc_url( get_permalink($vie_privee) ); ?>">Vie privée</a>
    <?php endif; ?>

    <span>Tous droits réservés</span>

</footer>

<?php wp_footer(); ?>
</body>
</html>