import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { generateId } from '../utils/helpers';

export default function Edit({ attributes, setAttributes }) {
	const { id, layout } = attributes;
	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
		template: [['woocommerce/catalog-sorting'], ['pulsar/filter-facetwp']],
	});

	useEffect(() => {
		if (!id) {
			setAttributes({ id: generateId() });
		}
	}, [id, setAttributes]);

	const layouts = [
		{ label: __('Slide Out', 'pulsar-blocks'), value: 'slide-out' },
		{ label: __('Dropdown', 'pulsar-blocks'), value: 'dropdown' },
		{ label: __('Stacked', 'pulsar-blocks'), value: 'stacked' },
	];

	return (
		<div {...innerBlocksProps}>
			<InspectorControls group="settings">
				<PanelBody title={__('Settings', 'pulsar-blocks')}>
					<SelectControl
						label={__('Layout', 'pulsar-blocks')}
						value={layout}
						options={layouts}
						onChange={(value) => setAttributes({ layout: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="wp-block-pulsar-filters__items">{children}</div>
		</div>
	);
}
