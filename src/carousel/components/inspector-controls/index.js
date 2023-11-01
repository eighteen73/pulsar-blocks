import { InspectorControls } from '@wordpress/block-editor';

import { PanelBody } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import GlobalControls from './global-controls';
import BreakpointControls from './breakpoint-controls';

export default function CarouselInspectorControls({
	onChange,
	carouselSettings,
}) {
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<GlobalControls
						onChange={onChange}
						carouselSettings={carouselSettings}
					></GlobalControls>
				</PanelBody>

				<PanelBody title={__('Desktop settings')} initialOpen={true}>
					<BreakpointControls
						onChange={onChange}
						carouselSettings={carouselSettings}
						size={false}
					/>
				</PanelBody>

				<PanelBody title={__('Tablet settings')} initialOpen={false}>
					<BreakpointControls
						onChange={onChange}
						carouselSettings={carouselSettings}
						size={1024}
					/>
				</PanelBody>

				<PanelBody title={__('Mobile settings')} initialOpen={false}>
					<BreakpointControls
						onChange={onChange}
						carouselSettings={carouselSettings}
						size={640}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
