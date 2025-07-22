import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { generateId } from '../utils/helpers';

import './editor.scss';

export default function Edit({ attributes, setAttributes, context }) {
	const { filterLabel, filterId, collapsable } = attributes;
	const { filtersLayout } = context;
	const blockProps = useBlockProps({
		className: `is-filter-layout-${filtersLayout} ${collapsable ? 'is-collapsable' : 'is-not-collapsable'}`,
	});
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps);

	useEffect(() => {
		if (!filterId) {
			setAttributes({ filterId: generateId() });
		}
	}, [filterId, setAttributes]);

	return (
		<div {...innerBlocksProps}>
			{filtersLayout === 'stacked' && (
				<InspectorControls group="settings">
					<PanelBody title={__('Settings', 'pulsar-blocks')}>
						<ToggleControl
							label={__('Collapsable', 'pulsar-blocks')}
							checked={collapsable}
							onChange={(value) =>
								setAttributes({ collapsable: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
			)}

			<button className="wp-block-pulsar-facetwp-filter__title">
				<RichText
					tagName="span"
					className="wp-block-pulsar-filter__button-label"
					placeholder={__('Filter label', 'pulsar-blocks')}
					value={filterLabel}
					onChange={(value) => setAttributes({ filterLabel: value })}
				/>
			</button>

			<div className="wp-block-pulsar-facetwp-filter__panel">
				{children}
			</div>
		</div>
	);
}
