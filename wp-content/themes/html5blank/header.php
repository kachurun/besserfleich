<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<title>
		<?php

		if (function_exists('is_tag') && is_tag()) {

			echo 'Tag Archive for &quot;'.$tag.'&quot; - ';

		} elseif (is_archive()) {

			wp_title(''); echo ' Archive - ';

		} elseif (is_search()) {

			echo 'Search for &quot;'.wp_specialchars($s).'&quot; - ';

		} elseif (!(is_404()) && (is_single()) || (is_page() && !is_front_page())) {

			echo str_replace('[page]', '', wp_title('', false)); echo ' - ';

		} elseif (is_404()) {

			echo 'Not Found - ';

		}
		bloginfo('name');

		?>
	</title>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="<?php bloginfo('description'); ?>">

	<meta property="og:url"           content="http://besserfleisch.de/" />
	<meta property="og:type"          content="website" />
	<meta property="og:title"         content="Saftiges Rindfleisch aus Weidehaltung" />
	<meta property="og:description"   content="Einfach Hof anschauen und online bestellen" />
	<meta property="og:image"         content="http://besserfleisch.de/wp-content/uploads/2016/07/160726_hh_0260.jpg" />

	<!--[if lt IE 9]>
	<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div id="content" class="container-list">

		<!-- HEADER -->
		<div class="b_block b_header<?php if (is_front_page()) { ?> overflow <?php } ?>">
			<div class="header">
				<div class="container">
					<div class="logo-holder">
						<div class="logo">
							<div class="company-name"><a href="<?php bloginfo('home'); ?>">Besserfleisch.</a></div>
						</div>
					</div>
					<div class="menu-holder">
						<?php
							wp_nav_menu( array('container_class' => 'menu-holder',
							'theme_location' => 'top_menu') );
						?>
					</div>
					<a class="burger" href="#">
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 53 53" style="enable-background:new 0 0 53 53;" xml:space="preserve">
							<g>
								<g>
									<path d="M2,13.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,13.5,2,13.5z" fill="currentColor"/>
									<path d="M2,28.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,28.5,2,28.5z" fill="currentColor"/>
									<path d="M2,43.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,43.5,2,43.5z" fill="currentColor"/>
								</g>
							</g>
						</svg>
					</a>
				</div>
			</div>
		</div>
		<!-- END HEADER -->
