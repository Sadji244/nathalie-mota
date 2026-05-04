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

</header>