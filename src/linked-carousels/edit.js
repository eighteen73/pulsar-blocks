import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { plus } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import SingleBlockTypeAppender from '../components/single-block-type-appender';

const ALLOWED_BLOCKS = ['pulsar/carousel'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object} param0
 * @param {Object} param0.clientId
 * @return {WPElement} Element to render.
 */

export default function Edit({ clientId, isSelected }) {
	const innerBlocks = useSelect(
		(select) => select('core/block-editor').getBlock(clientId).innerBlocks
	);

	const isEnabled = innerBlocks.length < 2;

	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'vertical',
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: () => false,
	});

	return (
		<div {...innerBlocksProps}>
			{children}

			<SingleBlockTypeAppender
				onClickAfter={() => {}}
				variant="secondary"
				icon={plus}
				iconPosition="left"
				text={__('Add carousel', 'pulsar-blocks')}
				allowedBlock="pulsar/carousel"
				style={{ width: '100%', justifyContent: 'center' }}
				clientId={clientId}
				isEnabled={isSelected && isEnabled}
			/>
		</div>
	);
}
