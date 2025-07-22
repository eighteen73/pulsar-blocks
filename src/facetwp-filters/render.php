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

$id              = $attributes['id'];
$filter_layout   = $attributes['filterLayout'];
$collapsable     = $attributes['collapsable'];
$post_type       = get_post_type();
$post_type_label = $post_type ? get_post_type_object( $post_type )->labels->singular_name : false;
?>

<div
	data-wp-interactive="pulsar/facetwp-filters"
	data-wp-init="callbacks.init"
	data-wp-context='{ "isModalOpen": false, "id": "<?php echo esc_attr( $id ); ?>", "filterLayout": "<?php echo esc_attr( $filter_layout ); ?>", "openFilters": [] }'
	<?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => "is-filter-layout-{$filter_layout}" ] ) ); ?>
>
	<button
		class="wp-block-pulsar-facetwp-filters__open-modal"
		data-wp-on--click="actions.openModal"
		data-wp-bind--aria-expanded="context.isModalOpen"
	>
		<?php esc_html_e( 'Filters', 'pulsar' ); ?>
	</button>

	<div
		data-modal-id="<?php echo esc_attr( $id ); ?>"
		class="wp-block-pulsar-facetwp-filters__modal"
	>
		<div class="wp-block-pulsar-facetwp-filters__modal-overlay">
			<div class="wp-block-pulsar-facetwp-filters__modal-container" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Product Filters', 'pulsar' ); ?>">
				<header class="wp-block-pulsar-facetwp-filters__modal-header">
					<h2 class="wp-block-pulsar-facetwp-filters__modal-title">
						<span class="wp-block-pulsar-facetwp-filters__modal-label">
							<?php if ( $post_type_label ) : ?>
								<span class="wp-block-pulsar-facetwp-filters__modal-post-type"><?php echo esc_html( $post_type_label ); ?></span>
							<?php endif; ?>

							<?php esc_html_e( 'Filters', 'pulsar' ); ?>
						</span>

						<span class="wp-block-pulsar-facetwp-filters__modal-count"></span>
					</h2>

					<button class="wp-block-pulsar-facetwp-filters__modal-clear" data-wp-on--click="actions.resetFilters">
						<?php esc_html_e( 'Clear All', 'pulsar' ); ?>
					</button>

					<button
						class="wp-block-pulsar-facetwp-filters__modal-close"
						data-wp-on--click="actions.closeModal"
						aria-label="<?php esc_attr_e( 'Close modal', 'pulsar' ); ?>"
					>
						<span class="wp-block-pulsar-facetwp-filters__modal-close-icon"></span>
					</button>
				</header>

				<div class="wp-block-pulsar-facetwp-filters__modal-inner">
					<div class="wp-block-pulsar-facetwp-filters__modal-selected-filters">
						<?php echo facetwp_display( 'selections' ); ?>
					</div>

					<div class="wp-block-pulsar-facetwp-filters__modal-content">
						<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</div>
				</div>

				<footer class="wp-block-pulsar-facetwp-filters__modal-footer">
					<button
						class="wp-block-pulsar-facetwp-filters__modal-apply"
						data-wp-on--click="actions.closeModal"
					>
						<?php esc_html_e( 'Apply', 'pulsar' ); ?>
					</button>

					<button class="wp-block-pulsar-facetwp-filters__modal-reset" data-wp-on--click="actions.resetFilters">
						<?php esc_html_e( 'Reset', 'pulsar' ); ?>
					</button>
				</footer>
			</div>
		</div>
	</div>

	<div class="wp-block-pulsar-facetwp-filters__items">
		<?php echo $content; ?>
	</div>
</div>
