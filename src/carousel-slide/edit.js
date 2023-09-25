/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	BlockControls,
	InspectorControls,
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Placeholder,
	Spinner,
	FocalPointPicker,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import classnames from 'classnames';

import { getPositionClassName } from './utils';
import Image from './components/image';

import CarouselSlideInspectorControls from './components/inspector-controls';

import './editor.scss';
import CarouselSlideBlockControls from './components/block-controls';

/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @param  root0.clientId
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const { contentPosition, slideType, imageId, focalPoint } = attributes;

	const hasInnerBlocks = useSelect(
		(select) =>
			select(blockEditorStore).getBlock(clientId).innerBlocks.length > 0,
		[clientId]
	);

	const isImageSlideType = slideType === 'image';

	const blockProps = useBlockProps({ className: 'splide__slide' });

	const innerBlocksProps = useInnerBlocksProps({
		className: classnames(
			'wp-block-pulsar-carousel-slide__content',
			getPositionClassName(contentPosition)
		),
	});

	const onChangeFocalPoint = (value) => {
		setAttributes({
			focalPoint: value,
		});
	};

	const onSelectImage = (image) => {
		setAttributes({
			imageId: image.id,
		});
	};

	const onRemoveImage = () => {
		setAttributes({
			imageId: null,
		});
	};

	const onChangeContentPosition = (value) => {
		setAttributes({
			contentPosition: value,
		});
	};

	return (
		<div {...blockProps}>
			<CarouselSlideBlockControls
				hasInnerBlocks={hasInnerBlocks}
				slideType={slideType}
				imageId={imageId}
				onChangeContentPosition={onChangeContentPosition}
				onSelectImage={onSelectImage}
				onRemoveImage={onRemoveImage}
			/>

			<CarouselSlideInspectorControls
				slideType={slideType}
				imageId={imageId}
				size="full"
				focalPoint={focalPoint}
				onChangeFocalPoint={onChangeFocalPoint}
			/>

			<Image
				isActive={isImageSlideType}
				id={imageId}
				size="full"
				focalPoint={focalPoint}
			/>

			<div {...innerBlocksProps}></div>
		</div>
	);
}
