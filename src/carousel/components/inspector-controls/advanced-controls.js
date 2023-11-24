import { TextareaControl, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

export default function AdvancedControls({
	onChange,
	advancedCarouselSettings,
}) {
	const [jsonValid, setJsonValid] = useState(null);
	const [tempInputValue, setTempInputValue] = useState(
		JSON.stringify(advancedCarouselSettings, null, 2)
	);

	const handleInputChange = (value) => {
		setTempInputValue(value);
		try {
			if (value.trim() === '') {
				setJsonValid(true);
				onChange({
					advancedCarouselSettings: value,
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

			// Format the JSON value for better readability in the textarea
			setTempInputValue(JSON.stringify(parsedJson, null, 2));
		}, 500);
	};

	const jsonText = jsonValid ? __('JSON is valid') : __('JSON is invalid');

	useEffect(() => {
		handleInputChange(tempInputValue);
	}, []);

	const help = (
		<>
			{advancedCarouselSettings ? (
				<Notice
					isDismissible={false}
					status={jsonValid ? 'success' : 'error'}
				>
					<p style={{ color: '#1e1e1e', margin: 0 }}>{jsonText}</p>
				</Notice>
			) : (
				<p style={{ margin: 0 }}>
					{__(
						'Override the carousel settings with a custom Splide JSON object.'
					)}
				</p>
			)}
		</>
	);

	return (
		<>
			<TextareaControl
				label={__('Carousel Settings')}
				help={help}
				rows={12}
				onChange={(value) => handleInputChange(value)}
				value={tempInputValue}
				className={!jsonValid ? 'is-invalid-input' : ''}
			/>
		</>
	);
}
