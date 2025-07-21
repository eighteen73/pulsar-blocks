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

$filter_id     = $block->context['id'];
$filter_layout = $block->context['filterLayout'];
$label         = $attributes['label'];
$collapsable   = $attributes['collapsable'] ? true : false;
$is_collapsable = $collapsable ? 'is-collapsable' : 'is-not-collapsable';
?>

<div
	<?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => "is-filter-layout-{$filter_layout} {$is_collapsable}" ] ) ); ?>
	data-wp-interactive="pulsar/facetwp-filter"
	data-wp-context='{ "isOpen": false, "filterId": "<?php echo esc_attr( $filter_id ); ?>" }'
	data-wp-class--is-active="context.isOpen"
>
	<button
		class="wp-block-pulsar-facetwp-filter__button"
		data-wp-on--click="actions.toggle"
		data-wp-bind--aria-expanded="context.isOpen"
		aria-controls="filter-<?php echo esc_attr( $filter_id ); ?>"
	>
		<span class="wp-block-pulsar-facetwp-filter__button-label">
			<?php echo esc_html( $label ); ?>
		</span>
	</button>

	<div
		id="filter-<?php echo esc_attr( $filter_id ); ?>"
		class="wp-block-pulsar-facetwp-filter__panel"
	>
		<?php echo $content; ?>
	</div>
</div>
