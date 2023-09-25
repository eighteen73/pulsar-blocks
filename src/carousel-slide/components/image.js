import { Spinner, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { useMedia } from '../utils';

const Image = (props) => {
	const {
		isActive,
		id,
		size = 'full',
		onSelect,
		focalPoint = { x: 0.5, y: 0.5 },
		onChangeFocalPoint,
		...rest
	} = props;
	const hasImage = !!id;
	const { media, isResolvingMedia } = useMedia(id);

	if (!isActive) {
		return;
	}

	if (!hasImage) {
		return (
			<>
				<Placeholder
					className="wp-block-pulsar-carousel-slide__image"
					withIllustration
				/>
			</>
		);
	}

	if (isResolvingMedia) {
		return <Spinner />;
	}

	const imageUrl =
		media?.media_details?.sizes[size]?.source_url ?? media?.source_url;
	const altText = media?.alt_text;

	const focalPointStyle = {
		objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
	};

	rest.style = {
		...rest.style,
		...focalPointStyle,
	};

	return (
		<>
			{hasImage && (
				<img
					className="wp-block-pulsar-carousel-slide__image"
					src={imageUrl}
					alt={altText}
					{...rest}
				/>
			)}
		</>
	);
};

export default Image;
