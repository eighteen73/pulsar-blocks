import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
	InspectorControls,
	withColors,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	DropdownMenu,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { linkOff } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';

import { MediaToolbar } from '@10up/block-components/components/media-toolbar';
import { useMedia } from '@10up/block-components/hooks/use-media';
import { LinkToolbar } from '@humanmade/block-editor-components';
import {
	justifyTop,
	justifyCenter,
	justifyBottom,
	justifyLeft,
	justifyCenterVertical,
	justifyRight,
	arrowRight,
	arrowDown,
} from '@wordpress/icons';
import clsx from 'clsx';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.attributes
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 */
const Edit = ({
	attributes,
	setAttributes,
	clientId,
	iconColor,
	setIconColor,
	iconBackgroundColor,
	setIconBackgroundColor,
}) => {
	const {
		mediaId,
		url,
		opensInNewTab,
		orientation,
		contentAlignment,
		iconColor: iconColorSlug,
		iconBackgroundColor: iconBackgroundColorSlug,
	} = attributes;

	const classes = clsx('wp-block-pulsar-icon-text', {
		'is-vertical': orientation === 'vertical',
		'is-horizontal': orientation === 'horizontal',
		'is-content-align-start': contentAlignment === 'start',
		'is-content-align-center': contentAlignment === 'center',
		'is-content-align-end': contentAlignment === 'end',
	});

	const blockProps = useBlockProps({
		className: classes,
		style: {
			'--pb--icon-text--icon--color': iconColor.color,
			'--pb--icon-text--icon--background-color':
				iconBackgroundColor.color,
		},
	});
	const innerBlocksProps = useInnerBlocksProps({
		className: 'wp-block-pulsar-icon-text__content',
		template: [['core/paragraph']],
		orientation,
	});

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const verticalIcons = {
		start: justifyLeft,
		center: justifyCenter,
		end: justifyRight,
	};

	const horizontalIcons = {
		start: justifyTop,
		center: justifyCenterVertical,
		end: justifyBottom,
	};

	// Get the current alignment icon based on orientation
	const getCurrentAlignmentIcon = () => {
		if (orientation === 'vertical') {
			return verticalIcons[contentAlignment] || verticalIcons.center;
		}
		return horizontalIcons[contentAlignment] || horizontalIcons.center;
	};

	// Helper function to find color slug from color value
	const getColorSlug = (colorValue) => {
		let colorSlug = colorValue;
		if (colorGradientSettings.colors) {
			colorGradientSettings.colors.forEach((colorGroup) => {
				const foundColor = colorGroup.colors?.find(
					(color) => color.color === colorValue
				);
				if (foundColor) {
					colorSlug = foundColor.slug;
				}
			});
		}
		return colorSlug;
	};

	// Helper function to process SVG content for styling
	const processSvgContent = (svgString) => {
		if (!svgString) return svgString;

		return svgString.replace(
			/fill=(['"])(?!none\b|currentColor\b)(.*?)\1/gi,
			'fill="currentColor"'
		);
	};

	const Icon = () => {
		const { media, hasResolvedMedia } = useMedia(mediaId);
		const [svgContent, setSvgContent] = useState(null);

		useEffect(() => {
			// If the media is an SVG, fetch and inline its content
			if (media?.mime_type === 'image/svg+xml') {
				fetch(media.source_url)
					.then((response) => response.text())
					.then((data) => {
						// Process the SVG to remove fill attributes
						const processedSvg = processSvgContent(data);
						setSvgContent(processedSvg);
					})
					.catch((error) => {
						console.error('Error fetching SVG:', error); // eslint-disable-line no-console
						setSvgContent(null);
					});
			}
		});

		if (!hasResolvedMedia || !media) {
			return null;
		}

		// If it's an SVG and we have the content, inline it
		if (media.mime_type === 'image/svg+xml' && svgContent) {
			return (
				<div
					className="wp-block-pulsar-icon-text__icon"
					dangerouslySetInnerHTML={{ __html: svgContent }}
				/>
			);
		}

		// Otherwise, display it as an image
		return (
			<div className="wp-block-pulsar-icon-text__icon">
				<img src={media.source_url} alt={media.alt_text} />
			</div>
		);
	};

	return (
		<div {...blockProps}>
			<BlockControls>
				<MediaToolbar
					id={mediaId}
					onSelect={(media) =>
						setAttributes({
							mediaId: media.id,
							mediaType: media.type,
						})
					}
					onRemove={() => setAttributes({ mediaId: null })}
					labels={{
						add: __('Add', 'pulsar-blocks'),
						replace: __('Replace', 'pulsar-blocks'),
						remove: __('Remove', 'pulsar-blocks'),
					}}
				/>

				<LinkToolbar
					opensInNewTab={opensInNewTab}
					url={url}
					onChange={({ opensInNewTab, url }) =>
						setAttributes({ opensInNewTab, url })
					}
				/>

				{url && (
					<ToolbarGroup>
						<ToolbarButton
							icon={linkOff}
							label={__('Remove Link', 'pulsar-blocks')}
							onClick={() =>
								setAttributes({
									url: undefined,
									opensInNewTab: false,
								})
							}
						/>
					</ToolbarGroup>
				)}

				<ToolbarGroup>
					<DropdownMenu
						label={__('Content Alignment', 'pulsar-blocks')}
						icon={getCurrentAlignmentIcon()}
						value={contentAlignment}
						onSelect={(value) =>
							setAttributes({ contentAlignment: value })
						}
						controls={[
							{
								title:
									orientation === 'vertical'
										? __('Align Left', 'pulsar-blocks')
										: __('Align Top', 'pulsar-blocks'),
								icon:
									orientation === 'vertical'
										? verticalIcons.start
										: horizontalIcons.start,
								onClick: () =>
									setAttributes({
										contentAlignment: 'start',
									}),
								isActive: contentAlignment === 'start',
							},
							{
								title: __('Align Center', 'pulsar-blocks'),
								icon:
									orientation === 'vertical'
										? verticalIcons.center
										: horizontalIcons.center,
								onClick: () =>
									setAttributes({
										contentAlignment: 'center',
									}),
								isActive: contentAlignment === 'center',
							},
							{
								title:
									orientation === 'vertical'
										? __('Align Right', 'pulsar-blocks')
										: __('Align Bottom', 'pulsar-blocks'),
								icon:
									orientation === 'vertical'
										? verticalIcons.end
										: horizontalIcons.end,
								onClick: () =>
									setAttributes({
										contentAlignment: 'end',
									}),
								isActive: contentAlignment === 'end',
							},
						]}
					/>

					<DropdownMenu
						label={__('Orientation', 'pulsar-blocks')}
						icon={
							orientation === 'vertical' ? arrowDown : arrowRight
						}
						value={orientation}
						onSelect={(value) =>
							setAttributes({ orientation: value })
						}
						controls={[
							{
								title: __('Vertical', 'pulsar-blocks'),
								icon: arrowDown,
								onClick: () =>
									setAttributes({
										orientation: 'vertical',
									}),
								isActive: orientation === 'vertical',
							},
							{
								title: __('Horizontal', 'pulsar-blocks'),
								icon: arrowRight,
								onClick: () =>
									setAttributes({
										orientation: 'horizontal',
									}),
								isActive: orientation === 'horizontal',
							},
						]}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={[
						{
							label: __('Icon Color', 'pulsar-blocks'),
							colorValue: iconColor.color || iconColorSlug,
							onColorChange: (value) => {
								setIconColor(value);
								setAttributes({
									iconColor: getColorSlug(value),
								});
							},
						},
					]}
					panelId={clientId}
					hasColorsOrGradients={false}
					disableCustomColors={true}
					__experimentalIsRenderedInSidebar
					{...colorGradientSettings}
				/>
				<ColorGradientSettingsDropdown
					settings={[
						{
							label: __('Icon Background Color', 'pulsar-blocks'),
							colorValue:
								iconBackgroundColor.color ||
								iconBackgroundColorSlug,
							onColorChange: (value) => {
								setIconBackgroundColor(value);
								setAttributes({
									iconBackgroundColor: getColorSlug(value),
								});
							},
						},
					]}
					panelId={clientId}
					hasColorsOrGradients={false}
					disableCustomColors={true}
					__experimentalIsRenderedInSidebar
					{...colorGradientSettings}
				/>
			</InspectorControls>

			<div className="wp-block-pulsar-icon-text__icon-container">
				<Icon />
			</div>

			<div {...innerBlocksProps} />
		</div>
	);
};

export default withColors({
	iconColor: 'icon-color',
	iconBackgroundColor: 'icon-background-color',
})(Edit);
