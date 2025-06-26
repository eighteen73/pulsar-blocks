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

$merge_options = $attributes['mergeOptions'] ?? false;
$options       = $attributes['carouselOptions'];
$has_track     = $attributes['hasTrack'] ?? false;
$aria_label    = $attributes['ariaLabel'] ?? __( 'Carousel', 'pulsar-blocks' );
$autoplay      = $options['autoplay'] ?? false;
$progress_bar  = $options['progressBar'] ?? false;
$is_navigation = $options['isNavigation'] ?? false;

if ( isset( $attributes['advancedCarouselOptions'] ) ) {
	$options = $merge_options ? array_merge( $options, $attributes['advancedCarouselOptions'] ) : $attributes['advancedCarouselOptions'];
}

/**
 * Check the number of slides and disable the carousel if there are not enough.
 */
$carousel_enabled      = ! $has_track && count( $block->inner_blocks ) === 1 || apply_filters( 'pulsar_blocks\carousel\force_carousel', isset( $options['perPage'] ) && count( $block->inner_blocks ) > $options['perPage'] );
$options['drag']       = $carousel_enabled;
$options['arrows']     = $carousel_enabled && isset( $options['arrows'] ) ? $options['arrows'] : false;
$options['pagination'] = $carousel_enabled && isset( $options['pagination'] ) ? $options['pagination'] : false;

/**
 * Disable pagination if this carousel is being used as navigation.
 *
 * @link https://splidejs.com/guides/options/#isnavigation
 */
if ( $is_navigation ) {
	$options['pagination'] = false;
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

		<!-- Arrows -->
		<div class="splide__arrows">
			<button
				class="splide__arrow splide__arrow--prev"
				aria-label="<?php esc_html_e( 'Previous slide', 'pulsar-blocks' ); ?>"
			></button>

			<button
				class="splide__arrow splide__arrow--next"
				aria-label="<?php esc_html_e( 'Next slide', 'pulsar-blocks' ); ?>"
			></button>
		</div>
		<!-- / Arrows -->

		<!-- Autoplay controls -->
		<?php if ( $autoplay ) : ?>
			<button class="splide__toggle" type="button">
				<span class="splide__toggle__play"></span>
				<span class="splide__toggle__pause"></span>
			</button>
		<?php endif; ?>
		<!-- / Autoplay controls -->

		<!-- Progress bar -->
		<?php if ( $progress_bar ) : ?>
			<div class="splide__progress">
				<div class="splide__progress__bar"></div>
			</div>
		<?php endif; ?>
	</section>
</div>
