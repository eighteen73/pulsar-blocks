<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 *
 * @package Pulsar
 */

?>


<button
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
	id="tab-<?php echo $attributes['id']?>"
	type="button"
	role="tab"
	aria-selected="<?php echo $attributes['id'] === 1 ? 'true' : 'false' ?>"
	aria-controls="tabpanel-<?php echo $attributes['id']?>"
>
	<span class="focus">
	  <?php echo $attributes['title']; ?>
	</span>
</button>
