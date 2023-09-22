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

import { __ } from '@wordpress/i18n';

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

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wp-block-pulsar-accordion__items' },
		{
			orientation: 'vertical',
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			renderAppender: () => <InnerBlocks.ButtonBlockAppender />,
		}
	);

	return (
		<div {...useBlockProps()}>
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

			<div {...innerBlocksProps}></div>
		</div>
	);
}
