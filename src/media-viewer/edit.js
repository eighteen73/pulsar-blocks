import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockControls,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalBlockVariationPicker as BlockVariationPicker,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToolbarGroup,
	ToolbarButton,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';

import SingleBlockTypeAppender from '../components/single-block-type-appender';
import { generateId } from '../utils/helpers';

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
			/>
		</div>
	);
}

export default function Edit({
	attributes: {
		initialItems,
		id,
		showThumbnails,
		lightboxImageSize,
		overlayColor,
	},
	setAttributes,
	clientId,
	isSelected,
}) {
	const [isEditing, setIsEditing] = useState(false);

	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	const blockProps = useBlockProps({
		className: clsx(`has-items-${initialItems}`, {
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

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const imageSizes = useSelect(
		(select) => select('core/block-editor').getSettings().imageSizes
	);

	useEffect(() => {
		if (!id) {
			setAttributes({ id: generateId() });
		}
	}, [id, setAttributes]);

	const toggleEditing = () => {
		setIsEditing(!isEditing);
	};

	return (
		<div {...innerBlocksProps}>
			{!hasInnerBlocks && (
				<Placeholder
					clientId={clientId}
					name="pulsar/media-viewer"
					setAttributes={setAttributes}
				/>
			)}

			{hasInnerBlocks && (
				<>
					<InspectorControls>
						<PanelBody>
							<RangeControl
								label={__('Initial items', 'pulsar-blocks')}
								value={initialItems}
								help={__(
									'Number of items to display initially. Additional items will be displayed in a lightbox.',
									'pulsar-blocks'
								)}
								onChange={(value) =>
									setAttributes({ initialItems: value })
								}
								min={1}
								max={8}
								__nextHasNoMarginBottom
							/>
						</PanelBody>

						<PanelBody
							title={__('Lightbox settings', 'pulsar-blocks')}
						>
							<ToggleControl
								label={__('Thumbnails', 'pulsar-blocks')}
								checked={showThumbnails}
								help={__(
									'Show thumbnails in the lightbox.',
									'pulsar-blocks'
								)}
								onChange={(value) =>
									setAttributes({ showThumbnails: value })
								}
								__nextHasNoMarginBottom
							/>

							<SelectControl
								label={__('Image size', 'pulsar-blocks')}
								help={__(
									'Image size to use in the lightbox.',
									'pulsar-blocks'
								)}
								value={lightboxImageSize}
								options={imageSizes.map((size) => ({
									label: size.name,
									value: size.slug,
								}))}
								onChange={(value) => {
									console.log(value);
									setAttributes({ lightboxImageSize: value });
								}}
								__nextHasNoMarginBottom
							/>
						</PanelBody>
					</InspectorControls>

					<InspectorControls group="color">
						<ColorGradientSettingsDropdown
							__experimentalIsRenderedInSidebar
							settings={[
								{
									colorValue: overlayColor,
									label: __('Overlay', 'pulsar-blocks'),
									onColorChange: (val) =>
										setAttributes({ overlayColor: val }),
									isShownByDefault: true,
									enableAlpha: true,
									resetAllFilter: () => ({
										overlayColor: undefined,
									}),
								},
							]}
							panelId={clientId}
							{...colorGradientSettings}
						/>
					</InspectorControls>

					<BlockControls group="other">
						<ToolbarGroup>
							<ToolbarButton onClick={toggleEditing}>
								{isEditing
									? __('Finish Editing', 'pulsar-blocks')
									: __('Edit Media', 'pulsar-blocks')}
							</ToolbarButton>
						</ToolbarGroup>
					</BlockControls>

					<div className="wp-block-pulsar-media-viewer__items">
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

					{innerBlocks && !isEditing && (
						<button className="wp-block-pulsar-media-viewer__view-all">
							{__('View Gallery', 'pulsar-blocks')}
						</button>
					)}
				</>
			)}
		</div>
	);
}
