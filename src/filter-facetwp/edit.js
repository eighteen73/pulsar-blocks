import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { SelectControl, PanelBody } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

	const [isLoading, setIsLoading] = useState(true);
	const [facets, setFacets] = useState([]);

	useEffect(() => {
		// Path to your custom REST API endpoint
		apiFetch({ path: '/pulsar/v1/available-facets' })
			.then((data) => {
				setFacets(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error); // eslint-disable-line no-console
				setIsLoading(false);
			});
	}, []); // The empty dependency array ensures this runs only once.

	if (isLoading) {
		return <p {...blockProps}>Loading facets...</p>;
	}

	if (!facets || facets.length === 0) {
		return <p {...blockProps}>No facets found.</p>;
	}

	const facetOptions = facets
		? [
				{ label: __('Select a facet', 'pulsar'), value: '' },
				...facets.map((facet) => ({
					label: facet.label,
					value: facet.value,
				})),
			]
		: [];

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('FacetWP Filter', 'pulsar')}>
					<SelectControl
						label={__('Facet Name', 'pulsar')}
						value={attributes.facetName}
						options={facetOptions}
						onChange={(value) => {
							console.log(value); // eslint-disable-line no-console
							setAttributes({ facetName: value });
						}}
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
