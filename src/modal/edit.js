/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockControls,

	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	useSettings,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useEffect, useRef, useState } from '@wordpress/element';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseCustomUnits as useCustomUnits,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
	withNotices,
	Placeholder,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

import { generateModalId, useModals } from '../utils/modal';
import { Modal as icon } from '../components/icons';

import './editor.scss';

export function Edit(props) {
	const { attributes, setAttributes, isSelected, clientId } = props;
	const {
		id,
		inQueryLoop,
		label,
		width,
		overlayColor,
		enableCloseButton,
		triggerDelay,
		enableTriggerDelay,
		triggerSelector,
		dismissedDuration,
	} = attributes;

	const modals = useModals();

	// Ensure that the modal ID is unique.
	useEffect(() => {
		const duplicates = modals.filter((obj, index, arr) =>
			arr.find(
				(innerObj) =>
					innerObj.attributes.id === obj.attributes.id &&
					innerObj.clientId !== obj.clientId
			)
		);

		if (duplicates.length <= 1) {
			return;
		}

		for (let i = 1; i < duplicates.length; i++) {
			dispatch('core/block-editor').updateBlockAttributes(
				duplicates[i].clientId,
				{ id: generateModalId() }
			);
		}
	}, [clientId, modals]);

	const [alreadyOpenedDefault, setAlreadyOpenedDefault] = useState(false);

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const postType = useSelect((select) => {
		const { getCurrentPostType } = select(editorStore);

		return getCurrentPostType();
	}, []);

	const ref = useRef(null);
	const [open, setOpen] = useState(false);

	const isInnerBlockSelected = useSelect(
		(select) => {
			const { hasSelectedInnerBlock } = select(blockEditorStore);

			return hasSelectedInnerBlock(clientId, true);
		},
		[clientId]
	);

	useEffect(() => {
		if (!id) {
			setAttributes({ id: generateModalId() });
		}
	}, [id, setAttributes]);

	useEffect(() => {
		if (isSelected || isInnerBlockSelected) {
			setOpen(true);
		} else if ('wp_block' === postType && !alreadyOpenedDefault) {
			setAlreadyOpenedDefault(true);
			setOpen(true);
		} else {
			setOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSelected, isInnerBlockSelected, postType]);

	const handleClose = () => {
		setOpen(false);
	};

	const toggleOpen = () => {
		setOpen(!open);
	};

	const [availableUnits] = useSettings('spacing.units');
	const units = useCustomUnits({
		availableUnits: availableUnits || ['%', 'px', 'em', 'rem', 'vw'],
	});

	const widthWithUnit = Number.isFinite(width) ? width + '%' : width;

	const { getBlockParentsByBlockName } = wp.data.select('core/block-editor');

	useEffect(() => {
		const queryLoopParents = getBlockParentsByBlockName(
			clientId,
			'core/query'
		);
		const isWithinQueryLoop = queryLoopParents.length > 0;

		setAttributes({ inQueryLoop: isWithinQueryLoop });
	}, [clientId, inQueryLoop, getBlockParentsByBlockName, setAttributes]);

	const blockProps = useBlockProps({
		className: clsx('wp-block-pulsar-modal', {
			'is-open': open,
		}),
		ref,
		style: {
			'--modal-container-width': widthWithUnit || undefined,
			'--modal-overlay-background-color': overlayColor,
		},
		'data-trigger-delay': enableTriggerDelay ? triggerDelay : undefined,
		'data-trigger-selector': triggerSelector || undefined,
		'data-cookie-duration': dismissedDuration || undefined,
		'data-modal-id': id,
	});

	const { children, ...innerBlocksProps } = useInnerBlocksProps({
		className: 'wp-block-pulsar-modal__container',
		role: 'dialog',
		'aria-modal': true,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'pulsar')}>
					<p className="wp-block-pulsar-modal__editor-id">
						{__('Modal ID', 'pulsar')}
						{': '}
						<code>{id}</code>
					</p>
					<TextControl
						label={__('Modal Label', 'pulsar')}
						value={label}
						placeholder={__('New Modal', 'pulsar')}
						onChange={(value) => setAttributes({ label: value })}
						help={__(
							'Used to differentiate modals from one another, and describes the modal to screen readers.',
							'pulsar'
						)}
					/>
					<UnitControl
						label={__('Width')}
						labelPosition="edge"
						__unstableInputWidth="80px"
						value={width || ''}
						onChange={(nextWidth) => {
							nextWidth =
								0 > parseFloat(nextWidth) ? '0' : nextWidth;
							setAttributes({ width: nextWidth });
						}}
						units={units}
					/>
					<ToggleControl
						label={__('Show close button', 'pulsar')}
						checked={enableCloseButton || false}
						onChange={() => {
							setAttributes({
								enableCloseButton: !enableCloseButton,
							});
						}}
					/>
				</PanelBody>
				<PanelBody title={__('Triggers', 'pulsar')} initialOpen={false}>
					<ToggleControl
						label={__('Show modal on page load', 'pulsar')}
						checked={enableTriggerDelay || false}
						onChange={() => {
							setAttributes({
								enableTriggerDelay: !enableTriggerDelay,
							});
						}}
					/>
					{enableTriggerDelay && (
						<>
							<UnitControl
								label={__('Delay', 'pulsar')}
								labelPosition="edge"
								__unstableInputWidth="80px"
								value={triggerDelay}
								placeholder="0"
								onChange={(val) =>
									setAttributes({ triggerDelay: val })
								}
								units={[
									{
										value: 'ms',
										label: 'ms',
										default: '',
										a11yLabel: __('Milliseconds (ms)'),
										step: 100,
									},
								]}
							/>
							<UnitControl
								label={__('Dismissed duration', 'pulsar')}
								labelPosition="edge"
								__unstableInputWidth="80px"
								value={dismissedDuration}
								help={__(
									'Duration before this modal will appear again after being closed. Leave blank to always show this modal.',
									'pulsar'
								)}
								placeholder="0"
								onChange={(val) =>
									setAttributes({ dismissedDuration: val })
								}
								units={[
									{
										value: 'days',
										label: 'd',
										default: '',
										a11yLabel: __('Days'),
										step: 1,
									},
									{
										value: 'hrs',
										label: 'h',
										default: '',
										a11yLabel: __('Hours'),
										step: 1,
									},
									{
										value: 'mins',
										label: 'min',
										default: '',
										a11yLabel: __('Minutes'),
										step: 1,
									},
								]}
							/>
						</>
					)}
					<TextControl
						label={__('Selector', 'pulsar')}
						help={__(
							'Optional CSS selector to trigger the modal. Buttons and groups also have an option to trigger modals.',
							'pulsar'
						)}
						value={triggerSelector}
						onChange={(val) =>
							setAttributes({ triggerSelector: val })
						}
						style={{ fontFamily: 'monospace' }}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					__experimentalIsRenderedInSidebar
					settings={[
						{
							colorValue: overlayColor,
							label: __('Overlay', 'pulsar'),
							onColorChange: (val) =>
								setAttributes({ overlayColor: val }),
							isShownByDefault: true,
							enableAlpha: true,
							resetAllFilter: () => ({
								overlayColor: undefined,
							}),
						},
					]}
					panelId={clientId}
					{...colorGradientSettings}
				/>
			</InspectorControls>

			<BlockControls group="other">
				<ToolbarGroup>
					<ToolbarButton onClick={toggleOpen}>
						{open
							? __('Close Modal', 'pulsar')
							: __('Open Modal', 'pulsar')}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>

			<div {...blockProps}>
				{open ? (
					<div className="wp-block-pulsar-modal__overlay">
						<div {...innerBlocksProps}>
							{children}

							{enableCloseButton && (
								<button
									className="wp-block-pulsar-modal__close"
									onClick={handleClose}
								/>
							)}
						</div>
					</div>
				) : (
					<Placeholder
						className="wp-block-pulsar-modal__placeholder"
						icon={icon}
						isColumnLayout
					>
						{__('Modal ID: ', 'pulsar') + id}
					</Placeholder>
				)}
			</div>
		</>
	);
}

export default withNotices(Edit);
