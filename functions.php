<?php
add_action('after_setup_theme', function() {
    register_nav_menus([
        'primary' => 'Menu principal',
    ]);
});

add_action('wp_enqueue_scripts', function() {

    // Style principal (contient les @font-face + tout le CSS)
    wp_enqueue_style(
        'nm-style',
        get_stylesheet_uri(),
        [],
        wp_get_theme()->get('Version')
    );

        // COMMENTÉ TEMPORAIREMENT
     wp_enqueue_script(
        'nm-scripts',
       get_template_directory_uri() . '/js/scripts.js',
         [],
         wp_get_theme()->get('Version'),
         true
     );

     wp_enqueue_style(
    'nm-fonts',
    'https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Playfair+Display:ital,wght@1,700&family=Jost:wght@400;500;600&display=swap',
    [],
    null
);

wp_enqueue_style(
    'nm-style',
    get_stylesheet_uri(),
    ['nm-fonts'],
    wp_get_theme()->get('Version')
);
});