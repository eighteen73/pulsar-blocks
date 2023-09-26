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
	BaseControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanel as ToolsPanel,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	TextareaControl,
} from '@wordpress/components';

import { useState, useEffect, useCallback } from '@wordpress/element';

import { dispatch, select, subscribe } from '@wordpress/data';

import { createBlock } from '@wordpress/blocks';

import { __ } from '@wordpress/i18n';

import Splide from '@splidejs/splide';

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
	const {
		type,
		perPage,
		perMove,
		arrows,
		pagination,
		autoplay,
		interval,
		tabletPerPage,
		tabletPerMove,
		tabletArrows,
		tabletPagination,
		mobilePerPage,
		mobilePerMove,
		mobileArrows,
		mobilePagination,
		splide,
	} = attributes;

	const [carousel, setCarousel] = useState({});

	const refreshCarousel = () => {
		if (Object.keys(carousel).length !== 0) {
			carousel.refresh();
		}
	};

	const addBlock = () => {
		const innerBlocks =
			select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks;
		const block = createBlock('pulsar/carousel-slide');
		dispatch('core/editor')
			.insertBlock(block, innerBlocks.length, clientId)
			.then(() => {
				refreshCarousel();
				carousel.go(innerBlocks.length);
			});
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'splide__list' },
		{
			orientation: 'horizontal',
			allowedBlocks: ALLOWED_BLOCKS,
			renderAppender: false,
		}
	);

	const callback = useCallback(() => {
		refreshCarousel();
	});

	// Set up the carousel.
	useEffect(() => {
		const splide = new Splide(`#block-${clientId}`);
		setCarousel(splide.mount());

		return function cleanup() {
			setCarousel(null);
		};
	}, []);

	// Watch for a change in child blocks and refresh.
	useEffect(() => {
		const { getBlock } = select('core/block-editor');
		let blockList = getBlock(clientId).innerBlocks;

		subscribe(() => {
			const newBlockList = getBlock(clientId).innerBlocks;
			const blockListChanged = newBlockList !== blockList;
			blockList = newBlockList;

			if (blockListChanged) {
				callback();
			}
		});
	});

	const handleChangeType = (value) => {
		setAttributes({
			type: value,
		});
	};

	const handleChangePerPage = (value) => {
		setAttributes({
			perPage: value,
		});
	};

	const handleChangePerMove = (value) => {
		setAttributes({
			perMove: value,
		});
	};

	const handleChangeArrows = (value) => {
		setAttributes({
			arrows: value,
		});
	};

	const handleChangePagination = (value) => {
		setAttributes({
			pagination: value,
		});
	};

	const handleChangeAutoplay = (value) => {
		setAttributes({
			autoplay: value,
		});
	};

	const handleChangeInterval = (value) => {
		setAttributes({
			interval: value,
		});
	};

	const handleChangeTabletPerPage = (value) => {
		setAttributes({
			tabletPerPage: value,
		});
	};

	const handleChangeTabletPerMove = (value) => {
		setAttributes({
			tabletPerMove: value,
		});
	};

	const handleChangeTabletArrows = (value) => {
		setAttributes({
			tabletArrows: value,
		});
	};

	const handleChangeTabletPagination = (value) => {
		setAttributes({
			tabletPagination: value,
		});
	};

	const handleChangeMobilePerPage = (value) => {
		setAttributes({
			mobilePerPage: value,
		});
	};

	const handleChangeMobilePerMove = (value) => {
		setAttributes({
			mobilePerMove: value,
		});
	};

	const handleChangeMobileArrows = (value) => {
		setAttributes({
			mobileArrows: value,
		});
	};

	const handleChangeMobilePagination = (value) => {
		setAttributes({
			mobilePagination: value,
		});
	};

	const handleChangeSplide = (value) => {
		setAttributes({
			splide: JSON.parse(value),
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
						onChange={handleChangeType}
						value={type}
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
						checked={autoplay}
						onChange={handleChangeAutoplay}
					/>

					{autoplay && (
						<NumberControl
							label={__('Interval')}
							isShiftStepEnabled={true}
							onChange={handleChangeInterval}
							shiftStep={1000}
							value={interval}
						/>
					)}
				</PanelBody>

				<PanelBody title={__('Desktop settings')} initialOpen={true}>
					<NumberControl
						label={__('Per page')}
						isShiftStepEnabled={true}
						onChange={handleChangePerPage}
						shiftStep={1}
						value={perPage}
					/>

					<NumberControl
						label={__('Per move')}
						isShiftStepEnabled={true}
						onChange={handleChangePerMove}
						shiftStep={1}
						value={perMove}
					/>

					<ToggleControl
						label={__('Arrows')}
						checked={arrows}
						onChange={handleChangeArrows}
					/>

					<ToggleControl
						label={__('Pagination')}
						checked={pagination}
						onChange={handleChangePagination}
					/>
				</PanelBody>

				<PanelBody title={__('Tablet settings')} initialOpen={false}>
					<NumberControl
						label={__('Per page')}
						isShiftStepEnabled={true}
						onChange={handleChangeTabletPerPage}
						shiftStep={1}
						value={tabletPerPage}
					/>

					<NumberControl
						label={__('Per move')}
						isShiftStepEnabled={true}
						onChange={handleChangeTabletPerMove}
						shiftStep={1}
						value={tabletPerMove}
					/>

					<ToggleControl
						label={__('Arrows')}
						checked={tabletArrows}
						onChange={handleChangeTabletArrows}
					/>

					<ToggleControl
						label={__('Pagination')}
						checked={tabletPagination}
						onChange={handleChangeTabletPagination}
					/>
				</PanelBody>

				<PanelBody title={__('Mobile settings')} initialOpen={false}>
					<NumberControl
						label={__('Per page')}
						isShiftStepEnabled={true}
						onChange={handleChangeMobilePerPage}
						shiftStep={1}
						value={mobilePerPage}
					/>

					<NumberControl
						label={__('Per move')}
						isShiftStepEnabled={true}
						onChange={handleChangeMobilePerMove}
						shiftStep={1}
						value={mobilePerMove}
					/>

					<ToggleControl
						label={__('Arrows')}
						checked={mobileArrows}
						onChange={handleChangeMobileArrows}
					/>

					<ToggleControl
						label={__('Pagination')}
						checked={mobilePagination}
						onChange={handleChangeMobilePagination}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="advanced">
				<TextareaControl
					label={__('Splide settings')}
					help={__(
						'Override the Splide settings with a custom Splide JSON object of settings.'
					)}
					rows={12}
					onChange={handleChangeSplide}
					value={JSON.stringify(splide, null, 2)}
				/>
			</InspectorControls>

			<div
				{...useBlockProps({ className: 'splide' })}
				aria-label=""
				data-splide={JSON.stringify(splide)}
			>
				<div className="splide__track">
					<div {...innerBlocksProps}></div>
				</div>
			</div>
		</>
	);
}
