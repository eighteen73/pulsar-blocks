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

if ( ! $facet_name ) {
	return;
}
?>

<div
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
>
	<?php echo facetwp_display( 'facet', $facet_name ); ?>
</div>
