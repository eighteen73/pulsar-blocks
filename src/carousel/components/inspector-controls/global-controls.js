import {
	Disabled,
	ToggleControl,
	TextControl,
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
	attributes,
	isDisabled = false,
}) {
	const { ariaLabel, carouselOptions } = attributes;

	// Updated function to conditionally update perPage to 1 if the type is 'fade'
	function updatePerPageTo1(options) {
		if (options && typeof options === 'object') {
			// Conditionally update perPage to 1 based on the type
			if (options.type === 'fade' && options.hasOwnProperty('perPage')) {
				options = { ...options, perPage: 1 };
			}

			// Recursively update perPage in nested objects
			for (const key in options) {
				if (
					options.hasOwnProperty(key) &&
					typeof options[key] === 'object'
				) {
					options[key] = updatePerPageTo1(options[key]);
				}
			}
		}

		return options;
	}

	const helpText = (type) => {
		switch (type) {
			case 'slide':
				return __(
					'Slide between slides. Supports multiple slides per page.'
				);
			case 'loop':
				return __(
					'Continually loop through the slides. Disabled in the editor.'
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
		<>
			<TextControl
				label={__('Label')}
				help={__(
					"Used to describe the carousel to screen readers and won't be seen visually."
				)}
				value={ariaLabel}
				onChange={(value) => onChange({ ariaLabel: value })}
			/>

			<Disabled isDisabled={isDisabled}>
				<ToggleGroupControl
					label={__('Type')}
					help={helpText(carouselOptions.type)}
					onChange={(value) => {
						const isFade = value === 'fade';

						const updatedOptions = {
							carouselOptions: {
								...carouselOptions,
								type: value,
							},
						};

						// If the value is 'fade', update perPage to 1
						if (isFade) {
							updatedOptions.carouselOptions = updatePerPageTo1(
								updatedOptions.carouselOptions
							);
						}

						onChange(updatedOptions);
					}}
					value={carouselOptions.type}
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
					help={__(
						'Automatically move to the next slide. Disabled in the editor.'
					)}
					checked={carouselOptions.autoplay}
					onChange={(value) => {
						onChange({
							carouselOptions: {
								...carouselOptions,
								autoplay: value,
							},
						});
					}}
				/>

				{carouselOptions.autoplay && (
					<NumberControl
						label={__('Autoplay interval')}
						min={0}
						step={250}
						isShiftStepEnabled={true}
						onChange={(value) => {
							onChange({
								carouselOptions: {
									...carouselOptions,
									interval: parseInt(value),
								},
							});
						}}
						shiftStep={1000}
						value={carouselOptions.interval}
					/>
				)}
			</Disabled>
		</>
	);
}
