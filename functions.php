<?php

// ── SETUP ──
add_action('after_setup_theme', function() {
    register_nav_menus([
        'primary' => 'Menu principal',
    ]);
    add_image_size('photo-square', 800, 800, true);
});

// ── ENQUEUE ──
add_action('wp_enqueue_scripts', function() {

    wp_enqueue_style(
        'nm-fonts',
        'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Playfair+Display:ital,wght@1,700&family=Jost:wght@400;500;600&display=swap',
        [], null
    );

    wp_enqueue_style(
        'nm-style',
        get_stylesheet_uri(),
        ['nm-fonts'],
        wp_get_theme()->get('Version')
    );

    // Scripts global (modale + burger)
    wp_enqueue_script(
        'nm-scripts',
        get_template_directory_uri() . '/js/scripts.js',
        [],
        wp_get_theme()->get('Version'),
        true
    );

    // Lightbox sur toutes les pages
    wp_enqueue_script(
        'nm-lightbox',
        get_template_directory_uri() . '/js/lightbox.js',
        [],
        wp_get_theme()->get('Version'),
        true
    );

    // Page d'accueil uniquement
    if (is_home() || is_front_page()) {
        wp_enqueue_script(
            'nm-home',
            get_template_directory_uri() . '/js/page.js',
            [],
            wp_get_theme()->get('Version'),
            true
        );
    }

    wp_localize_script('nm-scripts', 'NM', [
        'apiUrl' => esc_url_raw(rest_url('wp/v2/')),
        'nonce'  => wp_create_nonce('wp_rest'),
    ]);
});

// ── API REST : champs supplémentaires ──
add_action('rest_api_init', function() {

    register_rest_field('photo', 'square_thumbnail', [
        'get_callback' => function($post) {
            $img = wp_get_attachment_image_src(get_post_thumbnail_id($post['id']), 'photo-square');
            return $img ? $img[0] : null;
        },
    ]);

    register_rest_field('photo', 'full_image', [
        'get_callback' => function($post) {
            $img = wp_get_attachment_image_src(get_post_thumbnail_id($post['id']), 'full');
            return $img ? $img[0] : null;
        },
    ]);

    register_rest_field('photo', 'photo_link', [
        'get_callback' => function($post) {
            return get_permalink($post['id']);
        },
    ]);

    register_rest_field('photo', 'photo_category', [
    'get_callback' => function($post) {
        $cats = get_the_terms($post['id'], 'event_category');
        return $cats ? $cats[0]->name : '';
    },
]);

});

// ── API REST : filtres taxonomies ──
add_filter('rest_photo_query', function($args, $request) {
    if ($request->get_param('event_category')) {
        $args['tax_query'][] = [
            'taxonomy' => 'event_category',
            'field'    => 'slug',
            'terms'    => sanitize_text_field($request->get_param('event_category')),
        ];
    }
    if ($request->get_param('photo_format')) {
        $args['tax_query'][] = [
            'taxonomy' => 'photo_format',
            'field'    => 'slug',
            'terms'    => sanitize_text_field($request->get_param('photo_format')),
        ];
    }
    return $args;
}, 10, 2);

// ── API REST : autoriser tri par date et id ──
add_filter('rest_photo_collection_params', function($params) {
    $params['orderby']['enum'][] = 'date';
    $params['orderby']['enum'][] = 'id';
    return $params;
});