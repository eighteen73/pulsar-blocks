import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { linkOff } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';

import './editor.scss';

import { MediaToolbar, useMedia } from '@10up/block-components';
import { LinkToolbar } from '@humanmade/block-editor-components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.attributes
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { imageId, url, opensInNewTab } = attributes;
	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		allowedBlocks: ['core/heading', 'core/paragraph'],
		template: [
			['core/paragraph', { fontSize: 'md', fontFamily: 'secondary' }],
		],
		orientation: 'vertical',
	});

	const Icon = () => {
		const { media, hasResolvedMedia } = useMedia(imageId);
		const [svgContent, setSvgContent] = useState(null);

		useEffect(() => {
			// If the media is an SVG, fetch and inline its content
			if (media?.mime_type === 'image/svg+xml') {
				fetch(media.source_url)
					.then((response) => response.text())
					.then((data) => {
						setSvgContent(data);
					})
					.catch((error) => {
						console.error('Error fetching SVG:', error);
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
					className="wp-block-pulsar-icon-card__icon"
					dangerouslySetInnerHTML={{ __html: svgContent }}
				/>
			);
		}

		// Otherwise, display it as an image
		return (
			<div className="wp-block-pulsar-icon-card__icon">
				<img src={media.source_url} alt={media.alt_text} />
			</div>
		);
	};

	return (
		<>
			<BlockControls>
				<MediaToolbar
					id={imageId}
					onSelect={(image) => setAttributes({ imageId: image.id })}
					onRemove={() => setAttributes({ imageId: null })}
					labels={{
						add: __('Add Icon', 'pulsar'),
						replace: __('Replace Icon', 'pulsar'),
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
							label={__('Remove Link', 'pulsar')}
							onClick={() =>
								setAttributes({
									url: undefined,
									opensInNewTab: false,
								})
							}
						/>
					</ToolbarGroup>
				)}
			</BlockControls>

			<div {...innerBlocksProps}>
				<div className="wp-block-pulsar-icon-card__icon-container">
					<Icon />
				</div>

				<div className="wp-block-pulsar-icon-card__content">
					{children}
				</div>
			</div>
		</>
	);
}
