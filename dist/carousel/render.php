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

$settings      = $attributes['advancedCarouselSettings'] ?? $attributes['carouselSettings'];
$has_container = $attributes['hasContainer'] ?? false;
$aria_label    = $attributes['ariaLabel'] ?? __( 'Carousel', 'pulsar' );$styles = [
	'--slide-width' => "calc(100% / #{$settings['perPage']})",
];
?>

<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<section
		class="embla"
		aria-label="<?php echo esc_html( $aria_label ); ?>"
		data-embla="<?php echo esc_html( wp_json_encode( $settings, JSON_PRETTY_PRINT ) ); ?>"
		<?php if ( ! empty( $styles ) ) : ?>
			style="<?php echo esc_attr( implode( ';', $styles ) ); ?>"
	>
		<div class="embla__viewport">
			<?php if ( $has_container ) : ?>
				<ul class="embla__container">
					<?php echo $content; // phpcs:disable ?>
				</ul>
			<?php else : ?>
				<?php echo $content; // phpcs:disable ?>
			<?php endif; ?>
		</div>
	</section>
</div>
