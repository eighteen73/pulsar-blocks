import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, ToggleControl } from '@wordpress/components';

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
	attributes: { openMultiple, startOpen },
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
			<InspectorControls>
				<PanelBody>
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
				</PanelBody>
			</InspectorControls>

			<div {...innerBlocksProps}></div>
		</div>
	);
}
