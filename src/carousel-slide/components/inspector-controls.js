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
	} = props;
	return (
		<InspectorControls>
			<PanelBody title={__('Background settings')}>
				<ToggleGroupControl
					label={__('Background type')}
					onChange={onBackgroundTypeChange}
					value={backgroundType}
					isBlock
				>
					<ToggleGroupControlOption
						value={'none'}
						label={__('None')}
					/>

					<ToggleGroupControlOption
						value={'image'}
						label={__('Image')}
					/>

					<ToggleGroupControlOption
						value={'color'}
						label={__('Color')}
					/>
				</ToggleGroupControl>

				{backgroundType === 'image' && (
					<>
						<BaseControl>
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={'image'}
									title={__('Select background image')}
									render={({ open }) => (
										<>
											{backgroundImageId ? (
												<>
													<FocalPointPicker
														label={__(
															'Focal point picker'
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
																'Replace image'
															)}
														</Button>

														<Button
															variant="secondary"
															onClick={
																onBackgroundImageRemove
															}
														>
															{__('Remove image')}
														</Button>
													</ButtonGroup>
												</>
											) : (
												<Button
													variant="primary"
													onClick={open}
												>
													{__('Select image')}
												</Button>
											)}
										</>
									)}
									onSelect={onBackgroundImageSelect}
								/>
							</MediaUploadCheck>
						</BaseControl>

						<BaseControl label={'Overlay color'}>
							<ColorPalette
								colors={palette}
								disableCustomColors={true}
								value={overlayColor}
								onChange={onOverlayColorChange}
							/>
						</BaseControl>

						<RangeControl
							__nextHasNoMarginBottom
							label={__('Overlay opacity')}
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
					<BaseControl label={'Background color'}>
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
