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

import { dispatch, select, subscribe } from '@wordpress/data';

import { createBlock } from '@wordpress/blocks';

import { __ } from '@wordpress/i18n';

import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';

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

	const ref = useRef();
	const blockProps = useBlockProps();

	const addBlock = () => {
		const innerBlocks =
			select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks;
		const block = createBlock('pulsar/carousel-slide');
		dispatch('core/editor')
			.insertBlock(block, innerBlocks.length, clientId)
			.then(() => {
				console.log(ref.current.splide);
			});
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

			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<ToggleGroupControl
						label={__('Type')}
						onChange={(value) => {
							setAttributes({
								carouselSettings: {
									...carouselSettings,
									type: value,
								},
							});
						}}
						value={carouselSettings.type}
						isBlock
					>
						<ToggleGroupControlOption
							value={'slide'}
							label={__('Slide')}
						/>

						<ToggleGroupControlOption
							value={'loop'}
							label={__('Loop')}
						/>

						<ToggleGroupControlOption
							value={'fade'}
							label={__('Fade')}
						/>
					</ToggleGroupControl>

					<ToggleControl
						label={__('Autoplay')}
						checked={carouselSettings.autoplay}
						onChange={(value) => {
							setAttributes({
								carouselSettings: {
									...carouselSettings,
									autoplay: value,
								},
							});
						}}
					/>

					{carouselSettings.autoplay && (
						<NumberControl
							label={__('Autoplay interval')}
							min={0}
							step={250}
							isShiftStepEnabled={true}
							onChange={(value) => {
								setAttributes({
									carouselSettings: {
										...carouselSettings,
										interval: value,
									},
								});
							}}
							shiftStep={1000}
							value={carouselSettings.interval}
						/>
					)}
				</PanelBody>

				<PanelBody title={__('Desktop settings')} initialOpen={true}>
					{carouselSettings.type !== 'fade' && (
						<>
							<NumberControl
								label={__('Per page')}
								isShiftStepEnabled={true}
								onChange={(value) => {
									setAttributes({
										carouselSettings: {
											...carouselSettings,
											perPage: value,
										},
									});
								}}
								shiftStep={1}
								value={carouselSettings.perPage}
							/>

							<NumberControl
								label={__('Per move')}
								isShiftStepEnabled={true}
								onChange={(value) => {
									setAttributes({
										carouselSettings: {
											...carouselSettings,
											perMove: value,
										},
									});
								}}
								shiftStep={1}
								value={carouselSettings.perMove}
							/>

							<UnitControl
								label={__('Gap')}
								onChange={(value) => {
									setAttributes({
										carouselSettings: {
											...carouselSettings,
											gap: value,
										},
									});
								}}
								value={carouselSettings.gap}
							/>
						</>
					)}

					<ToggleControl
						label={__('Arrows')}
						checked={carouselSettings.arrows}
						onChange={(value) => {
							setAttributes({
								carouselSettings: {
									...carouselSettings,
									arrows: value,
								},
							});
						}}
					/>

					<ToggleControl
						label={__('Pagination')}
						checked={carouselSettings.pagination}
						onChange={(value) => {
							setAttributes({
								carouselSettings: {
									...carouselSettings,
									pagination: value,
								},
							});
						}}
					/>
				</PanelBody>

				<PanelBody title={__('Tablet settings')} initialOpen={false}>
					{carouselSettings.type !== 'fade' && (
						<>
							<NumberControl
								label={__('Per page')}
								isShiftStepEnabled={true}
								onChange={(value) => {
									setAttributes({
										carouselSettings: {
											...carouselSettings,
											breakpoints: {
												...carouselSettings.breakpoints,
												1024: {
													...carouselSettings
														.breakpoints['1024'],
													perPage: value,
												},
											},
										},
									});
								}}
								shiftStep={1}
								value={
									carouselSettings.breakpoints['1024'].perPage
								}
							/>

							<NumberControl
								label={__('Per move')}
								isShiftStepEnabled={true}
								onChange={(value) => {
									setAttributes({
										carouselSettings: {
											...carouselSettings,
											breakpoints: {
												...carouselSettings.breakpoints,
												1024: {
													...carouselSettings
														.breakpoints['1024'],
													perMove: value,
												},
											},
										},
									});
								}}
								shiftStep={1}
								value={
									carouselSettings.breakpoints['1024'].perMove
								}
							/>

							<UnitControl
								label={__('Gap')}
								onChange={(value) => {
									setAttributes({
										carouselSettings: {
											...carouselSettings,
											breakpoints: {
												...carouselSettings.breakpoints,
												1024: {
													...carouselSettings
														.breakpoints['1024'],
													gap: value,
												},
											},
										},
									});
								}}
								value={carouselSettings.breakpoints['1024'].gap}
							/>
						</>
					)}

					<ToggleControl
						label={__('Arrows')}
						checked={carouselSettings.breakpoints['1024'].arrows}
						onChange={(value) => {
							setAttributes({
								carouselSettings: {
									...carouselSettings,
									breakpoints: {
										...carouselSettings.breakpoints,
										1024: {
											...carouselSettings.breakpoints[
												'1024'
											],
											arrows: value,
										},
									},
								},
							});
						}}
					/>

					<ToggleControl
						label={__('Pagination')}
						checked={
							carouselSettings.breakpoints['1024'].pagination
						}
						onChange={(value) => {
							setAttributes({
								carouselSettings: {
									...carouselSettings,
									breakpoints: {
										...carouselSettings.breakpoints,
										1024: {
											...carouselSettings.breakpoints[
												'1024'
											],
											pagination: value,
										},
									},
								},
							});
						}}
					/>
				</PanelBody>

				<PanelBody title={__('Mobile settings')} initialOpen={false}>
					{carouselSettings.type !== 'fade' && (
						<>
							<NumberControl
								label={__('Per page')}
								isShiftStepEnabled={true}
								onChange={(value) => {
									setAttributes({
										carouselSettings: {
											...carouselSettings,
											breakpoints: {
												...carouselSettings.breakpoints,
												640: {
													...carouselSettings
														.breakpoints['640'],
													perPage: value,
												},
											},
										},
									});
								}}
								shiftStep={1}
								value={
									carouselSettings.breakpoints['640'].perPage
								}
							/>

							<NumberControl
								label={__('Per move')}
								isShiftStepEnabled={true}
								onChange={(value) => {
									setAttributes({
										carouselSettings: {
											...carouselSettings,
											breakpoints: {
												...carouselSettings.breakpoints,
												640: {
													...carouselSettings
														.breakpoints['640'],
													perMove: value,
												},
											},
										},
									});
								}}
								shiftStep={1}
								value={
									carouselSettings.breakpoints['640'].perMove
								}
							/>

							<UnitControl
								label={__('Gap')}
								onChange={(value) => {
									setAttributes({
										carouselSettings: {
											...carouselSettings,
											breakpoints: {
												...carouselSettings.breakpoints,
												640: {
													...carouselSettings
														.breakpoints['640'],
													gap: value,
												},
											},
										},
									});
								}}
								value={carouselSettings.breakpoints['640'].gap}
							/>
						</>
					)}

					<ToggleControl
						label={__('Arrows')}
						checked={carouselSettings.breakpoints['640'].arrows}
						onChange={(value) => {
							setAttributes({
								carouselSettings: {
									...carouselSettings,
									breakpoints: {
										...carouselSettings.breakpoints,
										640: {
											...carouselSettings.breakpoints[
												'640'
											],
											arrows: value,
										},
									},
								},
							});
						}}
					/>

					<ToggleControl
						label={__('Pagination')}
						checked={carouselSettings.breakpoints['640'].pagination}
						onChange={(value) => {
							setAttributes({
								carouselSettings: {
									...carouselSettings,
									breakpoints: {
										...carouselSettings.breakpoints,
										640: {
											...carouselSettings.breakpoints[
												'640'
											],
											pagination: value,
										},
									},
								},
							});
						}}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="advanced">
				<TextareaControl
					label={__('Advanced carousel settings')}
					help={__(
						'Override the carousel settings with a custom Splide JSON object.'
					)}
					rows={12}
					onChange={handleChangeAdvancedCarouselSettings}
					value={JSON.stringify(advancedCarouselSettings, null, 2)}
				/>
			</InspectorControls>

			<div {...innerBlocksProps}>
				<Splide options={carouselSettings} ref={ref} hasTrack={false}>
					<SplideTrack>{children}</SplideTrack>
				</Splide>
			</div>
		</>
	);
}
{
}
