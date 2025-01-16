<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes The array of attributes for this block.
 * @param string   $content    Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block      The instance of the WP_Block class that represents the block being rendered.
 *
 * @package Pulsar Blocks
 */

$id           = $attributes['id'];
$namespace    = "pulsar-tabs-{$id}";

$inner_blocks = $block->inner_blocks;
$tabs         = [];
foreach ( $inner_blocks as $block ) {
	if ( 'pulsar/tab' === $block->name ) {
		$tabs[] = [
			'tab_number' => $block->attributes['tabNumber'],
			'title'      => $block->attributes['title'],
		];
	}
}
?>

<div
	<?php
	echo wp_kses_data(
		get_block_wrapper_attributes(
			[
				'id' => "pulsar-tabs-{$id}",
			]
		)
	);
	?>
>
	<div class="wp-block-pulsar-tabs__tablist" role="tablist">
		<?php foreach ( $tabs as $tab ) : ?>
			<button
				id="<?php echo esc_attr( $namespace ); ?>-tab-<?php echo esc_attr( $tab['tab_number'] ); ?>"
				class="wp-block-pulsar-tabs__button"
				role="tab"
				aria-controls="<?php echo esc_attr( $namespace ); ?>-tabpanel-<?php echo esc_attr( $tab['tab_number'] ); ?>"
			>
				<?php echo esc_html( $tab['title'] ); ?>
			</button>
		<?php endforeach; ?>
	</div>

	<?php echo $content; // phpcs:disable ?>
</div>
