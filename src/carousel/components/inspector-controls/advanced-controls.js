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
			const parsedJson = JSON.parse(value);
			setJsonValid(true);
			updateSettings(parsedJson);
		} catch (error) {
			setJsonValid(false);
		}
	};

	const updateSettings = (parsedJson) => {
		setTimeout(() => {
			onChange({
				advancedCarouselSettings: parsedJson,
			});
		}, 500);
	};

	const jsonText = jsonValid ? __('JSON is valid') : __('JSON is invalid');

	useEffect(() => {
		handleInputChange(tempInputValue);
	}, []);

	return (
		<>
			<TextareaControl
				label={__('Carousel Settings')}
				help={
					<Notice
						isDismissible={false}
						status={jsonValid ? 'success' : 'error'}
					>
						<p style={{ color: '#1e1e1e', margin: 0 }}>
							{jsonText}
						</p>
					</Notice>
				}
				rows={12}
				onChange={(value) => handleInputChange(value)}
				value={tempInputValue}
				className={!jsonValid ? 'is-invalid-input' : ''}
			/>
		</>
	);
}
