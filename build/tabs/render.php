<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes The array of attributes for this block.
 * @param string   $content    Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block      The instance of the WP_Block class that represents the block being rendered.
 *
 * @package PulsarBlocks
 */

$is_vertical                 = $attributes['isVertical'];
$id                          = $attributes['id'];
$post_id                     = $block->context['postId'] ?? false;
$in_query_loop               = $attributes['inQueryLoop'] ?? false;
$tabs_id                     = $in_query_loop && $post_id ? "{$id}-{$post_id}" : $id;
$namespace                   = "pulsar-tabs-{$tabs_id}";
$collapses                   = $attributes['collapses'] ?? false;
$collapses_on                = $attributes['collapsesOn'] ?? 'sm';
$deep_linking                = $attributes['deepLinking'] ?? false;
$deep_linking_update_history = $attributes['deepLinkingUpdateHistory'] ?? false;

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
				'id'                               => $namespace,
				'class'                            => $is_vertical ? 'is-vertical' : 'is-horizontal',
				'data-tabs-id'                     => $tabs_id,
				'data-collapses'                   => $collapses ? 'true' : 'false',
				'data-collapses-on'                => $collapses_on,
				'data-deep-linking'                => $deep_linking ? 'true' : 'false',
				'data-deep-linking-update-history' => $deep_linking_update_history ? 'true' : 'false',
			]
		)
	);
	?>
>
	<div class="wp-block-pulsar-tabs__list" role="tablist">
		<?php foreach ( $tabs as $index => $tab ) : ?>
			<button
				id="<?php echo esc_attr( $namespace ); ?>-tab-<?php echo esc_attr( $tab['tab_number'] ); ?>"
				class="wp-block-pulsar-tabs__tab"
				role="tab"
				aria-controls="<?php echo esc_attr( $namespace ); ?>-tabpanel-<?php echo esc_attr( $tab['tab_number'] ); ?>"
				aria-selected="<?php echo $tab['tab_number'] === 1 ? 'true' : 'false'; ?>"
			>
				<?php echo esc_html( $tab['title'] ); ?>
			</button>
		<?php endforeach; ?>
	</div>

	<?php if ( $collapses ) : ?>
		<select
			class="wp-block-pulsar-tabs__select"
			aria-label="<?php esc_attr_e( 'Select tab', 'pulsar-blocks' ); ?>"
			data-collapses-on="<?php echo esc_attr( $collapses_on ); ?>"
		>
			<?php foreach ( $tabs as $index => $tab ) : ?>
				<option
					value="<?php echo esc_attr( $tab['tab_number'] ); ?>"
					<?php selected( $tab['tab_number'], 1 ); ?>
				>
					<?php echo esc_html( $tab['title'] ); ?>
				</option>
			<?php endforeach; ?>
		</select>
	<?php endif; ?>

	<?php echo $content; // phpcs:disable ?>
</div>
