import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockControls,
	InnerBlocks,
	__experimentalBlockVariationPicker as BlockVariationPicker,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Toolbar,
	ToolbarGroup,
	ToolbarButton,
	Popover,
} from '@wordpress/components';
import { useDispatch, useSelect, useRegistry } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';

import SingleBlockTypeAppender from '../components/single-block-type-appender';

import clsx from 'clsx';

const ALLOWED_BLOCKS = ['core/image'];

function Placeholder({ clientId, name, setAttributes }) {
	const { blockType, defaultVariation, variations } = useSelect(
		(select) => {
			const {
				getBlockVariations,
				getBlockType,
				getDefaultBlockVariation,
			} = select(blocksStore);

			return {
				blockType: getBlockType(name),
				defaultVariation: getDefaultBlockVariation(name, 'block'),
				variations: getBlockVariations(name, 'block'),
			};
		},
		[name]
	);
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<BlockVariationPicker
				icon={blockType?.icon?.src}
				label={blockType?.title}
				variations={variations}
				instructions={__('Select a layout:')}
				onSelect={(nextVariation = defaultVariation) => {
					if (nextVariation.attributes) {
						setAttributes(nextVariation.attributes);
					}
					if (nextVariation.innerBlocks) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(
								nextVariation.innerBlocks
							),
							true
						);
					}
				}}
				allowSkip
			/>
		</div>
	);
}

export default function Edit({
	attributes: { gridItems },
	setAttributes,
	clientId,
	isSelected,
}) {
	const [isEditing, setIsEditing] = useState(false);

	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	const blockProps = useBlockProps({
		className: clsx(`has-items-${gridItems}`, {
			'is-editing': isEditing && (isSelected || isInnerBlockSelected),
		}),
	});

	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'horizontal',
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: false,
	});

	const innerBlocks = useSelect((select) =>
		select('core/block-editor').getBlock(clientId)
			? select('core/block-editor').getBlock(clientId).innerBlocks
			: []
	);

	const hasInnerBlocks = innerBlocks.length > 0;

	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	return (
		<div {...innerBlocksProps}>
			{!hasInnerBlocks && (
				<Placeholder
					clientId={clientId}
					name="pulsar/gallery-item"
					setAttributes={setAttributes}
				/>
			)}

			{hasInnerBlocks && (
				<>
					<InspectorControls>
						<PanelBody title={__('Settings', 'pulsar-blocks')}>
							<RangeControl
								label={__('Grid items', 'pulsar-blocks')}
								value={gridItems}
								help={__(
									'Number of items to display in the grid. Additional items will be displayed in a lightbox.',
									'pulsar-blocks'
								)}
								onChange={(value) =>
									setAttributes({ gridItems: value })
								}
								min={1}
								max={8}
							/>
						</PanelBody>
					</InspectorControls>

					<BlockControls group="other">
						<ToolbarGroup>
							<ToolbarButton onClick={toggleEditing}>
								{isEditing
									? __('Finish Editing', 'pulsar-blocks')
									: __('Edit Gallery', 'pulsar-blocks')}
							</ToolbarButton>
						</ToolbarGroup>
					</BlockControls>

					<div className="wp-block-pulsar-gallery-grid__items">
						{children}
					</div>

					<SingleBlockTypeAppender
						onClickAfter={() => {}}
						variant="secondary"
						text={__('Add item', 'pulsar-blocks')}
						allowedBlock="core/image"
						style={{ width: '100%', justifyContent: 'center' }}
						clientId={clientId}
						isEnabled={
							isEditing && (isSelected || isInnerBlockSelected)
						}
					/>

					{innerBlocks &&
						gridItems < innerBlocks.length &&
						!isEditing && (
							<button className="wp-block-pulsar-gallery-grid__view-all">
								{__('View Gallery', 'pulsar-blocks')}
							</button>
						)}
				</>
			)}
		</div>
	);
}
