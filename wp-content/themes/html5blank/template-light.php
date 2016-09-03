<?php /* Template Name: No Header and Footer (light) */ ?>

<html>
<head>
	<title>Willkommen</title>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="<?php bloginfo('description'); ?>">

	<meta property="og:url"           content="http://besserfleisch.de/" />
	<meta property="og:type"          content="website" />
	<meta property="og:title"         content="Besserfleisch" />
	<meta property="og:description"   content="Описание бессерфлейча" />
	<meta property="og:image"         content="http://besserfleisch.de/wp-content/uploads/2016/07/160726_hh_0260.jpg" />

	<?php wp_head(); ?>

	<!--[if lt IE 9]>
	<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
	<![endif]-->

</head>

<body>

<?php if (have_posts()): while (have_posts()) : the_post(); ?>
	<?php the_content(); ?>
<?php endwhile; ?>

<?php else: ?>
	<h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>
<?php endif; ?>

<?php wp_footer(); ?>
</body>
</html>
