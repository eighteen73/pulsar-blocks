<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes  The array of attributes for this block.
 * @param string   $content     Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block       The instance of the WP_Block class that represents the block being rendered.
 *
 * @package PulsarBlocks
 */

$media_id              = $attributes['mediaId'] ?? null;
$media_type            = $attributes['mediaType'] ?? null;
$url                   = $attributes['url'] ?? false;
$has_link              = ! empty( $url );
$icon_color            = $attributes['iconColor'] ? "var(--wp--preset--color--{$attributes['iconColor']})" : null;
$icon_background_color = $attributes['iconBackgroundColor'] ? "var(--wp--preset--color--{$attributes['iconBackgroundColor']})" : null;
$orientation           = $attributes['orientation'] ?? 'horizontal';

// Prepare wrapper attributes
$wrapper_attributes = [];
$wrapper_attributes['class'] = "is-{$orientation}";
if ( $has_link ) {
	$wrapper_attributes['href']   = $url;
	$wrapper_attributes['target'] = $attributes['opensInNewTab'] ? '_blank' : '_self';
}
if ( $icon_color ) {
	$wrapper_attributes['style'] = "{$wrapper_attributes['style']}--pb--icon-text--icon--color: {$icon_color};";
}
if ( $icon_background_color ) {
	$wrapper_attributes['style'] = "{$wrapper_attributes['style']}--pb--icon-text--icon--background-color: {$icon_background_color};";
}
$tag = $has_link ? 'a' : 'div';
?>

<<?php echo esc_html( $tag ); ?> <?php echo wp_kses_data( get_block_wrapper_attributes( $wrapper_attributes ) ); ?>>
	<div class="wp-block-pulsar-icon-text__icon-container">
		<div class="wp-block-pulsar-icon-text__icon">
			<?php if ( get_post_mime_type( $media_id ) === 'image/svg+xml' ) : ?>
				<?php
				$media_url = wp_get_attachment_url( $media_id );
				if ( $media_url ) {
					$svg_content = file_get_contents( $media_url );

					if ( $svg_content ) {
						// Replace fill colors with currentColor for theming
						$svg_content = preg_replace(
							'/fill=([\'"])(?!none\b)(.*?)\\1/',
							'fill="currentColor"',
							$svg_content
						);

						// Define allowed SVG tags and attributes for security
						$allowed_svg_tags = [
							'svg'   => [
								'class'           => true,
								'aria-hidden'     => true,
								'aria-labelledby' => true,
								'role'            => true,
								'xmlns'           => true,
								'width'           => true,
								'height'          => true,
								'viewbox'         => true,
							],
							'g'     => [ 'fill' => true ],
							'title' => [ 'title' => true ],
							'path'  => [
								'd'    => true,
								'fill' => true,
							],
						];

						echo wp_kses( $svg_content, $allowed_svg_tags );
					}
				}
				?>
			<?php else : ?>
				<?php echo wp_get_attachment_image( $media_id, 'thumbnail' ); ?>
			<?php endif; ?>
		</div>
	</div>

	<div class="wp-block-pulsar-icon-text__content">
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</<?php echo esc_html( $tag ); ?>>
