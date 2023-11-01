import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	Button,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
	__experimentalUnitControl as UnitControl,
	TextareaControl,
} from '@wordpress/components';

import { useRef } from '@wordpress/element';

import { useState, useEffect } from '@wordpress/element';

import { dispatch, select } from '@wordpress/data';

import { createBlock } from '@wordpress/blocks';

import { __ } from '@wordpress/i18n';

import { Splide, SplideTrack } from '@splidejs/react-splide';

import CarouselInspectorControls from './components/inspector-controls';

import './editor.scss';

const ALLOWED_BLOCKS = ['pulsar/carousel-slide'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object} param0
 * @param {Object} param0.attributes
 * @param          param0.attributes.splide
 * @param {Object} param0.clientId
 * @param          param0.setAttributes
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const { carouselSettings, advancedCarouselSettings } = attributes;

	const [editorCarouselSettings, setEditorCarouselSettings] = useState(false);

	// Certain Splide settings we dont want to be active in the editor.
	const editorSafeSettings = (settings) => {
		settings.autoplay = false;
		settings.drag = false;

		return settings;
	};

	// @TODO
	// Refresh carousel when a slide is deleted
	// Refresh when inner blocks are rearranged

	useEffect(() => {
		if (advancedCarouselSettings) {
			setEditorCarouselSettings(
				editorSafeSettings(advancedCarouselSettings)
			);
		} else {
			setEditorCarouselSettings(editorSafeSettings(carouselSettings));
		}
	}, [setEditorCarouselSettings, carouselSettings, advancedCarouselSettings]);

	const ref = useRef();
	const blockProps = useBlockProps();

	const addBlock = () => {
		const innerBlocks =
			select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks;
		const block = createBlock('pulsar/carousel-slide');
		dispatch('core/editor').insertBlock(
			block,
			innerBlocks.length,
			clientId
		);
	};

	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		orientation: 'horizontal',
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: false,
	});

	const handleChangeAdvancedCarouselSettings = (value) => {
		setAttributes({
			advancedCarouselSettings: JSON.parse(value),
		});
	};

	return (
		<>
			<BlockControls group="block">
				<Button variant="secondary" onClick={addBlock}>
					{__('Add slide')}
				</Button>
			</BlockControls>

			<CarouselInspectorControls
				onChange={setAttributes}
				carouselSettings={carouselSettings}
			/>

			<InspectorControls group="advanced">
				<TextareaControl
					label={__('Carousel settings')}
					help={__(
						'Override the carousel settings with a custom Splide JSON object.'
					)}
					rows={12}
					onChange={handleChangeAdvancedCarouselSettings}
					value={JSON.stringify(advancedCarouselSettings, null, 2)}
				/>
			</InspectorControls>

			<div {...innerBlocksProps}>
				<Splide
					options={editorCarouselSettings}
					ref={ref}
					hasTrack={false}
				>
					<SplideTrack>{children}</SplideTrack>
				</Splide>
			</div>
		</>
	);
}
