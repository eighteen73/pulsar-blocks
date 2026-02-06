<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes The array of attributes for this block.
 * @param string   $content    Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block      The instance of the WP_Block class that represents the block being rendered.
 *
 * @package PulsarBlocks
 */

// Get level from context, with fallback to default
$level            = $block->context['level'] ?? 3;
$h                = "h{$level}";
$post_id          = $block->context['postId'] ?? false;
$in_query_loop    = $attributes['inQueryLoop'] ?? false;
$accordion_item_id = $attributes['id'] ?? '';

// Generate unique ID when in query loop
if ( $in_query_loop && $post_id ) {
	$accordion_item_id = $accordion_item_id ? "{$accordion_item_id}-{$post_id}" : "pulsar-accordion-{$post_id}";
}

// Get title: use post title when in query loop, otherwise use attribute title
$title = $attributes['title'] ?? '';
if ( $in_query_loop && $post_id ) {
	$post = get_post( $post_id );
	if ( $post ) {
		$title = $post->post_title;
	}
}

?>

<?php if ( $title && $h ) : ?>
	<div
		<?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'wp-block-pulsar-accordion__item' ] ) ); ?>
	>
		<<?php echo esc_attr( $h ); ?> class="wp-block-pulsar-accordion__heading">
			<button
				type="button"
				aria-expanded="false"
				class="wp-block-pulsar-accordion__trigger"
				aria-controls="<?php echo esc_attr( $accordion_item_id ); ?>-panel"
				id="<?php echo esc_attr( $accordion_item_id ); ?>-trigger"
			>
				<span
					id="<?php echo esc_attr( $accordion_item_id ); ?>-title"
					class="wp-block-pulsar-accordion__title"
				>
					<?php echo wp_kses_post( $title ); ?>
				</span>
				<span class="wp-block-pulsar-accordion__icon"></span>
			</button>
		</<?php echo esc_attr( $h ); ?>>

		<div
			id="<?php echo esc_attr( $accordion_item_id ); ?>-panel"
			role="region"
			aria-labelledby="<?php echo esc_attr( $accordion_item_id ); ?>-title"
			class="wp-block-pulsar-accordion__panel"
		>
			<div class="wp-block-pulsar-accordion__panel-inner">
				<?php echo $content; // phpcs:disable ?>
			</div>
		</div>
	</div>
<?php endif; ?>
