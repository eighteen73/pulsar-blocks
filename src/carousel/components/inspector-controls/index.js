import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import GlobalControls from './global-controls';
import BreakpointControls from './breakpoint-controls';
import AdvancedControls from './advanced-controls';

export default function CarouselInspectorControls({ onChange, attributes }) {
	const { carouselSettings, advancedCarouselSettings } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<GlobalControls
						onChange={onChange}
						attributes={attributes}
						isDisabled={advancedCarouselSettings}
					></GlobalControls>
				</PanelBody>

				<PanelBody title={__('Desktop settings')} initialOpen={true}>
					<BreakpointControls
						onChange={onChange}
						carouselSettings={carouselSettings}
						size={false}
						isDisabled={advancedCarouselSettings}
					/>
				</PanelBody>

				<PanelBody title={__('Tablet settings')} initialOpen={false}>
					<BreakpointControls
						onChange={onChange}
						carouselSettings={carouselSettings}
						size={1024}
						isDisabled={advancedCarouselSettings}
					/>
				</PanelBody>

				<PanelBody title={__('Mobile settings')} initialOpen={false}>
					<BreakpointControls
						onChange={onChange}
						carouselSettings={carouselSettings}
						size={640}
						isDisabled={advancedCarouselSettings}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="advanced">
				<AdvancedControls
					onChange={onChange}
					advancedCarouselSettings={advancedCarouselSettings}
				/>
			</InspectorControls>
		</>
	);
}
