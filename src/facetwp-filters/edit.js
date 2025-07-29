import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { generateId } from '../utils/helpers';

export default function Edit({ attributes, setAttributes }) {
	const { filtersModalId, filtersLayout } = attributes;
	const blockProps = useBlockProps({
		className: `is-filter-layout-${filtersLayout}`,
	});
	const innerBlocksProps = useInnerBlocksProps({
		className: 'wp-block-pulsar-facetwp-filters__items',
	});

	useEffect(() => {
		if (!filtersModalId) {
			setAttributes({ filtersModalId: generateId() });
		}
	}, [filtersModalId, setAttributes]);

	const filterLayouts = [
		{
			label: __('Slide Out', 'pulsar-blocks'),
			value: 'slide-out',
			description: __(
				'Filters are displayed as a slide out panel, opened by buttons.',
				'pulsar-blocks'
			),
		},
		{
			label: __('Dropdowns', 'pulsar-blocks'),
			value: 'dropdowns',
			description: __(
				'Filters are displayed as dropdowns.',
				'pulsar-blocks'
			),
		},
		{
			label: __('Stacked', 'pulsar-blocks'),
			value: 'stacked',
			description: __(
				'Filters are stacked on top of each other. Ideal for sidebars.',
				'pulsar-blocks'
			),
		},
	];

	return (
		<div {...blockProps}>
			<InspectorControls group="settings">
				<PanelBody title={__('Settings', 'pulsar-blocks')}>
					<RadioControl
						hideLabelFromVision={true}
						label={__('Filter Layout', 'pulsar-blocks')}
						selected={filtersLayout}
						options={filterLayouts}
						onChange={(value) =>
							setAttributes({ filtersLayout: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...innerBlocksProps} />
		</div>
	);
}
