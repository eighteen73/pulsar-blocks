import {
	InnerBlocks,
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

import { plus } from '@wordpress/icons';

import SingleBlockTypeAppender from '../components/single-block-type-appender';

import './editor.scss';

const ALLOWED_BLOCKS = ['pulsar/accordion-item'];

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
						placeholder: __('Add content…'),
					},
				],
			],
		],
	];

	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'vertical',
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: () => (
			<SingleBlockTypeAppender
				variant="secondary"
				icon={plus}
				iconPosition="left"
				text={__('Add item')}
				allowedBlock="pulsar/accordion-item"
				style={{ width: '100%', justifyContent: 'center' }}
				clientId={clientId}
				isSelected={isSelected || isInnerBlockSelected}
			/>
		),
	});

	return (
		<div {...innerBlocksProps}>
			<InspectorControls group="settings">
				<PanelBody title={__('Settings')}>
					<ToggleControl
						label={__('Open multiple items')}
						help={__('Allow multiple items to be opened at once.')}
						checked={openMultiple}
						onChange={(value) =>
							setAttributes({ openMultiple: value })
						}
					/>

					<ToggleControl
						label={__('Start open')}
						help={__(
							'Load the page with the first item already open.'
						)}
						checked={startOpen}
						onChange={(value) =>
							setAttributes({ startOpen: value })
						}
					/>

					<ToggleGroupControl
						label={__('Heading level')}
						onChange={(value) => {
							setAttributes({ level: value });
						}}
						value={level}
						isBlock
						help={__(
							'Set the appropriate heading level for your content.'
						)}
					>
						<ToggleGroupControlOption value={2} label={__('H2')} />
						<ToggleGroupControlOption value={3} label={__('H3')} />
						<ToggleGroupControlOption value={4} label={__('H4')} />
					</ToggleGroupControl>
				</PanelBody>

				<PanelBody title={__('Schema settings')}>
					<ToggleControl
						label={__('Output schema for FAQs')}
						help={__(
							'If the accordion will be used to display FAQs, then enable this option to display schema data for search engines.'
						)}
						checked={hasSchema}
						onChange={(value) =>
							setAttributes({ hasSchema: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

			{children}
		</div>
	);
}
