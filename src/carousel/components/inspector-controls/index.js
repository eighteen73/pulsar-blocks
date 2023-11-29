import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import GlobalControls from './global-controls';
import BreakpointControls from './breakpoint-controls';
import AdvancedControls from './advanced-controls';

export default function CarouselInspectorControls({ onChange, attributes }) {
	const { carouselOptions, advancedCarouselOptions, mergeOptions } =
		attributes;

	const isDisabled = advancedCarouselOptions && !mergeOptions;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<GlobalControls
						onChange={onChange}
						attributes={attributes}
						isDisabled={isDisabled}
					></GlobalControls>
				</PanelBody>

				<PanelBody title={__('Desktop settings')} initialOpen={true}>
					<BreakpointControls
						onChange={onChange}
						carouselOptions={carouselOptions}
						size={false}
						isDisabled={isDisabled}
					/>
				</PanelBody>

				<PanelBody title={__('Tablet settings')} initialOpen={false}>
					<BreakpointControls
						onChange={onChange}
						carouselOptions={carouselOptions}
						size={1024}
						isDisabled={isDisabled}
					/>
				</PanelBody>

				<PanelBody title={__('Mobile settings')} initialOpen={false}>
					<BreakpointControls
						onChange={onChange}
						carouselOptions={carouselOptions}
						size={640}
						isDisabled={isDisabled}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="advanced">
				<AdvancedControls
					onChange={onChange}
					advancedCarouselOptions={advancedCarouselOptions}
					mergeOptions={mergeOptions}
				/>
			</InspectorControls>
		</>
	);
}
