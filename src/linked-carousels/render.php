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

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<?php echo $content; // phpcs:disable ?>
</div>
