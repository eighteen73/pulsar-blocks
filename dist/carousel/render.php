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

$options   = $attributes['advancedCarouselOptions'] ?? $attributes['carouselOptions'];
$merge_options = $attributes['mergeOptions'] ?? false;
$has_track  = $attributes['hasTrack'] ?? false;
$aria_label = $attributes['ariaLabel'] ?? __( 'Carousel', 'pulsar' );

// Translate our custom settings into Splide options
// Note this also needs to happen in edit.js for the CMS
if ( $options['blockSettings']['loop'] ?? false ) {
	$options['type'] = $options['blockSettings']['type'] === 'fade' ? 'fade' : 'loop';
	$options['rewind'] = $options['blockSettings']['type'] === 'fade';
} else {
	$options['type'] = $options['blockSettings']['type'];
	$options['rewind'] = false;
}


?>

<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<section
		class="splide"
		data-splide="<?php echo esc_html( wp_json_encode( $options, JSON_PRETTY_PRINT ) ); ?>"
		aria-label="<?php echo esc_html( $aria_label ); ?>"
	>
		<?php if ( $has_track ) : ?>
			<div class="splide__track">
				<ul class="splide__list">
					<?php echo $content; // phpcs:disable ?>
				</ul>
			</div>
			<?php else : ?>
				<?php echo $content; // phpcs:disable ?>
			<?php endif; ?>
	</section>
</div>
