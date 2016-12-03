<?php get_header(); ?>
<div class="b_block b_article_view">
	<div class="container-fluid">
		<div class="container">
			<div class="to-category">

				<?php
					$categories = get_the_category();
					if ( ! empty( $categories ) ) {
						echo '<a href="'. esc_url( get_category_link( $categories[0]->term_id ) ). '">';
						echo '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M16 7H3.83l5.59-5.59L8 0 0 8l8 8 1.41-1.41L3.83 9H16z" fill="currentColor" fill-rule="evenodd"/></svg>';
						echo '<span>Zurück zum ' . esc_html( $categories[0]->name ) . '</span>';
						echo '</a>';
					}
				?>
			</div>

			<?php if (have_posts()): while (have_posts()) : the_post(); ?>

				<!-- article -->
				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

					<!-- post thumbnail -->
					<?php if ( has_post_thumbnail()) : // Check if Thumbnail exists ?>
						<div class="post-image">
							<?php the_post_thumbnail(); // Fullsize image for the single post ?>
						</div>
					<?php endif; ?>
					<!-- /post thumbnail -->

					<!-- post title -->
					<h2 class="post-title">
						<?php the_title(); ?>
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
						</span>					<!-- /post details -->
					</div>

					<div class="post-content">
						<?php the_content(); // Dynamic Content ?>
					</div>
				</article>
				<!-- /article -->

			<?php endwhile; ?>

			<?php else: ?>

				<!-- article -->
				<article>

					<h1><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h1>

				</article>
				<!-- /article -->

			<?php endif; ?>
		</div>
		
		<?php get_sidebar(); ?>
	</div>
</div>

<?php get_footer(); ?>
