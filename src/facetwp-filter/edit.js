import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import './editor.scss';

export default function Edit({ attributes, setAttributes, context }) {
	const blockProps = useBlockProps();
	const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps);
	const { label, collapsable } = attributes;
	const { filterLayout } = context;

	return (
		<div {...innerBlocksProps}>
			{filterLayout === 'stacked' && (
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

			<button className="wp-block-pulsar-facetwp-filter__button">
				<RichText
					tagName="span"
					className="wp-block-pulsar-filter__button-label"
					placeholder={__('Filter label', 'pulsar-blocks')}
					value={label}
					onChange={(value) => setAttributes({ label: value })}
				/>
			</button>

			<div className="wp-block-pulsar-facetwp-filter__panel">
				{children}
			</div>
		</div>
	);
}
