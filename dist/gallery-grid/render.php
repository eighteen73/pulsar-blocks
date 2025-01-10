<?php
/**
 * Example block markup
 *
 * @var array    $attributes         Block attributes.
 * @var string   $content            Block content.
 * @var WP_Block $block              Block instance.
 * @var array    $context            Block context.
 */

$grid_items = $attributes['gridItems'];
$item_count = count( $block->inner_blocks )
?>

<div <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'has-items-' . esc_attr( $grid_items ) ] ) ); ?>>
	<div class="wp-block-pulsar-gallery-grid__items">
		<?php echo $content; //phpcs:disable ?>
	</div>

	<?php if ( $item_count > $grid_items ) : ?>
		<div class="wp-block-pulsar-gallery-grid__view-all">
			<button class="wp-block-pulsar-gallery-grid__view-all-button"><?php esc_html_e( 'View Gallery', 'pulsar-blocks' ); ?></button>
		</div>
	<?php endif; ?>
</div>
