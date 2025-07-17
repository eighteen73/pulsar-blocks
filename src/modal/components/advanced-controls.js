import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { useDispatch } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	InspectorAdvancedControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	BaseControl,
	ToggleControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { useBlocks } from '../../utils/use-blocks';

const ALLOWED_BLOCKS = [
	'core/button',
	'core/image',
	'core/heading',
	'core/group',
];

const addAttributes = (settings, name) => {
	if (settings?.attributes !== undefined && ALLOWED_BLOCKS.includes(name)) {
		settings.attributes = {
			...settings.attributes,
			modalTriggerEnabled: {
				type: 'boolean',
				default: false,
			},
			modalTriggerId: {
				type: 'string',
			},
		};
	}

	return settings;
};

const withAdvancedControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, attributes, setAttributes } = props;

		const modals = useBlocks('pulsar/modal');

		const selectedModal = modals.filter(
			(block) => attributes?.modalTriggerId === block?.attributes?.id
		)[0];

		const { selectBlock } = useDispatch(blockEditorStore);

		const modalOptions = [
			{ label: __('Select Modal', 'pulsar'), value: '' },
			...modals.map((modal) => {
				return {
					label:
						modal?.attributes?.label || __('New Modal', 'pulsar'),
					value: modal?.attributes?.id,
				};
			}),
		];

		if (!ALLOWED_BLOCKS.includes(name)) {
			return <BlockEdit {...props} />;
		}

		return (
			<>
				<BlockEdit {...props} />
				{name !== 'pulsar/modal' && (
					<InspectorAdvancedControls>
						<BaseControl>
							<ToggleControl
								label={__('Show Modal on Click', 'pulsar')}
								checked={
									attributes?.modalTriggerEnabled || false
								}
								onChange={() => {
									setAttributes({
										modalTriggerEnabled: !(
											attributes?.modalTriggerEnabled ||
											false
										),
									});
								}}
							/>
							{attributes?.modalTriggerEnabled && (
								<SelectControl
									label={__('Modal', 'pulsar')}
									value={attributes?.modalTriggerId}
									options={modalOptions}
									onChange={(val) => {
										setAttributes({
											modalTriggerId: val,
										});
									}}
								/>
							)}
							{selectedModal !== null && (
								<Button
									label={__('Edit Modal', 'pulsar')}
									variant="secondary"
									onClick={() =>
										selectBlock(selectedModal.clientId)
									}
								>
									{__('Open Modal', 'pulsar')}
								</Button>
							)}
						</BaseControl>
					</InspectorAdvancedControls>
				)}
			</>
		);
	};
}, 'withInspectorControl');

addFilter('blocks.registerBlockType', 'pulsar/modal-attributes', addAttributes);

addFilter(
	'editor.BlockEdit',
	'pulsar/modal-advanced-controls',
	withAdvancedControls
);
