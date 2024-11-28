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

$styles            = [];
$options           = $attributes['options'] ?? [];
$fade              = $attributes['fade'] ? 'true' : 'false';
$autoplay          = $attributes['autoplay'] ? 'true' : 'false';
$autoplayOptions   = $attributes['autoplayOptions'] ?? [];
$autoscroll        = $attributes['autoscroll'] ? 'true' : 'false';
$autoscrollOptions = $attributes['autoscrollOptions'] ?? [];
?>

<div
	<?php
	echo wp_kses_data(
		get_block_wrapper_attributes(
			[
				'style' => implode( '', $styles ),
			]
		)
	);
	?>
>
	<div
		class="embla"
		data-embla-options="<?php echo esc_html( wp_json_encode( $options, JSON_PRETTY_PRINT ) ); ?>"
		data-embla-fade="<?php echo esc_attr( $fade ); ?>"
		data-embla-autoplay="<?php echo esc_attr( $autoplay ); ?>"
		data-embla-autoplay-options="<?php echo esc_html( wp_json_encode( $autoplayOptions, JSON_PRETTY_PRINT ) ); ?>"
		data-embla-autoscroll="<?php echo esc_attr( $autoscroll ); ?>"
		data-embla-autoscroll-options="<?php echo esc_html( wp_json_encode( $autoscrollOptions, JSON_PRETTY_PRINT ) ); ?>"
	>
		<?php echo $content; // phpcs:disable ?>
	</div>
</div>
