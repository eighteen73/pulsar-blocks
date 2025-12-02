import {
	store as blockEditorStore,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

export default function Edit({
	attributes,
	clientId,
	context: { 'tabs/activeTab': activeTab },
	isSelected,
	setAttributes,
}) {
	const { allowedBlocks, templateLock } = attributes;
	const { tabNumber, hasChildBlocks, isTabSelected } = useSelect(
		(select) => {
			const {
				getBlockIndex,
				getBlockOrder,
				getBlockRootClientId,
				hasSelectedInnerBlock,
			} = select(blockEditorStore);

			const hasAnyBlockSelected =
				isSelected || hasSelectedInnerBlock(clientId, true);
			const tabIndex = getBlockIndex(clientId);
			const showDefaultTab =
				!hasSelectedInnerBlock(getBlockRootClientId(clientId), true) &&
				tabIndex + 1 === activeTab;

			return {
				tabNumber: tabIndex + 1,
				hasChildBlocks: getBlockOrder(clientId).length > 0,
				isTabSelected: hasAnyBlockSelected || showDefaultTab,
			};
		},
		[activeTab, clientId, isSelected]
	);
	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);

	const blockProps = useBlockProps({
		className: 'wp-block-pulsar-tabs__panel',
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		templateLock,
		allowedBlocks,
		renderAppender: hasChildBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	});

	useEffect(() => {
		__unstableMarkNextChangeAsNotPersistent();
		setAttributes({
			isActive: tabNumber === activeTab,
			tabNumber,
		});
	}, [
		activeTab,
		tabNumber,
		setAttributes,
		__unstableMarkNextChangeAsNotPersistent,
	]);

	return (
		<div
			{...innerBlocksProps}
			role="tabpanel"
			aria-labelledby={`tab-${tabNumber}`}
			hidden={!isTabSelected}
		/>
	);
}
