/**
 * WordPress dependencies
 */
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { cleanForSlug } from '@wordpress/url';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import './editor.scss';
import classNames from 'classnames';

/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @param  root0.attributes.title
 * @param  root0.attributes.id
 * @param  root0.attributes.showContent
 * @param  root0.attributes.openOnLoad
 * @param  root0.context
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, context }) {
	const { title, id } = attributes;

	const { level } = context;
	const TagName = 'h' + level;

	const blockProps = useBlockProps({
		className: 'wp-block-pulsar-accordion__item',
	});

	// Set the ID.
	useEffect(() => {
		setAttributes({ id: cleanForSlug(title) });
	}, [title, id, setAttributes]);

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-pulsar-accordion__panel',
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
						placeholder={__('Add a title…')}
					/>

					<span
						className="wp-block-pulsar-accordion__icon"
						dangerouslySetInnerHTML={{ __html: '&plus;' }}
					></span>
				</button>
			</TagName>

			<div {...innerBlocksProps}></div>
		</div>
	);
}
