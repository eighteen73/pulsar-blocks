/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	useSetting,
} from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { forwardRef } from '@wordpress/element';
import { SplideSlide } from '@splidejs/react-splide';

/**
 * Third party dependencies
 */
import classnames from 'classnames';

/**
 * Block dependencies
 */
import { getPositionClassName, useMedia } from './components/utils';
import CarouselSlideBlockControls from './components/block-controls';
import CarouselSlideInspectorControls from './components/inspector-controls';

import './editor.scss';

/**
 * The save function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @param  root0.clientId
 * @param  props
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		contentPosition,
		backgroundType,
		backgroundImageId,
		overlayColor,
		overlayOpacity,
		focalPoint,
		backgroundColor,
	} = attributes;

	const hasInnerBlocks = useSelect(
		(select) =>
			select(blockEditorStore).getBlock(clientId).innerBlocks.length > 0,
		[clientId]
	);

	const styles = {
		'--overlay-color': overlayColor,
		'--overlay-opacity': overlayOpacity,
		'--background-color': backgroundColor,
	};

	const focalPointStyle = {
		objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
	};

	const { media, isResolvingMedia } = useMedia(backgroundImageId);

	const imageUrl =
		media?.media_details?.sizes.full?.source_url ?? media?.source_url;
	const altText = media?.alt_text;

	// Gets the variations as registered in `theme.json`.
	const palette = useSetting('color.palette');

	const onContentPositionChange = (value) => {
		setAttributes({
			contentPosition: value,
		});
	};

	const onBackgroundTypeChange = (value) => {
		setAttributes({
			backgroundType: value,
		});

		if (value === 'image') {
			setAttributes({
				backgroundColor: undefined,
			});
		}

		if (value === 'color') {
			setAttributes({
				backgroundImageId: undefined,
				overlayColor: undefined,
				overlayOpacity: undefined,
				focalPoint: {
					x: 0.5,
					y: 0.5,
				},
			});
		}
	};

	const onBackgroundImageSelect = (value) => {
		setAttributes({
			backgroundImageId: value?.id,
		});
	};

	const onBackgroundImageRemove = () => {
		setAttributes({
			backgroundImageId: undefined,
		});
	};

	const onBackgroundColorChange = (value) => {
		setAttributes({
			backgroundColor: value,
		});
	};

	const onOverlayColorChange = (value) => {
		setAttributes({
			overlayColor: value,
		});
	};

	const onOverlayOpacityChange = (value) => {
		setAttributes({
			overlayOpacity: value,
		});
	};

	const onFocalPointChange = (value) => {
		setAttributes({
			focalPoint: value,
		});
	};

	const blockProps = useBlockProps({
		className: classnames(
			'splide__slide',
			getPositionClassName(contentPosition),
			{
				[`has-overlay`]: overlayColor,
				[`has-overlay-opacity`]: overlayOpacity,
				[`has-background`]: backgroundColor,
			}
		),
		style: styles,
	});

	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps);

	return (
		<li {...innerBlocksProps}>
			<CarouselSlideBlockControls
				contentPosition={contentPosition}
				onContentPositionChange={onContentPositionChange}
				isDisabled={!hasInnerBlocks}
			/>

			<CarouselSlideInspectorControls
				imageUrl={imageUrl}
				palette={palette}
				backgroundType={backgroundType}
				backgroundImageId={backgroundImageId}
				backgroundColor={backgroundColor}
				overlayColor={overlayColor}
				overlayOpacity={overlayColor}
				focalPoint={focalPoint}
				onBackgroundTypeChange={onBackgroundTypeChange}
				onBackgroundImageSelect={onBackgroundImageSelect}
				onBackgroundImageRemove={onBackgroundImageRemove}
				onBackgroundColorChange={onBackgroundColorChange}
				onOverlayColorChange={onOverlayColorChange}
				onOverlayOpacityChange={onOverlayOpacityChange}
				onFocalPointChange={onFocalPointChange}
			/>

			<div className="wp-block-pulsar-carousel-slide__content">
				{children}
			</div>

			{backgroundType === 'image' && (
				<figure className="wp-block-pulsar-carousel-slide__background-image">
					{backgroundImageId && imageUrl && !isResolvingMedia ? (
						<img
							style={focalPointStyle}
							src={imageUrl}
							alt={altText}
						/>
					) : (
						<Placeholder withIllustration />
					)}
				</figure>
			)}
		</li>
	);
}
