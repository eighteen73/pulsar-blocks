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
import { Splide, SplideTrack } from '@splidejs/react-splide';

/**
 * Block dependencies
 */
import CarouselInspectorControls from './components/inspector-controls';
import ButtonBlockAppender from '../utils/button-block-appender';

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
		hasTrack,
		allowedBlocks,
		template,
	} = attributes;

	const ref = useRef(null);
	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'horizontal',
		allowedBlocks,
		template,
		renderAppender: false,
	});

	const [editorCarouselSettings, setEditorCarouselSettings] = useState(false);
	const [splide, setSplide] = useState(false);

	const isInnerBlockSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, true)
	);

	const isSlideSelected = useSelect((select) =>
		select('core/block-editor').hasSelectedInnerBlock(clientId, false)
	);

	useEffect(() => {
		setSplide(ref.current.splide);
		console.log(isSlideSelected);
	}, [isSlideSelected]);

	// @TODO
	// Refresh carousel when a slide is deleted
	// Refresh when inner blocks are rearranged

	useEffect(() => {
		/**
		 * Set specific Splide options that cause issues in the editor.
		 * This only affects the editor.
		 *
		 * @param {Object} settings
		 * @return {Object} Object of settings
		 */
		const editorSafeSettings = (settings) => {
			settings.autoplay = false;
			settings.drag = false;

			return settings;
		};

		if (advancedCarouselSettings) {
			setEditorCarouselSettings(
				editorSafeSettings(advancedCarouselSettings)
			);
		} else {
			setEditorCarouselSettings(editorSafeSettings(carouselSettings));
		}
	}, [setEditorCarouselSettings, carouselSettings, advancedCarouselSettings]);

	return (
		<>
			<CarouselInspectorControls
				onChange={setAttributes}
				carouselSettings={carouselSettings}
				advancedCarouselSettings={advancedCarouselSettings}
			/>

			<div {...innerBlocksProps}>
				<Splide
					options={editorCarouselSettings}
					ref={ref}
					hasTrack={hasTrack}
				>
					{children}
				</Splide>

				<ButtonBlockAppender
					rootClientId={clientId}
					text={false}
					isSelected={isSelected || isInnerBlockSelected}
				/>
			</div>
		</>
	);
}
