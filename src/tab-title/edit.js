/**
 * WordPress dependencies
 */
import {
	RichText, 	useBlockProps,
} from '@wordpress/block-editor';
import { useEffect } from "@wordpress/element";
import { __ } from '@wordpress/i18n';

import './editor.css';


/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.clientId
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @return {WPElement} Element to render.
 */
export default function Edit({ clientId, attributes: { title, id }, setAttributes }) {

	useEffect(() => {
		id === '' &&
		setAttributes({ id: clientId });
	})

	return (
		<div
		{...useBlockProps()}
		role="tab"
		id={`tab-${id}`}
		aria-selected={`${id > 1 ? false : true}`}
		aria-controls={`tabpanel-${id}`}
		tabIndex={`${id === 1 ? -1 : 0}`}
		draggable="true"
		>
			<button
			className="wp-block-pulsar-tab-button"
			type="button"
			>
				<RichText
				tagName="span"
				id={{ id }}
				className="wp-block-pulsar-tab-title-content focus"
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				onChange={ (title) => setAttributes( { title } ) }
				value={ title }
				placeholder={ __( 'Add a title...' ) }
				/>
			</button>
		</div>
	);
}
