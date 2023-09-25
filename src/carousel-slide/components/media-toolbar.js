import { __ } from '@wordpress/i18n';
import {
	MediaReplaceFlow,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useMedia } from '../utils';

/**
 * MediaToolbar
 *
 * This is a helper component that adds the Media Replace Flow
 * with some buttons to add or remove an image.
 *
 * This should be used on components that have optional images.
 *
 * @param {Object} props options
 * @return {Object} markup of the ToolbarGroup
 */
const MediaToolbar = (props) => {
	const { onSelect, onRemove, isOptional = false, id } = props;

	const hasImage = !!id;
	const { media } = useMedia(id);

	return (
		<ToolbarGroup label={__('Media')}>
			{hasImage ? (
				<>
					<MediaReplaceFlow
						mediaUrl={media?.source_url}
						onSelect={onSelect}
						name={__('Replace')}
					/>
					{!!isOptional && (
						<ToolbarButton onClick={onRemove}>
							{__('Remove')}
						</ToolbarButton>
					)}
				</>
			) : (
				<MediaUploadCheck>
					<MediaUpload
						onSelect={onSelect}
						render={({ open }) => (
							<ToolbarButton onClick={open}>
								{__('Add Image')}
							</ToolbarButton>
						)}
					/>
				</MediaUploadCheck>
			)}
		</ToolbarGroup>
	);
};

export default MediaToolbar;
