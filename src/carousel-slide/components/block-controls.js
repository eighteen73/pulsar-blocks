/**
 * WordPress dependencies
 */
import {
	BlockControls,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const CarouselSlideBlockControls = (props) => {
	const { contentPosition, onContentPositionChange, isDisabled } = props;
	return (
		<BlockControls group="block">
			<BlockAlignmentMatrixControl
				label={__('Change content position', 'pulsar-blocks')}
				value={contentPosition}
				onChange={onContentPositionChange}
				isDisabled={isDisabled}
			/>
		</BlockControls>
	);
};

export default CarouselSlideBlockControls;
