import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Spinner,
	ToggleControl,
	Disabled,
	__experimentalToggleGroupControl as ToggleGroupControl,
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
 * @param {boolean}  props.isResponsive   Indicates if the menu is responsive.
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
			.then((locations) => {
				setlocations(locations);
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
		...locations.map((location) => ({
			label: location.name,
			value: location.slug,
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
							label={__('Location', 'pulsar')}
							value={location}
							options={locationOptions}
							onChange={(newLocation) =>
								setAttributes({ location: newLocation })
							}
							help={__(
								'Select the menu location to display.',
								'pulsar'
							)}
						/>
					)}
					<SelectControl
						label={__('Collapse', 'pulsar')}
						help={__(
							'Select when the menu should collapse into a toggle button.',
							'pulsar'
						)}
						options={[
							{
								label: __('Never', 'pulsar'),
								value: 'never',
							},
							{
								label: __('Small Screens Only', 'pulsar'),
								value: 'small-only',
							},
							{
								label: __('Always', 'pulsar'),
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
							label={__('Orientation', 'pulsar')}
							value={orientation}
							onChange={(newOrientation) =>
								setAttributes({ orientation: newOrientation })
							}
							isBlock
						>
							<ToggleGroupControlOption
								value="vertical"
								label={__('Vertical', 'pulsar')}
							/>
							<ToggleGroupControlOption
								value="horizontal"
								label={__('Horizontal', 'pulsar')}
							/>
						</ToggleGroupControl>
					)}
				</PanelBody>

				{collapses && (
					<PanelBody
						title={__('Submenu Options', 'pulsar')}
						initialOpen={true}
					>
						<ToggleControl
							label={__('Open on click', 'pulsar')}
							help={__(
								'Opens a submenu via a click rather than hover.',
								'pulsar'
							)}
							checked={submenuOpensOnClick}
							onChange={(val) => {
								setAttributes({ submenuOpensOnClick: val });
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
								help={__(
									'Show the parent menu item label as the back button.',
									'pulsar'
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
