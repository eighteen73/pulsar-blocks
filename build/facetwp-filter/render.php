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

$filters_modal_id = $block->context['filtersModalId'];
$filters_layout   = $block->context['filtersLayout'];
$filter_label     = $attributes['filterLabel'];
$filter_id        = $attributes['filterId'];
$collapsable      = $attributes['collapsable'] ?? false;
$is_collapsable   = $collapsable ? 'is-collapsable' : 'is-not-collapsable';
?>

<div
	<?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => "is-filter-layout-{$filters_layout} {$is_collapsable}" ] ) ); ?>
	data-wp-context='{ "filterId": "<?php echo esc_attr( $filter_id ); ?>" }'
	data-wp-class--is-active="callbacks.isActiveFilter"
>
	<button
		class="wp-block-pulsar-facetwp-filter__title"
		data-wp-on--click="actions.toggleFilter"
		data-wp-bind--aria-expanded="callbacks.isActiveFilter"
		aria-controls="<?php echo esc_attr( $filter_id ); ?>"
	>
		<span class="wp-block-pulsar-facetwp-filter__button-label">
			<?php echo esc_html( $filter_label ); ?>
		</span>
	</button>

	<div
		id="<?php echo esc_attr( $filter_id ); ?>"
		class="wp-block-pulsar-facetwp-filter__panel"
	>
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</div>
