<?php get_header(); ?>

<!-- Zone de contenu -->
<div class="single-photo">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

        <?php
        // Récupération des données
        $ref      = get_post_meta( get_the_ID(), 'photo_ref', true );
        $type     = get_post_meta( get_the_ID(), 'photo_type', true );
        $date     = get_the_date('d/m/Y');
        $cats     = get_the_terms( get_the_ID(), 'event_category' );
        $formats  = get_the_terms( get_the_ID(), 'photo_format' );
        $cat_name = $cats ? $cats[0]->name : '';
        $fmt_name = $formats ? $formats[0]->name : '';
        ?>

        <!-- Zone principale -->
        <div class="single-photo__content">

            <!-- Bloc gauche : infos -->
            <div class="single-photo__info">
                <h1 class="single-photo__title"><?php the_title(); ?></h1>
                <div class="single-photo__meta">
                    <?php if ($ref) : ?>
                        <div class="single-photo__meta-row">
                            <span class="single-photo__meta-label">Référence :</span>
                            <span><?php echo esc_html($ref); ?></span>
                        </div>
                    <?php endif; ?>
                    <?php if ($cat_name) : ?>
                        <div class="single-photo__meta-row">
                            <span class="single-photo__meta-label">Catégorie :</span>
                            <span><?php echo esc_html($cat_name); ?></span>
                        </div>
                    <?php endif; ?>
                    <?php if ($fmt_name) : ?>
                        <div class="single-photo__meta-row">
                            <span class="single-photo__meta-label">Format :</span>
                            <span><?php echo esc_html($fmt_name); ?></span>
                        </div>
                    <?php endif; ?>
                    <?php if ($type) : ?>
                        <div class="single-photo__meta-row">
                            <span class="single-photo__meta-label">Type :</span>
                            <span><?php echo esc_html($type); ?></span>
                        </div>
                    <?php endif; ?>
                    <div class="single-photo__meta-row">
                        <span class="single-photo__meta-label">Année :</span>
                        <span><?php echo esc_html($date); ?></span>
                    </div>
                </div>
            </div>

            <!-- Bloc droit : image -->
            <div class="single-photo__image">
                <?php if ( has_post_thumbnail() ) : ?>
                    <?php the_post_thumbnail('full'); ?>
                <?php endif; ?>
            </div>

        </div>

        <!-- Barre navigation -->
        <div class="single-photo__bar">
            Cette photo vous intéresse?
            <!-- Lien contact avec préfill ref -->
            <button
                class="single-photo__contact-link"
                data-open-modal
                data-photo-ref="<?php echo esc_attr($ref); ?>"
            >
                Contact
            </button>

            <!-- Navigation précédent / suivant -->
<div class="single-photo__nav">
    <?php
    $prev = get_previous_post();
    $next = get_next_post();
    ?>

    <?php if ($prev) : ?>
        <a href="<?php echo get_permalink($prev->ID); ?>"
           class="single-photo__nav-link single-photo__nav-link--prev">
            <img
                src="<?php echo get_template_directory_uri(); ?>/img/arrow-prev.png"
                alt="Précédent"
                class="nav-arrow"
            />
            <img
                class="nav-thumb-preview"
                src="<?php echo get_the_post_thumbnail_url($prev->ID, 'thumbnail'); ?>"
                alt="<?php echo esc_attr($prev->post_title); ?>"
            />
        </a>
    <?php endif; ?>

    <?php if ($next) : ?>
        <a href="<?php echo get_permalink($next->ID); ?>"
           class="single-photo__nav-link single-photo__nav-link--next">
            <img
                src="<?php echo get_template_directory_uri(); ?>/img/arrow-next.png"
                alt="Suivant"
                class="nav-arrow"
            />
            <img
                class="nav-thumb-preview"
                src="<?php echo get_the_post_thumbnail_url($next->ID, 'thumbnail'); ?>"
                alt="<?php echo esc_attr($next->post_title); ?>"
            />
        </a>
    <?php endif; ?>

</div>

<?php endwhile; endif; ?>
</div>

<!-- Photos apparentées -->
<?php
$current_id = get_the_ID();
$cats       = get_the_terms( $current_id, 'event_category' );
$cat_ids    = $cats ? wp_list_pluck($cats, 'term_id') : [];

if ( $cat_ids ) :
    $related = new WP_Query([
        'post_type'      => 'photo',
        'posts_per_page' => 2,
        'post__not_in'   => [$current_id],
        'tax_query'      => [[
            'taxonomy' => 'event_category',
            'field'    => 'term_id',
            'terms'    => $cat_ids,
        ]],
    ]);
?>

<div class="related-photos">
    <p class="related-photos__title">Vous aimerez aussi</p>
    <div class="related-photos__grid">
        <?php while ( $related->have_posts() ) : $related->the_post(); ?>
            <?php get_template_part('template-parts/photo-block'); ?>
        <?php endwhile; wp_reset_postdata(); ?>
    </div>
</div>

<?php endif; ?>

<?php get_footer(); ?>