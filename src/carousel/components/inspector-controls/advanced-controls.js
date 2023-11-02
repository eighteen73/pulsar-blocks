import { TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function AdvancedControls({
	onChange,
	advancedCarouselSettings,
}) {
	return (
		<>
			<TextareaControl
				label={__('Carousel settings')}
				help={__(
					'Override the carousel settings with a custom Splide JSON object.'
				)}
				rows={12}
				onChange={(value) =>
					onChange({
						advancedCarouselSettings: JSON.parse(value),
					})
				}
				value={JSON.stringify(advancedCarouselSettings, null, 2)}
			/>
		</>
	);
}
