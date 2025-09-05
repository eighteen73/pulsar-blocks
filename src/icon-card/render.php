<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes  The array of attributes for this block.
 * @param string   $content     Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block       The instance of the WP_Block class that represents the block being rendered.
 *
 * @package Pulsar
 */

$image_id = $attributes['imageId'] ?? null;
$url      = $attributes['url'] ?? false;
$target   = $attributes['openInNewTab'] ? '_blank' : '_self';
$bookinghound = $attributes['bookingHound'] ?? false;
?>

<?php if ( $url || $bookinghound ) : ?>
	<a <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?> href="<?php echo esc_url( $url ); ?>" target="<?php echo esc_attr( $target ); ?>">
<?php else : ?>
	<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
<?php endif; ?>

	<div class="wp-block-pulsar-icon-card__icon-container">
		<div class="wp-block-pulsar-icon-card__icon">
			<?php if ( get_post_mime_type( $image_id ) === 'image/svg+xml' ) : ?>
				<?php

				$image_url = wp_get_attachment_url( $image_id );

				if ( $image_url ) {

					$svg_content = file_get_contents( $image_url );

					if ( $svg_content ) {
						$svg_content = preg_replace(
							'/fill=([\'"])(?!none\b)(.*?)\\1/',
							'fill="currentColor"',
							$svg_content
						);

						$allowed_svg_tags = [
							'svg'   => [
								'class' => true,
								'aria-hidden' => true,
								'aria-labelledby' => true,
								'role' => true,
								'xmlns' => true,
								'width' => true,
								'height' => true,
								'viewbox' => true,
							],
							'g'     => [ 'fill' => true ],
							'title' => [ 'title' => true ],
							'path'  => [
								'd' => true,
								'fill' => true,
							],
						];

						echo wp_kses( $svg_content, $allowed_svg_tags );
					}
				}
				?>

			<?php else : ?>
				<?php echo wp_get_attachment_image( $image_id, 'thumbnail' ); ?>
			<?php endif; ?>
		</div>
	</div>

	<div class="wp-block-pulsar-icon-card__content">
		<?php echo $content; ?>
	</div>

<?php if ( $url || $bookinghound ) : ?>
	</a>
<?php else : ?>
	</div>
<?php endif; ?>
