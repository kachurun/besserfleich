<!-- sidebar -->
<aside class="sidebar" role="complementary">
	<?php
		$categories = get_categories();
		if ( ! empty( $categories ) ) {
			foreach( $categories as $category ) {
				$args = array(
					'posts_per_page'   => 2,
					'category'         => $category->cat_ID,
					'orderby'          => 'rand'
				);

				echo '<div class="category-item">';
				echo '<h4 class="category-title"><a href="'. esc_url( get_category_link( $category->term_id ) ). '">' . esc_html( $category->name ) . '</a></h4>';

				$posts_array = get_posts( $args );
				foreach ($posts_array as $post) {
					?>
						<div class="post-item">
							<div class="post-title">
								<a href="<?php echo esc_url(get_permalink($post)); ?>">
									<?php echo $post->post_title; ?>
								</a>
							</div>
							<div class="post-date">
								<?php echo mysql2date( get_option('date_format'), $post->post_date ); ?>
							</div>
							<div class="post-content">
								<?php echo my_excerpt($post->post_content, 25); ?>
							</div>
						</div>
					<?php
				}

				echo '</div>';
			}
		}
	?>
</aside>
<!-- /sidebar -->
