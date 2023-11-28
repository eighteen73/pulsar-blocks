/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useCallback, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Block dependencies
 */
import CarouselInspectorControls from './components/inspector-controls';
import SingleBlockTypeAppender from '../utils/single-block-type-appender';

// import Carousel from '../utils/carousel';
// import CarouselTrack from '../utils/carousel-track';
// import CarouselList from '../utils/carousel-list';
// import CarouselNavigation from '../utils/carousel-navigation';
// import CarouselPagination from '../utils/carousel-pagination';
import Carousel from '../components/embla-carousel';

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
		hasContainer,
		allowedBlocks,
		template,
	} = attributes;

	const blockProps = useBlockProps({ className: 'splide' });
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'horizontal',
		allowedBlocks,
		template,
		renderAppender: false,
	});

	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	const isSlideSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, false)
	);

	const carouselStyles = {
		'--slide-width': 'calc(100% / ' + carouselSettings.perPage + ')',
		'--slide-spacing': carouselSettings.gap,
		'--slide-type': carouselSettings.type,
		'--slide-loop': carouselSettings.loop,
	};

	return (
		<>
			<CarouselInspectorControls
				onChange={setAttributes}
				attributes={attributes}
			/>

			<div {...innerBlocksProps}>
				<Carousel
					options={advancedCarouselSettings ?? carouselSettings}
					pagination={carouselSettings.pagination}
					arrows={carouselSettings.arrows}
					style={carouselStyles}
					aria-label={ariaLabel}
					hasContainer={hasContainer}
				>
					{children}
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
