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

 // Bail if FacetWP isn't activated.
 if ( ! function_exists( 'FWP' ) ) {
	return;
}

$facet_name = $attributes['facetName'];
$layout     = $block->context['layout'];
$filter_id  = $block->context['id'];
?>

<div
	<?php echo wp_kses_data( get_block_wrapper_attributes( [ 'class' => "is-layout-{$layout}" ] ) ); ?>
	data-wp-interactive="pulsar/filter-facetwp"
	data-wp-context='{ "isOpen": false, "filterId": "<?php echo esc_attr( $filter_id ); ?>" }'
	data-wp-class--is-active="context.isOpen"
>
	<button
		class="wp-block-pulsar-filter-facetwp__button"
		data-wp-on--click="actions.toggle"
		data-wp-bind--aria-expanded="context.isOpen"
		aria-controls="facetwp-<?php echo esc_attr( $facet_name ); ?>"
	>
		<span class="wp-block-pulsar-filter-facetwp__button-label">
			<?php esc_html_e( 'Category', 'pulsar' ); ?>
		</span>
	</button>

	<div
		id="facetwp-<?php echo esc_attr( $facet_name ); ?>"
		class="wp-block-pulsar-filter-facetwp__panel"
	>
		<?php echo facetwp_display( 'facet', $facet_name ); ?>
	</div>
</div>
