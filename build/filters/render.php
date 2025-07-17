<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes   The array of attributes for this block.
 * @param string   $content      Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block        The instance of the WP_Block class that represents the block being rendered.
 *
 * @package Pulsar
 */

$layout = $attributes['layout'];
$id     = $attributes['id'];
?>

<div <?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => "is-layout-{$layout}" ] ) ); ?>>
	<button class="wp-block-pulsar-filters__open-modal-btn" data-trigger-filters-modal="<?php echo esc_attr( $id ); ?>">
		<?php esc_html_e( 'Filters', 'pulsar' ); ?>
	</button>

	<div class="wp-block-pulsar-filters__modal" id="pulsar-filters-modal-<?php echo esc_attr( $id ); ?>" data-modal-id="<?php echo esc_attr( $id ); ?>" data-modal-trigger-delay="0" data-modal-trigger-type="click">
		<div class="wp-block-pulsar-filters__modal-overlay">
			<div class="wp-block-pulsar-filters__modal-container" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Product Filters', 'pulsar' ); ?>">
				<div class="wp-block-pulsar-filters__modal-header">
					<h2 class="wp-block-pulsar-filters__modal-title">
						<?php esc_html_e( 'Filters', 'pulsar' ); ?>

						<span class="wp-block-pulsar-filters__modal-title-count"></span>
					</h2>

					<button class="wp-block-pulsar-filters__modal-close" data-modal-close aria-label="<?php esc_attr_e( 'Close modal', 'pulsar' ); ?>">
						<span class="wp-block-pulsar-filters__modal-close-icon"></span>
					</button>
				</div>

				<div class="wp-block-pulsar-filters__modal-content">
					<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>

				<div class="wp-block-pulsar-filters__modal-footer">
					<button class="wp-block-pulsar-filters__modal-apply wp-block-pulsar-filters__modal-close">
						<?php esc_html_e( 'Apply', 'pulsar' ); ?>
					</button>

					<button class="wp-block-pulsar-filters__modal-reset wp-element-button">
						<?php esc_html_e( 'Reset', 'pulsar' ); ?>
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="wp-block-pulsar-filters__filters">
		<?php echo $content; ?>
	</div>
</div>
