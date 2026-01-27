import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

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

export default function Edit({
	attributes: { openMultiple, startOpen, level, hasSchema },
	setAttributes,
	clientId,
	isSelected,
}) {
	const TEMPLATE = [
		[
			'pulsar/accordion-item',
			{},
			[
				[
					'core/paragraph',
					{
						placeholder: __('Add content…', 'pulsar-blocks'),
					},
				],
			],
		],
	];

	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	const innerBlocks = useSelect((select) =>
		select('core/block-editor').getBlock(clientId)
			? select('core/block-editor').getBlock(clientId).innerBlocks
			: []
	);

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
		template: TEMPLATE,
		renderAppender: () => false,
	});

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
