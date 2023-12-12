<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes The array of attributes for this block.
 * @param string   $content    Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block      The instance of the WP_Block class that represents the block being rendered.
 *
 * @package Pulsar Blocks
 */

$h = "h{$block->context['level']}";
?>
<?php if ( isset( $attributes['title'] ) && $h ) : ?>
	<div class="wp-block-pulsar-accordion__item">

		<<?php echo esc_attr( $h ); ?> class="wp-block-pulsar-accordion__heading">
			<button
				type="button"
				aria-expanded="false"
				class="wp-block-pulsar-accordion__trigger"
				aria-controls="panel-<?php echo esc_attr( $attributes['id'] ); ?>"
				id="accordion-<?php echo esc_attr( $attributes['id'] ); ?>"
			>
				<span class="wp-block-pulsar-accordion__title"><?php echo esc_html( $attributes['title'] ); ?></span>
				<span class="wp-block-pulsar-accordion__icon"></span>
			</button>
		</<?php echo esc_attr( $h ); ?>>

		<div
			id="panel-<?php echo esc_attr( $attributes['id'] ); ?>"
			role="region"
			aria-labelledby="accordion-<?php echo esc_attr( $attributes['id'] ); ?>"
			class="wp-block-pulsar-accordion__panel"
		>
			<?php echo $content; // phpcs:disable ?>
		</div>
	</div>
<?php endif; ?>
