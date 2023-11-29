/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useRef, useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Third party dependencies
 */
import { Splide } from '@splidejs/react-splide';

/**
 * Block dependencies
 */
import CarouselInspectorControls from './components/inspector-controls';
import SingleBlockTypeAppender from '../components/single-block-type-appender';

import './editor.scss';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.attributes
 * @param {Function} param0.setAttributes
 * @param {string}   param0.clientId
 * @param {boolean}  param0.isSelected
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	clientId,
	isSelected,
}) {
	const {
		carouselOptions,
		advancedCarouselOptions,
		mergeOptions,
		ariaLabel,
		hasTrack,
		allowedBlocks,
		template,
		templateLock,
	} = attributes;

	const ref = useRef(null);
	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'horizontal',
		allowedBlocks,
		template,
		templateLock,
		renderAppender: false,
	});

	const [carousel, setCarousel] = useState({});

	// Check if any inner block is selected.
	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	// Check if if a slide is selected.
	const isSlideSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, false)
	);

	/**
	 * Get the inner blocks of the current block.
	 * This is used to watch for changes in the inner blocks.
	 */
	const innerBlocks = useSelect((select) =>
		select('core/block-editor').getBlock(clientId)
			? select('core/block-editor').getBlock(clientId).innerBlocks
			: []
	);

	/**
	 *
	 * @param {Object}  baseOptions       Carousel options
	 * @param {Object}  additionalOptions Additional options to merge with the base options
	 * @param {boolean} shouldMerge       If true, the additional options will be merged with the base options
	 * @return {Object}                   The carousel options
	 */
	const getOptions = (baseOptions, additionalOptions, shouldMerge) => {
		if (shouldMerge && additionalOptions) {
			return { ...baseOptions, ...additionalOptions };
		}
		return additionalOptions || baseOptions;
	};

	/**
	 * Return the carousel options with the correct values for the editor.
	 *
	 * @return {Object} The modified carousel options.
	 */
	const editorSafeOptions = () => {
		const options = getOptions(
			carouselOptions,
			advancedCarouselOptions,
			mergeOptions
		);

		return {
			...options,
			type: options.type === 'loop' ? 'slide' : options.type,
			autoplay: false,
			drag: false,
			arrows: true,
		};
	};

	/**
	 * Set the carousel instance for access later.
	 */
	useEffect(() => {
		if (ref.current) {
			setCarousel(ref.current.splide);
		}
	}, []);

	return (
		<>
			<CarouselInspectorControls
				onChange={setAttributes}
				attributes={attributes}
			/>

			<div {...innerBlocksProps}>
				<Splide
					options={editorSafeOptions()}
					hasTrack={hasTrack}
					ref={ref}
					aria-label={ariaLabel}
				>
					{children}
				</Splide>

				<SingleBlockTypeAppender
					onClickAfter={() => {
						carousel.go(innerBlocks.length);
					}}
					variant="secondary"
					text={__('Add slide')}
					allowedBlock="pulsar/carousel-slide"
					style={{ width: '100%', justifyContent: 'center' }}
					clientId={clientId}
					isEnabled={
						isSelected || isInnerBlockSelected || isSlideSelected
					}
				/>
			</div>
		</>
	);
}
