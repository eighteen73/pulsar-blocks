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
import Splide from '@splidejs/splide';
import EmblaCarousel from 'embla-carousel';

/**
 * Block dependencies
 */
import CarouselInspectorControls from './components/inspector-controls';
import SingleBlockTypeAppender from '../utils/single-block-type-appender';
import Carousel from '../utils/carousel';
import CarouselTrack from '../utils/carousel-track';
import CarouselList from '../utils/carousel-list';

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
		ariaLabel,
		hasList,
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
	 * Initialize the carousel.
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

			const rootNode = ref.current;
			const viewportNode = rootNode.querySelector('.embla__viewport');
			const prevButtonNode = rootNode.querySelector('.embla__prev');
			const nextButtonNode = rootNode.querySelector('.embla__next');

			const embla = EmblaCarousel(viewportNode, {
				align: 'start',
				slidesToScroll: 1,
				containScroll: 'trimSnaps',
			});

			prevButtonNode.addEventListener('click', embla.scrollPrev, false);
			nextButtonNode.addEventListener('click', embla.scrollNext, false);

			setCarousel(embla);
		}

		return function cleanup() {
			setCarousel(null);
		};
	}, [carouselSettings, advancedCarouselSettings]);

	return (
		<>
			<CarouselInspectorControls
				onChange={setAttributes}
				attributes={attributes}
			/>

			<div {...innerBlocksProps}>
				<Carousel ref={ref} ariaLabel={ariaLabel}>
					<CarouselTrack>
						{hasList ? (
							<CarouselList>{children}</CarouselList>
						) : (
							children
						)}
					</CarouselTrack>
					<button className="embla__prev">Prev</button>
					<button className="embla__next">Next</button>
				</Carousel>

				<SingleBlockTypeAppender
					onClickAfter={() => {}}
					variant="secondary"
					text={__('Add slide')}
					allowedBlock="pulsar/carousel-slide"
					style={{ width: '100%', justifyContent: 'center' }}
					clientId={clientId}
					isSelected={
						isSelected || isInnerBlockSelected || isSlideSelected
					}
					disabled={false}
				/>
			</div>
		</>
	);
}
