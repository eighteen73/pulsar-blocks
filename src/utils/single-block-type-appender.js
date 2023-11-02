/**
 * WordPress Imports
 */
import { createBlock } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Custom Appender meant to be used when there is only one type of block that can be inserted to an InnerBlocks instance.
 *
 * @param          buttonText.buttonText
 * @param          buttonText
 * @param          buttonText.text
 * @param          onClick
 * @param          clientId
 * @param          allowedBlock
 * @param          innerBlocks
 * @param {Object} props
 * @param          buttonText.onClick
 * @param          buttonText.clientId
 * @param          buttonText.allowedBlock
 * @param          buttonText.innerBlocks
 * @param          buttonText.isSelected
 */
const SingleBlockTypeAppender = ({
	onClick,
	clientId,
	allowedBlock,
	innerBlocks,
	isSelected = true,
	...props
}) => {
	if (isSelected) {
		return <Button onClick={onClick} {...props} />;
	}
};

export default compose([
	withSelect((select, ownProps) => {
		return {
			innerBlocks: select('core/block-editor').getBlock(ownProps.clientId)
				.innerBlocks,
		};
	}),
	withDispatch((dispatch, ownProps) => {
		return {
			onClick() {
				const newBlock = createBlock(ownProps.allowedBlock);
				dispatch('core/block-editor').insertBlock(
					newBlock,
					ownProps.innerBlocks.length,
					ownProps.clientId
				);
			},
		};
	}),
])(SingleBlockTypeAppender);
