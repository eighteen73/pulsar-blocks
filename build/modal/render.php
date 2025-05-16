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

$id                   = $attributes['id'] ?? '';
$post_id              = $block->context['postId'] ?? false;
$in_query_loop        = $attributes['inQueryLoop'] ?? false;
$modal_id             = $in_query_loop && $post_id ? "{$id}-{$post_id}" : $id;
$overlay_color        = $attributes['overlayColor'] ?? '';
$trigger_delay        = $attributes['triggerDelay'] ?? '';
$trigger_type         = $attributes['triggerType'] ?? 'click';
$click_selector       = $attributes['clickSelector'] ?? '';
$scroll_selector      = $attributes['scrollSelector'] ?? '';
$scroll_threshold     = $attributes['scrollThreshold'] ?? false;
$trigger_selector     = $trigger_type === 'click' ? $click_selector : $scroll_selector;
$dismissed_duration   = $attributes['dismissedDuration'] ?? '';
$enable_close_button  = $attributes['enableCloseButton'] ?? false;
$disable_closing      = $attributes['disableClosing'] ?? false;
$aria_label           = $attributes['label'] ?? __( 'Modal', 'pulsar' );
$width                = $attributes['width'] ?? '';
?>

<div
	<?php
	echo wp_kses_data(
		get_block_wrapper_attributes(
			[
				'id'                            => "pulsar-modal-{$modal_id}",
				'style'                         => ( $overlay_color ? '--modal-overlay-background-color: ' . $overlay_color . ';' : '' ) . ( $width ? '--modal-container-width: ' . $width . ';' : '' ),
				'data-modal-id'                 => $modal_id,
				'data-modal-trigger-delay'      => $trigger_delay ?: '0',
				'data-modal-trigger-type'       => $trigger_type,
				'data-modal-trigger-selector'   => $trigger_selector ?: null,
				'data-modal-dismissed-duration' => $dismissed_duration ?: null,
				'data-modal-scroll-threshold'   => $scroll_threshold ?: null,
				'data-modal-disable-closing'    => $disable_closing ? 'true' : null
			]
		)
	);
	?>
>
	<div class="wp-block-pulsar-modal__overlay">
		<div class="wp-block-pulsar-modal__container" role="dialog" aria-modal="true" aria-label="<?php echo esc_html( $aria_label ); ?>">
			<div class="wp-block-pulsar-modal__content">
				<?php echo $content; // phpcs:disable ?>
			</div>

			<?php if ( $enable_close_button ) : ?>
				<button class="wp-block-pulsar-modal__close">
					<span class="wp-block-pulsar-modal__close-icon"></span>
					<span class="screen-reader-text"><?php esc_html_e( 'Close modal', 'pulsar' ); ?></span>
				</button>
			<?php endif; ?>
		</div>
	</div>
</div>
