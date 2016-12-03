<?php get_header(); ?>
<div class="b_block b_title">
     <div class="container-fluid">
        <div class="container title-holder">
           <h4><?php single_cat_title(); ?></h4>
        </div>

		<div class="container cat-holder">
			<div class="categories-list">
				<?php wp_list_categories(array('title_li' => '')); ?>
			</div>
			<div class="search-bar">
				<?php get_search_form(); ?>
			</div>
		</div>
     </div>
</div>

<div class="b_block b_article_list">
	<div class="container-fluid">
	   <div class="container">
			<?php get_template_part('loop'); ?>
		</div>
	</div>
</div>

<div class="b_block b_pagination">
	<div class="container-fluid">
	   <div class="container">
			<?php get_template_part('pagination'); ?>
		</div>
	</div>
</div>
<?php get_footer(); ?>
