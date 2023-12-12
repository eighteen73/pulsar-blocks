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

namespace Eighteen73\PulsarBlocks;

$background_type = $attributes['backgroundType'];
$position_class = Carousel::get_position_class_name( $attributes['contentPosition'] );
$focal_point    = isset( $attributes['focalPoint'] ) ? Carousel::get_focal_point( $attributes['focalPoint'] ) : false;
$overlay_color = $background_type === 'image' && isset( $attributes['overlayColor'] ) ? $attributes['overlayColor'] : false;
$background_color = $background_type === 'color' && isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : false;
$overlay_opacity = $attributes['overlayOpacity'];
$classes = [ $position_class ];
$styles = [];

if ( $overlay_color ) {
	$classes[] = 'has-overlay';
	$styles[] = "--overlay-color: {$overlay_color}";
	$styles[] = "--overlay-opacity: {$overlay_opacity}";
}

if ( $background_color ) {
	$classes[] = 'has-background';
	$styles[] = "--background-color: {$background_color}";
}
?>

<li class="splide__slide">
	<div
	<?php
	echo wp_kses_data(
		get_block_wrapper_attributes(
			[
				'class' => implode( ' ', $classes ),
				'style' => ! empty( $styles ) ? implode( ';', $styles ) : null,
			]
		)
	);
	?>
	>
		<?php if ( $content ) : ?>
			<div class="wp-block-pulsar-carousel-slide__content">
				<?php echo $content; // phpcs:disable ?>
			</div>
		<?php endif; ?>

		<?php if ( isset( $attributes['backgroundImageId'] ) && $attributes['backgroundType'] === 'image' ) : ?>
			<figure class="wp-block-pulsar-carousel-slide__background-image">
				<?php
				echo wp_get_attachment_image(
					$attributes['backgroundImageId'],
					'large',
					false,
					[
						'class' => 'wp-block-pulsar-carousel-slide__background-image',
						'style' => $focal_point ? 'object-position: ' . $focal_point : null,
					]
				);
				?>
			</figure>
		<?php endif; ?>
	</div>
</li>
