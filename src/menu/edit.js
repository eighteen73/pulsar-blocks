import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Spinner,
	ToggleControl,
	Disabled,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import ServerSideRender from '@wordpress/server-side-render';

import clsx from 'clsx';

/**
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		menuLocation,
		isResponsive,
		hasSubmenuBack,
		hasSubmenuLabel,
		menuType,
		opensOnClick,
	} = attributes;
	const blockProps = useBlockProps();

	const [menuLocations, setMenuLocations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

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
	}, []);

	const locationOptions = [
		{ label: __('— Select a Menu Location —', 'pulsar'), value: '' },
		...menuLocations.map((location) => ({
			label: location.name,
			value: location.slug,
		})),
	];

	return (
		<>
			<InspectorControls>
				<PanelBody>
					{isLoading && <Spinner />}
					{!isLoading && error && (
						<p style={{ color: 'red' }}>{error}</p>
					)}
					{!isLoading && !error && (
						<SelectControl
							label={__('Location', 'pulsar')}
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
						help={
							isResponsive
								? __(
										'Menu will collapse on smaller screens.',
										'pulsar'
									)
								: __('Menu will not collapse.', 'pulsar')
						}
						checked={isResponsive}
						onChange={(newIsResponsive) =>
							setAttributes({ isResponsive: newIsResponsive })
						}
					/>
				</PanelBody>

				{isResponsive && (
					<PanelBody
						title={__('Responsive Options', 'pulsar')}
						initialOpen={true}
					>
						<SelectControl
							label={__('Menu Type', 'pulsar')}
							value={menuType}
							options={[
								{
									label: __('Full Screen', 'pulsar'),
									value: 'full-screen',
								},
								{
									label: __('Below header', 'pulsar'),
									value: 'below-header',
								},
							]}
							onChange={(val) => {
								setAttributes({ menuType: val });
							}}
						/>
						<ToggleControl
							label={__('Show back button', 'pulsar')}
							checked={hasSubmenuBack}
							onChange={(val) => {
								setAttributes({ hasSubmenuBack: val });
							}}
						/>
						{hasSubmenuBack && (
							<ToggleControl
								label={__('Show parent label', 'pulsar')}
								checked={hasSubmenuLabel}
								onChange={(val) => {
									setAttributes({ hasSubmenuLabel: val });
								}}
							/>
						)}
					</PanelBody>
				)}
			</InspectorControls>
			<div {...blockProps}>
				{menuLocation ? (
					<Disabled>
						<ServerSideRender
							block="pulsar/menu"
							attributes={{
								menuLocation,
								isResponsive,
								hasSubmenuBack,
								hasSubmenuLabel,
								menuType,
								opensOnClick,
							}}
						/>
					</Disabled>
				) : (
					<p className="wp-block-pulsar-menu__placeholder">
						{__('Select a menu location to display.', 'pulsar')}
					</p>
				)}
			</div>
		</>
	);
}
