import {
	Disabled,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

export default function GlobalControls({
	onChange,
	carouselSettings,
	isDisabled = false,
}) {
	// Updated function to conditionally update perPage to 1 if the type is 'fade'
	function updatePerPageTo1(settings) {
		if (settings && typeof settings === 'object') {
			// Conditionally update perPage to 1 based on the type
			if (
				settings.type === 'fade' &&
				settings.hasOwnProperty('perPage')
			) {
				settings = { ...settings, perPage: '1' };
			}

			// Recursively update perPage in nested objects
			for (const key in settings) {
				if (
					settings.hasOwnProperty(key) &&
					typeof settings[key] === 'object'
				) {
					settings[key] = updatePerPageTo1(settings[key]);
				}
			}
		}

		return settings;
	}

	const helpText = (type) => {
		switch (type) {
			case 'slide':
				return __(
					'Slide between slides. Supports multiple slides per page.'
				);
			case 'loop':
				return __(
					'Continually loop through the slides. Disabled in the editor preview.'
				);
			case 'fade':
				return __(
					'Fade between slides. Supports a single slide per page.'
				);
			default:
				return null;
		}
	};

	return (
		<Disabled isDisabled={isDisabled}>
			<ToggleGroupControl
				label={__('Type')}
				help={helpText(carouselSettings.type)}
				onChange={(value) => {
					const isFade = value === 'fade';

					const updatedSettings = {
						carouselSettings: {
							...carouselSettings,
							type: value,
						},
					};

					// If the value is 'fade', update perPage to 1
					if (isFade) {
						updatedSettings.carouselSettings = updatePerPageTo1(
							updatedSettings.carouselSettings
						);
					}

					onChange(updatedSettings);
				}}
				value={carouselSettings.type}
				isBlock
			>
				<ToggleGroupControlOption value={'slide'} label={__('Slide')} />
				<ToggleGroupControlOption value={'loop'} label={__('Loop')} />
				<ToggleGroupControlOption value={'fade'} label={__('Fade')} />
			</ToggleGroupControl>

			<ToggleControl
				label={__('Autoplay')}
				help={__(
					'Automatically move to the next slide. Disabled in the editor preview.'
				)}
				checked={carouselSettings.autoplay}
				onChange={(value) => {
					onChange({
						carouselSettings: {
							...carouselSettings,
							autoplay: parseInt(value),
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
						onChange({
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
		</Disabled>
	);
}
