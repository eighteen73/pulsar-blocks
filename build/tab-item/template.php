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


<div
	class="wp-block-pulsar-tab-item <?php echo $attributes['id'] === 1 ? '' : 'is-hidden'?>"
	id="tabpanel-<?php echo $attributes['id']?>"
	role="tabpanel"
	tabindex="0"
	aria-labelledby="tab-<?php echo $attributes['id']?>">
	<?php echo $content ?>
</div>

