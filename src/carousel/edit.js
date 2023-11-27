/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useRef, useState, useEffect, useCallback } from '@wordpress/element';
import { useSelect, select, subscribe } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Third party dependencies
 */
// import { Splide } from '@splidejs/react-splide';
import Splide from '@splidejs/splide';

/**
 * Block dependencies
 */
import CarouselInspectorControls from './components/inspector-controls';
import SingleBlockTypeAppender from '../utils/single-block-type-appender';

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
		carouselSettings,
		advancedCarouselSettings,
		allowedBlocks,
		template,
	} = attributes;

	const ref = useRef(null);
	const blockProps = useBlockProps({ className: 'splide' });
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'horizontal',
		allowedBlocks,
		template,
		renderAppender: false,
	});

	const [carousel, setCarousel] = useState({});

	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	const isSlideSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, false)
	);

	/**
	 * Detects if the carousel already ends with an empty slide so only one may be
	 * added at a time.
	 *
	 * @return {boolean} Has an empty slide
	 */
	const hasEmptySlide = () => {
		// Empty carousel
		if (innerBlocks.length === 0) {
			return false;
		}

		// Truly empty slide
		const lastSlide = innerBlocks[innerBlocks.length - 1];
		if (lastSlide.innerBlocks.length === 0) {
			return true;
		}

		// Empty slide with no content yet
		if (
			lastSlide.innerBlocks.length === 1 &&
			lastSlide.innerBlocks[0].attributes.content === ''
		) {
			return true;
		}

		return false;
	};

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
	 * Refresh the carousel.
	 */
	const refreshCarouselCallback = useCallback(() => {
		if (Object.keys(carousel).length === 0) {
			return;
		}

		// Refresh at end of the current thread (giving DOM a change to update beforehand)
		setTimeout(() => {
			carousel.refresh();
		}, 0);
	}, [carousel]);

	/**
	 * Initialize the Splide carousel.
	 * Also set editor settings to avoid issues.
	 */
	useEffect(() => {
		if (ref.current) {
			// Create a local variable to store modified settings
			// Some settings cause issues in the editor, so we need to modify them.
			let editorSettings = {
				...(advancedCarouselSettings ?? carouselSettings),
			};

			editorSettings = {
				...editorSettings,
				type:
					editorSettings.type === 'loop'
						? 'slide'
						: editorSettings.type,
				autoplay: false,
				drag: false,
			};

			const splide = new Splide(ref.current, editorSettings);
			setCarousel(splide.mount());
		}

		return function cleanup() {
			setCarousel(null);
		};
	}, [carouselSettings, advancedCarouselSettings]);

	// Watch for a change in child blocks and refresh.
	useEffect(() => {
		const { getBlock } = select('core/block-editor');
		let blockList = getBlock(clientId).innerBlocks;

		subscribe(() => {
			const newBlockList = getBlock(clientId).innerBlocks;
			const blockListChanged = newBlockList !== blockList;
			blockList = newBlockList;

			if (blockListChanged) {
				refreshCarouselCallback();
			}
		});
	});

	return (
		<>
			<CarouselInspectorControls
				onChange={setAttributes}
				carouselSettings={carouselSettings}
				advancedCarouselSettings={advancedCarouselSettings}
			/>

			<div {...innerBlocksProps}>
				<section
					className="splide"
					ref={ref}
					aria-label={__('Carousel')}
				>
					<div className="splide__track">
						<ul className="splide__list">{children}</ul>
					</div>
				</section>

				<SingleBlockTypeAppender
					onClickAfter={() => {
						refreshCarouselCallback();
						carousel.go(innerBlocks.length);
					}}
					variant="secondary"
					text={__('Add slide')}
					allowedBlock="pulsar/carousel-slide"
					style={{ width: '100%', justifyContent: 'center' }}
					clientId={clientId}
					isSelected={
						isSelected || isInnerBlockSelected || isSlideSelected
					}
					disabled={hasEmptySlide()}
				/>
			</div>
		</>
	);
}
