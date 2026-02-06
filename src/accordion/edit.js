import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalBlockVariationPicker as BlockVariationPicker,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import { useSelect, useDispatch } from '@wordpress/data';
import {
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';

import { __ } from '@wordpress/i18n';

import SingleBlockTypeAppender from '../components/single-block-type-appender';

const ALLOWED_BLOCKS = [
	'pulsar/accordion-item',
	'core/query',
	'woocommerce/product-collection',
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.clientId
 * @param {Object}   param0.attributes
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 */

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
				instructions={__('Select an accordion type:', 'pulsar-blocks')}
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
	attributes: { openMultiple, startOpen, level, hasSchema },
	setAttributes,
	clientId,
	isSelected,
}) {
	const { isInnerBlockSelected, innerBlocks, blockName } = useSelect(
		(select) => {
			const block = select('core/block-editor').getBlock(clientId);
			return {
				isInnerBlockSelected: select(
					'core/block-editor'
				).hasSelectedInnerBlock(clientId, true),
				innerBlocks: block ? block.innerBlocks : [],
				blockName: block ? block.name : 'pulsar/accordion',
			};
		},
		[clientId]
	);

	// Show placeholder if no inner blocks
	const hasInnerBlocks = innerBlocks.length > 0;

	// Detect if there's a query loop block
	const hasQueryLoop = innerBlocks.find(
		(block) =>
			block.name === 'core/query' ||
			block.name === 'woocommerce/product-collection'
	);

	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'vertical',
		allowedBlocks: ALLOWED_BLOCKS,
		// Don't set template here - let variations handle it
		renderAppender: () => false,
	});

	// Show placeholder if no inner blocks
	if (!hasInnerBlocks) {
		return (
			<Placeholder
				clientId={clientId}
				name={blockName}
				setAttributes={setAttributes}
			/>
		);
	}

	return (
		<div {...innerBlocksProps}>
			<InspectorControls group="settings">
				<PanelBody title={__('Settings', 'pulsar-blocks')}>
					<ToggleControl
						label={__(
							'Multiple items can be opened',
							'pulsar-blocks'
						)}
						checked={openMultiple}
						onChange={(value) =>
							setAttributes({ openMultiple: value })
						}
					/>

					<ToggleControl
						label={__(
							'First item open by default',
							'pulsar-blocks'
						)}
						checked={startOpen}
						onChange={(value) =>
							setAttributes({ startOpen: value })
						}
					/>

					<ToggleGroupControl
						label={__('Heading level', 'pulsar-blocks')}
						onChange={(value) => {
							setAttributes({ level: value });
						}}
						value={level}
						isBlock
						help={__(
							'Set the appropriate heading level for your content.',
							'pulsar-blocks'
						)}
					>
						<ToggleGroupControlOption
							value={2}
							label={__('H2', 'pulsar-blocks')}
						/>
						<ToggleGroupControlOption
							value={3}
							label={__('H3', 'pulsar-blocks')}
						/>
						<ToggleGroupControlOption
							value={4}
							label={__('H4', 'pulsar-blocks')}
						/>
					</ToggleGroupControl>
				</PanelBody>

				<PanelBody title={__('Schema settings', 'pulsar-blocks')}>
					<ToggleControl
						label={__('Output schema for FAQs', 'pulsar-blocks')}
						help={__(
							'If using for FAQs, enable this for SEO.',
							'pulsar-blocks'
						)}
						checked={hasSchema}
						onChange={(value) =>
							setAttributes({ hasSchema: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

			{children}

			{!hasQueryLoop && (
				<SingleBlockTypeAppender
					onClickAfter={() => {}}
					variant="secondary"
					text={__('Add item', 'pulsar-blocks')}
					allowedBlock="pulsar/accordion-item"
					style={{ width: '100%', justifyContent: 'center' }}
					clientId={clientId}
					isEnabled={isSelected || isInnerBlockSelected}
				/>
			)}
		</div>
	);
}
