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

$position_class = Carousel::get_position_class_name( $attributes['contentPosition'] );
$focal_point    = isset( $attributes['focalPoint'] ) ? Carousel::get_focal_point( $attributes['focalPoint'] ) : false;
?>

<div <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => 'splide__slide' ] ) ); ?>>
	<?php if ( $content ) : ?>
		<div class="wp-block-pulsar-carousel-slide__content <?php echo esc_attr( $position_class ); ?>">
			<?php echo $content; ?>
		</div>
	<?php endif; ?>

	<?php if ( isset( $attributes['imageId'] ) && $attributes['slideType'] === 'image' ) : ?>
		<?php
		echo wp_get_attachment_image(
			$attributes['imageId'],
			'large',
			false,
			[
				'class' => 'wp-block-pulsar-carousel-slide__image',
				'style' => $focal_point ? 'object-position: ' . $focal_point : null,
			]
		);
		?>
	<?php endif; ?>
</div>
