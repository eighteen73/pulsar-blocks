/**
 * WordPress dependencies
 */
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { cleanForSlug } from '@wordpress/url';
import { useEffect } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0               The props passed to the save function.
 * @param {Object}   param0.attributes    The block's attributes as saved.
 * @param {Function} param0.setAttributes Function to set the block's attributes.
 * @param {string}   param0.clientId      The block's unique ID.
 * @param {Object}   param0.context       The block's context.
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId, context }) {
	const { title, id } = attributes;
	const { level } = context;

	const TagName = 'h' + level;

	const blockProps = useBlockProps({
		className: 'wp-block-pulsar-accordion__item',
	});

	useEffect(() => {
		const uniqueId =
			'pulsar-accordion-' + clientId.slice(2, 9).replace('-', '');

		setAttributes({ id: uniqueId });
	}, [clientId, id, setAttributes]);

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-pulsar-accordion__panel-inner',
		},
		{
			orientation: 'vertical',
			__experimentalCaptureToolbars: true,
			templateInsertUpdatesSelection: false,
		}
	);

	return (
		<div {...blockProps}>
			<TagName className="wp-block-pulsar-accordion__heading">
				<button className="wp-block-pulsar-accordion__trigger">
					<RichText
						tagName="span"
						className="wp-block-pulsar-accordion__title"
						allowedFormats={['core/bold', 'core/italic']}
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder={__('Add a title…', 'pulsar-blocks')}
					/>

					<span className="wp-block-pulsar-accordion__icon"></span>
				</button>
			</TagName>

			<div className="wp-block-pulsar-accordion__panel">
				<div {...innerBlocksProps}></div>
			</div>
		</div>
	);
}
