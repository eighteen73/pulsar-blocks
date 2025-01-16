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

?>

<div
	<?php
	echo wp_kses_data(
		get_block_wrapper_attributes()
	);
	?>
>
	<div role="tabslist">

	</div>

	<?php echo $content; // phpcs:disable ?>
</div>




function TabButton({ isSelected, tabNumber }) {
	return (
		<button
			id={`tab-${tabNumber}`}
			type="button"
			role="tab"
			aria-selected={isSelected}
			aria-controls={`tabpanel-${tabNumber}`}
			tabIndex={isSelected ? undefined : '-1'}
		>
			<span>{`Tab ${tabNumber}`}</span>
		</button>
	);
}

export default function save({ attributes: { activeTab, tabsCount } }) {
	const blockProps = useBlockProps.save();

	const tabs = [];
	for (let index = 0; index < tabsCount; index++) {
		const tabNumber = index + 1;
		tabs.push(
			<TabButton
				key={index}
				tabNumber={tabNumber}
				isSelected={tabNumber === activeTab}
			/>
		);
	}

	return (
		<div {...blockProps}>
			<div role="tablist">{tabs}</div>
			<InnerBlocks.Content />
		</div>
	);
}
