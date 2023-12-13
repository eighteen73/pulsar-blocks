import {
	Disabled,
	ToggleControl,
	SelectControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import { useSetting } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

export default function BreakpointControls({
	carouselOptions,
	onChange,
	size,
	isDisabled = false,
}) {
	// Get the theme spacing sizes
	const themeSpacing = useSetting('spacing.spacingSizes.theme');

	/**
	 * The options for the gap select control.
	 *
	 * @type {Object[]} The options
	 * @type {string}   Object[].label The label
	 * @type {string}   Object[].value The value
	 */
	const gapOptions = [
		{ label: __('Default'), value: '' },
		{ label: '0', value: '0' },
		...themeSpacing.map((item) => ({
			label: item.name,
			value: `var(--wp--preset--spacing--${item.slug})`,
		})),
	];

	/**
	 * Handle the change of a carousel option.
	 *
	 * @param {string} key      The key to update
	 * @param {string} newValue The new value
	 *
	 * @return {void}
	 */
	const handleChange = (key, newValue) => {
		if (size) {
			onChange({
				carouselOptions: {
					...carouselOptions,
					breakpoints: {
						...carouselOptions.breakpoints,
						[size]: {
							...carouselOptions.breakpoints[size],
							[key]: newValue,
						},
					},
				},
			});
		} else {
			onChange({
				carouselOptions: {
					...carouselOptions,
					[key]: newValue,
				},
			});
		}
	};

	/**
	 * Get the value of a carousel option.
	 * If a size is set, it will return the value of the option for that size.
	 *
	 * @param {string} key The key to get
	 *
	 * @return {string} The value of the option
	 */
	const getValue = (key) => {
		if (size) {
			return carouselOptions.breakpoints[size][key];
		}
		return carouselOptions[key];
	};

	return (
		<Disabled isDisabled={isDisabled}>
			{carouselOptions.type !== 'fade' && (
				<>
					<NumberControl
						label={__('Per page')}
						isShiftStepEnabled={true}
						onChange={(value) =>
							handleChange('perPage', parseInt(value))
						}
						shiftStep={1}
						min={1}
						value={getValue('perPage')}
					/>

					<NumberControl
						label={__('Per move')}
						isShiftStepEnabled={true}
						onChange={(value) =>
							handleChange('perMove', parseInt(value))
						}
						shiftStep={1}
						min={1}
						value={getValue('perMove')}
					/>

					<SelectControl
						label={__('Gap')}
						onChange={(value) => handleChange('gap', value)}
						value={getValue('gap')}
						options={gapOptions}
					/>
				</>
			)}

			<ToggleControl
				label={__('Arrows')}
				help={__('Always visible in the editor.')}
				checked={getValue('arrows')}
				onChange={(value) => handleChange('arrows', value)}
			/>

			<ToggleControl
				label={__('Pagination')}
				checked={getValue('pagination')}
				onChange={(value) => handleChange('pagination', value)}
			/>
		</Disabled>
	);
}
