import { TextareaControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import './advanced-controls.scss';

export default function AdvancedControls({
	onChange,
	advancedCarouselOptions,
	mergeOptions,
}) {
	const [jsonValid, setJsonValid] = useState(null);
	const [tempInputValue, setTempInputValue] = useState(
		advancedCarouselOptions
			? JSON.stringify(advancedCarouselOptions, null, 2)
			: ''
	);

	/**
	 * Handle the change of the textarea.
	 *
	 * @param {string} value The value of the textarea
	 *
	 * @return {void}
	 */
	const handleInputChange = (value) => {
		setTempInputValue(value);
		try {
			if (value.trim() === '') {
				setJsonValid(true);
				onChange({
					advancedCarouselOptions: null,
				});
			} else {
				const parsedJson = JSON.parse(value);
				setJsonValid(true);
				updateOptions(parsedJson);
			}
		} catch (error) {
			setJsonValid(false);
		}
	};

	/**
	 * Update the options.
	 *
	 * @param {Object} parsedJson The parsed JSON object
	 *
	 * @return {void}
	 */
	const updateOptions = (parsedJson) => {
		setTimeout(() => {
			onChange({
				advancedCarouselOptions: parsedJson,
			});

			// @TODO - work out how to allow the textarea to be updated, without messing up user input if they are typing.
			// setTempInputValue(JSON.stringify(parsedJson, null, 2));
		}, 250);
	};

	useEffect(() => {
		handleInputChange(tempInputValue);
	});

	const classNames = () => {
		if (tempInputValue) {
			return jsonValid ? 'is-valid' : 'is-invalid';
		}

		return null;
	};

	const jsonText = jsonValid ? __('JSON is valid') : __('JSON is invalid');

	const helpText = tempInputValue
		? jsonText
		: __('Override the user selected options with a custom JSON object.');

	return (
		<>
			<TextareaControl
				help={helpText}
				label={__('Advanced Carousel Options')}
				rows={12}
				onChange={(value) => handleInputChange(value)}
				value={tempInputValue}
				className={classNames()}
			/>

			<ToggleControl
				label={__('Merge Options')}
				help={__(
					'Should the custom options be merged with the user selected options, or override them?'
				)}
				checked={mergeOptions}
				onChange={(value) => onChange({ mergeOptions: value })}
			/>
		</>
	);
}
