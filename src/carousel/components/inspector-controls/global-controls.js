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
			if (options.hasOwnProperty('blockSettings') && options.blockSettings.type === 'fade' && options.hasOwnProperty('perPage')) {
				options = { ...options, perPage: 1 };
			}

			// Recursively update perPage in nested objects
			for (const key in options) {
				if (typeof options[key] === 'object') {
					options[key] = updatePerPageTo1(options[key]);
				}
			}
		}

		return options;
	}

	const typeHelpText = (type) => {
		switch (type) {
			case 'slide':
				return __(
					'Slide between slides. Supports multiple slides per page.'
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
					help={typeHelpText(carouselOptions.blockSettings.type)}
					onChange={(value) => {
						const updatedOptions = {
							carouselOptions: {
								...carouselOptions,
								blockSettings: {
									...carouselOptions.blockSettings,
									type: value
								}
							},
						};

						// If the value is 'fade', update perPage to 1
						if (value === 'fade') {
							updatedOptions.carouselOptions = updatePerPageTo1(
								updatedOptions.carouselOptions
							);
						}

						onChange(updatedOptions);
					}}
					value={carouselOptions.blockSettings.type}
					isBlock
				>
					<ToggleGroupControlOption
						value={'slide'}
						label={__('Slide')}
					/>
					<ToggleGroupControlOption
						value={'fade'}
						label={__('Fade')}
					/>
				</ToggleGroupControl>

				<ToggleControl
					label={__('Loop')}
					help={__(
						'Continually loop through the slides.'
					)}
					checked={carouselOptions.blockSettings.loop}
					onChange={(value) => {
						onChange({
							carouselOptions: {
								...carouselOptions,
								blockSettings: {
									...carouselOptions.blockSettings,
									loop: value
								}
							},
						});
					}}
				/>

				<ToggleControl
					label={__('Autoplay')}
					help={__(
						"Automatically move to the next slide (not reflected in this editor)."
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
