<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes The array of attributes for this block.
 * @param string   $content    Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block      The instance of the WP_Block class that represents the block being rendered.
 *
 * @package Pulsar
 */

$settings = $attributes['advancedCarouselSettings'] ?? $attributes['carouselSettings'];
?>

<section
	data-splide="<?php echo esc_html( wp_json_encode( $settings, JSON_PRETTY_PRINT ) ); ?>"
	<?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'splide' ] ) ); ?>
	aria-label="<?php esc_html_e( 'Carousel' ); ?>"
>
	<div class="splide__track">
		<ul class="splide__list">
			<?php echo $content; // phpcs:disable ?>
		</ul>
	</div>
</section>
