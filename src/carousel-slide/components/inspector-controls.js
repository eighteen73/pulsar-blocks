import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	FocalPointPicker, // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { useMedia } from '../utils';

const CarouselSlideInspectorControls = (props) => {
	const {
		slideType,
		imageId,
		focalPoint,
		size = 'full',
		onChangeFocalPoint,
		onChangeSlideType,
	} = props;
	const hasImage = !!imageId;
	const { media, isResolvingMedia } = useMedia(imageId);

	const imageUrl =
		media?.media_details?.sizes[size]?.source_url ?? media?.source_url;

	return (
		<InspectorControls>
			<PanelBody title={__('Slide settings')}>
				<ToggleGroupControl
					label={__('Slide type')}
					onChange={onChangeSlideType}
					value={slideType}
					isBlock
				>
					<ToggleGroupControlOption
						value={'blank'}
						label={__('Blank')}
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

				{slideType === 'image' && hasImage && (
					<FocalPointPicker
						label={__('Focal Point Picker')}
						url={imageUrl}
						value={focalPoint}
						onChange={onChangeFocalPoint}
					/>
				)}
			</PanelBody>
		</InspectorControls>
	);
};

export default CarouselSlideInspectorControls;
