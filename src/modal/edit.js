import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, ToolbarButton } from '@wordpress/components';
import { createContext } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export const ModalContext = createContext();

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
	attributes: { isModalOpen },
	setAttributes,
	clientId,
	isSelected,
}) {
	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'vertical',
		template: [
			['pulsar/modal-trigger', {}],
			['pulsar/modal-content', {}],
		],
	});

	return (
		<div {...innerBlocksProps}>
			<InspectorControls group="settings">
				<PanelBody title={__('Settings', 'pulsar-blocks')}></PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarButton
					onClick={() => setAttributes({ isModalOpen: !isModalOpen })}
					isPressed={isModalOpen}
					label={
						isModalOpen
							? __('Open content', 'pulsar-blocks')
							: __('Close content', 'pulsar-blocks')
					}
				>
					{isModalOpen
						? __('Open content', 'pulsar-blocks')
						: __('Close content', 'pulsar-blocks')}
				</ToolbarButton>
			</BlockControls>

			{children}
		</div>
	);
}
