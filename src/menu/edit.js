import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Spinner,
	ToggleControl,
	Disabled,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		location,
		collapse,
		orientation,
		hasSubmenuBack,
		hasSubmenuLabel,
		submenuOpensOnClick,
	} = attributes;
	const blockProps = useBlockProps();

	const [locations, setlocations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		apiFetch({ path: '/pulsar/v1/menu-locations' })
			.then((locationsResponse) => {
				setlocations(locationsResponse);
				setIsLoading(false);
			})
			.catch((fetchError) => {
				// eslint-disable-next-line no-console
				console.error('Error fetching menu locations:', fetchError);
				setError(
					fetchError.message ||
						__('Failed to load menu locations.', 'pulsar-blocks')
				);
				setIsLoading(false);
			});
	}, []);

	const locationOptions = [
		{ label: __('— Select a Menu Location —', 'pulsar-blocks'), value: '' },
		...locations.map((locationResponse) => ({
			label: locationResponse.name,
			value: locationResponse.slug,
		})),
	];

	const collapses = collapse === 'small-only' || collapse === 'always';

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
							label={__('Location', 'pulsar-blocks')}
							value={location}
							options={locationOptions}
							onChange={(newLocation) =>
								setAttributes({ location: newLocation })
							}
							help={__(
								'Select the menu location to display.',
								'pulsar-blocks'
							)}
						/>
					)}
					<SelectControl
						label={__('Collapse', 'pulsar-blocks')}
						help={__(
							'Select when the menu should collapse into a toggle button.',
							'pulsar-blocks'
						)}
						options={[
							{
								label: __('Never', 'pulsar-blocks'),
								value: 'never',
							},
							{
								label: __(
									'Small Screens Only',
									'pulsar-blocks'
								),
								value: 'small-only',
							},
							{
								label: __('Always', 'pulsar-blocks'),
								value: 'always',
							},
						]}
						value={collapse}
						onChange={(newCollapse) =>
							setAttributes({ collapse: newCollapse })
						}
					/>

					{!collapses && (
						<ToggleGroupControl
							label={__('Orientation', 'pulsar-blocks')}
							value={orientation}
							onChange={(newOrientation) =>
								setAttributes({ orientation: newOrientation })
							}
							isBlock
						>
							<ToggleGroupControlOption
								value="vertical"
								label={__('Vertical', 'pulsar-blocks')}
							/>
							<ToggleGroupControlOption
								value="horizontal"
								label={__('Horizontal', 'pulsar-blocks')}
							/>
						</ToggleGroupControl>
					)}
				</PanelBody>

				{collapses && (
					<PanelBody
						title={__('Submenu Options', 'pulsar-blocks')}
						initialOpen={true}
					>
						<ToggleControl
							label={__('Open on click', 'pulsar-blocks')}
							help={__(
								'Opens a submenu via a click rather than hover.',
								'pulsar-blocks'
							)}
							checked={submenuOpensOnClick}
							onChange={(val) => {
								setAttributes({ submenuOpensOnClick: val });
							}}
						/>

						<ToggleControl
							label={__('Show back button', 'pulsar-blocks')}
							checked={hasSubmenuBack}
							onChange={(val) => {
								setAttributes({ hasSubmenuBack: val });
							}}
						/>
						{hasSubmenuBack && (
							<ToggleControl
								label={__('Show parent label', 'pulsar-blocks')}
								help={__(
									'Show the parent menu item label as the back button.',
									'pulsar-blocks'
								)}
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
				{location ? (
					<Disabled>
						<ServerSideRender
							block="pulsar/menu"
							attributes={{
								location,
								collapse,
								hasSubmenuBack,
								hasSubmenuLabel,
								submenuOpensOnClick,
								orientation,
							}}
						/>
					</Disabled>
				) : (
					<p className="wp-block-pulsar-menu__placeholder">
						{__(
							'Select a menu location to display.',
							'pulsar-blocks'
						)}
					</p>
				)}
			</div>
		</>
	);
}
