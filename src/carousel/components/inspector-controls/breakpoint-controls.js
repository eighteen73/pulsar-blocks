import {
	Disabled,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

export default function BreakpointControls({
	carouselSettings,
	onChange,
	size,
	isDisabled = false,
}) {
	const handleChange = (key, newValue) => {
		if (size) {
			onChange({
				carouselSettings: {
					...carouselSettings,
					breakpoints: {
						...carouselSettings.breakpoints,
						[size]: {
							...carouselSettings.breakpoints[size],
							[key]: newValue,
						},
					},
				},
			});
		} else {
			onChange({
				carouselSettings: {
					...carouselSettings,
					[key]: newValue,
				},
			});
		}
	};

	const getValue = (key) => {
		if (size) {
			return carouselSettings.breakpoints[size][key];
		}
		return carouselSettings[key];
	};

	return (
		<Disabled isDisabled={isDisabled}>
			{carouselSettings.type !== 'fade' && (
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

					<UnitControl
						label={__('Gap')}
						onChange={(value) => handleChange('gap', value)}
						value={getValue('gap')}
						min={0}
					/>
				</>
			)}

			<ToggleControl
				label={__('Arrows')}
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
