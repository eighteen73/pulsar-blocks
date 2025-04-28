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

import clsx from 'clsx';

/**
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { menuLocation, isResponsive } = attributes;
	const blockProps = useBlockProps({
		className: clsx(`is-location-${menuLocation}`, {
			'is-responsive': attributes.isResponsive,
		}),
	});

	const [menuLocations, setMenuLocations] = useState([]);
	const [menuItems, setMenuItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
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
	}, []);

	// Fetch menu items when the menu location changes
	useEffect(() => {
		if (menuLocation) {
			setIsLoading(true);
			setError(null); // Reset error on new fetch

			apiFetch({ path: `/pulsar/v1/menu-location/${menuLocation}` })
				.then((items) => {
					setMenuItems(items);
					setIsLoading(false);
				})
				.catch((fetchError) => {
					console.error('Error fetching menu items:', fetchError);
					setError(
						fetchError.message ||
							__('Failed to load menu items.', 'pulsar')
					);
					setIsLoading(false);
				});
		}
	}, [menuLocation]);

	// Prepare options for the SelectControl
	const locationOptions = [
		{ label: __('— Select a Menu Location —', 'pulsar'), value: '' },
		...menuLocations.map((location) => ({
			label: location.name, // Use the descriptive name
			value: location.slug, // Use the slug as the value
		})),
	];

	// Render a list of top level menu items for the selected location
	const MenuItems = () => {
		// render menu structure. Each item has a children property with nested items
		const renderMenuItems = (items) => {
			return items.map((item) => {
				return (
					<li
						className={
							item.children
								? 'wp-block-pulsar-menu__item has-submenu'
								: 'wp-block-pulsar-menu__item'
						}
						key={item.id}
					>
						<a
							className="wp-block-pulsar-menu__link"
							href={item.url}
						>
							{item.title}
						</a>
						{item.children && item.children.length > 0 && (
							<>
								<button className="wp-block-pulsar-menu__submenu-icon"></button>
								<ul>{renderMenuItems(item.children)}</ul>
							</>
						)}
					</li>
				);
			});
		};

		return (
			<ul className="wp-block-pulsar-menu__items">
				{renderMenuItems(menuItems)}
			</ul>
		);
	};

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
			<nav {...blockProps}>
				{
					// Render the menu based on the selected location
					menuLocation ? (
						<>
							<button className="wp-block-pulsar-menu__open">
								<span className="wp-block-pulsar-menu__open-icon"></span>
							</button>

							<MenuItems />
						</>
					) : (
						<p>{__('No menu location selected.', 'pulsar')}</p>
					)
				}
			</nav>
		</>
	);
}
