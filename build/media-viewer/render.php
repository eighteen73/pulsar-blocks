<?php
/**
 * Example block markup
 *
 * @var array    $attributes         Block attributes.
 * @var string   $content            Block content.
 * @var WP_Block $block              Block instance.
 * @var array    $context            Block context.
 *
 * @package PulsarBlocks
 */

$id              = $attributes['id'] ?? '';
$initial_items   = $attributes['initialItems'];
$item_count      = count( $block->inner_blocks );
$show_thumbnails = $attributes['showThumbnails'] === true ? 'true' : 'false';
$wrapper_attributes = [
	'class'                => 'has-items-' . esc_attr( $initial_items ),
	'data-id'              => $id,
	'data-show-thumbnails' => $show_thumbnails,
];

if ( $attributes['overlayColor'] ) {
	$wrapper_attributes['data-overlay-color'] = $attributes['overlayColor'];
}
?>

<div
	<?php
	echo wp_kses_data( get_block_wrapper_attributes( $wrapper_attributes ) );
	?>
>
	<div class="wp-block-pulsar-media-viewer__items">
		<?php echo $content; //phpcs:disable ?>
	</div>

	<button class="wp-block-pulsar-media-viewer__view-all"><?php esc_html_e( 'View Gallery', 'pulsar-blocks' ); ?></button>
</div>
