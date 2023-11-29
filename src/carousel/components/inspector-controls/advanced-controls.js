import { TextareaControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import './advanced-controls.scss';

export default function AdvancedControls({
	onChange,
	advancedCarouselSettings,
	mergeSettings,
}) {
	const [jsonValid, setJsonValid] = useState(null);
	const [tempInputValue, setTempInputValue] = useState(
		advancedCarouselSettings
			? JSON.stringify(advancedCarouselSettings, null, 2)
			: ''
	);

	const handleInputChange = (value) => {
		setTempInputValue(value);
		try {
			if (value.trim() === '') {
				setJsonValid(true);
				onChange({
					advancedCarouselSettings: null,
				});
			} else {
				const parsedJson = JSON.parse(value);
				setJsonValid(true);
				updateSettings(parsedJson);
			}
		} catch (error) {
			setJsonValid(false);
		}
	};

	const updateSettings = (parsedJson) => {
		setTimeout(() => {
			onChange({
				advancedCarouselSettings: parsedJson,
			});

			// @TODO - work out how to allow the textarea to be updated, without messing up user input if they are typing.
			// setTempInputValue(JSON.stringify(parsedJson, null, 2));
		}, 250);
	};

	useEffect(() => {
		handleInputChange(tempInputValue);
	}, []);

	const classNames = () => {
		if (tempInputValue) {
			return jsonValid ? 'is-valid' : 'is-invalid';
		}

		return null;
	};

	const jsonText = jsonValid ? __('JSON is valid') : __('JSON is invalid');

	const helpText = tempInputValue
		? jsonText
		: __(
				'Override the carousel settings with a custom Splide JSON object.'
		  );

	return (
		<>
			<TextareaControl
				help={helpText}
				label={__('Advanced Carousel Settings')}
				rows={12}
				onChange={(value) => handleInputChange(value)}
				value={tempInputValue}
				className={classNames()}
			/>

			<ToggleControl
				label={__('Merge Settings')}
				help={__(
					'Should the custom settings be merged with the default settings, or override them?'
				)}
				checked={mergeSettings}
				onChange={(value) => onChange({ mergeSettings: value })}
			/>
		</>
	);
}
