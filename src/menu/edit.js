import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Spinner,
	ToggleControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { menuLocation, isResponsive } = attributes;

	// State for storing fetched menu locations
	const [menuLocations, setMenuLocations] = useState([]);
	// State for loading status
	const [isLoading, setIsLoading] = useState(true);
	// State for error handling
	const [error, setError] = useState(null);

	// Fetch menu locations when the component mounts
	useEffect(() => {
		setIsLoading(true);
		setError(null); // Reset error on new fetch

		apiFetch({ path: '/pulsar/v1/menu-locations' })
			.then((locations) => {
				setMenuLocations(locations);
				setIsLoading(false);
			})
			.catch((fetchError) => {
				console.error('Error fetching menu locations:', fetchError);
				setError(
					fetchError.message ||
						__('Failed to load menu locations.', 'pulsar')
				);
				setIsLoading(false);
			});
	}, []); // Empty dependency array ensures this runs only once on mount

	// Prepare options for the SelectControl
	const locationOptions = [
		{ label: __('— Select a Menu Location —', 'pulsar'), value: '' },
		...menuLocations.map((location) => ({
			label: location.name, // Use the descriptive name
			value: location.slug, // Use the slug as the value
		})),
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Menu Settings', 'pulsar')}>
					{isLoading && <Spinner />}
					{!isLoading && error && (
						<p style={{ color: 'red' }}>{error}</p>
					)}
					{!isLoading && !error && (
						<SelectControl
							label={__('Menu Location', 'pulsar')}
							value={menuLocation}
							options={locationOptions}
							onChange={(newLocation) =>
								setAttributes({ menuLocation: newLocation })
							}
							help={__(
								'Select the menu location to display.',
								'pulsar'
							)}
						/>
					)}
					<ToggleControl
						label={__('Responsive', 'pulsar')}
						help={__('Enable responsive menu.', 'pulsar')}
						checked={isResponsive}
						onChange={(newIsResponsive) =>
							setAttributes({ isResponsive: newIsResponsive })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{/* Placeholder for menu rendering later */}
				{menuLocation
					? `Selected Location: ${menuLocation}`
					: __(
							'Please select a menu location in the sidebar.',
							'pulsar'
						)}
			</div>
		</>
	);
}
