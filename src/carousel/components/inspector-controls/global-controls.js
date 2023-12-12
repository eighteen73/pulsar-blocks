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
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

export default function GlobalControls({
	onChange,
	attributes,
	isDisabled = false,
}) {
	const { ariaLabel, carouselOptions } = attributes;
	const [type, setType] = useState(carouselOptions.type);
	const [loop, setLoop] = useState(
		(carouselOptions.rewind && type === 'fade') ||
			carouselOptions.type === 'loop'
	);

	/**
	 * Handle the type toggle change.
	 *
	 * @param {string} value The value of the type toggle
	 *
	 * @return {void}
	 */
	const handleTypeChange = (value) => {
		const updatedOptions = {
			carouselOptions: {
				...carouselOptions,
			},
		};

		// if loop is true and the value is 'slide', set type to 'loop'
		if (value === 'slide') {
			updatedOptions.carouselOptions.type = loop ? 'loop' : 'slide';
			setType(loop ? 'loop' : 'slide');
		}

		if (value === 'fade') {
			updatedOptions.carouselOptions.rewind = loop ? true : false;
			updatedOptions.carouselOptions.type = 'fade';
			updatedOptions.carouselOptions = updatePerPageTo1(
				updatedOptions.carouselOptions
			);
			setType('fade');
		}

		onChange(updatedOptions);
	};

	/**
	 * Handle the loop toggle change.
	 *
	 * @param {boolean} value The value of the loop toggle
	 *
	 * @return {void}
	 */
	const handleLoopChange = (value) => {
		const updatedOptions = {
			carouselOptions: {
				...carouselOptions,
			},
		};

		if (type === 'fade') {
			updatedOptions.carouselOptions.rewind = value;
		}

		if (type === 'slide' && value === true) {
			updatedOptions.carouselOptions.type = 'loop';
			updatedOptions.carouselOptions.rewind = false;
			setType('loop');
		}

		if (type === 'loop' && value === false) {
			updatedOptions.carouselOptions.type = 'slide';
			updatedOptions.carouselOptions.rewind = false;
			setType('slide');
		}

		setLoop(value);
		onChange(updatedOptions);
	};

	/**
	 * Recursively update perPage to 1 in the options object.
	 *
	 * @param {Object} options The carousel options object
	 * @return {Object} The updated options object
	 */
	const updatePerPageTo1 = (options) => {
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
	};

	/**
	 * Get the help text for the type toggle.
	 *
	 * @param {string} carouselType The type of carousel
	 *
	 * @return {string} The help text
	 */
	const typeHelpText = (carouselType) => {
		if (carouselType === 'fade') {
			return __('Fade between slides. Supports a single slide per page.');
		}
		return __('Slide between slides. Supports multiple slides per page.');
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
					help={typeHelpText(carouselOptions.type)}
					onChange={(value) => handleTypeChange(value)}
					value={type}
					isBlock
				>
					<ToggleGroupControlOption
						value={type === 'loop' ? 'loop' : 'slide'}
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
						'Determines whether to loop the carousel or not when the last slide is reached.'
					)}
					checked={loop}
					onChange={(value) => handleLoopChange(value)}
				/>

				<UnitControl
					label={__('Height')}
					help={__(
						'Set the height of the carousel. If left blank, the carousel will use the height of the content.'
					)}
					onChange={(value) => {
						onChange({
							carouselOptions: {
								...carouselOptions,
								height: value,
							},
						});
					}}
					value={carouselOptions.height}
					min={0}
				/>

				<ToggleControl
					label={__('Autoplay')}
					help={__(
						'Automatically move to the next slide (not reflected in this editor).'
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
