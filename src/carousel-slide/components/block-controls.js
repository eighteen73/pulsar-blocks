/**
 * WordPress dependencies
 */
import {
	BlockControls,
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import MediaToolbar from './media-toolbar';

const CarouselSlideBlockControls = (props) => {
	const {
		contentPosition,
		onChangeContentPosition,
		imageId,
		onSelectImage,
		onRemoveImage,
		hasInnerBlocks,
	} = props;
	return (
		<BlockControls group="block">
			<BlockAlignmentMatrixControl
				label={__('Change content position')}
				value={contentPosition}
				onChange={onChangeContentPosition}
				isDisabled={!hasInnerBlocks}
			/>

			<MediaToolbar
				isOptional
				id={imageId}
				onSelect={onSelectImage}
				onRemove={onRemoveImage}
			/>
		</BlockControls>
	);
};

export default CarouselSlideBlockControls;
