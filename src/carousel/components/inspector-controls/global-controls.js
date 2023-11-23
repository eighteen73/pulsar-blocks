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
	return (
		<Disabled isDisabled={isDisabled}>
			<ToggleGroupControl
				label={__('Type')}
				onChange={(value) => {
					const isFade = value === 'fade';

					onChange({
						carouselSettings: {
							...carouselSettings,
							type: value,
						},
					});
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
				checked={carouselSettings.autoplay}
				onChange={(value) => {
					onChange({
						carouselSettings: {
							...carouselSettings,
							autoplay: value,
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
