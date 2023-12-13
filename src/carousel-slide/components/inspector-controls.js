/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	FocalPointPicker,
	BaseControl,
	Button,
	ButtonGroup,
	ColorPalette,
	RangeControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

const CarouselSlideInspectorControls = (props) => {
	const {
		imageUrl,
		palette,
		backgroundType,
		backgroundImageId,
		backgroundColor,
		overlayColor,
		overlayOpacity,
		focalPoint,
		onBackgroundTypeChange,
		onBackgroundImageSelect,
		onBackgroundImageRemove,
		onBackgroundColorChange,
		onOverlayColorChange,
		onOverlayOpacityChange,
		onFocalPointChange,
		clientId,
	} = props;
	return (
		<InspectorControls>
			<PanelBody title={__('Slide settings', 'pulsar-blocks')}>
				<ToggleGroupControl
					label={__('Background type')}
					onChange={onBackgroundTypeChange}
					value={backgroundType}
					isBlock
				>
					<ToggleGroupControlOption
						value={'none'}
						label={__('None', 'pulsar-blocks')}
					/>

					<ToggleGroupControlOption
						value={'image'}
						label={__('Image', 'pulsar-blocks')}
					/>

					<ToggleGroupControlOption
						value={'color'}
						label={__('Color', 'pulsar-blocks')}
					/>
				</ToggleGroupControl>

				{backgroundType === 'image' && (
					<>
						<BaseControl id={`select-image-control-${clientId}`}>
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={'image'}
									title={__(
										'Select background image',
										'pulsar-blocks'
									)}
									render={({ open }) => (
										<>
											{backgroundImageId ? (
												<>
													<FocalPointPicker
														label={__(
															'Focal point picker',
															'pulsar-blocks'
														)}
														url={imageUrl}
														value={focalPoint}
														onChange={
															onFocalPointChange
														}
													/>
													<ButtonGroup>
														<Button
															variant="secondary"
															onClick={open}
														>
															{__(
																'Replace image',
																'pulsar-blocks'
															)}
														</Button>

														<Button
															variant="secondary"
															onClick={
																onBackgroundImageRemove
															}
														>
															{__(
																'Remove image',
																'pulsar-blocks'
															)}
														</Button>
													</ButtonGroup>
												</>
											) : (
												<Button
													variant="primary"
													onClick={open}
												>
													{__(
														'Select image',
														'pulsar-blocks'
													)}
												</Button>
											)}
										</>
									)}
									onSelect={onBackgroundImageSelect}
								/>
							</MediaUploadCheck>
						</BaseControl>

						<BaseControl
							id={`overlay-color-control-${clientId}`}
							label={__('Overlay color', 'pulsar-blocks')}
						>
							<ColorPalette
								colors={palette}
								disableCustomColors={true}
								value={overlayColor}
								onChange={onOverlayColorChange}
							/>
						</BaseControl>

						<RangeControl
							__nextHasNoMarginBottom
							label={__('Overlay opacity', 'pulsar-blocks')}
							value={overlayOpacity}
							currentInput={overlayOpacity}
							onChange={onOverlayOpacityChange}
							min={0}
							max={100}
							step={10}
							required
						/>
					</>
				)}

				{backgroundType === 'color' && (
					<BaseControl
						id={`background-color-control-${clientId}`}
						label={__('Background color', 'pulsar-blocks')}
					>
						<ColorPalette
							colors={palette}
							disableCustomColors={true}
							value={backgroundColor}
							onChange={onBackgroundColorChange}
						/>
					</BaseControl>
				)}
			</PanelBody>
		</InspectorControls>
	);
};

export default CarouselSlideInspectorControls;
