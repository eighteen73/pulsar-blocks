import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';

import {
	FormToggle,
	PanelBody,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import './editor.css';

const ALLOWED_BLOCKS = ['pulsar/tab-item'];

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

export default function Edit({ attributes: { vertical }, setAttributes }) {


	const TEMPLATE = [
		['pulsar/tab-item', {},
			[
				['core/paragraph', {}]
			]
		],
	];



	const innerBlocksProps = useInnerBlocksProps({
		className: 'wp-block-pulsar-tabs__items',

	}, {
		orientation: "vertical",
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: () => <InnerBlocks.ButtonBlockAppender />,
	});


	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Vertical alignment', 'pulsar')} initialOpen={true}
					name="alignment"
					className="alignment"
				>

					<FormToggle
						checked={vertical}
						onChange={() => setAttributes({
							vertical: !vertical
						})}
					/>

				</PanelBody>
			</InspectorControls>

			<div
				{...useBlockProps()}
			>
				<div {...innerBlocksProps}></div>
			</div>
		</>
	);
}
