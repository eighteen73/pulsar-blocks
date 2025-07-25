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
	__experimentalToggleGroupControl as ToggleGroupControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseCustomUnits as useCustomUnits,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
	withNotices,
	Placeholder,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	Popover,
} from '@wordpress/components';
import { useSelect, dispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

import { useBlocks } from '../utils/use-blocks';
import { generateId } from '../utils/helpers';
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
		triggerType,
		triggerDelay,
		clickSelector,
		scrollSelector,
		scrollThreshold,
		dismissedDuration,
		disableClosing,
	} = attributes;

	const modals = useBlocks('pulsar/modal');

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
				{ id: generateId() }
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
			setAttributes({ id: generateId() });
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

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
		'data-trigger-delay':
			triggerType === 'load' || triggerType === 'scroll'
				? triggerDelay
				: undefined,
		'data-trigger-selector':
			triggerType === 'click'
				? clickSelector
				: triggerType === 'scroll'
					? scrollSelector
					: undefined,
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
				<PanelBody title={__('Settings', 'pulsar-blocks')}>
					<p className="wp-block-pulsar-modal__editor-id">
						{__('Modal ID', 'pulsar-blocks')}
						{': '}
						<code>{id}</code>
					</p>
					<TextControl
						label={__('Modal Label', 'pulsar-blocks')}
						value={label}
						placeholder={__('New Modal', 'pulsar-blocks')}
						onChange={(value) => setAttributes({ label: value })}
						help={__(
							'Used to differentiate modals from one another, and describes the modal to screen readers.',
							'pulsar-blocks'
						)}
					/>

					<ToggleControl
						label={__('Prevent closing', 'pulsar-blocks')}
						checked={disableClosing || false}
						help={__(
							'If enabled, the modal will not be closable by clicking the close button or by clicking outside the modal. Use with caution.',
							'pulsar-blocks'
						)}
						onChange={() => {
							setAttributes({
								disableClosing: !disableClosing,
								enableCloseButton: false,
							});
						}}
					/>

					<ToggleControl
						label={__('Show close button', 'pulsar-blocks')}
						checked={enableCloseButton || false}
						onChange={() => {
							setAttributes({
								enableCloseButton: !enableCloseButton,
							});
						}}
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

					<UnitControl
						label={__('Dismissed duration', 'pulsar-blocks')}
						labelPosition="edge"
						__unstableInputWidth="80px"
						value={dismissedDuration}
						help={__(
							'Duration before this modal will appear again after being closed. Leave blank to always show this modal.',
							'pulsar-blocks'
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
				</PanelBody>
				<PanelBody
					title={__('Triggers', 'pulsar-blocks')}
					initialOpen={false}
				>
					<ToggleGroupControl
						label={__('Trigger type', 'pulsar-blocks')}
						value={triggerType}
						onChange={(val) => setAttributes({ triggerType: val })}
						isBlock
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					>
						<ToggleGroupControlOption value="click" label="Click" />
						<ToggleGroupControlOption value="load" label="Load" />
						<ToggleGroupControlOption
							value="scroll"
							label="Scroll"
						/>
					</ToggleGroupControl>

					{triggerType === 'scroll' && (
						<>
							<TextControl
								label={__('Selector', 'pulsar-blocks')}
								help={__(
									'CSS element selector that triggers the modal when that element is scrolled into view.',
									'pulsar-blocks'
								)}
								value={scrollSelector}
								onChange={(val) =>
									setAttributes({ scrollSelector: val })
								}
								style={{ fontFamily: 'monospace' }}
								__nextHasNoMarginBottom
							/>
							<UnitControl
								label={__('Scroll threshold', 'pulsar-blocks')}
								units={[
									{
										value: '%',
										label: '%',
										default: 10,
										a11yLabel: __('Percentage'),
										step: 10,
									},
								]}
								min={0}
								max={100}
								labelPosition="edge"
								__unstableInputWidth="80px"
								value={scrollThreshold}
								onChange={(val) =>
									setAttributes({ scrollThreshold: val })
								}
							/>
						</>
					)}

					{(triggerType === 'load' || triggerType === 'scroll') && (
						<>
							<UnitControl
								label={__('Delay', 'pulsar-blocks')}
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
						</>
					)}

					{triggerType === 'click' && (
						<TextControl
							label={__('Selector', 'pulsar-blocks')}
							help={__(
								'Optional CSS selector to trigger the modal. Buttons and groups also have an option to trigger modals.',
								'pulsar-blocks'
							)}
							value={clickSelector}
							onChange={(val) =>
								setAttributes({ clickSelector: val })
							}
							style={{ fontFamily: 'monospace' }}
							__nextHasNoMarginBottom
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					__experimentalIsRenderedInSidebar
					settings={[
						{
							colorValue: overlayColor,
							label: __('Overlay', 'pulsar-blocks'),
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
					<ToolbarButton onClick={handleOpen}>
						{__('Open Modal', 'pulsar-blocks')}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>

			<div {...blockProps}>
				{open ? (
					<div className="wp-block-pulsar-modal__overlay">
						<div {...innerBlocksProps}>
							<Popover
								variant="toolbar"
								placement="top-start"
								offset={10}
								className="block-editor-block-popover"
							>
								<Toolbar label="Options">
									<ToolbarGroup>
										<ToolbarButton onClick={handleClose}>
											{__('Close Modal', 'pulsar-blocks')}
										</ToolbarButton>
									</ToolbarGroup>
								</Toolbar>
							</Popover>

							{children}

							{enableCloseButton && (
								<button
									className="wp-block-pulsar-modal__close"
									onClick={handleClose}
								>
									<span className="wp-block-pulsar-modal__close-icon"></span>
									<span className="screen-reader-text">
										{__('Close Modal', 'pulsar-blocks')}
									</span>
								</button>
							)}
						</div>
					</div>
				) : (
					<Placeholder
						className="wp-block-pulsar-modal__placeholder"
						icon={icon}
						isColumnLayout
					>
						{__('Modal ID: ', 'pulsar-blocks') + id}
					</Placeholder>
				)}
			</div>
		</>
	);
}

export default withNotices(Edit);
