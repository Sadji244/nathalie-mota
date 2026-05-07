<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<header class="site-header">

    <a href="<?php echo esc_url( home_url('/') ); ?>" class="site-logo">
        <img 
            src="<?php echo esc_url( get_template_directory_uri() . '/img/logo.png' ); ?>" 
            alt="Nathalie Mota"
            width="160"
            height="auto"
        />
    </a>

    <nav class="site-nav">
        <?php
        wp_nav_menu([
            'theme_location' => 'primary',
            'container'      => false,
            'menu_class'     => '',
            'fallback_cb'    => false,
        ]);
        ?>
    </nav>

    <!-- Burger -->
    <button class="burger" id="burger" aria-label="Menu">
        <span class="burger__line"></span>
        <span class="burger__line"></span>
        <span class="burger__line"></span>
    </button>

</header>

<!-- Menu fullscreen -->
<div class="fullscreen-menu" id="fullscreen-menu">
    <div class="fullscreen-menu__top">
        <a href="<?php echo esc_url( home_url('/') ); ?>" class="site-logo">
            <img 
                src="<?php echo esc_url( get_template_directory_uri() . '/img/logo.png' ); ?>" 
                alt="Nathalie Mota"
            />
        </a>
        <button class="burger burger--close" id="burger-close" aria-label="Fermer">
            <span class="burger__line"></span>
            <span class="burger__line"></span>
        </button>
    </div>
    <nav class="fullscreen-menu__nav">
        <?php
        wp_nav_menu([
            'theme_location' => 'primary',
            'container'      => false,
            'menu_class'     => 'fullscreen-menu__list',
            'fallback_cb'    => false,
        ]);
        ?>
    </nav>
</div>