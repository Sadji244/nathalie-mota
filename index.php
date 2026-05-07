<?php get_header(); ?>

<!-- HERO -->
<?php
$hero_query = new WP_Query([
    'post_type'      => 'photo',
    'posts_per_page' => 1,
    'orderby'        => 'rand',
    'tax_query'      => [[
        'taxonomy' => 'photo_format',
        'field'    => 'slug',
        'terms'    => 'paysage',
    ]],
]);

$hero_img = '';
if ($hero_query->have_posts()) {
    $hero_query->the_post();
    $hero_img = get_the_post_thumbnail_url(get_the_ID(), 'full');
    wp_reset_postdata();
}
?>

<section class="hero" style="background-image: url('<?php echo esc_url($hero_img); ?>')">
    <div class="hero__overlay">
        <h1 class="hero__title">Photographe Event</h1>
    </div>
</section>

<!-- FILTRES -->
<section class="filters">

    <div class="filters__group">
        <div class="custom-select" id="filter-category">
            <div class="custom-select__trigger">
                <span>Catégories</span>
                <img src="<?php echo get_template_directory_uri(); ?>/img/arrow-down.png" alt="" class="custom-select__arrow"/>
            </div>
            <div class="custom-select__options"></div>
        </div>
    </div>

    <div class="filters__group">
        <div class="custom-select" id="filter-format">
            <div class="custom-select__trigger">
                <span>Formats</span>
                <img src="<?php echo get_template_directory_uri(); ?>/img/arrow-down.png" alt="" class="custom-select__arrow"/>
            </div>
            <div class="custom-select__options"></div>
        </div>
    </div>

    <div class="filters__group filters__sort">
        <div class="custom-select" id="filter-order">
            <div class="custom-select__trigger">
                <span>Plus récentes</span>
                <img src="<?php echo get_template_directory_uri(); ?>/img/arrow-down.png" alt="" class="custom-select__arrow"/>
            </div>
            <div class="custom-select__options">
                <div class="custom-select__option selected" data-value="desc">Plus récentes</div>
                <div class="custom-select__option" data-value="asc">Plus anciennes</div>
            </div>
        </div>
    </div>

</section>

<!-- GRILLE PHOTOS -->
<section class="photo-grid">
    <div class="photo-grid__list" id="photo-grid-list">
        <?php
        $photos_query = new WP_Query([
            'post_type'      => 'photo',
            'posts_per_page' => 8,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ]);

        if ($photos_query->have_posts()) :
            while ($photos_query->have_posts()) : $photos_query->the_post();
                get_template_part('template-parts/photo-block');
            endwhile;
            wp_reset_postdata();
        endif;
        ?>
    </div>
    <div class="load-more-wrap">
        <button class="btn-load-more" id="btn-load-more">Charger plus</button>
    </div>
</section>

<?php get_footer(); ?>