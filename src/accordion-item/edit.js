/**
 * WordPress dependencies
 */
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
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
	const { title, id, inQueryLoop } = attributes;
	const { level, postId, postType } = context;

	const TagName = 'h' + level;

	const { getBlockParentsByBlockName } = useSelect((select) => {
		return {
			getBlockParentsByBlockName:
				select(blockEditorStore).getBlockParentsByBlockName,
		};
	}, []);

	// Detect if we're inside a query loop
	useEffect(() => {
		const queryLoopParents = getBlockParentsByBlockName(
			clientId,
			'core/query'
		);
		const isWithinQueryLoop = queryLoopParents.length > 0;

		if (isWithinQueryLoop !== inQueryLoop) {
			setAttributes({ inQueryLoop: isWithinQueryLoop });
		}
	}, [clientId, inQueryLoop, getBlockParentsByBlockName, setAttributes]);

	// Get post title when in query loop
	const postTitle = useSelect(
		(select) => {
			if (!inQueryLoop || !postId || !postType) {
				return null;
			}
			try {
				const post = select('core').getEntityRecord('postType', postType, postId);
				return post?.title?.rendered || post?.title || '';
			} catch (e) {
				return null;
			}
		},
		[inQueryLoop, postId, postType]
	);

	// Use post title when in query loop and no manual title is set
	useEffect(() => {
		if (inQueryLoop && postTitle && !title) {
			setAttributes({ title: postTitle });
		}
	}, [inQueryLoop, postTitle, title, setAttributes]);

	const blockProps = useBlockProps({
		className: 'wp-block-pulsar-accordion__item',
	});

	// Generate unique ID, combining with postId when in query loop
	useEffect(() => {
		let uniqueId = 'pulsar-accordion-' + clientId.slice(2, 9).replace('-', '');

		if (inQueryLoop && postId) {
			uniqueId = `${uniqueId}-${postId}`;
		}

		if (id !== uniqueId) {
			setAttributes({ id: uniqueId });
		}
	}, [clientId, id, inQueryLoop, postId, setAttributes]);

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
					{inQueryLoop && postTitle ? (
						<span className="wp-block-pulsar-accordion__title">
							{postTitle}
						</span>
					) : (
						<RichText
							tagName="span"
							className="wp-block-pulsar-accordion__title"
							allowedFormats={['core/bold', 'core/italic']}
							onChange={(value) => setAttributes({ title: value })}
							value={title}
							placeholder={__('Add a title…', 'pulsar-blocks')}
						/>
					)}

					<span className="wp-block-pulsar-accordion__icon"></span>
				</button>
			</TagName>

			<div className="wp-block-pulsar-accordion__panel">
				<div {...innerBlocksProps}></div>
			</div>
		</div>
	);
}
