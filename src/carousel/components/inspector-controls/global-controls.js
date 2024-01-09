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
	context,
	isDisabled = false,
}) {
	const { ariaLabel, carouselOptions } = attributes;
	const { isLinked } = context;
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
			return __(
				'Fade between slides. Supports a single slide per page.',
				'pulsar-blocks'
			);
		}
		return __(
			'Slide between slides. Supports multiple slides per page.',
			'pulsar-blocks'
		);
	};

	return (
		<>
			<TextControl
				label={__('Label', 'pulsar-blocks')}
				help={__(
					"Used to describe the carousel to screen readers and won't be seen visually.",
					'pulsar-blocks'
				)}
				value={ariaLabel}
				onChange={(value) => onChange({ ariaLabel: value })}
			/>

			<Disabled isDisabled={isDisabled}>
				<ToggleGroupControl
					label={__('Type', 'pulsar-blocks')}
					help={typeHelpText(carouselOptions.type)}
					onChange={(value) => handleTypeChange(value)}
					value={type}
					isBlock
				>
					<ToggleGroupControlOption
						value={type === 'loop' ? 'loop' : 'slide'}
						label={__('Slide', 'pulsar-blocks')}
					/>
					<ToggleGroupControlOption
						value={'fade'}
						label={__('Fade', 'pulsar-blocks')}
					/>
				</ToggleGroupControl>

				<UnitControl
					label={__('Height', 'pulsar-blocks')}
					help={__(
						'Leave blank to use the slide content height.',
						'pulsar-blocks'
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
					label={__('Loop on last slide', 'pulsar-blocks')}
					checked={loop}
					onChange={(value) => handleLoopChange(value)}
				/>

				<ToggleControl
					label={__('Progress bar', 'pulsar-blocks')}
					checked={carouselOptions.progressBar}
					onChange={(value) => {
						onChange({
							carouselOptions: {
								...carouselOptions,
								progressBar: value,
							},
						});
					}}
				/>

				<ToggleControl
					label={__('Autoplay', 'pulsar-blocks')}
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
						label={__('Autoplay interval', 'pulsar-blocks')}
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

				{isLinked && (
					<ToggleControl
						label={__('Use as navigation', 'pulsar-blocks')}
						help={__(
							'Use this carousel as navigation for the other carousel within the linked carousel block.',
							'pulsar-blocks'
						)}
						checked={carouselOptions.isNavigation}
						onChange={(value) => {
							onChange({
								carouselOptions: {
									...carouselOptions,
									isNavigation: value,
								},
							});
						}}
					/>
				)}
			</Disabled>
		</>
	);
}
