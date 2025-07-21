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
	const { id, filterLayout } = attributes;
	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		template: [['pulsar/facetwp-filter']],
	});

	useEffect(() => {
		if (!id) {
			setAttributes({ id: generateId() });
		}
	}, [id, setAttributes]);

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
		<div {...innerBlocksProps}>
			<InspectorControls group="settings">
				<PanelBody title={__('Settings', 'pulsar-blocks')}>
					<RadioControl
						hideLabelFromVision={true}
						label={__('Filter Layout', 'pulsar-blocks')}
						selected={filterLayout}
						options={filterLayouts}
						onChange={(value) =>
							setAttributes({ filterLayout: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="wp-block-pulsar-facetwp-filters__items">
				{children}
			</div>
		</div>
	);
}
