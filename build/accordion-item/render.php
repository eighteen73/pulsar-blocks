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

$h = "h{$block->context['level']}";
?>

<?php if ( isset( $attributes['title'] ) && $h ) : ?>
	<div
		<?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'wp-block-pulsar-accordion__item' ] ) ); ?>
	>
		<<?php echo esc_attr( $h ); ?> class="wp-block-pulsar-accordion__heading">
			<button
				type="button"
				aria-expanded="false"
				class="wp-block-pulsar-accordion__trigger"
				aria-controls="<?php echo esc_attr( $attributes['id'] ); ?>-panel"
				id="<?php echo esc_attr( $attributes['id'] ); ?>-trigger"
			>
				<span
					id="<?php echo esc_attr( $attributes['id'] ); ?>-title"
					class="wp-block-pulsar-accordion__title"
				>
					<?php echo esc_html( $attributes['title'] ); ?>
				</span>
				<span class="wp-block-pulsar-accordion__icon"></span>
			</button>
		</<?php echo esc_attr( $h ); ?>>

		<div
			id="<?php echo esc_attr( $attributes['id'] ); ?>-panel"
			role="region"
			aria-labelledby="<?php echo esc_attr( $attributes['id'] ); ?>-title"
			class="wp-block-pulsar-accordion__panel"
		>
			<div class="wp-block-pulsar-accordion__panel-inner">
				<?php echo $content; // phpcs:disable ?>
			</div>
		</div>
	</div>
<?php endif; ?>
