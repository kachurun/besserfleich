<?php if (have_posts()): while (have_posts()) : the_post(); ?>

	<!-- article -->
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<div class="content-holder">
			<!-- post thumbnail -->
			<div class="image-holder">
				<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" style="background-image: url(<?php the_post_thumbnail_url(array(520,520)); ?>)"></a>
			</div>
			<!-- /post thumbnail -->

			<div class="post-content">
				<!-- post title -->
				<h2 class="post-title">
					<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
				</h2>
				<!-- /post title -->

				<!-- post details -->
				<div class="post-date">
					<span><?php the_time(get_option('date_format')); ?></span>
					<span>
						<?php
							$categories = get_the_category();
							if ( ! empty( $categories ) ) {
								echo '<a href="'. esc_url( get_category_link( $categories[0]->term_id ) ). '">' . esc_html( $categories[0]->name ) . '</a>';
							}
						?>
					</span>
				</div>
				<!-- /post details -->
				<div class="post-text">
					<?php html5wp_excerpt('html5wp_long_post'); // Build your custom callback length in functions.php ?>
				</div>

				<div class="btn-wrap">
					<a class="btn" href="<?php the_permalink(); ?>">Zum Artikel</a>
				</div>
			</div>
		</div>
	</article>
	<!-- /article -->

<?php endwhile; ?>

<?php else: ?>

	<!-- article -->
	<article>
		<h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>
	</article>
	<!-- /article -->

<?php endif; ?>
