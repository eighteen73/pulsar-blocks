import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Modal } from '@wordpress/components';

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
	clientId,
	isSelected,
	setAttributes,
	context: { isModalOpen },
}) {
	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'vertical',
	});

	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	return (
		<div {...innerBlocksProps}>
			{isModalOpen ||
				(isSelected && (
					<Modal
						onRequestClose={() =>
							setAttributes({ isModalOpen: false })
						}
						size="large"
					>
						{children}
					</Modal>
				))}
		</div>
	);
}
